'use client'

import { motion } from 'framer-motion'
import { Rocket, Target } from 'lucide-react'

interface MissionVisionSectionProps {
  mission: string
  vision: string
}

const SECTION_CARDS = [
  {
    key: 'mission',
    title: 'My Mission',
    icon: Rocket,
  },
  {
    key: 'vision',
    title: 'My Vision',
    icon: Target,
  },
] as const

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const contentMap = {
    mission,
    vision,
  } as const

  return (
    <section className="mx-auto mb-24 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <p className="text-accent mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
          Direction
        </p>
        <h2 className="heading-lg">Mission and Vision</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {SECTION_CARDS.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.article
              key={card.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/75 p-7 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 md:p-8"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
                {card.title}
              </h3>

              <p className="text-muted-foreground leading-7">
                {contentMap[card.key]}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
