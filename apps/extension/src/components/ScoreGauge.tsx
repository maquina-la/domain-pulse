import React from 'react';
import { ScorePenalty } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { ShieldCheck, AlertTriangle, AlertOctagon, Zap } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  penalties?: ScorePenalty[];
  cached?: boolean;
  latencyMs?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  penalties = [],
  cached = false,
  latencyMs,
}) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isGreen = score >= 85;
  const isYellow = score >= 60 && score < 85;
  const isRed = score < 60;

  const colorClass = isGreen
    ? 'text-emerald-500'
    : isYellow
    ? 'text-amber-500'
    : 'text-rose-500';

  const strokeColor = isGreen
    ? '#10b981'
    : isYellow
    ? '#f59e0b'
    : '#f43f5e';

  const bgRingColor = isGreen
    ? 'stroke-emerald-500/20'
    : isYellow
    ? 'stroke-amber-500/20'
    : 'stroke-rose-500/20';

  const StatusIcon = isGreen ? ShieldCheck : isYellow ? AlertTriangle : AlertOctagon;
  const statusLabel = isGreen ? 'Salud Óptima' : isYellow ? 'Requiere Atención' : 'Estado Crítico';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Score Ring */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`fill-none ${bgRingColor}`}
              strokeWidth="9"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none transition-all duration-700 ease-out"
              strokeWidth="9"
              stroke={strokeColor}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-black tracking-tight ${colorClass}`}>
              {score}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              / 100
            </span>
          </div>
        </div>

        {/* Status Diagnosis */}
        <div className="flex flex-1 flex-col justify-center space-y-1.5">
          <div className="flex items-center gap-1.5">
            <StatusIcon className={`h-4 w-4 ${colorClass}`} />
            <span className={`text-sm font-bold tracking-tight ${colorClass}`}>
              {statusLabel}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            {isGreen && 'Configuración de seguridad, DNS y entregabilidad sólida.'}
            {isYellow && 'Existen vulnerabilidades o configuraciones mejorables.'}
            {isRed && 'Fallos críticos detectados en certificados o autenticación.'}
          </p>

          {/* Performance & Cache metadata */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {cached && (
              <Badge variant="outline" className="border-border bg-muted/60 text-[10px] font-normal text-muted-foreground py-0">
                <Zap className="mr-1 h-2.5 w-2.5 text-amber-500" />
                Caché (2h)
              </Badge>
            )}
            {latencyMs !== undefined && (
              <span className="text-[10px] text-muted-foreground">
                ⚡ {latencyMs} ms
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Penalties list if any */}
      {penalties.length > 0 && (
        <div className="mt-4 border-t border-border/60 pt-3">
          <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 flex items-center justify-between">
            <span>Deducciones aplicadas ({penalties.length}):</span>
            <span className="text-rose-500 font-mono">
              -{penalties.reduce((sum, p) => sum + p.deduction, 0)} pts
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {penalties.map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[10px] font-medium text-rose-600 dark:text-rose-400"
              >
                <span>{p.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
