import React from 'react';
import { WarningItem } from '@domain-pulse/shared';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface WarningsListProps {
  warnings: WarningItem[];
}

export const WarningsList: React.FC<WarningsListProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) {
    return (
      <div className="rounded-xl macos-card bg-[#34c759]/10 border border-[#34c759]/20 p-3 flex items-center gap-2 text-xs text-[#248a3d] dark:text-[#30d158]">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>Sin problemas ni advertencias de configuración detectadas.</span>
      </div>
    );
  }

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertOctagon,
          class: 'border-[#ff3b30]/30 bg-[#ff3b30]/10 text-[#d70015] dark:text-[#ff453a]',
          badge: 'Crítico',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          class: 'border-[#ff3b30]/20 bg-[#ff3b30]/5 text-[#d70015] dark:text-[#ff453a]',
          badge: 'Alto',
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          class: 'border-[#ff9500]/30 bg-[#ff9500]/10 text-[#b26a00] dark:text-[#ff9f0a]',
          badge: 'Medio',
        };
      default:
        return {
          icon: Info,
          class: 'border-[#007aff]/30 bg-[#007aff]/10 text-[#0062cc] dark:text-[#0a84ff]',
          badge: 'Info',
        };
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
        <span>Diagnóstico & Recomendaciones</span>
        <span className="font-mono text-[10px]">{warnings.length} alerta(s)</span>
      </div>

      <div className="space-y-1.5">
        {warnings.map((w, idx) => {
          const style = getSeverityStyle(w.severity);
          const Icon = style.icon;
          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-xs macos-card backdrop-blur-md transition-all ${style.class}`}
            >
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div className="flex-1 leading-snug">
                <span className="font-medium">{w.message}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
