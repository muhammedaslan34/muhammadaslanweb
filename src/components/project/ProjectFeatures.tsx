"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, staggerContainer } from '@/lib/animations';

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  if (!features || features.length === 0) return null;

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
            Key Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Essential capabilities that power this project
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={fadeInLeft}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {features.length >= 6 && (
          <motion.div
            variants={fadeInUp}
            className="mt-12 text-center p-8 rounded-2xl bg-accent/5 border border-accent/10"
          >
            <p className="text-lg text-muted-foreground">
              <span className="text-2xl font-bold text-accent">{features.length}</span> powerful
              features designed to deliver exceptional results
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
