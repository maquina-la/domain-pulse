import { fetchAllDnsRecords, reconSubdomains } from './services/doh.js';
import { inspectTls } from './services/tls.js';
import { probeHttpAndTech } from './services/http-probe.js';
import { fetchRdapInfo } from './services/rdap.js';
import { detectDnsProvider, detectEmailProvider, parseSpf, parseDmarc, parseMtaSts, parseBimi } from './services/providers.js';
import { calculateHealthScore } from '@domain-pulse/shared';

async function run() {
  const testDomain = 'github.com';
  console.log(`Auditing ${testDomain}...`);

  const [dns, subdomains, tls, httpProbe] = await Promise.all([
    fetchAllDnsRecords(testDomain),
    reconSubdomains(testDomain),
    inspectTls(testDomain),
    probeHttpAndTech(testDomain),
  ]);

  const rdap = await fetchRdapInfo(testDomain, dns.nameservers);
  const provider = detectDnsProvider(dns.a_records, dns.nameservers);
  const emailProv = detectEmailProvider(dns.mx_records);
  const spf = parseSpf(dns.txt_records);
  const dmarc = parseDmarc(dns.dmarc_txt_records, dns.txt_records);
  const mta_sts = parseMtaSts(dns.mta_sts_txt_records);
  const bimi = parseBimi(dns.bimi_txt_records);

  const regInfo = { ...rdap };
  const dnsInfo = {
    a_records: dns.a_records,
    aaaa_records: dns.aaaa_records,
    detected_provider: provider,
    has_ipv6: dns.aaaa_records.length > 0,
    nameservers: dns.nameservers,
    dnssec: {
      enabled: dns.dnssec_ds_records.length > 0 || dns.dnssec_ad_flag,
      ds_records: dns.dnssec_ds_records,
    },
    caa: {
      configured: dns.caa_records.length > 0,
      records: dns.caa_records,
    },
  };
  const sslInfo = {
    ...tls,
    hsts_enabled: httpProbe.hsts_enabled,
  };
  const emailInfo = {
    mx_records: dns.mx_records,
    provider: emailProv,
    spf,
    dmarc,
    mta_sts,
    bimi,
  };

  const score = calculateHealthScore(regInfo, dnsInfo, sslInfo, emailInfo, httpProbe.security_headers);

  console.log('Result for', testDomain, ':');
  console.log('Health Score:', score.score, score.grade);
  console.log('DNSSEC enabled:', dnsInfo.dnssec.enabled);
  console.log('CAA configured:', dnsInfo.caa.configured);
  console.log('Tech Stack detected:', httpProbe.tech_stack.detected);
  console.log('Active Subdomains:', subdomains.filter(s => s.active).map(s => s.subdomain));
  console.log('Security Headers score:', httpProbe.security_headers.score_percentage + '%');
}

run().catch(console.error);
