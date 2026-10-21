import { fetchAllDnsRecords } from './services/doh.js';
import { inspectTls } from './services/tls.js';
import { checkHsts } from './services/hsts.js';
import { fetchRdapInfo } from './services/rdap.js';
import { detectDnsProvider, detectEmailProvider, parseSpf, parseDmarc } from './services/providers.js';
import { calculateHealthScore } from '@domain-pulse/shared';

async function run() {
  const testDomain = 'github.com';
  console.log(`Auditing ${testDomain}...`);

  const [dns, tls, hsts] = await Promise.all([
    fetchAllDnsRecords(testDomain),
    inspectTls(testDomain),
    checkHsts(testDomain),
  ]);

  const rdap = await fetchRdapInfo(testDomain, dns.nameservers);
  const provider = detectDnsProvider(dns.a_records, dns.nameservers);
  const emailProv = detectEmailProvider(dns.mx_records);
  const spf = parseSpf(dns.txt_records);
  const dmarc = parseDmarc(dns.dmarc_txt_records, dns.txt_records);

  const regInfo = { ...rdap };
  const dnsInfo = {
    a_records: dns.a_records,
    aaaa_records: dns.aaaa_records,
    detected_provider: provider,
    has_ipv6: dns.aaaa_records.length > 0,
    nameservers: dns.nameservers,
  };
  const sslInfo = {
    ...tls,
    hsts_enabled: hsts,
  };
  const emailInfo = {
    mx_records: dns.mx_records,
    provider: emailProv,
    spf,
    dmarc,
  };

  const score = calculateHealthScore(regInfo, dnsInfo, sslInfo, emailInfo);

  console.log('Result for', testDomain, ':');
  console.log('Health Score:', score.score, score.grade);
  console.log('DNS Provider:', provider);
  console.log('Email Provider:', emailProv);
  console.log('SSL Issuer:', sslInfo.issuer, 'TLS:', sslInfo.tls_version, 'Days remaining:', sslInfo.days_remaining);
  console.log('Penalties:', score.penalties);
  console.log('Warnings count:', score.warnings.length);
}

run().catch(console.error);
