import React from 'react';
import { cn } from '@/lib/utils';

interface CardHoverEffectProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'purple' | 'blue' | 'amber' | 'rose';
  glowEffect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CardHoverEffect({
  icon,
  title,
  description,
  variant = 'purple',
  glowEffect = false,
  size = 'md',
  className = "",
}: CardHoverEffectProps) {
  const variantStyles = {
    purple: {
      gradient: 'from-purple-500/20 to-purple-500/5',
      iconBg: 'from-purple-500/20 to-purple-500/5',
      iconColor: 'text-purple-500',
      titleGradient: 'from-purple-500/90 to-purple-500/70',
      glow: 'shadow-purple-500/20',
    },
    blue: {
      gradient: 'from-[#0047e0]/20 to-[#0047e0]/5',
      iconBg: 'from-[#0047e0]/20 to-[#0047e0]/5',
      iconColor: 'text-[#0047e0]',
      titleGradient: 'from-[#0047e0]/90 to-[#0047e0]/70',
      glow: 'shadow-[#0047e0]/20',
    },
    amber: {
      gradient: 'from-amber-500/20 to-amber-500/5',
      iconBg: 'from-amber-500/20 to-amber-500/5',
      iconColor: 'text-amber-500',
      titleGradient: 'from-amber-500/90 to-amber-500/70',
      glow: 'shadow-amber-500/20',
    },
    rose: {
      gradient: 'from-rose-500/20 to-rose-500/5',
      iconBg: 'from-rose-500/20 to-rose-500/5',
      iconColor: 'text-rose-500',
      titleGradient: 'from-rose-500/90 to-rose-500/70',
      glow: 'shadow-rose-500/20',
    },
  };

  const sizeStyles = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br backdrop-blur-3xl transition-all duration-300 hover:scale-105',
        sizeStyles[size],
        glowEffect && `hover:shadow-2xl ${currentVariant.glow}`,
        className
      )}
    >
      <div className="relative z-10">
        <div
          className={cn(
            'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm',
            currentVariant.iconBg
          )}
        >
          <div className={currentVariant.iconColor}>{icon}</div>
        </div>

        <h3
          className={cn(
            'mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent',
            currentVariant.titleGradient
          )}
        >
          {title}
        </h3>

        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>

      {glowEffect && (
        <div
          className={cn(
            'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            currentVariant.gradient
          )}
        />
      )}
    </div>
  );
}
