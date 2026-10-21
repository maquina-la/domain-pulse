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

export interface DnsQueryResult {
  a_records: string[];
  aaaa_records: string[];
  mx_records: Array<{ priority: number; host: string }>;
  txt_records: string[];
  dmarc_txt_records: string[];
  nameservers: string[];
}

const CLOUDFLARE_DOH = 'https://cloudflare-dns.com/dns-query';

export async function queryDoh(name: string, type: 'A' | 'AAAA' | 'MX' | 'TXT' | 'NS'): Promise<DohAnswer[]> {
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
      return [];
    }

    const data = (await res.json()) as DohResponse;
    return data.Answer || [];
  } catch (err) {
    return [];
  }
}

export async function fetchAllDnsRecords(domain: string): Promise<DnsQueryResult> {
  const [aAnswers, aaaaAnswers, mxAnswers, txtAnswers, dmarcAnswers, nsAnswers] = await Promise.all([
    queryDoh(domain, 'A'),
    queryDoh(domain, 'AAAA'),
    queryDoh(domain, 'MX'),
    queryDoh(domain, 'TXT'),
    queryDoh(`_dmarc.${domain}`, 'TXT'),
    queryDoh(domain, 'NS'),
  ]);

  const a_records = aAnswers
    .filter((ans) => ans.type === 1) // Type 1: A
    .map((ans) => ans.data.trim());

  const aaaa_records = aaaaAnswers
    .filter((ans) => ans.type === 28) // Type 28: AAAA
    .map((ans) => ans.data.trim());

  const mx_records = mxAnswers
    .filter((ans) => ans.type === 15) // Type 15: MX
    .map((ans) => {
      // Data is usually "priority host" e.g. "10 aspmx.l.google.com."
      const parts = ans.data.trim().split(/\s+/);
      const priority = parseInt(parts[0], 10) || 10;
      const host = (parts[1] || '').replace(/\.$/, '');
      return { priority, host };
    })
    .sort((a, b) => a.priority - b.priority);

  const cleanTxt = (data: string) => {
    // Strip surrounding quotes
    return data.replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"').trim();
  };

  const txt_records = txtAnswers
    .filter((ans) => ans.type === 16) // Type 16: TXT
    .map((ans) => cleanTxt(ans.data));

  const dmarc_txt_records = dmarcAnswers
    .filter((ans) => ans.type === 16)
    .map((ans) => cleanTxt(ans.data));

  const nameservers = nsAnswers
    .filter((ans) => ans.type === 2) // Type 2: NS
    .map((ans) => ans.data.replace(/\.$/, '').toLowerCase().trim());

  return {
    a_records,
    aaaa_records,
    mx_records,
    txt_records,
    dmarc_txt_records,
    nameservers,
  };
}
