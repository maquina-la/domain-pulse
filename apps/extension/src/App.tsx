import React, { useState, useEffect, useCallback } from 'react';
import { AuditResponse, generateAuditMarkdown } from '@domain-pulse/shared';
import { extractApexDomain, getActiveTabDomain } from './lib/domain';
import { fetchDomainAudit } from './lib/api';
import { HeaderHUD } from './components/HeaderHUD';
import { ScoreGauge } from './components/ScoreGauge';
import { RegistrationCard } from './components/RegistrationCard';
import { DnsCard } from './components/DnsCard';
import { SslCard } from './components/SslCard';
import { EmailCard } from './components/EmailCard';
import { WarningsList } from './components/WarningsList';
import { SettingsModal } from './components/SettingsModal';
import { Button } from './components/ui/button';
import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

const PRESET_DOMAINS = ['github.com', 'apple.com', 'cloudflare.com', 'vercel.com', 'google.com'];

export const App: React.FC = () => {
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [audit, setAudit] = useState<AuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'dns_ssl' | 'email' | 'alerts'>('all');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pulse_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pulse_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pulse_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Audit trigger
  const runAudit = useCallback(async (domainToAudit: string) => {
    if (!domainToAudit) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchDomainAudit(domainToAudit);
      setAudit(result);
    } catch (err: any) {
      setError(err?.message || 'Error desconocido al auditar el dominio.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Detect Active Tab (FR-01)
  useEffect(() => {
    const detectAndAudit = async () => {
      const detected = await getActiveTabDomain();
      if (detected.isValid && detected.apexDomain) {
        setCurrentDomain(detected.apexDomain);
        runAudit(detected.apexDomain);
      } else {
        const fallback = 'github.com';
        setCurrentDomain(fallback);
        runAudit(fallback);
      }
    };

    detectAndAudit();

    // Listen for tab changes in Chrome Extension runtime
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      const messageListener = (msg: any) => {
        if (msg.type === 'TAB_CHANGED' || msg.type === 'TAB_UPDATED') {
          if (msg.url) {
            const parsed = extractApexDomain(msg.url);
            if (parsed.isValid && parsed.apexDomain && parsed.apexDomain !== currentDomain) {
              setCurrentDomain(parsed.apexDomain);
              runAudit(parsed.apexDomain);
            }
          }
        }
      };

      chrome.runtime.onMessage.addListener(messageListener);
      return () => {
        chrome.runtime.onMessage.removeListener(messageListener);
      };
    }
  }, [runAudit, currentDomain]);

  // Handle manual search
  const handleSearchDomain = (newDomain: string) => {
    const parsed = extractApexDomain(newDomain);
    const domain = parsed.apexDomain || newDomain.trim().toLowerCase();
    setCurrentDomain(domain);
    runAudit(domain);
  };

  // FR-05: Copy Markdown Cleanly
  const handleCopyMarkdown = () => {
    if (!audit) return;
    const md = generateAuditMarkdown(audit);
    navigator.clipboard.writeText(md).then(() => {
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-text">
      <HeaderHUD
        currentDomain={currentDomain}
        onRefresh={() => runAudit(currentDomain)}
        onSearchDomain={handleSearchDomain}
        onCopyMarkdown={handleCopyMarkdown}
        copiedMarkdown={copiedMarkdown}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isLoading={isLoading}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        warningsCount={audit?.warnings.length || 0}
      />

      <main className="flex-1 p-3.5 space-y-3.5 max-w-xl mx-auto w-full">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-28 rounded-2xl bg-card/60 macos-card" />
            <div className="space-y-3">
              <div className="h-32 rounded-xl bg-card/40 macos-card" />
              <div className="h-32 rounded-xl bg-card/40 macos-card" />
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-2xl macos-card bg-[#ff3b30]/10 border border-[#ff3b30]/25 p-4 text-center space-y-2.5">
            <AlertCircle className="mx-auto h-7 w-7 text-[#ff3b30]" />
            <div className="space-y-0.5">
              <h3 className="font-bold text-xs text-foreground">Fallo al conectar con el Gateway</h3>
              <p className="text-[11px] text-muted-foreground">{error}</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Button size="sm" onClick={() => runAudit(currentDomain)} className="text-[11px] h-6">
                <RefreshCw className="mr-1 h-3 w-3" /> Reintentar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="text-[11px] h-6"
              >
                Ajustes
              </Button>
            </div>
          </div>
        )}

        {/* Audit Results */}
        {!isLoading && audit && (
          <div className="space-y-3.5">
            {/* Health Score Gauge */}
            <ScoreGauge
              score={audit.score}
              penalties={audit.score_breakdown?.penalties || []}
              cached={audit.cached}
              latencyMs={audit.latency_ms}
            />

            {/* Quick Preset Domains (macOS pill tags) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] text-muted-foreground select-none">
              <Sparkles className="h-3 w-3 shrink-0 text-[#007aff]" />
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider">Presets:</span>
              {PRESET_DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() => handleSearchDomain(d)}
                  className={`rounded-[6px] px-2 py-0.5 transition-all text-[11px] font-mono macos-button ${
                    d === currentDomain
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'bg-card/70 hover:bg-card text-foreground border border-border/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Tab: Overview (All 4 categories) */}
            {activeTab === 'all' && (
              <div className="space-y-3">
                <RegistrationCard registration={audit.registration} />
                <DnsCard dns={audit.dns} />
                <SslCard ssl={audit.ssl} />
                <EmailCard email={audit.email} />
                <WarningsList warnings={audit.warnings} />
              </div>
            )}

            {/* Tab: DNS & SSL */}
            {activeTab === 'dns_ssl' && (
              <div className="space-y-3">
                <DnsCard dns={audit.dns} />
                <SslCard ssl={audit.ssl} />
                <RegistrationCard registration={audit.registration} />
              </div>
            )}

            {/* Tab: Email */}
            {activeTab === 'email' && (
              <div className="space-y-3">
                <EmailCard email={audit.email} />
              </div>
            )}

            {/* Tab: Alerts & Recommendations */}
            {activeTab === 'alerts' && (
              <div className="space-y-3">
                <WarningsList warnings={audit.warnings} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* macOS Status Bar */}
      <footer className="border-t border-border/60 py-2 px-3 text-center text-[10px] text-muted-foreground bg-background/80 backdrop-blur-md flex items-center justify-between select-none">
        <span className="flex items-center gap-1 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
          PulseDomain HUD
        </span>
        <span className="font-mono text-[9px]">macOS Native Engine</span>
      </footer>

      {/* Settings Modal Sheet */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={() => runAudit(currentDomain)}
      />
    </div>
  );
};
