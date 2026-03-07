"use client";

import { Badge } from "@/components/ui/badge";
import { User, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface TechStackProps {
  technologies: string[];
  clientName: string;
  projectDate: string;
}

export function TechStack({ technologies, clientName, projectDate }: TechStackProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project Information
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Key details about this project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Client */}
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Client</p>
                <p className="font-semibold text-foreground">{clientName}</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold text-foreground">{projectDate}</p>
              </div>
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 md:col-span-1"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 text-accent">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {technologies.slice(0, 3).map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {technologies.length > 3 && (
                    <Badge
                      variant="outline"
                      className="bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 text-xs"
                    >
                      +{technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full Tech Stack List */}
        {technologies.length > 3 && (
          <motion.div
            variants={fadeInUp}
            className="mt-8 max-w-5xl mx-auto"
          >
            <div className="p-6 rounded-xl bg-card/30 border border-border/30">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Full Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-accent/5 border-accent/20 text-foreground hover:bg-accent/10 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
