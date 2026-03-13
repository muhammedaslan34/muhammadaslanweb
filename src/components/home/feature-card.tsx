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
      className="group relative space-y-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/40"
    >
      {/* Card content */}
      <div className="relative z-10">
        <motion.div
          className="text-accent w-fit rounded-xl bg-accent/20 p-2.5 transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h4 className="font-geist text-lg font-bold tracking-tighter text-white transition-colors duration-300 group-hover:text-accent">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-white/50">{description}</p>
      </div>
    </motion.li>
  );
}
