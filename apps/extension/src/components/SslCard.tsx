import React from 'react';
import { SslInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Lock, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface SslCardProps {
  ssl: SslInfo;
}

export const SslCard: React.FC<SslCardProps> = ({ ssl }) => {
  const isExpiringCritical = ssl.days_remaining !== null && ssl.days_remaining < 14;
  const isExpiringSoon = ssl.days_remaining !== null && ssl.days_remaining < 45;

  return (
    <div className="space-y-1.5">
      {/* macOS Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#ff9500]/15 text-[#ff9500]">
            <Lock className="h-2.5 w-2.5" />
          </span>
          Seguridad SSL / TLS
        </span>
        {ssl.is_valid ? (
          <Badge variant="success" className="text-[10px] py-0">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {ssl.tls_version || 'TLS Válido'}
          </Badge>
        ) : (
          <Badge variant="danger" className="text-[10px] py-0">
            <ShieldAlert className="mr-1 h-3 w-3" />
            Certificado Inválido
          </Badge>
        )}
      </div>

      {/* macOS Inset Grouped Container */}
      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* Row: Authority */}
        <div className="flex items-center justify-between p-2.5">
          <span className="text-muted-foreground">Emisor (CA)</span>
          <span className="font-medium text-foreground truncate max-w-[180px]" title={ssl.issuer || ''}>
            {ssl.issuer || 'Desconocido'}
          </span>
        </div>

        {/* Row: Remaining Days */}
        <div className="flex items-center justify-between p-2.5">
          <span className="text-muted-foreground">Vigencia Restante</span>
          <span
            className={`font-semibold ${
              !ssl.is_valid
                ? 'text-[#ff3b30]'
                : isExpiringCritical
                ? 'text-[#ff3b30] font-bold'
                : isExpiringSoon
                ? 'text-[#ff9500]'
                : 'text-[#34c759]'
            }`}
          >
            {ssl.days_remaining !== null
              ? `${ssl.days_remaining} días restantes`
              : ssl.is_valid
              ? 'Válido'
              : 'Inválido'}
          </span>
        </div>

        {/* Error notice if invalid */}
        {ssl.error && (
          <div className="p-2.5 bg-[#ff3b30]/10 text-[11px] text-[#ff3b30] dark:text-[#ff453a]">
            {ssl.error}
          </div>
        )}

        {/* Row: HSTS */}
        <div className="flex items-center justify-between p-2.5">
          <span className="text-muted-foreground">Cabecera HSTS</span>
          {ssl.hsts_enabled ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Strict-Transport-Security Activo
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px] py-0">
              <XCircle className="mr-1 h-3 w-3" />
              No detectada
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
