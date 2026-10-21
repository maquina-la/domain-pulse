import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground',
        destructive:
          'bg-[#ff3b30]/15 text-[#ff3b30] dark:bg-[#ff453a]/20 dark:text-[#ff453a]',
        outline:
          'border border-border/80 text-foreground bg-muted/30',
        success:
          'bg-[#34c759]/15 text-[#248a3d] dark:bg-[#30d158]/20 dark:text-[#30d158]',
        warning:
          'bg-[#ff9500]/15 text-[#b26a00] dark:bg-[#ff9f0a]/20 dark:text-[#ff9f0a]',
        danger:
          'bg-[#ff3b30]/15 text-[#d70015] dark:bg-[#ff453a]/20 dark:text-[#ff453a]',
        info:
          'bg-[#007aff]/15 text-[#0062cc] dark:bg-[#0a84ff]/20 dark:text-[#0a84ff]',
        purple:
          'bg-[#af52de]/15 text-[#8923be] dark:bg-[#bf5af2]/20 dark:text-[#bf5af2]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
