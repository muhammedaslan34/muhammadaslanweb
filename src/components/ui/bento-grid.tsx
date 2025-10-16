'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = 'small',
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group border-border/40 bg-section/50 hover:border-accent/50 hover:bg-section/70 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 backdrop-blur-3xl transition-all duration-500 hover:shadow-lg',
        className,
      )}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-accent/10 text-accent group-hover:bg-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div className="text-accent mt-4 flex items-center text-sm font-medium">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>
    </motion.div>
  );
};

interface BentoGridProps {
  items: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
  }>;
  className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            size={item.size}
            className={cn(
              // Mobile: all full width (col-span-1)
              // Tablet (sm): all half width (col-span-1 out of 2)
              // Desktop (lg): use 12-column grid
              item.size === 'large'
                ? 'lg:col-span-6'
                : item.size === 'medium'
                ? 'lg:col-span-4'
                : 'lg:col-span-3',
              'h-full min-h-[200px]',
            )}
          />
        ))}
      </motion.div>
    </div>
  );
}