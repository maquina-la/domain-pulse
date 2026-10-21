import React, { useState } from 'react';
import { getApiBaseUrl, setApiBaseUrl } from '@/lib/api';
import { useI18n } from '@/lib/I18nContext';
import { SUPPORTED_LOCALES, SupportedLocale } from '@/lib/i18n';
import { Button } from './ui/button';
import { Check, X, Server, RefreshCw, Languages } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSaved }) => {
  const { locale, setLocale, isAuto, t } = useI18n();
  const [urlInput, setUrlInput] = useState(getApiBaseUrl());
  const [selectedLang, setSelectedLang] = useState<string>(isAuto ? 'auto' : locale);
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiBaseUrl(urlInput);
    if (selectedLang === 'auto') {
      setLocale(null);
    } else {
      setLocale(selectedLang as SupportedLocale);
    }
    onSaved();
    onClose();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setStatusMsg(null);
    try {
      const clean = urlInput.trim().replace(/\/+$/, '');
      const res = await fetch(`${clean}/health`, { method: 'GET' });
      if (res.ok) {
        setStatusMsg({ text: t('connectionSuccess'), ok: true });
      } else {
        setStatusMsg({ text: `HTTP ${res.status}`, ok: false });
      }
    } catch {
      setStatusMsg({
        text: t('connectionError'),
        ok: false,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-2xl macos-window bg-card/95 border border-border/80 p-4 backdrop-blur-2xl text-xs space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#007aff]/15 text-[#007aff]">
              <Server className="h-3 w-3" />
            </div>
            <h3 className="font-bold text-foreground">{t('settingsTitle')}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-[5px] p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <Languages className="h-3 w-3 text-primary" />
            <span>{t('languageLabel')}</span>
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full h-7 rounded-[7px] border border-border bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 macos-button"
          >
            <option value="auto">🌐 {t('languageAuto')}</option>
            {SUPPORTED_LOCALES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name} ({l.code})
              </option>
            ))}
          </select>
        </div>

        {/* Gateway URL */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {t('gatewayUrlLabel')}
          </label>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="http://localhost:3000"
            className="w-full h-7 rounded-[7px] border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 macos-button"
          />
          <p className="text-[10px] text-muted-foreground">
            {t('gatewayDesc')}
          </p>
        </div>

        {statusMsg && (
          <div
            className={`rounded-[7px] p-2 text-[11px] flex items-center gap-1.5 ${
              statusMsg.ok
                ? 'bg-[#34c759]/15 text-[#248a3d] dark:text-[#30d158] border border-[#34c759]/30'
                : 'bg-[#ff3b30]/15 text-[#d70015] dark:text-[#ff453a] border border-[#ff3b30]/30'
            }`}
          >
            {statusMsg.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-border/40">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            disabled={isTesting}
            className="h-6 text-[11px]"
          >
            <RefreshCw className={`mr-1 h-2.5 w-2.5 ${isTesting ? 'animate-spin text-primary' : ''}`} />
            {t('testButton')}
          </Button>

          <div className="flex gap-1.5">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="h-6 text-[11px]">
              {t('cancel')}
            </Button>
            <Button type="button" size="sm" onClick={handleSave} className="h-6 text-[11px]">
              {t('saveButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
