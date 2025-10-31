'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import { CheckCircle, Target, AlertCircle, Lightbulb } from 'lucide-react'

interface ProjectOverviewProps {
  description: string
  challenge?: string
  solution?: string
  objectives?: string[]
}

export function ProjectOverview({
  description,
  challenge,
  solution,
  objectives
}: ProjectOverviewProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24"
    >
      <div className="container">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project Overview
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover the story behind the project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Description */}
            <motion.div variants={fadeInLeft} className="prose prose-gray max-w-none">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    About This Project
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Objectives */}
            {objectives && objectives.length > 0 && (
              <motion.div variants={fadeInLeft}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      Key Objectives
                    </h3>
                    <ul className="space-y-3">
                      {objectives.map((objective, index) => (
                        <motion.li
                          key={index}
                          variants={fadeInLeft}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{objective}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Challenge */}
            {challenge && (
              <motion.div variants={fadeInRight}>
                <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      The Challenge
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-11">
                    {challenge}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Solution */}
            {solution && (
              <motion.div variants={fadeInRight}>
                <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Our Solution
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed ml-11">
                    {solution}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
