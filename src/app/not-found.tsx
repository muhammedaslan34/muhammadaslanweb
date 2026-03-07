'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search, Home } from 'lucide-react'
import { fadeInUp, scaleIn } from '@/lib/animations'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center px-4">
      <motion.div
        initial="initial"
        animate="animate"
        className="max-w-2xl w-full text-center space-y-8"
      >
        {/* 404 Icon */}
        <motion.div variants={scaleIn} className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
            <div className="relative bg-gradient-to-br from-accent/10 to-accent/5 p-12 rounded-full border border-accent/20">
              <Search className="w-24 h-24 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-accent">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Button asChild size="lg" className="hover-lift w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="hover-lift w-full sm:w-auto"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              View Projects
            </Link>
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          variants={fadeInUp}
          className="pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Looking for something else?
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="/about"
              className="text-accent hover:underline underline-offset-4"
            >
              About Me
            </Link>
            <Link
              href="/services"
              className="text-accent hover:underline underline-offset-4"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-accent hover:underline underline-offset-4"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-accent hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
