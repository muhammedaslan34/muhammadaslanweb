'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-background relative w-full overflow-hidden pt-24 lg:pt-32">
      <div className="absolute inset-0 z-0">
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]" />
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15" />

      <div className="container relative z-10 mx-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-left text-lg font-medium text-blue-400"
              >
                Hi, I&apos;m Muhammed Aslan
              </motion.p>

              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="from-primary/10 via-foreground/85 to-foreground/50 max-w-4xl bg-gradient-to-tl bg-clip-text text-left text-4xl font-bold tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Web Developer, Designer &amp; WordPress Specialist
              </motion.h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground max-w-2xl text-left text-lg"
              >
                I design modern, responsive websites that blend elegant design
                with powerful functionality. Check out my work and let&apos;s make
                your brand shine online.
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-start gap-4 sm:flex-row"
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-6 py-3 font-medium text-white"
                >
                  <Link href="/about">
                    Learn More About Me
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 rounded-full px-6 py-3 font-medium"
                >
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: 'spring',
                stiffness: 50,
              }}
              className="relative flex items-center"
            >
              <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Muhammed Aslan portrait"
                  width={1024}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-auto w-full rounded-[1.25rem] object-cover [transform:scaleX(-1)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
