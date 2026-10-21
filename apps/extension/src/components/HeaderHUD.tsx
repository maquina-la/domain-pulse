import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Moon, Sun, Settings, Search, X } from 'lucide-react';
import { Button } from './ui/button';

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
  activeTab: 'all' | 'dns_ssl' | 'email' | 'alerts';
  onChangeTab: (tab: 'all' | 'dns_ssl' | 'email' | 'alerts') => void;
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

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      {/* macOS Window Titlebar */}
      <div className="flex h-9 items-center justify-between px-3 border-b border-border/50 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
        </div>

        {/* Centered Window Title */}
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-tight text-foreground/90">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="truncate max-w-[140px] font-mono">{currentDomain || 'PulseDomain'}</span>
        </div>

        {/* Right side quick actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Cambiar tema"
          >
            {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
          </button>
          <button
            onClick={onOpenSettings}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Ajustes"
          >
            <Settings className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* macOS Unified Toolbar */}
      <div className="p-3 space-y-2.5">
        {/* Domain spotlight bar & Actions */}
        <div className="flex items-center gap-2">
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
              title="Haz clic para buscar otro dominio"
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
        </div>

        {/* macOS Native Segmented Control Tabs */}
        <div className="flex items-center p-0.5 rounded-[8px] bg-muted/70 border border-border/60 text-xs select-none">
          <button
            onClick={() => onChangeTab('all')}
            className={`flex-1 py-1 px-2 rounded-[6px] text-[11px] font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => onChangeTab('dns_ssl')}
            className={`flex-1 py-1 px-2 rounded-[6px] text-[11px] font-medium transition-all ${
              activeTab === 'dns_ssl'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            DNS & SSL
          </button>
          <button
            onClick={() => onChangeTab('email')}
            className={`flex-1 py-1 px-2 rounded-[6px] text-[11px] font-medium transition-all ${
              activeTab === 'email'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => onChangeTab('alerts')}
            className={`flex-1 py-1 px-2 rounded-[6px] text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === 'alerts'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Alertas</span>
            {warningsCount > 0 && (
              <span className="h-4 min-w-[16px] px-1 rounded-full bg-[#ff3b30] text-white text-[9px] font-bold flex items-center justify-center">
                {warningsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
