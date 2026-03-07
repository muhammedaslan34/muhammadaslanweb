'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { fadeInUp, scaleIn } from '@/lib/animations'
import { ArrowRight, Mail, MessageSquare } from 'lucide-react'

interface ProjectCTAProps {
  variant?: 'default' | 'contact' | 'hire'
}

export function ProjectCTA({ variant = 'default' }: ProjectCTAProps) {
  const content = {
    default: {
      title: 'Ready to Start Your Project?',
      description: 'Let\'s work together to bring your vision to life. Get in touch to discuss your next project.',
      primaryCTA: 'Start a Project',
      primaryHref: '/contact',
      secondaryCTA: 'View Services',
      secondaryHref: '/services'
    },
    contact: {
      title: 'Interested in Working Together?',
      description: 'I\'m available for freelance projects and collaborations. Let\'s discuss how I can help you achieve your goals.',
      primaryCTA: 'Get in Touch',
      primaryHref: '/contact',
      secondaryCTA: 'View More Projects',
      secondaryHref: '/projects'
    },
    hire: {
      title: 'Like What You See?',
      description: 'I\'m currently available for new opportunities. Let\'s create something amazing together.',
      primaryCTA: 'Hire Me',
      primaryHref: '/contact',
      secondaryCTA: 'Download Resume',
      secondaryHref: '/resume.pdf'
    }
  }

  const currentContent = content[variant]

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.5 }}
      className="py-16 md:py-24"
    >
      <div className="container">
        <motion.div
          variants={scaleIn}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-accent/90 to-accent/80 p-8 md:p-12 lg:p-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              {currentContent.title}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              {currentContent.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="hover-lift bg-white text-accent hover:bg-white/90 w-full sm:w-auto"
              >
                <Link href={currentContent.primaryHref} className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {currentContent.primaryCTA}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover-lift border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Link href={currentContent.secondaryHref} className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {currentContent.secondaryCTA}
                </Link>
              </Button>
            </motion.div>

            {/* Social Proof / Trust Elements */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>Available for new projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Free consultation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
