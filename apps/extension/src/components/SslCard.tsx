import React from 'react';
import { SslInfo } from '@domain-pulse/shared';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface SslCardProps {
  ssl: SslInfo;
}

export const SslCard: React.FC<SslCardProps> = ({ ssl }) => {
  const isExpiringCritical = ssl.days_remaining !== null && ssl.days_remaining < 14;
  const isExpiringSoon = ssl.days_remaining !== null && ssl.days_remaining < 45;

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <Lock className="h-3.5 w-3.5" />
            </div>
            <span>Seguridad SSL / TLS</span>
          </CardTitle>
          {ssl.is_valid ? (
            <Badge variant="success" className="text-[10px]">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {ssl.tls_version || 'TLS Válido'}
            </Badge>
          ) : (
            <Badge variant="danger" className="text-[10px]">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Inválido
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Certificate Issuer */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Autoridad Emisora:</span>
          <span className="font-semibold text-foreground truncate max-w-[190px]" title={ssl.issuer || ''}>
            {ssl.issuer || 'Desconocido'}
          </span>
        </div>

        {/* Days remaining badge */}
        <div className="rounded-lg bg-muted/40 p-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Vigencia del Certificado:</span>
            <span
              className={`font-semibold ${
                !ssl.is_valid
                  ? 'text-rose-500'
                  : isExpiringCritical
                  ? 'text-rose-500 font-bold'
                  : isExpiringSoon
                  ? 'text-amber-500'
                  : 'text-emerald-500'
              }`}
            >
              {ssl.days_remaining !== null
                ? `${ssl.days_remaining} días restantes`
                : ssl.is_valid
                ? 'Válido'
                : 'Inválido'}
            </span>
          </div>
          {ssl.error && (
            <p className="mt-1 text-[11px] text-rose-500">{ssl.error}</p>
          )}
        </div>

        {/* HSTS Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Cabecera HSTS:</span>
          {ssl.hsts_enabled ? (
            <Badge variant="success" className="text-[10px]">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Habilitado
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px]">
              <XCircle className="mr-1 h-3 w-3" />
              No detectado
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
