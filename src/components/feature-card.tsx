'use client';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="space-y-3 rounded-xl border p-6 transition-all duration-300 shadow-sm hover:shadow-md border-border/40 hover:border-accent/30 relative overflow-hidden group"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      {/* Blue radial gradient overlay on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1 }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* Card content */}
      <div className="relative z-10">
        <motion.div 
          className="text-accent w-fit rounded-full border border-accent/20 bg-accent/10 p-4 group-hover:bg-accent/20 transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h4 className="font-geist text-lg font-bold tracking-tighter group-hover:text-accent transition-colors duration-300">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.li>
  );
}