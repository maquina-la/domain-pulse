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

export const app = new Hono();

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
    allowMethods: ['GET', 'POST', 'OPTIONS'],
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
    // Parallel Execution of Core Audits (DNS, RDAP, TLS, HTTP/Tech)
    const [dnsResult, rdapResult, tlsResult, httpProbeResult] = await Promise.all([
      fetchAllDnsRecords(targetDomain),
      fetchRdapInfo(targetDomain),
      inspectTls(targetDomain),
      probeHttpAndTech(targetDomain),
    ]);

    // Discover real subdomains
    const subdomainsResult = await discoverRealSubdomains(targetDomain, tlsResult.san_domains);

    // Parse security records & providers
    const dnsProvider = detectDnsProvider(dnsResult.records.NS);
    const emailProvider = detectEmailProvider(dnsResult.records.MX);
    const spf = parseSpf(dnsResult.records.TXT);
    const dmarc = parseDmarc(dnsResult.records.DMARC);
    const mta_sts = parseMtaSts(dnsResult.records.MTA_STS);
    const bimi = parseBimi(dnsResult.records.BIMI);

    // Compute Health Score & Security Warnings
    const scoreResult = calculateHealthScore({
      dns: {
        records: dnsResult.records,
        dnssec: dnsResult.dnssec,
        provider: dnsProvider,
      },
      whois: rdapResult,
      ssl: tlsResult,
      email: {
        provider: emailProvider,
        spf,
        dmarc,
        mta_sts,
        bimi,
      },
      security_headers: httpProbeResult.security_headers,
    });

    // Assemble unified AuditResponse
    const auditResponse: AuditResponse = {
      domain: targetDomain,
      health_score: scoreResult.score,
      overall_status: scoreResult.status,
      timestamp: new Date().toISOString(),
      dns: {
        records: dnsResult.records,
        dnssec: dnsResult.dnssec,
        provider: dnsProvider,
      },
      whois: rdapResult,
      ssl: tlsResult,
      email: {
        provider: emailProvider,
        spf,
        dmarc,
        mta_sts,
        bimi,
      },
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
