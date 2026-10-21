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
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isGreen = score >= 85;
  const isYellow = score >= 60 && score < 85;

  const strokeColor = isGreen
    ? '#34c759' /* macOS Green */
    : isYellow
    ? '#ff9500' /* macOS Orange */
    : '#ff3b30'; /* macOS Red */

  const textColor = isGreen
    ? 'text-[#248a3d] dark:text-[#30d158]'
    : isYellow
    ? 'text-[#b26a00] dark:text-[#ff9f0a]'
    : 'text-[#d70015] dark:text-[#ff453a]';

  const StatusIcon = isGreen ? ShieldCheck : isYellow ? AlertTriangle : AlertOctagon;
  const statusLabel = isGreen ? 'Salud Óptima' : isYellow ? 'Atención Requerida' : 'Estado Crítico';

  return (
    <div className="rounded-2xl macos-card bg-card/75 backdrop-blur-md p-4 transition-all">
      <div className="flex items-center gap-4">
        {/* Apple Activity Ring Gauge */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-black/[0.06] dark:stroke-white/[0.08]"
              strokeWidth="8"
            />
            {/* Indicator */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none transition-all duration-700 ease-out"
              strokeWidth="8"
              stroke={strokeColor}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-2xl font-black tracking-tight ${textColor}`}>
              {score}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              / 100
            </span>
          </div>
        </div>

        {/* Diagnosis & Metadata */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <StatusIcon className={`h-4 w-4 ${textColor}`} />
            <h4 className={`text-sm font-bold tracking-tight ${textColor}`}>
              {statusLabel}
            </h4>
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            {isGreen && 'Seguridad TLS, registros DNS y autenticación de email en estado óptimo.'}
            {isYellow && 'Configuración funcional pero con advertencias en políticas o certificados.'}
            {!isGreen && !isYellow && 'Faltan certificados válidos o existen vulnerabilidades críticas.'}
          </p>

          <div className="flex items-center gap-1.5 pt-1">
            {cached && (
              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-muted-foreground">
                <Zap className="mr-0.5 h-2.5 w-2.5 text-[#ff9500]" />
                Caché Edge (2h)
              </Badge>
            )}
            {latencyMs !== undefined && (
              <span className="text-[10px] text-muted-foreground/90 font-mono">
                {latencyMs}ms
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Deductions List */}
      {penalties.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-border/50">
          <div className="text-[10px] font-semibold text-muted-foreground mb-1.5 flex items-center justify-between">
            <span className="uppercase tracking-wider">Deducciones ({penalties.length}):</span>
            <span className="text-[#ff3b30] font-mono font-medium">
              -{penalties.reduce((sum, p) => sum + p.deduction, 0)} pts
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {penalties.map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-[5px] bg-[#ff3b30]/10 border border-[#ff3b30]/20 px-1.5 py-0.5 text-[10px] text-[#ff3b30] dark:text-[#ff453a]"
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
