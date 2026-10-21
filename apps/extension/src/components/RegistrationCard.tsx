import React from 'react';
import { RegistrationInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Calendar, Clock, Server, ShieldCheck, AlertCircle } from 'lucide-react';

interface RegistrationCardProps {
  registration: RegistrationInfo;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({ registration }) => {
  const isExpiringSoon =
    registration.days_until_expiration !== null &&
    registration.days_until_expiration < 30;

  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'N/D';
    try {
      return new Date(isoString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-1.5">
      {/* macOS Section Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#007aff]/15 text-[#007aff]">
            <Calendar className="h-2.5 w-2.5" />
          </span>
          Registro & Delegación
        </span>
        {isExpiringSoon && (
          <Badge variant="danger" className="text-[9px] py-0">
            <AlertCircle className="mr-0.5 h-2.5 w-2.5" />
            Expira en &lt; 30 días
          </Badge>
        )}
      </div>

      {/* macOS Inset Grouped Container */}
      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* Row: Registrar */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#007aff]/10 text-[#007aff]">
              <ShieldCheck className="h-3 w-3" />
            </div>
            <span>Registrador</span>
          </div>
          <span className="font-medium text-foreground truncate max-w-[180px]" title={registration.registrar || ''}>
            {registration.registrar || 'Privado / Oculto'}
          </span>
        </div>

        {/* Row: Days remaining */}
        <div className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ff9500]/10 text-[#ff9500]">
              <Clock className="h-3 w-3" />
            </div>
            <span>Vigencia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold ${isExpiringSoon ? 'text-[#ff3b30]' : 'text-foreground'}`}>
              {registration.days_until_expiration !== null
                ? `${registration.days_until_expiration} días`
                : 'Activo'}
            </span>
            <Badge variant="outline" className="text-[10px] font-mono uppercase py-0 px-1.5">
              {registration.status || 'Active'}
            </Badge>
          </div>
        </div>

        {/* Row: Dates */}
        <div className="flex items-center justify-between p-2.5 text-[11px] text-muted-foreground bg-muted/20">
          <span>Alta: <strong className="text-foreground font-normal">{formatDate(registration.created_at)}</strong></span>
          <span>Vence: <strong className="text-foreground font-normal">{formatDate(registration.expires_at)}</strong></span>
        </div>

        {/* Row: Nameservers */}
        {registration.nameservers && registration.nameservers.length > 0 && (
          <div className="p-2.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Server className="h-3 w-3 text-muted-foreground" />
              <span>Nameservers delegados:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {registration.nameservers.slice(0, 4).map((ns, idx) => (
                <span
                  key={idx}
                  className="rounded-[5px] bg-muted/60 border border-border/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {ns}
                </span>
              ))}
              {registration.nameservers.length > 4 && (
                <span className="rounded-[5px] bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  +{registration.nameservers.length - 4} más
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
