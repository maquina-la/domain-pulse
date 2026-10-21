import React, { useState } from 'react';
import { DnsInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Globe, CheckCircle2, XCircle, Copy, Check, ShieldCheck, FileCheck } from 'lucide-react';
import { useI18n } from '@/lib/I18nContext';

interface DnsCardProps {
  dns: DnsInfo;
}

export const DnsCard: React.FC<DnsCardProps> = ({ dns }) => {
  const { t } = useI18n();
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 1500);
  };

  return (
    <div className="space-y-1.5">
      {/* macOS Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#34c759]/15 text-[#34c759]">
            <Globe className="h-2.5 w-2.5" />
          </span>
          {t('dnsTitle')}
        </span>
        <Badge variant="outline" className="font-semibold text-[10px] py-0 px-2 text-[#007aff] dark:text-[#0a84ff] border-[#007aff]/30">
          {dns.detected_provider}
        </Badge>
      </div>

      {/* macOS Inset Grouped Container */}
      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* Row: DNSSEC */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{t('dnssec')}</span>
          </div>
          {dns.dnssec?.enabled ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {t('dnssecEnabled')}
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px] py-0">
              <XCircle className="mr-1 h-3 w-3" />
              {t('dnssecDisabled')}
            </Badge>
          )}
        </div>

        {/* Row: CAA Records */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <FileCheck className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{t('caa')}</span>
          </div>
          {dns.caa?.configured ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {t('caaConfigured', { count: dns.caa.records.length })}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
              {t('noCaa')}
            </Badge>
          )}
        </div>

        {/* Row: IPv6 Support */}
        <div className="flex items-center justify-between p-2.5">
          <span className="text-muted-foreground">{t('ipv6Support')}</span>
          {dns.has_ipv6 ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {t('available')}
            </Badge>
          ) : (
            <Badge variant="danger" className="text-[10px] py-0">
              <XCircle className="mr-1 h-3 w-3" />
              {t('noAaaa')}
            </Badge>
          )}
        </div>

        {/* Row: A Records */}
        <div className="p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{t('aRecords')}</span>
            <span className="font-mono text-[10px]">{t('hostsCount', { count: dns.a_records.length })}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {dns.a_records.length > 0 ? (
              dns.a_records.map((ip, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(ip)}
                  title={t('copyIp')}
                  className="group flex items-center gap-1.5 rounded-[5px] bg-muted/60 hover:bg-muted border border-border/50 px-2 py-0.5 font-mono text-[11px] text-foreground transition-all macos-button"
                >
                  <span>{ip}</span>
                  {copiedIp === ip ? (
                    <Check className="h-2.5 w-2.5 text-[#34c759]" />
                  ) : (
                    <Copy className="h-2.5 w-2.5 opacity-30 group-hover:opacity-80" />
                  )}
                </button>
              ))
            ) : (
              <span className="text-[11px] text-muted-foreground">{t('noARecords')}</span>
            )}
          </div>
        </div>

        {/* Row: AAAA Records */}
        {dns.aaaa_records.length > 0 && (
          <div className="p-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{t('aaaaRecords')}</span>
              <span className="font-mono text-[10px]">{t('hostsCount', { count: dns.aaaa_records.length })}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {dns.aaaa_records.map((ip, idx) => (
                <span
                  key={idx}
                  className="rounded-[5px] bg-muted/60 border border-border/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground truncate max-w-full"
                >
                  {ip}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
