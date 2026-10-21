export interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DohResponse {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: Array<{ name: string; type: number }>;
  Answer?: DohAnswer[];
  Authority?: DohAnswer[];
}

export interface SubdomainReconResult {
  subdomain: string;
  active: boolean;
  ip?: string | null;
  cname?: string | null;
}

export interface DnsQueryResult {
  a_records: string[];
  aaaa_records: string[];
  mx_records: Array<{ priority: number; host: string }>;
  txt_records: string[];
  dmarc_txt_records: string[];
  mta_sts_txt_records: string[];
  bimi_txt_records: string[];
  nameservers: string[];
  dnssec_ds_records: string[];
  dnssec_ad_flag: boolean;
  caa_records: string[];
}

const CLOUDFLARE_DOH = 'https://cloudflare-dns.com/dns-query';

export async function queryDohFull(name: string, type: string): Promise<{ answers: DohAnswer[]; adFlag: boolean }> {
  const url = `${CLOUDFLARE_DOH}?name=${encodeURIComponent(name)}&type=${type}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      headers: {
        accept: 'application/dns-json',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      return { answers: [], adFlag: false };
    }

    const data = (await res.json()) as DohResponse;
    return {
      answers: data.Answer || [],
      adFlag: !!data.AD,
    };
  } catch (err) {
    return { answers: [], adFlag: false };
  }
}

export async function queryDoh(name: string, type: string): Promise<DohAnswer[]> {
  const res = await queryDohFull(name, type);
  return res.answers;
}

const cleanTxt = (data: string) => {
  return data.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"').trim();
};

export async function fetchAllDnsRecords(domain: string): Promise<DnsQueryResult> {
  const [
    aRes,
    aaaaRes,
    mxRes,
    txtRes,
    dmarcRes,
    mtaStsRes,
    bimiRes,
    nsRes,
    dsFullRes,
    caaRes,
  ] = await Promise.all([
    queryDoh(domain, 'A'),
    queryDoh(domain, 'AAAA'),
    queryDoh(domain, 'MX'),
    queryDoh(domain, 'TXT'),
    queryDoh(`_dmarc.${domain}`, 'TXT'),
    queryDoh(`_mta-sts.${domain}`, 'TXT'),
    queryDoh(`default._bimi.${domain}`, 'TXT'),
    queryDoh(domain, 'NS'),
    queryDohFull(domain, 'DS'),
    queryDoh(domain, 'CAA'),
  ]);

  const a_records = aRes
    .filter((ans) => ans.type === 1)
    .map((ans) => ans.data.trim());

  const aaaa_records = aaaaRes
    .filter((ans) => ans.type === 28)
    .map((ans) => ans.data.trim());

  const mx_records = mxRes
    .filter((ans) => ans.type === 15)
    .map((ans) => {
      const parts = ans.data.trim().split(/\s+/);
      const priority = parseInt(parts[0], 10) || 10;
      const host = (parts[1] || '').replace(/\.$/, '');
      return { priority, host };
    })
    .sort((a, b) => a.priority - b.priority);

  const txt_records = txtRes
    .filter((ans) => ans.type === 16)
    .map((ans) => cleanTxt(ans.data));

  const dmarc_txt_records = dmarcRes
    .filter((ans) => ans.type === 16)
    .map((ans) => cleanTxt(ans.data));

  const mta_sts_txt_records = mtaStsRes
    .filter((ans) => ans.type === 16)
    .map((ans) => cleanTxt(ans.data));

  const bimi_txt_records = bimiRes
    .filter((ans) => ans.type === 16)
    .map((ans) => cleanTxt(ans.data));

  const nameservers = nsRes
    .filter((ans) => ans.type === 2)
    .map((ans) => ans.data.replace(/\.$/, '').toLowerCase().trim());

  const dnssec_ds_records = dsFullRes.answers
    .filter((ans) => ans.type === 43)
    .map((ans) => ans.data.trim());

  const caa_records = caaRes
    .filter((ans) => ans.type === 257)
    .map((ans) => cleanTxt(ans.data));

  return {
    a_records,
    aaaa_records,
    mx_records,
    txt_records,
    dmarc_txt_records,
    mta_sts_txt_records,
    bimi_txt_records,
    nameservers,
    dnssec_ds_records,
    dnssec_ad_flag: dsFullRes.adFlag,
    caa_records,
  };
}

// Subdomain Recon: checks common subdomains including 'admin'
export const RECON_PREFIXES = ['www', 'api', 'admin', 'app', 'mail', 'dev', 'staging', 'portal'];

export async function reconSubdomains(domain: string): Promise<SubdomainReconResult[]> {
  const checks = RECON_PREFIXES.map(async (prefix) => {
    const fullSub = `${prefix}.${domain}`;
    try {
      const answers = await queryDoh(fullSub, 'A');
      const aRec = answers.find((ans) => ans.type === 1);
      const cnameRec = answers.find((ans) => ans.type === 5);

      if (aRec) {
        return {
          subdomain: fullSub,
          active: true,
          ip: aRec.data.trim(),
          cname: cnameRec ? cnameRec.data.replace(/\.$/, '') : null,
        };
      } else if (cnameRec) {
        return {
          subdomain: fullSub,
          active: true,
          cname: cnameRec.data.replace(/\.$/, ''),
        };
      }
      return {
        subdomain: fullSub,
        active: false,
      };
    } catch {
      return {
        subdomain: fullSub,
        active: false,
      };
    }
  });

  return Promise.all(checks);
}
