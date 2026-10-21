import React, { useState } from 'react';
import { EmailInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Mail, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronRight, ShieldCheck, Image } from 'lucide-react';

interface EmailCardProps {
  email: EmailInfo;
}

export const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  const [showRaw, setShowRaw] = useState(false);

  const getSpfBadge = () => {
    if (!email.spf.configured) {
      return (
        <Badge variant="danger" className="text-[10px] py-0">
          <XCircle className="mr-1 h-3 w-3" /> Sin SPF
        </Badge>
      );
    }
    if (email.spf.lookup_limit_exceeded) {
      return (
        <Badge variant="danger" className="text-[10px] py-0">
          <AlertTriangle className="mr-1 h-3 w-3" /> &gt;10 Lookups (Fallo)
        </Badge>
      );
    }
    if (email.spf.strictness === 'hardfail') {
      return (
        <Badge variant="success" className="text-[10px] py-0">
          <CheckCircle2 className="mr-1 h-3 w-3" /> SPF Estricto (-all)
        </Badge>
      );
    }
    if (email.spf.strictness === 'softfail') {
      return (
        <Badge variant="warning" className="text-[10px] py-0">
          <AlertTriangle className="mr-1 h-3 w-3" /> SPF Suave (~all)
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="text-[10px] py-0">
        {email.spf.strictness || 'Configurado'}
      </Badge>
    );
  };

  const getDmarcBadge = () => {
    if (!email.dmarc.configured || !email.dmarc.policy) {
      return (
        <Badge variant="danger" className="text-[10px] py-0">
          <XCircle className="mr-1 h-3 w-3" /> Sin DMARC
        </Badge>
      );
    }
    if (email.dmarc.policy === 'reject') {
      return (
        <Badge variant="success" className="text-[10px] py-0">
          <CheckCircle2 className="mr-1 h-3 w-3" /> p=reject
        </Badge>
      );
    }
    if (email.dmarc.policy === 'quarantine') {
      return (
        <Badge variant="success" className="text-[10px] py-0">
          <CheckCircle2 className="mr-1 h-3 w-3" /> p=quarantine
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="text-[10px] py-0">
        <AlertTriangle className="mr-1 h-3 w-3" /> p=none (Permisivo)
      </Badge>
    );
  };

  return (
    <div className="space-y-1.5">
      {/* macOS Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#af52de]/15 text-[#af52de]">
            <Mail className="h-2.5 w-2.5" />
          </span>
          Email Deliverability & Autenticación
        </span>
        <Badge variant="outline" className="font-semibold text-[10px] py-0 px-2 text-[#af52de] dark:text-[#bf5af2] border-[#af52de]/30">
          {email.provider}
        </Badge>
      </div>

      {/* macOS Inset Grouped Container */}
      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* Row: SPF */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">Autenticación SPF</div>
            <div className="text-[10px] text-muted-foreground font-mono">
              {email.spf.configured ? `${email.spf.lookup_count}/10 consultas DNS usadas` : 'No configurado'}
            </div>
          </div>
          {getSpfBadge()}
        </div>

        {/* Row: DMARC */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">Política DMARC</div>
            <div className="text-[10px] text-muted-foreground">Protección de identidad y spoofing</div>
          </div>
          {getDmarcBadge()}
        </div>

        {/* Row: MTA-STS */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <div className="font-medium text-foreground">MTA-STS (RFC 8461)</div>
              <div className="text-[10px] text-muted-foreground">Cifrado TLS estricto en tránsito</div>
            </div>
          </div>
          {email.mta_sts?.configured ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {email.mta_sts.mode ? `mode=${email.mta_sts.mode}` : 'Activo'}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
              No configurado
            </Badge>
          )}
        </div>

        {/* Row: BIMI */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <Image className="h-3.5 w-3.5 text-muted-foreground" />
            <div>
              <div className="font-medium text-foreground">BIMI (Logo Verificado)</div>
              <div className="text-[10px] text-muted-foreground">Avatar oficial en bandejas de correo</div>
            </div>
          </div>
          {email.bimi?.configured ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Configurado
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
              No configurado
            </Badge>
          )}
        </div>

        {/* Row: MX Servers */}
        <div className="p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Servidores de Correo (MX)</span>
            <span className="font-mono text-[10px]">{email.mx_records.length} host(s)</span>
          </div>
          {email.mx_records.length > 0 ? (
            <div className="space-y-1">
              {email.mx_records.slice(0, 3).map((mx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-[5px] bg-muted/40 border border-border/40 px-2 py-1 text-[11px]"
                >
                  <span className="truncate font-mono text-foreground max-w-[200px]">
                    {mx.host}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    prio {mx.priority}
                  </span>
                </div>
              ))}
              {email.mx_records.length > 3 && (
                <span className="text-[10px] text-muted-foreground">
                  +{email.mx_records.length - 3} servidores más
                </span>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-muted-foreground">Sin registros MX configurados</span>
          )}
        </div>

        {/* Disclosure: Raw TXT records */}
        {(email.spf.raw || email.dmarc.raw || email.mta_sts?.raw) && (
          <div className="p-2.5 bg-muted/20">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showRaw ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              <span>Ver registros TXT brutos</span>
            </button>

            {showRaw && (
              <div className="mt-2 space-y-1.5 font-mono text-[10px]">
                {email.spf.raw && (
                  <div className="rounded-[5px] bg-card border border-border/60 p-2 break-all text-muted-foreground">
                    <strong className="text-foreground">SPF: </strong>
                    {email.spf.raw}
                  </div>
                )}
                {email.dmarc.raw && (
                  <div className="rounded-[5px] bg-card border border-border/60 p-2 break-all text-muted-foreground">
                    <strong className="text-foreground">DMARC: </strong>
                    {email.dmarc.raw}
                  </div>
                )}
                {email.mta_sts?.raw && (
                  <div className="rounded-[5px] bg-card border border-border/60 p-2 break-all text-muted-foreground">
                    <strong className="text-foreground">MTA-STS: </strong>
                    {email.mta_sts.raw}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
