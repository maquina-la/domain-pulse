import React, { useState } from 'react';
import { DnsInfo } from '@domain-pulse/shared';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Globe, CheckCircle2, XCircle, Copy, Check } from 'lucide-react';

interface DnsCardProps {
  dns: DnsInfo;
}

export const DnsCard: React.FC<DnsCardProps> = ({ dns }) => {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 1500);
  };

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <span>Infraestructura DNS</span>
          </CardTitle>
          <Badge variant="outline" className="font-semibold text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            {dns.detected_provider}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* IPv6 status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Soporte IPv6 (AAAA):</span>
          {dns.has_ipv6 ? (
            <Badge variant="success" className="text-[10px]">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Habilitado
            </Badge>
          ) : (
            <Badge variant="danger" className="text-[10px]">
              <XCircle className="mr-1 h-3 w-3" />
              Sin registros AAAA
            </Badge>
          )}
        </div>

        {/* A records (IPv4) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Registros A (IPv4):</span>
            <span className="font-mono text-[10px]">{dns.a_records.length} IP(s)</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {dns.a_records.length > 0 ? (
              dns.a_records.map((ip, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(ip)}
                  title="Clic para copiar IP"
                  className="group flex items-center gap-1 rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground transition-colors hover:bg-muted/80"
                >
                  <span>{ip}</span>
                  {copiedIp === ip ? (
                    <Check className="h-2.5 w-2.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100" />
                  )}
                </button>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No se detectaron registros A</span>
            )}
          </div>
        </div>

        {/* AAAA records (IPv6) */}
        {dns.aaaa_records.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Registros AAAA (IPv6):</span>
              <span className="font-mono text-[10px]">{dns.aaaa_records.length} IP(s)</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {dns.aaaa_records.map((ip, idx) => (
                <span
                  key={idx}
                  className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground truncate max-w-full"
                  title={ip}
                >
                  {ip}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
