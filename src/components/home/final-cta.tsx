'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="from-accent/20 pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />

      <div className="container">
        <motion.div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-accent/10 p-8 text-center shadow-xl md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-16 h-52 w-52 rounded-full bg-[#8b5cf6]/10 blur-3xl" />

          <motion.h2
            className="heading-lg relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to start your project?
          </motion.h2>

          <motion.p
            className="body-lg text-muted-foreground relative z-10 mx-auto mt-5 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let&apos;s work together to bring your digital vision to life. Get in
            touch to discuss your goals, timeline, and technical scope.
          </motion.p>

          <motion.div
            className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" asChild className="min-w-44">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" size="lg" asChild className="min-w-44">
                <Link href="/pricing">
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
