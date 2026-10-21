import React, { useState, useRef, useEffect } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  Moon,
  Sun,
  Settings,
  Search,
  X,
  ChevronsUpDown,
  LayoutDashboard,
  Layers,
  ShieldCheck,
  Network,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '@/lib/I18nContext';

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

interface TabOption {
  key: TabKey;
  labelKey: 'tabAll' | 'tabTech' | 'tabSecurity' | 'tabSubdomains' | 'tabDnsEmail' | 'tabAlerts';
  icon: React.ReactNode;
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
  const { t } = useI18n();
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const tabOptions: TabOption[] = [
    {
      key: 'all',
      labelKey: 'tabAll',
      icon: <LayoutDashboard className="h-3.5 w-3.5 text-primary" />,
    },
    {
      key: 'tech',
      labelKey: 'tabTech',
      icon: <Layers className="h-3.5 w-3.5 text-[#007aff]" />,
    },
    {
      key: 'security',
      labelKey: 'tabSecurity',
      icon: <ShieldCheck className="h-3.5 w-3.5 text-[#34c759]" />,
    },
    {
      key: 'subdomains',
      labelKey: 'tabSubdomains',
      icon: <Network className="h-3.5 w-3.5 text-[#ff9500]" />,
    },
    {
      key: 'dns_email',
      labelKey: 'tabDnsEmail',
      icon: <Mail className="h-3.5 w-3.5 text-[#af52de]" />,
    },
    {
      key: 'alerts',
      labelKey: 'tabAlerts',
      icon: <AlertTriangle className="h-3.5 w-3.5 text-[#ff3b30]" />,
    },
  ];

  const currentOption = tabOptions.find((t) => t.key === activeTab) || tabOptions[0];

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-xl p-3 space-y-2">
      {/* Top row: Domain search & Action tools */}
      <div className="flex items-center gap-1.5">
        {isSearching ? (
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-1.5">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder={t('searchPlaceholder')}
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
              {t('auditButton')}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsSearching(false)}
              className="h-7 text-[11px]"
            >
              {t('cancel')}
            </Button>
          </form>
        ) : (
          <button
            onClick={() => setIsSearching(true)}
            className="flex-1 flex items-center justify-between h-7 px-2.5 rounded-[7px] border border-border/70 bg-card/70 hover:bg-card text-xs text-foreground transition-all macos-button shadow-xs"
            title={t('searchPlaceholder')}
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
                {currentDomain || t('searchPlaceholder')}
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
          title={t('copyMarkdown')}
        >
          {copiedMarkdown ? (
            <>
              <Check className="mr-1 h-3 w-3 text-emerald-500" />
              <span>{t('copied')}</span>
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3 opacity-70" />
              <span>{t('copyMarkdown')}</span>
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
          title={t('refresh')}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
        </Button>

        {/* Action: Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
          title={t('themeToggle')}
        >
          {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
        </Button>

        {/* Action: Settings */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
          title={t('settings')}
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>

      {/* Category View Dropdown (macOS PopUp Menu) */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between h-7 px-2.5 rounded-[7px] border border-border/80 bg-card/80 hover:bg-card text-xs text-foreground transition-all macos-button shadow-xs select-none"
        >
          <div className="flex items-center gap-2 truncate">
            {currentOption.icon}
            <span className="font-medium text-[11px] truncate">{t(currentOption.labelKey)}</span>
            {activeTab === 'alerts' && warningsCount > 0 && (
              <span className="h-4 min-w-[16px] px-1 rounded-full bg-[#ff3b30] text-white text-[9px] font-bold flex items-center justify-center">
                {warningsCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-muted-foreground">
            {warningsCount > 0 && activeTab !== 'alerts' && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b30]" title={`${warningsCount} alertas`} />
            )}
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-60" />
          </div>
        </button>

        {/* Dropdown Menu Popover */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-40 rounded-xl macos-window bg-card/95 border border-border/90 p-1 backdrop-blur-xl shadow-xl animate-in fade-in zoom-in-95 duration-100">
            <div className="space-y-0.5">
              {tabOptions.map((opt) => {
                const isSelected = activeTab === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => {
                      onChangeTab(opt.key);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-xs transition-colors text-left ${
                      isSelected
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'hover:bg-muted/70 text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span className="text-[11px]">{t(opt.labelKey)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {opt.key === 'alerts' && warningsCount > 0 && (
                        <span
                          className={`h-4 min-w-[16px] px-1 rounded-full text-[9px] font-bold flex items-center justify-center ${
                            isSelected ? 'bg-white text-primary' : 'bg-[#ff3b30] text-white'
                          }`}
                        >
                          {warningsCount}
                        </span>
                      )}
                      {isSelected && <Check className="h-3 w-3 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
