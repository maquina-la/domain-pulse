import { SpfInfo, DmarcPolicy, MxRecord, MtaStsInfo, BimiInfo } from '@domain-pulse/shared';

export function detectDnsProvider(a_records: string[], nameservers: string[]): string {
  const nsString = nameservers.join(' ').toLowerCase();

  // Check nameservers first
  if (nsString.includes('cloudflare.com')) return 'Cloudflare';
  if (nsString.includes('awsdns') || nsString.includes('amazon') || nsString.includes('route53')) return 'AWS Route 53';
  if (nsString.includes('google') || nsString.includes('googledomains')) return 'Google Cloud DNS';
  if (nsString.includes('azure') || nsString.includes('microsoft')) return 'Microsoft Azure';
  if (nsString.includes('digitalocean.com')) return 'DigitalOcean';
  if (nsString.includes('vercel-dns.com')) return 'Vercel';
  if (nsString.includes('nsone.net')) return 'NS1';
  if (nsString.includes('dnsimple.com')) return 'DNSimple';
  if (nsString.includes('namecheap.com')) return 'Namecheap';
  if (nsString.includes('godaddy.com') || nsString.includes('domaincontrol.com')) return 'GoDaddy';
  if (nsString.includes('ovh.net') || nsString.includes('ovh.com')) return 'OVHcloud';
  if (nsString.includes('linode.com') || nsString.includes('akamai')) return 'Akamai / Linode';

  // Check IP ranges / patterns
  for (const ip of a_records) {
    if (ip.startsWith('104.16.') || ip.startsWith('104.17.') || ip.startsWith('104.18.') ||
        ip.startsWith('104.19.') || ip.startsWith('104.20.') || ip.startsWith('104.21.') ||
        ip.startsWith('172.67.') || ip.startsWith('172.64.')) {
      return 'Cloudflare';
    }
    if (ip === '76.76.21.21') return 'Vercel';
    if (ip.startsWith('185.199.')) return 'GitHub Pages';
    if (ip.startsWith('151.101.')) return 'Fastly';
    if (ip.startsWith('199.60.103.') || ip.startsWith('198.49.23.')) return 'Squarespace';
    if (ip.startsWith('35.') || ip.startsWith('34.')) return 'Google Cloud';
    if (ip.startsWith('52.') || ip.startsWith('54.') || ip.startsWith('13.') || ip.startsWith('18.')) return 'AWS Cloud';
    if (ip.startsWith('157.245.') || ip.startsWith('167.99.') || ip.startsWith('138.68.')) return 'DigitalOcean';
    if (ip.startsWith('75.2.60.') || ip.startsWith('99.83.231.')) return 'Netlify';
  }

  if (nameservers.length > 0) {
    const firstNs = nameservers[0];
    const match = firstNs.match(/([a-z0-9-]+\.[a-z]+)$/i);
    if (match) return match[1];
  }

  return 'Hosting Independiente';
}

export function detectEmailProvider(mxRecords: MxRecord[]): string {
  if (mxRecords.length === 0) return 'Sin correo configurado';

  const hosts = mxRecords.map((r) => r.host.toLowerCase()).join(' ');

  if (hosts.includes('google') || hosts.includes('aspmx') || hosts.includes('googlemail')) {
    return 'Google Workspace';
  }
  if (hosts.includes('outlook.com') || hosts.includes('protection.outlook.com') || hosts.includes('office365')) {
    return 'Microsoft 365';
  }
  if (hosts.includes('protonmail') || hosts.includes('proton.me')) {
    return 'Proton Mail';
  }
  if (hosts.includes('messagingengine.com') || hosts.includes('fastmail.com')) {
    return 'Fastmail';
  }
  if (hosts.includes('zoho.com') || hosts.includes('zoho.eu')) {
    return 'Zoho Mail';
  }
  if (hosts.includes('mail.me.com') || hosts.includes('icloud.com')) {
    return 'iCloud Mail';
  }
  if (hosts.includes('mailgun.org')) {
    return 'Mailgun';
  }
  if (hosts.includes('sendgrid.net')) {
    return 'SendGrid';
  }
  if (hosts.includes('pphosted.com')) {
    return 'Proofpoint';
  }
  if (hosts.includes('mimecast.com')) {
    return 'Mimecast';
  }
  if (hosts.includes('barracudanetworks.com')) {
    return 'Barracuda';
  }

  const primary = mxRecords[0].host;
  return `Servidor Propio (${primary})`;
}

export function parseSpf(txtRecords: string[]): SpfInfo {
  const spfRecord = txtRecords.find((txt) => txt.toLowerCase().startsWith('v=spf1'));
  if (!spfRecord) {
    return {
      configured: false,
      raw: null,
      strictness: null,
      lookup_count: 0,
      lookup_limit_exceeded: false,
    };
  }

  const lower = spfRecord.toLowerCase();
  let strictness: 'hardfail' | 'softfail' | 'neutral' | 'none' = 'none';

  if (lower.includes('-all')) {
    strictness = 'hardfail';
  } else if (lower.includes('~all')) {
    strictness = 'softfail';
  } else if (lower.includes('?all')) {
    strictness = 'neutral';
  } else if (lower.includes('+all')) {
    strictness = 'none';
  }

  // Count DNS lookups according to RFC 7208:
  // include:, a, a:, mx, mx:, ptr, exists:, redirect=
  let lookup_count = 0;
  const tokens = spfRecord.split(/\s+/);
  for (const token of tokens) {
    const t = token.toLowerCase();
    if (
      t.startsWith('include:') ||
      t.startsWith('a:') ||
      t === 'a' ||
      t.startsWith('mx:') ||
      t === 'mx' ||
      t.startsWith('ptr') ||
      t.startsWith('exists:') ||
      t.startsWith('redirect=')
    ) {
      lookup_count += 1;
    }
  }

  return {
    configured: true,
    raw: spfRecord,
    strictness,
    lookup_count,
    lookup_limit_exceeded: lookup_count > 10,
  };
}

export function parseDmarc(dmarcTxtRecords: string[], rootTxtRecords: string[]): DmarcPolicy {
  let dmarcRecord = dmarcTxtRecords.find((txt) => txt.toUpperCase().startsWith('V=DMARC1'));

  if (!dmarcRecord) {
    dmarcRecord = rootTxtRecords.find((txt) => txt.toUpperCase().startsWith('V=DMARC1'));
  }

  if (!dmarcRecord) {
    return {
      configured: false,
      raw: null,
      policy: null,
    };
  }

  const policyMatch = dmarcRecord.match(/p=([a-z0-9_-]+)/i);
  let policy: 'reject' | 'quarantine' | 'none' | null = null;

  if (policyMatch) {
    const val = policyMatch[1].toLowerCase();
    if (val === 'reject') policy = 'reject';
    else if (val === 'quarantine') policy = 'quarantine';
    else if (val === 'none') policy = 'none';
  }

  return {
    configured: true,
    raw: dmarcRecord,
    policy,
  };
}

export function parseMtaSts(mtaStsTxtRecords: string[]): MtaStsInfo {
  const rec = mtaStsTxtRecords.find((txt) => txt.toLowerCase().startsWith('v=stsv1'));
  if (!rec) {
    return {
      configured: false,
      raw: null,
      mode: null,
    };
  }

  const modeMatch = rec.match(/mode=([a-z]+)/i);
  let mode: 'enforce' | 'testing' | 'none' | null = null;
  if (modeMatch) {
    const val = modeMatch[1].toLowerCase();
    if (val === 'enforce') mode = 'enforce';
    else if (val === 'testing') mode = 'testing';
    else if (val === 'none') mode = 'none';
  }

  return {
    configured: true,
    raw: rec,
    mode,
  };
}

export function parseBimi(bimiTxtRecords: string[]): BimiInfo {
  const rec = bimiTxtRecords.find((txt) => txt.toLowerCase().startsWith('v=bimi1'));
  if (!rec) {
    return {
      configured: false,
      raw: null,
    };
  }

  return {
    configured: true,
    raw: rec,
  };
}
