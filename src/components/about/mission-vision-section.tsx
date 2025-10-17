'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BorderBeam } from '@/components/ui/border-beam';
import { Rocket, Target } from 'lucide-react';

interface MissionVisionSectionProps {
  mission: string;
  vision: string;
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });

  return (
    <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 grid gap-12 md:grid-cols-2"
      >
        {/* Mission Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
        >
          <BorderBeam
            duration={8}
            size={300}
            className="via-[#0047e0]/40 from-transparent to-transparent"
          />

          <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
            <Rocket className="text-[#0047e0] h-8 w-8" />
          </div>

          <div className="space-y-4">
            <h2 className="from-[#0047e0]/90 to-[#0047e0]/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              My Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {mission}
            </p>
          </div>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
        >
          <BorderBeam
            duration={8}
            size={300}
            className="from-transparent via-[#0047e0]/40 to-transparent"
            reverse
          />
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0047e0]/20 to-[#0047e0]/5 backdrop-blur-sm">
            <Target className="h-8 w-8 text-[#0047e0]" />
          </div>

          <h2 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-3xl font-bold text-transparent">
            My Vision
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {vision}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}