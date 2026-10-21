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

const PRESET_DOMAINS = ['github.com', 'cloudflare.com', 'vercel.com', 'google.com', 'stripe.com'];

export const App: React.FC = () => {
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [audit, setAudit] = useState<AuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

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
        // Fallback demo domain if internal page (e.g. chrome://)
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
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
      />

      <main className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 rounded-2xl bg-muted/60" />
            <div className="grid grid-cols-1 gap-3">
              <div className="h-36 rounded-xl bg-muted/40" />
              <div className="h-36 rounded-xl bg-muted/40" />
              <div className="h-36 rounded-xl bg-muted/40" />
              <div className="h-36 rounded-xl bg-muted/40" />
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-center space-y-3">
            <AlertCircle className="mx-auto h-8 w-8 text-rose-500" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-foreground">No se pudo completar la auditoría</h3>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button size="sm" onClick={() => runAudit(currentDomain)} className="text-xs">
                <RefreshCw className="mr-1.5 h-3 w-3" /> Reintentar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs"
              >
                Configurar Gateway
              </Button>
            </div>
          </div>
        )}

        {/* Audit Results */}
        {!isLoading && audit && (
          <div className="space-y-4">
            {/* Health Score Gauge */}
            <ScoreGauge
              score={audit.score}
              penalties={audit.score_breakdown?.penalties || []}
              cached={audit.cached}
              latencyMs={audit.latency_ms}
            />

            {/* Quick Preset Domains bar for swift testing */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3 shrink-0 text-emerald-500" />
              <span className="shrink-0 font-medium">Probar:</span>
              {PRESET_DOMAINS.map((d) => (
                <button
                  key={d}
                  onClick={() => handleSearchDomain(d)}
                  className={`rounded-full px-2 py-0.5 transition-colors whitespace-nowrap ${
                    d === currentDomain
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* 4 Core Category Cards (FR-04) */}
            <div className="grid grid-cols-1 gap-3">
              <RegistrationCard registration={audit.registration} />
              <DnsCard dns={audit.dns} />
              <SslCard ssl={audit.ssl} />
              <EmailCard email={audit.email} />
            </div>

            {/* Diagnostics & Warnings */}
            <WarningsList warnings={audit.warnings} />
          </div>
        )}
      </main>

      {/* Footer info */}
      <footer className="border-t border-border/60 py-3 px-4 text-center text-[10px] text-muted-foreground">
        PulseDomain • Chrome Manifest V3 Side Panel • DoH & RDAP Orchestrator
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={() => runAudit(currentDomain)}
      />
    </div>
  );
};
