"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInLeft, fadeInRight, badgeAnimation, staggerContainer } from '@/lib/animations';

interface ProjectHeaderProps {
  title: string;
  category: string;
  status: string;
  date: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export function ProjectHeader({
  title,
  category,
  status,
  date,
  description,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectHeaderProps) {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      className="py-12 md:py-20 bg-muted/30"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Project Info */}
          <motion.div
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Category & Status Badges */}
            <motion.div
              variants={badgeAnimation}
              className="flex flex-wrap gap-2"
            >
              <Badge className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors text-sm">
                {category}
              </Badge>
              <Badge className="bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20 transition-colors text-sm">
                {status}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInLeft}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              {title}
            </motion.h1>

            {/* Date */}
            <motion.div
              variants={fadeInLeft}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{date}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInLeft}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInLeft}
              className="flex flex-wrap gap-3 pt-2"
            >
              {liveUrl && (
                <Button
                  asChild
                  className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift"
                >
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 hover-lift"
                >
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Project Image */}
          <motion.div
            variants={fadeInRight}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
