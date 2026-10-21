import React, { useState } from 'react';
import { EmailInfo } from '@domain-pulse/shared';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Mail, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface EmailCardProps {
  email: EmailInfo;
}

export const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  const [showRaw, setShowRaw] = useState(false);

  const getSpfBadge = () => {
    if (!email.spf.configured) {
      return (
        <Badge variant="danger" className="text-[10px]">
          <XCircle className="mr-1 h-3 w-3" /> Sin SPF
        </Badge>
      );
    }
    if (email.spf.strictness === 'hardfail') {
      return (
        <Badge variant="success" className="text-[10px]">
          <CheckCircle2 className="mr-1 h-3 w-3" /> SPF Estricto (-all)
        </Badge>
      );
    }
    if (email.spf.strictness === 'softfail') {
      return (
        <Badge variant="warning" className="text-[10px]">
          <AlertTriangle className="mr-1 h-3 w-3" /> SPF Suave (~all)
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="text-[10px]">
        {email.spf.strictness || 'Configurado'}
      </Badge>
    );
  };

  const getDmarcBadge = () => {
    if (!email.dmarc.configured || !email.dmarc.policy) {
      return (
        <Badge variant="danger" className="text-[10px]">
          <XCircle className="mr-1 h-3 w-3" /> Sin DMARC
        </Badge>
      );
    }
    if (email.dmarc.policy === 'reject') {
      return (
        <Badge variant="success" className="text-[10px]">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Reject (Máx. Seguridad)
        </Badge>
      );
    }
    if (email.dmarc.policy === 'quarantine') {
      return (
        <Badge variant="success" className="text-[10px]">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Quarantine
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="text-[10px]">
        <AlertTriangle className="mr-1 h-3 w-3" /> None (Permisivo)
      </Badge>
    );
  };

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <Mail className="h-3.5 w-3.5" />
            </div>
            <span>Email Deliverability</span>
          </CardTitle>
          <Badge variant="outline" className="font-semibold text-xs border-purple-500/30 text-purple-600 dark:text-purple-400">
            {email.provider}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* SPF */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Autenticación SPF:</span>
          {getSpfBadge()}
        </div>

        {/* DMARC */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Política DMARC:</span>
          {getDmarcBadge()}
        </div>

        {/* MX records summary */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Servidores de Correo (MX):</span>
            <span className="font-mono text-[10px]">{email.mx_records.length} host(s)</span>
          </div>
          {email.mx_records.length > 0 ? (
            <div className="space-y-1">
              {email.mx_records.slice(0, 3).map((mx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded bg-muted/50 px-2 py-1 text-xs"
                >
                  <span className="truncate font-mono text-muted-foreground text-[11px] max-w-[210px]">
                    {mx.host}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    prio {mx.priority}
                  </span>
                </div>
              ))}
              {email.mx_records.length > 3 && (
                <span className="text-[10px] text-muted-foreground">
                  +{email.mx_records.length - 3} servidores adicionales
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Sin registros MX configurados</span>
          )}
        </div>

        {/* Toggle raw TXT records */}
        {(email.spf.raw || email.dmarc.raw) && (
          <div className="border-t border-border/50 pt-2">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Ver registros TXT sin procesar</span>
              {showRaw ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {showRaw && (
              <div className="mt-2 space-y-1.5 font-mono text-[10px]">
                {email.spf.raw && (
                  <div className="rounded bg-muted p-2 break-all">
                    <span className="text-muted-foreground font-semibold">SPF: </span>
                    <span>{email.spf.raw}</span>
                  </div>
                )}
                {email.dmarc.raw && (
                  <div className="rounded bg-muted p-2 break-all">
                    <span className="text-muted-foreground font-semibold">DMARC: </span>
                    <span>{email.dmarc.raw}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
