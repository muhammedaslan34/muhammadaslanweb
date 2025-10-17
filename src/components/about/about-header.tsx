'use client';

import { motion } from 'framer-motion';

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export function AboutHeader({ title, subtitle }: AboutHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <h1 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="text-muted-foreground mt-6 text-xl">
        {subtitle}
      </p>
    </motion.div>
  );
}