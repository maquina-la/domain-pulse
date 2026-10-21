import React from 'react';
import { RegistrationInfo } from '@domain-pulse/shared';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, Server, AlertCircle } from 'lucide-react';

interface RegistrationCardProps {
  registration: RegistrationInfo;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({ registration }) => {
  const isExpiringSoon =
    registration.days_until_expiration !== null &&
    registration.days_until_expiration < 30;

  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'No disponible';
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
    <Card className="border-border/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Calendar className="h-3.5 w-3.5" />
            </div>
            <span>Registro & Whois</span>
          </CardTitle>
          {isExpiringSoon && (
            <Badge variant="danger" className="text-[10px]">
              <AlertCircle className="mr-1 h-3 w-3" />
              Expira pronto
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Registrar */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Registrador:</span>
          <span className="font-semibold text-foreground truncate max-w-[200px]" title={registration.registrar || ''}>
            {registration.registrar || 'Privado / Oculto'}
          </span>
        </div>

        {/* Expiration with Progress Bar */}
        <div className="space-y-1 rounded-lg bg-muted/40 p-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> Expiración:
            </span>
            <span className={`font-semibold ${isExpiringSoon ? 'text-rose-500 font-bold' : 'text-foreground'}`}>
              {registration.days_until_expiration !== null
                ? `${registration.days_until_expiration} días restantes`
                : 'N/D'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
            <span>Alta: {formatDate(registration.created_at)}</span>
            <span>Vence: {formatDate(registration.expires_at)}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Estado RDAP:</span>
          <Badge variant="outline" className="text-[10px] uppercase font-mono">
            {registration.status || 'Active'}
          </Badge>
        </div>

        {/* Nameservers */}
        {registration.nameservers && registration.nameservers.length > 0 && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Server className="h-3 w-3" /> Nameservers:
            </div>
            <div className="flex flex-wrap gap-1">
              {registration.nameservers.slice(0, 4).map((ns, idx) => (
                <span
                  key={idx}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {ns}
                </span>
              ))}
              {registration.nameservers.length > 4 && (
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  +{registration.nameservers.length - 4} más
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
