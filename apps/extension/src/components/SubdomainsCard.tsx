import React, { useState } from 'react';
import { SubdomainItem } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Network, CheckCircle2, XCircle, Search, ExternalLink, Copy, Check } from 'lucide-react';

interface SubdomainsCardProps {
  subdomains: SubdomainItem[];
}

export const SubdomainsCard: React.FC<SubdomainsCardProps> = ({ subdomains }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeCount = subdomains.filter((s) => s.active).length;

  const filtered = subdomains.filter((s) =>
    s.subdomain.toLowerCase().includes(filterQuery.toLowerCase()) ||
    (s.ip && s.ip.includes(filterQuery)) ||
    (s.cname && s.cname.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#007aff]/15 text-[#007aff]">
            <Network className="h-2.5 w-2.5" />
          </span>
          Subdominios Reales ({subdomains.length})
        </span>
        <Badge variant="outline" className="text-[10px] py-0 px-2 font-mono">
          {activeCount} activos
        </Badge>
      </div>

      {/* Filter search bar if more than 5 subdomains */}
      {subdomains.length > 5 && (
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filtrar subdominios (ej. admin, api, auth)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full h-7 rounded-[7px] border border-border bg-card/80 pl-7 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 macos-button"
          />
        </div>
      )}

      {/* Subdomains Inset Container */}
      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs max-h-[380px] overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((sub, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 truncate pr-2">
                {sub.active ? (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30 shrink-0" />
                )}
                <span
                  className={`font-mono text-[11px] truncate ${
                    sub.active ? 'font-semibold text-foreground' : 'text-muted-foreground'
                  }`}
                  title={sub.subdomain}
                >
                  {sub.subdomain}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {sub.ip && (
                  <button
                    onClick={() => handleCopy(sub.ip!)}
                    title="Copiar IP"
                    className="font-mono text-[10px] text-muted-foreground bg-muted/60 hover:bg-muted border border-border/40 px-1.5 py-0.5 rounded-[4px] flex items-center gap-1"
                  >
                    <span>{sub.ip}</span>
                    {copiedText === sub.ip ? (
                      <Check className="h-2.5 w-2.5 text-[#34c759]" />
                    ) : (
                      <Copy className="h-2.5 w-2.5 opacity-40 hover:opacity-100" />
                    )}
                  </button>
                )}

                {sub.active ? (
                  <>
                    <a
                      href={`https://${sub.subdomain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded-[4px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Abrir en nueva pestaña"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <Badge variant="success" className="text-[9px] py-0 px-1.5">
                      <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" />
                      Live
                    </Badge>
                  </>
                ) : (
                  <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-muted-foreground opacity-60">
                    <XCircle className="mr-0.5 h-2.5 w-2.5" />
                    Offline
                  </Badge>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-xs text-muted-foreground">
            No se encontraron subdominios que coincidan con &quot;{filterQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
};
