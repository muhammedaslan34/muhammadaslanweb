'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CardHoverEffect } from '@/components/ui/pulse-card';
import { LucideIcon } from 'lucide-react';

interface Value {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface CoreValuesSectionProps {
  values: Value[];
  title?: string;
  subtitle?: string;
}

export function CoreValuesSection({ 
  values, 
  title = "My Core Values",
  subtitle = "The principles that guide everything I do and every decision I make."
}: CoreValuesSectionProps) {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <div ref={valuesRef} className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-12 text-center"
      >
        <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {values.map((value, index) => {
          const IconComponent = value.icon;

          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={
                valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1 + 0.2,
                ease: 'easeOut',
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <CardHoverEffect
                icon={<IconComponent className="h-6 w-6" />}
                title={value.title}
                description={value.description}
                variant="blue"
                glowEffect={true}
                size="lg"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}