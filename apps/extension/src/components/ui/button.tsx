import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[6px] text-xs font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 macos-button',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:brightness-105 active:brightness-95 shadow-sm',
        destructive:
          'bg-[#ff3b30] text-white hover:brightness-105 active:brightness-95',
        outline:
          'border border-border/90 bg-card hover:bg-muted/70 text-foreground active:bg-muted',
        secondary:
          'bg-muted/80 text-foreground hover:bg-muted active:bg-muted/90',
        ghost:
          'hover:bg-muted/60 text-muted-foreground hover:text-foreground active:bg-muted/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-7 px-3 py-1',
        sm: 'h-6 rounded-[5px] px-2 text-[11px]',
        lg: 'h-8 rounded-[7px] px-4 text-xs',
        icon: 'h-6 w-6 p-0 rounded-[5px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
