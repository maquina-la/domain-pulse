import { SubdomainItem } from '@domain-pulse/shared';
import { queryDoh } from './doh.js';

const HIGH_VALUE_PREFIXES = [
  'admin',
  'api',
  'app',
  'auth',
  'blog',
  'cdn',
  'dashboard',
  'dev',
  'docs',
  'mail',
  'portal',
  'staging',
  'status',
  'vpn',
  'www',
];

export async function discoverRealSubdomains(
  domain: string,
  sanDomains: string[] = []
): Promise<SubdomainItem[]> {
  const subdomainsMap = new Map<string, SubdomainItem>();

  // 1. Passive DNS / Certificate OSINT via HackerTarget
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://api.hackertarget.com/hostsearch/?q=${encodeURIComponent(domain)}`, {
      headers: {
        'User-Agent': 'DomainPulse/1.0',
        Accept: 'text/plain',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const text = await res.text();
      if (!text.includes('error') && !text.includes('API count exceeded') && !text.includes('No records')) {
        const lines = text.trim().split('\n');
        for (const line of lines) {
          const parts = line.split(',');
          const host = (parts[0] || '').toLowerCase().trim();
          const ip = (parts[1] || '').trim();

          if (host && host.endsWith(`.${domain}`) && host !== domain) {
            subdomainsMap.set(host, {
              subdomain: host,
              active: !!ip,
              ip: ip || null,
            });
          }
        }
      }
    }
  } catch {
    // Fail silently, fallback to SANs & DoH probes
  }

  // 2. Ingest SANs from TLS certificate
  for (const san of sanDomains) {
    const cleanSan = san.toLowerCase().trim();
    if (cleanSan.endsWith(`.${domain}`) && cleanSan !== domain && !cleanSan.includes('*')) {
      if (!subdomainsMap.has(cleanSan)) {
        subdomainsMap.set(cleanSan, {
          subdomain: cleanSan,
          active: false, // will resolve below
        });
      }
    }
  }

  // 3. Ingest High-Value Prefixes (e.g. admin, api, app, etc.)
  for (const prefix of HIGH_VALUE_PREFIXES) {
    const full = `${prefix}.${domain}`;
    if (!subdomainsMap.has(full)) {
      subdomainsMap.set(full, {
        subdomain: full,
        active: false,
      });
    }
  }

  // 4. Resolve IPs for subdomains that do not have an IP yet
  // Limit parallel resolution to 25 items to avoid excessive latency
  const toResolve = Array.from(subdomainsMap.values())
    .filter((s) => !s.ip)
    .slice(0, 25);

  await Promise.all(
    toResolve.map(async (item) => {
      try {
        const answers = await queryDoh(item.subdomain, 'A');
        const aRec = answers.find((ans) => ans.type === 1);
        const cnameRec = answers.find((ans) => ans.type === 5);

        if (aRec) {
          item.active = true;
          item.ip = aRec.data.trim();
          if (cnameRec) {
            item.cname = cnameRec.data.replace(/\.$/, '');
          }
        } else if (cnameRec) {
          item.active = true;
          item.cname = cnameRec.data.replace(/\.$/, '');
        }
      } catch {
        // Leave active = false
      }
    })
  );

  // Return sorted: active subdomains first, then alphabetically
  const results = Array.from(subdomainsMap.values());
  results.sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.subdomain.localeCompare(b.subdomain);
  });

  // Limit to top 40 discovered subdomains
  return results.slice(0, 40);
}
