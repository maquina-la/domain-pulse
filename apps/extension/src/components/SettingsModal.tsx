import React, { useState } from 'react';
import { getApiBaseUrl, setApiBaseUrl } from '@/lib/api';
import { Button } from './ui/button';
import { X, Check, Server, RefreshCw } from 'lucide-react';

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
        setStatusMsg({ text: '¡Conexión exitosa con el Gateway!', ok: true });
      } else {
        setStatusMsg({ text: `Respuesta inesperada: HTTP ${res.status}`, ok: false });
      }
    } catch (err: any) {
      setStatusMsg({
        text: 'Error de conexión. Verifica que el servidor esté activo.',
        ok: false,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-foreground">Configuración de Gateway</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              URL del Gateway API (Volcano / Node.js):
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="http://localhost:3000"
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <p className="text-[11px] text-muted-foreground">
              Servicio encargado de resolver DoH, RDAP Whois y handshake TLS.
            </p>
          </div>

          {statusMsg && (
            <div
              className={`rounded-md p-2 text-xs flex items-center gap-1.5 ${
                statusMsg.ok
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
              }`}
            >
              {statusMsg.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="text-xs"
            >
              <RefreshCw className={`mr-1.5 h-3 w-3 ${isTesting ? 'animate-spin' : ''}`} />
              Probar
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose} className="text-xs">
                Cancelar
              </Button>
              <Button type="button" size="sm" onClick={handleSave} className="text-xs">
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
