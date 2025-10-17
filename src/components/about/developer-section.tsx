'use client';

import { motion } from 'framer-motion';
import { DeveloperPortrait } from '@/components/developer-portrait';

interface DeveloperSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function DeveloperSection({ 
  title = "Meet The Developer",
  subtitle = "Get to know the person behind the code",
  className = "max-w-md"
}: DeveloperSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      className="mb-24"
    >
      <div className="mb-12 text-center">
        <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </div>
      <div className="flex justify-center">
        <DeveloperPortrait className={className} />
      </div>
    </motion.div>
  );
}