"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { fadeInUp, fadeInLeft, staggerContainer } from '@/lib/animations';

interface TimelineItem {
  phase: string;
  description: string;
  date: string;
}

interface ProjectTimelineProps {
  timeline: TimelineItem[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24"
    >
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project Timeline
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Journey through the development process
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/20" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInLeft}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>

                  {/* Timeline Content */}
                  <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
                    <div className="flex justify-between items-start gap-4 flex-wrap mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.phase}
                      </h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full bg-accent/10">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
