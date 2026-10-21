import React from 'react';
import { SubdomainItem } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Network, CheckCircle2, XCircle } from 'lucide-react';

interface SubdomainsCardProps {
  subdomains: SubdomainItem[];
}

export const SubdomainsCard: React.FC<SubdomainsCardProps> = ({ subdomains }) => {
  const activeCount = subdomains.filter((s) => s.active).length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#007aff]/15 text-[#007aff]">
            <Network className="h-2.5 w-2.5" />
          </span>
          Subdominios Descubiertos
        </span>
        <Badge variant="outline" className="text-[10px] py-0 px-2 font-mono">
          {activeCount} de {subdomains.length} activos
        </Badge>
      </div>

      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {subdomains.map((sub, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 truncate">
              {sub.active ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              ) : (
                <span className="h-2 w-2 rounded-full bg-muted-foreground/30 shrink-0" />
              )}
              <span className={`font-mono text-[11px] truncate ${sub.active ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                {sub.subdomain}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {sub.active ? (
                <>
                  <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">
                    {sub.ip || sub.cname || 'Activo'}
                  </span>
                  <Badge variant="success" className="text-[10px] py-0 px-1.5">
                    <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" />
                    Online
                  </Badge>
                </>
              ) : (
                <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-muted-foreground opacity-60">
                  <XCircle className="mr-0.5 h-2.5 w-2.5" />
                  Inactivo
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
