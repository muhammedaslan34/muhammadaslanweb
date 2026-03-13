'use client';

import { motion } from 'framer-motion';

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export function AboutHeader({ title, subtitle }: AboutHeaderProps) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const hasMultipleWords = words.length > 1;
  const titlePrefix = hasMultipleWords ? words.slice(0, -1).join(' ') : '';
  const highlightedWord = hasMultipleWords ? words[words.length - 1] : words[0] || title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto mb-16 max-w-2xl text-center"
    >
      <h1 className="heading-xl text-foreground">
        {titlePrefix ? (
          <>
            {titlePrefix}{' '}
            <span className="gradient-text">{highlightedWord}</span>
          </>
        ) : (
          <span className="gradient-text">{highlightedWord}</span>
        )}
      </h1>
      <p className="text-muted-foreground mt-6 text-xl">
        {subtitle}
      </p>
    </motion.div>
  );
}
