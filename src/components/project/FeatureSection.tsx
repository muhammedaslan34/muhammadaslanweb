'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations'
import { ProjectFeature } from '@/types/project'
import { LucideIcon, Sparkles, Zap, Shield, Rocket, Code, Users } from 'lucide-react'

interface FeatureSectionProps {
  features: ProjectFeature[]
}

// Icon mapping for features
const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  rocket: Rocket,
  code: Code,
  users: Users,
}

function getIconComponent(iconName?: string) {
  if (!iconName) return Sparkles
  return iconMap[iconName.toLowerCase()] || Sparkles
}

export function FeatureSection({ features }: FeatureSectionProps) {
  if (!features || features.length === 0) return null

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
            Discover what makes this project stand out
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon)

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
              >
                <motion.div variants={cardHover}>
                  <Card className="glass-card h-full hover:border-accent/50 transition-colors duration-300">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Statistics or Call-out if needed */}
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
  )
}
