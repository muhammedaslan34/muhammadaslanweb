'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Skill {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
}

export function SkillsSection({ 
  skills,
  title = "Technical Skills",
  subtitle = "Technologies and tools I use to bring ideas to life."
}: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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

      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          
          return (
            <motion.div
              key={skill.title}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <IconComponent className="h-8 w-8 text-[#0047e0]" />
              </div>
              <h3 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-2xl font-bold text-transparent">
                {skill.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}