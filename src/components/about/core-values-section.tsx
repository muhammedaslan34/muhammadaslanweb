'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Globe, Lightbulb, Sparkles, Zap } from 'lucide-react'

const VALUE_ICONS = {
  globe: Globe,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  zap: Zap,
} as const

export type ValueIconKey = keyof typeof VALUE_ICONS

interface Value {
  title: string
  description: string
  icon: ValueIconKey
}

interface CoreValuesSectionProps {
  values: Value[]
  title?: string
  subtitle?: string
}

export function CoreValuesSection({
  values,
  title = 'My Core Values',
  subtitle = 'The principles that guide everything I do and every decision I make.',
}: CoreValuesSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="mb-24">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45 }}
        className="mb-10 text-center"
      >
        <h2 className="heading-lg">{title}</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {values.map((value, index) => {
          const Icon = VALUE_ICONS[value.icon]

          return (
            <motion.article
              key={value.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }}
              className="group rounded-2xl border border-border/60 bg-background/75 p-6 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-7">
                {value.description}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
