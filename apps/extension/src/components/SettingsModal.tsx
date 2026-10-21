import React, { useState } from 'react';
import { getApiBaseUrl, setApiBaseUrl } from '@/lib/api';
import { Button } from './ui/button';
import { Check, X, Server, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [urlInput, setUrlInput] = useState(getApiBaseUrl());
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiBaseUrl(urlInput);
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
        setStatusMsg({ text: 'Conexión exitosa con el Gateway.', ok: true });
      } else {
        setStatusMsg({ text: `Respuesta HTTP ${res.status}`, ok: false });
      }
    } catch (err: any) {
      setStatusMsg({
        text: 'Error de conexión. Verifica que el backend esté activo.',
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
            <h3 className="font-bold text-foreground">Ajustes de Gateway API</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-[5px] p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Endpoint URL
          </label>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="http://localhost:3000"
            className="w-full h-7 rounded-[7px] border border-border bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 macos-button"
          />
          <p className="text-[10px] text-muted-foreground">
            Servicio orquestador DoH (Cloudflare), RDAP Whois y handshake TLS.
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
            Probar
          </Button>

          <div className="flex gap-1.5">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="h-6 text-[11px]">
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={handleSave} className="h-6 text-[11px]">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
