export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface WarningItem {
  code: string;
  severity: Severity;
  message: string;
  category: 'registration' | 'dns' | 'ssl' | 'email';
}

export interface RegistrationInfo {
  registrar: string | null;
  created_at: string | null;
  expires_at: string | null;
  days_until_expiration: number | null;
  status: string | null;
  nameservers: string[];
}

export interface DnsInfo {
  a_records: string[];
  aaaa_records: string[];
  detected_provider: string;
  has_ipv6: boolean;
  nameservers?: string[];
  cname_records?: string[];
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
}

export interface DmarcPolicy {
  configured: boolean;
  raw: string | null;
  policy: 'reject' | 'quarantine' | 'none' | null;
}

export interface EmailInfo {
  mx_records: MxRecord[];
  provider: string;
  spf: SpfInfo;
  dmarc: DmarcPolicy;
}

export interface ScorePenalty {
  code: string;
  label: string;
  deduction: number;
  category: 'registration' | 'dns' | 'ssl' | 'email';
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
  warnings: WarningItem[];
  score_breakdown?: {
    grade: 'optimal' | 'warning' | 'critical';
    penalties: ScorePenalty[];
  };
  cached?: boolean;
  latency_ms?: number;
}
