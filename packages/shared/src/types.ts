export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface WarningItem {
  code: string;
  severity: Severity;
  message: string;
  category: 'registration' | 'dns' | 'ssl' | 'email' | 'security' | 'tech';
}

export interface RegistrationInfo {
  registrar: string | null;
  created_at: string | null;
  expires_at: string | null;
  days_until_expiration: number | null;
  status: string | null;
  nameservers: string[];
}

export interface DnssecInfo {
  enabled: boolean;
  ds_records: string[];
}

export interface CaaInfo {
  configured: boolean;
  records: string[];
}

export interface DnsInfo {
  a_records: string[];
  aaaa_records: string[];
  detected_provider: string;
  has_ipv6: boolean;
  nameservers?: string[];
  cname_records?: string[];
  dnssec: DnssecInfo;
  caa: CaaInfo;
}

export interface SslInfo {
  issuer: string | null;
  valid_from: string | null;
  valid_to: string | null;
  days_remaining: number | null;
  tls_version: string | null;
  hsts_enabled: boolean;
  is_valid: boolean;
  error?: string | null;
}

export interface MxRecord {
  priority: number;
  host: string;
}

export interface SpfInfo {
  configured: boolean;
  raw: string | null;
  strictness: 'hardfail' | 'softfail' | 'neutral' | 'none' | null;
  lookup_count: number;
  lookup_limit_exceeded: boolean;
}

export interface DmarcPolicy {
  configured: boolean;
  raw: string | null;
  policy: 'reject' | 'quarantine' | 'none' | null;
}

export interface MtaStsInfo {
  configured: boolean;
  raw: string | null;
  mode?: 'enforce' | 'testing' | 'none' | null;
}

export interface BimiInfo {
  configured: boolean;
  raw: string | null;
}

export interface EmailInfo {
  mx_records: MxRecord[];
  provider: string;
  spf: SpfInfo;
  dmarc: DmarcPolicy;
  mta_sts: MtaStsInfo;
  bimi: BimiInfo;
}

export interface SecurityHeadersInfo {
  hsts: boolean;
  csp: boolean;
  x_frame_options: boolean;
  x_content_type_options: boolean;
  referrer_policy: boolean;
  permissions_policy: boolean;
  http_redirects_to_https: boolean;
  score_percentage: number;
}

export interface TechStackInfo {
  server: string | null;
  framework: string | null;
  cms: string | null;
  ui: string | null;
  analytics: string[];
  cdn: string | null;
  detected: string[];
}

export interface SubdomainItem {
  subdomain: string;
  active: boolean;
  ip?: string | null;
  cname?: string | null;
}

export interface ScorePenalty {
  code: string;
  label: string;
  deduction: number;
  category: 'registration' | 'dns' | 'ssl' | 'email' | 'security' | 'tech';
}

export interface HealthScoreResult {
  score: number;
  grade: 'optimal' | 'warning' | 'critical';
  penalties: ScorePenalty[];
  warnings: WarningItem[];
}

export interface AuditResponse {
  domain: string;
  score: number;
  timestamp: string;
  registration: RegistrationInfo;
  dns: DnsInfo;
  ssl: SslInfo;
  email: EmailInfo;
  security_headers: SecurityHeadersInfo;
  tech_stack: TechStackInfo;
  subdomains: SubdomainItem[];
  warnings: WarningItem[];
  score_breakdown?: {
    grade: 'optimal' | 'warning' | 'critical';
    penalties: ScorePenalty[];
  };
  cached?: boolean;
  latency_ms?: number;
}
