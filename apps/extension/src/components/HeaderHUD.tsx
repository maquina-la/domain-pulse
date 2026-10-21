import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Moon, Sun, Settings, Search, X } from 'lucide-react';
import { Button } from './ui/button';

export type TabKey = 'all' | 'tech' | 'security' | 'subdomains' | 'dns_email' | 'alerts';

interface HeaderHUDProps {
  currentDomain: string;
  onRefresh: () => void;
  onSearchDomain: (domain: string) => void;
  onCopyMarkdown: () => void;
  copiedMarkdown: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  isLoading: boolean;
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  warningsCount: number;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentDomain,
  onRefresh,
  onSearchDomain,
  onCopyMarkdown,
  copiedMarkdown,
  isDarkMode,
  onToggleTheme,
  onOpenSettings,
  isLoading,
  activeTab,
  onChangeTab,
  warningsCount,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchDomain(searchInput.trim());
      setIsSearching(false);
      setSearchInput('');
    }
  };

  const faviconUrl = currentDomain
    ? `https://www.google.com/s2/favicons?domain=${currentDomain}&sz=32`
    : null;

  const tabClass = (key: TabKey) =>
    `py-1 px-2 rounded-[6px] text-[11px] font-medium transition-all whitespace-nowrap ${
      activeTab === key
        ? 'bg-card text-foreground shadow-sm'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-xl p-3 space-y-2.5">
      {/* Top row: Domain search & Action tools */}
      <div className="flex items-center gap-1.5">
        {isSearching ? (
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-1.5">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder="ejemplo.com"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full h-7 rounded-[7px] border border-border bg-card/90 pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 macos-button"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <Button type="submit" size="sm" className="h-7 text-[11px]">
              Auditar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSearching(false)}
              className="h-7 text-[11px]"
            >
              Cancelar
            </Button>
          </form>
        ) : (
          <button
            onClick={() => setIsSearching(true)}
            className="flex-1 flex items-center justify-between h-7 px-2.5 rounded-[7px] border border-border/70 bg-card/70 hover:bg-card text-xs text-foreground transition-all macos-button shadow-sm"
            title="Haz clic para buscar o cambiar de dominio"
          >
            <div className="flex items-center gap-2 truncate">
              {faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt=""
                  className="h-3.5 w-3.5 rounded-sm shrink-0"
                  onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                />
              ) : (
                <Search className="h-3 w-3 text-muted-foreground shrink-0" />
              )}
              <span className="font-mono font-medium truncate text-[11px]">
                {currentDomain || 'Buscar dominio...'}
              </span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded border border-border/40">
              ⌘K
            </span>
          </button>
        )}

        {/* Action: Copy Markdown */}
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyMarkdown}
          disabled={!currentDomain || isLoading}
          className={`h-7 px-2 text-[11px] font-medium ${
            copiedMarkdown
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : ''
          }`}
          title="Copiar reporte completo en Markdown"
        >
          {copiedMarkdown ? (
            <>
              <Check className="mr-1 h-3 w-3 text-emerald-500" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3 opacity-70" />
              <span>Markdown</span>
            </>
          )}
        </Button>

        {/* Action: Reload */}
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
          title="Recargar auditoría"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
        </Button>

        {/* Action: Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
          title="Cambiar tema"
        >
          {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
        </Button>

        {/* Action: Settings */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
          title="Ajustes de Gateway API"
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>

      {/* Segmented Control Tabs (Horizontally scrollable if constrained) */}
      <div className="flex items-center p-0.5 rounded-[8px] bg-muted/70 border border-border/60 text-xs select-none overflow-x-auto gap-0.5">
        <button onClick={() => onChangeTab('all')} className={tabClass('all')}>
          Resumen
        </button>
        <button onClick={() => onChangeTab('tech')} className={tabClass('tech')}>
          Stack
        </button>
        <button onClick={() => onChangeTab('security')} className={tabClass('security')}>
          Seguridad
        </button>
        <button onClick={() => onChangeTab('subdomains')} className={tabClass('subdomains')}>
          Subdominios
        </button>
        <button onClick={() => onChangeTab('dns_email')} className={tabClass('dns_email')}>
          Email & DNS
        </button>
        <button
          onClick={() => onChangeTab('alerts')}
          className={`${tabClass('alerts')} flex items-center justify-center gap-1`}
        >
          <span>Alertas</span>
          {warningsCount > 0 && (
            <span className="h-4 min-w-[16px] px-1 rounded-full bg-[#ff3b30] text-white text-[9px] font-bold flex items-center justify-center">
              {warningsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
