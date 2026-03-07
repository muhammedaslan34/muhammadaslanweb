'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { fadeInUp, staggerContainer, counterAnimation } from '@/lib/animations'
import { ProjectMetric, ProjectTestimonial } from '@/types/project'
import { Quote, Award } from 'lucide-react'

interface ResultsSectionProps {
  metrics?: ProjectMetric[]
  testimonials?: ProjectTestimonial[]
  achievements?: string[]
}

function CountUpAnimation({ end, suffix = '' }: { end: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Extract numeric value from string
  const numericValue = parseFloat(end.replace(/[^0-9.]/g, ''))
  const hasDecimal = end.includes('.')

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000 // 2 seconds
      const increment = numericValue / (duration / 16) // 60fps

      const timer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, numericValue])

  return (
    <span ref={ref}>
      {hasDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  )
}

export function ResultsSection({
  metrics,
  testimonials,
  achievements
}: ResultsSectionProps) {
  // Only render if there's content
  const hasContent = (metrics && metrics.length > 0) ||
                     (testimonials && testimonials.length > 0) ||
                     (achievements && achievements.length > 0)

  if (!hasContent) return null

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
            Results & Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            Measuring the success of the project
          </p>
        </motion.div>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {metrics.map((metric, index) => (
              <motion.div key={index} variants={counterAnimation}>
                <Card className="glass-card text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                      <CountUpAnimation end={metric.value} suffix={metric.suffix} />
                    </div>
                    <p className="text-muted-foreground text-sm">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="glass-card h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-accent flex-shrink-0" />
                      <div className="flex-1">
                        <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-accent font-semibold text-lg">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <motion.div variants={fadeInUp}>
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <CardTitle>Achievements & Recognition</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
