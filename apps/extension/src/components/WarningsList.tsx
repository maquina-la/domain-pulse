import React from 'react';
import { WarningItem } from '@domain-pulse/shared';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface WarningsListProps {
  warnings: WarningItem[];
}

export const WarningsList: React.FC<WarningsListProps> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) {
    return (
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardContent className="flex items-center gap-2 p-3 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>¡Excelente! No se detectaron advertencias ni problemas de configuración.</span>
        </CardContent>
      </Card>
    );
  }

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertOctagon,
          class: 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400',
          badge: 'Crítico',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          class: 'border-rose-500/20 bg-rose-500/5 text-rose-500',
          badge: 'Alto',
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          class: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
          badge: 'Medio',
        };
      default:
        return {
          icon: Info,
          class: 'border-blue-500/20 bg-blue-500/5 text-blue-500',
          badge: 'Info',
        };
    }
  };

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">
          Diagnóstico & Alertas ({warnings.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {warnings.map((w, idx) => {
          const style = getSeverityStyle(w.severity);
          const Icon = style.icon;
          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-xs ${style.class}`}
            >
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between font-medium">
                  <span className="font-semibold">{w.message}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
