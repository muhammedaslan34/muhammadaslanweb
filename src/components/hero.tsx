'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-background relative w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
          <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>
        <div className="relative z-10 container mx-auto pt-24 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
              {/* Greeting */}
              <div className="text-left">
                <p className="text-blue-400 text-lg font-medium">
                  Hi, I'm Muhammed Aslan
                </p>
              </div>
              
              {/* Main Heading */}
              <h1 className="from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text text-left text-4xl tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl font-bold">
                Web Developer, Designer & WordPress Specialist
              </h1>
              
              {/* Description */}
              <p className="text-muted-foreground text-left text-lg max-w-2xl">
                I Design Modern, Responsive Websites That Blend Elegant Design With Powerful Functionality. Check Out My Work And Let's Make Your Brand Shine Online.
              </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium"
                  >
                    Learn More About Me
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/50 text-primary hover:bg-primary/10 px-6 py-3 rounded-full font-medium"
                  >
                    View Projects
                  </Button>
                </div>
              </div>

              {/* Right Column - Photo */}
              <div className="relative flex items-end">
                <div className="relative mx-auto max-w-6xl w-full">
                  <img
                    src="/images/hero.png"
                    alt="Muhammad Aslan - Web Developer"
                    className="w-full h-auto min-h-[700px] object-cover"
                    style={{ transform: 'scaleX(-1) rotate(180deg)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>
      <div className="relative z-10 container mx-auto pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <p className="text-blue-400 text-lg font-medium">
                  Hi, I'm Muhammed Aslan
                </p>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text text-left text-4xl tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl font-bold"
              >
                Web Developer, Designer & WordPress Specialist
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-left text-lg max-w-2xl"
              >
                I Design Modern, Responsive Websites That Blend Elegant Design With Powerful Functionality. Check Out My Work And Let's Make Your Brand Shine Online.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium"
                >
                  Learn More About Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 px-6 py-3 rounded-full font-medium"
                >
                  View Projects
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: 'spring',
                stiffness: 50,
              }}
              className="relative flex items-center"
            >
              <div className="relative mx-auto max-w-6xl w-full">
                <img
                  src="/images/hero.png"
                  alt="Muhammad Aslan - Web Developer"
                  className="w-full h-auto min-h-[800px] object-cover"
                  style={{ transform: 'scaleX(-1) rotate(360deg)' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}