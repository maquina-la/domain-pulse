import React from 'react';
import { SecurityHeadersInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';

interface SecurityHeadersCardProps {
  headers: SecurityHeadersInfo;
}

export const SecurityHeadersCard: React.FC<SecurityHeadersCardProps> = ({ headers }) => {
  const isOptimal = headers.score_percentage >= 80;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#34c759]/15 text-[#34c759]">
            <ShieldCheck className="h-2.5 w-2.5" />
          </span>
          Encabezados de Seguridad Web
        </span>
        <Badge
          variant={isOptimal ? 'success' : 'warning'}
          className="text-[10px] py-0 px-2 font-mono"
        >
          {headers.score_percentage}% Protegido
        </Badge>
      </div>

      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* HTTP -> HTTPS Redirect */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Forzado HTTP ➔ HTTPS (Puerto 80)</span>
          </div>
          {headers.http_redirects_to_https ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Redirección 301/308
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px] py-0">
              <XCircle className="mr-1 h-2.5 w-2.5" /> Sin redirección
            </Badge>
          )}
        </div>

        {/* HSTS */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">Strict-Transport-Security (HSTS)</div>
            <div className="text-[10px] text-muted-foreground">Fuerza conexiones TLS automáticas</div>
          </div>
          {headers.hsts ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Presente
            </Badge>
          ) : (
            <Badge variant="danger" className="text-[10px] py-0">
              <XCircle className="mr-1 h-2.5 w-2.5" /> Ausente
            </Badge>
          )}
        </div>

        {/* Content-Security-Policy (CSP) */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">Content-Security-Policy (CSP)</div>
            <div className="text-[10px] text-muted-foreground">Mitiga ataques XSS e inyecciones</div>
          </div>
          {headers.csp ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Presente
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px] py-0">
              <XCircle className="mr-1 h-2.5 w-2.5" /> Ausente
            </Badge>
          )}
        </div>

        {/* X-Frame-Options */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">X-Frame-Options</div>
            <div className="text-[10px] text-muted-foreground">Previene ataques de Clickjacking</div>
          </div>
          {headers.x_frame_options ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Presente
            </Badge>
          ) : (
            <Badge variant="warning" className="text-[10px] py-0">
              <XCircle className="mr-1 h-2.5 w-2.5" /> Ausente
            </Badge>
          )}
        </div>

        {/* X-Content-Type-Options */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">X-Content-Type-Options</div>
            <div className="text-[10px] text-muted-foreground">Bloquea sniffing de tipos MIME</div>
          </div>
          {headers.x_content_type_options ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> nosniff
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
              Ausente
            </Badge>
          )}
        </div>

        {/* Referrer-Policy */}
        <div className="flex items-center justify-between p-2.5">
          <div>
            <div className="font-medium text-foreground">Referrer-Policy</div>
            <div className="text-[10px] text-muted-foreground">Control de telemetría de URLs salientes</div>
          </div>
          {headers.referrer_policy ? (
            <Badge variant="success" className="text-[10px] py-0">
              <CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Configurado
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
              Por defecto
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
