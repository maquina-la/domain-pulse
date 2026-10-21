import React, { useState } from 'react';
import { Activity, RefreshCw, Copy, Check, Moon, Sun, Settings, Search } from 'lucide-react';
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
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur-md px-4 py-3">
      {/* Top row: Brand & Action tools */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
            <Activity className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-foreground">
              Pulse<span className="text-emerald-500">Domain</span>
            </h1>
            <p className="text-[10px] text-muted-foreground leading-none">
              Side Panel HUD
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* FR-05: Copy Markdown in 1-click */}
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyMarkdown}
            disabled={!currentDomain || isLoading}
            className={`h-7 px-2 text-xs transition-all ${
              copiedMarkdown
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'hover:border-emerald-500/40'
            }`}
            title="Copiar auditoría completa en Markdown"
          >
            {copiedMarkdown ? (
              <>
                <Check className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="font-semibold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="mr-1 h-3 w-3 opacity-70" />
                <span>Markdown</span>
              </>
            )}
          </Button>

          {/* Refresh */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Recargar auditoría"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-emerald-500' : ''}`} />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Cambiar tema (Claro / Oscuro)"
          >
            {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            title="Configuración de Gateway API"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Domain badge / Search toggle bar */}
      <div className="mt-2.5">
        {isSearching ? (
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder="ejemplo.com"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <Button type="submit" size="sm" className="h-7 px-2.5 text-xs">
              Auditar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSearching(false)}
              className="h-7 px-2 text-xs"
            >
              Cancelar
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/40 px-3 py-1.5 text-xs shadow-inner">
            <div className="flex items-center gap-2 truncate">
              {faviconUrl && (
                <img
                  src={faviconUrl}
                  alt="Favicon"
                  className="h-4 w-4 shrink-0 rounded"
                  onError={(e) => {
                    // Hide broken image
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
              <span className="font-mono font-bold text-foreground truncate max-w-[200px]" title={currentDomain}>
                {currentDomain || 'Detectando dominio...'}
              </span>
            </div>

            <button
              onClick={() => setIsSearching(true)}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              title="Auditar otro dominio manualmente"
            >
              <Search className="h-3 w-3" />
              <span>Cambiar</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
