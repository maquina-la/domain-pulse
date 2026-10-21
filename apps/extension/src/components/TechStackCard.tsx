import React from 'react';
import { TechStackInfo } from '@domain-pulse/shared';
import { Badge } from './ui/badge';
import { Layers, Server, Code, Globe, BarChart3, Cpu } from 'lucide-react';
import { useI18n } from '@/lib/I18nContext';

interface TechStackCardProps {
  techStack: TechStackInfo;
}

export const TechStackCard: React.FC<TechStackCardProps> = ({ techStack }) => {
  const { t } = useI18n();
  const hasItems = techStack && techStack.detected && techStack.detected.length > 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#007aff]/15 text-[#007aff]">
            <Layers className="h-2.5 w-2.5" />
          </span>
          {t('techTitle')}
        </span>
        {hasItems && (
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-primary">
            {t('detectedCount', { count: techStack.detected.length })}
          </Badge>
        )}
      </div>

      <div className="rounded-xl macos-card bg-card/75 backdrop-blur-md overflow-hidden divide-y divide-border/50 text-xs">
        {/* Framework / Language */}
        {techStack.framework && (
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#007aff]/10 text-[#007aff]">
                <Code className="h-3 w-3" />
              </div>
              <span>{t('framework')}</span>
            </div>
            <Badge variant="info" className="text-[10px] py-0">
              {techStack.framework}
            </Badge>
          </div>
        )}

        {/* CMS / Platform */}
        {techStack.cms && (
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#af52de]/10 text-[#af52de]">
                <Globe className="h-3 w-3" />
              </div>
              <span>{t('cms')}</span>
            </div>
            <Badge variant="purple" className="text-[10px] py-0">
              {techStack.cms}
            </Badge>
          </div>
        )}

        {/* UI / Frontend */}
        {techStack.ui && (
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#34c759]/10 text-[#34c759]">
                <Cpu className="h-3 w-3" />
              </div>
              <span>{t('frontendUi')}</span>
            </div>
            <Badge variant="success" className="text-[10px] py-0">
              {techStack.ui}
            </Badge>
          </div>
        )}

        {/* Web Server */}
        {techStack.server && (
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-muted text-foreground">
                <Server className="h-3 w-3" />
              </div>
              <span>{t('webServer')}</span>
            </div>
            <span className="font-mono text-[11px] text-foreground">
              {techStack.server}
            </span>
          </div>
        )}

        {/* Analytics */}
        {techStack.analytics && techStack.analytics.length > 0 && (
          <div className="flex items-center justify-between p-2.5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#ff9500]/10 text-[#ff9500]">
                <BarChart3 className="h-3 w-3" />
              </div>
              <span>{t('analytics')}</span>
            </div>
            <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
              {techStack.analytics.map((a, idx) => (
                <span
                  key={idx}
                  className="rounded-[5px] bg-muted/60 border border-border/40 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Summary badges */}
        <div className="p-2.5 space-y-1.5 bg-muted/20">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            {t('identifiedTechnologies')}
          </span>
          <div className="flex flex-wrap gap-1">
            {hasItems ? (
              techStack.detected.map((tItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-[5px] bg-card border border-border/70 px-2 py-0.5 font-medium text-[11px] text-foreground shadow-xs"
                >
                  {tItem}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-muted-foreground">
                {t('noTechFound')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
