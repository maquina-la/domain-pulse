import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { parse } from 'tldts';
import { AuditResponse, calculateHealthScore } from '@domain-pulse/shared';
import { fetchAllDnsRecords } from './services/doh.js';
import { discoverRealSubdomains } from './services/subdomains.js';
import { fetchRdapInfo } from './services/rdap.js';
import { inspectTls } from './services/tls.js';
import { probeHttpAndTech } from './services/http-probe.js';
import {
  detectDnsProvider,
  detectEmailProvider,
  parseSpf,
  parseDmarc,
  parseMtaSts,
  parseBimi,
} from './services/providers.js';
import { auditCache } from './services/cache.js';
import { isRateLimited } from './services/rate-limit.js';

const app = new Hono();

// CORS configuration (FR-09)
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return '*';
      if (origin.startsWith('chrome-extension://')) return origin;
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) return origin;
      return origin;
    },
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: ['Authorization', 'X-Client-Version', 'Content-Type'],
  })
);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'domain-pulse-gateway', time: new Date().toISOString() });
});

// Cache purge endpoint
app.post('/v1/cache/clear', (c) => {
  auditCache.clear();
  return c.json({ success: true, message: 'Audit cache cleared' });
});

// FR-06: Single Entrypoint GET /v1/audit?domain={domain}
app.get('/v1/audit', async (c) => {
  const startTime = Date.now();
  const rawDomain = c.req.query('domain');

  if (!rawDomain) {
    return c.json({ error: 'Missing required query parameter "domain"' }, 400);
  }

  // Rate Limiting (FR-09: 30 req/min)
  const clientIp =
    c.req.header('x-forwarded-for')?.split(',')[0].trim() ||
    c.req.header('cf-connecting-ip') ||
    'anonymous-client';

  const rateCheck = isRateLimited(clientIp);
  c.header('X-RateLimit-Limit', '30');
  c.header('X-RateLimit-Remaining', String(rateCheck.remaining));
  c.header('X-RateLimit-Reset', String(rateCheck.resetInSec));

  if (rateCheck.limited) {
    return c.json(
      {
        error: 'Too Many Requests',
        message: `Has superado el límite de 30 consultas por minuto. Espera ${rateCheck.resetInSec} segundos.`,
      },
      429
    );
  }

  // Clean and extract apex domain using Public Suffix List
  let cleanInput = rawDomain.trim().toLowerCase();
  cleanInput = cleanInput.replace(/^[a-z]+:\/\//, '');
  cleanInput = cleanInput.replace(/\/.*$/, '');
  cleanInput = cleanInput.replace(/:[0-9]+$/, '');

  const parsed = parse(cleanInput);
  const targetDomain = parsed.domain || cleanInput;

  if (!targetDomain || !targetDomain.includes('.')) {
    return c.json({ error: 'Invalid domain name format provided.' }, 400);
  }

  // Check 2-hour Cache (FR-08)
  const cachedResult = auditCache.get(targetDomain);
  if (cachedResult) {
    c.header('X-Cache-Status', 'HIT');
    return c.json({
      ...cachedResult,
      cached: true,
      latency_ms: Date.now() - startTime,
    });
  }

  c.header('X-Cache-Status', 'MISS');

  try {
    // Parallel Fan-out:
    // 1. DoH queries (A, AAAA, MX, TXT, DMARC, MTA-STS, BIMI, NS, DS, CAA)
    // 2. TLS handshake on port 443 with SAN extraction
    // 3. HTTP & Tech Stack probe (Security Headers, Tech Stack, HTTP->HTTPS redirect)
    const [dnsResult, tlsResult, httpProbeResult] = await Promise.all([
      fetchAllDnsRecords(targetDomain),
      inspectTls(targetDomain),
      probeHttpAndTech(targetDomain),
    ]);

    // Discover real subdomains (Passive DNS OSINT + TLS SANs + DoH verification)
    const [rdapResult, subdomainsResult] = await Promise.all([
      fetchRdapInfo(targetDomain, dnsResult.nameservers),
      discoverRealSubdomains(targetDomain, tlsResult.san_domains),
    ]);

    // Merge SSL info with HSTS check
    const ssl = {
      issuer: tlsResult.issuer,
      valid_from: tlsResult.valid_from,
      valid_to: tlsResult.valid_to,
      days_remaining: tlsResult.days_remaining,
      tls_version: tlsResult.tls_version,
      hsts_enabled: httpProbeResult.hsts_enabled || tlsResult.hsts_enabled,
      is_valid: tlsResult.is_valid,
      error: tlsResult.error,
    };

    // Detected DNS / CDN Provider
    const detected_provider = detectDnsProvider(dnsResult.a_records, dnsResult.nameservers);

    // Email parsing (SPF with lookup count, DMARC, MTA-STS, BIMI)
    const spf = parseSpf(dnsResult.txt_records);
    const dmarc = parseDmarc(dnsResult.dmarc_txt_records, dnsResult.txt_records);
    const mta_sts = parseMtaSts(dnsResult.mta_sts_txt_records);
    const bimi = parseBimi(dnsResult.bimi_txt_records);
    const emailProvider = detectEmailProvider(dnsResult.mx_records);

    const email = {
      mx_records: dnsResult.mx_records,
      provider: emailProvider,
      spf,
      dmarc,
      mta_sts,
      bimi,
    };

    const dns = {
      a_records: dnsResult.a_records,
      aaaa_records: dnsResult.aaaa_records,
      detected_provider,
      has_ipv6: dnsResult.aaaa_records.length > 0,
      nameservers: dnsResult.nameservers,
      dnssec: {
        enabled: dnsResult.dnssec_ds_records.length > 0 || dnsResult.dnssec_ad_flag,
        ds_records: dnsResult.dnssec_ds_records,
      },
      caa: {
        configured: dnsResult.caa_records.length > 0,
        records: dnsResult.caa_records,
      },
    };

    const registration = {
      ...rdapResult,
      nameservers: rdapResult.nameservers.length > 0 ? rdapResult.nameservers : dnsResult.nameservers,
    };

    // Calculate Domain Health Score
    const scoreResult = calculateHealthScore(
      registration,
      dns,
      ssl,
      email,
      httpProbeResult.security_headers
    );

    const auditResponse: AuditResponse = {
      domain: targetDomain,
      score: scoreResult.score,
      timestamp: new Date().toISOString(),
      registration,
      dns,
      ssl,
      email,
      security_headers: httpProbeResult.security_headers,
      tech_stack: httpProbeResult.tech_stack,
      subdomains: subdomainsResult,
      warnings: scoreResult.warnings,
      score_breakdown: {
        grade: scoreResult.grade,
        penalties: scoreResult.penalties,
      },
      cached: false,
      latency_ms: Date.now() - startTime,
    };

    // Store in 2-hour cache
    auditCache.set(targetDomain, auditResponse);

    return c.json(auditResponse);
  } catch (err: any) {
    console.error('Audit execution error:', err);
    return c.json(
      {
        error: 'Audit execution failed',
        message: err?.message || 'Error inesperado durante la auditoría del dominio.',
      },
      500
    );
  }
});

const PORT = Number(process.env.PORT) || 3000;

console.log(`⚡ Domain Pulse API Gateway running at http://localhost:${PORT}`);
serve({
  fetch: app.fetch,
  port: PORT,
});
