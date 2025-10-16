'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { CardHoverEffect } from '@/components/ui/pulse-card';
import { DeveloperPortrait } from '@/components/developer-portrait';
import { HeroMotion } from '@/components/hero-motion';
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
  Code,
  Palette,
  Zap,
} from 'lucide-react';

interface AboutUsProps {
  title?: string;
  subtitle?: string;
  mission?: string;
  vision?: string;
  values?: Array<{
    title: string;
    description: string;
    icon: keyof typeof iconComponents;
  }>;
  className?: string;
}

const iconComponents = {
  Users: Users,
  Heart: Heart,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Target: Target,
  Code: Code,
  Palette: Palette,
  Zap: Zap,
};

const defaultValues: AboutUsProps['values'] = [
  {
    title: 'Innovation',
    description:
      'I constantly push boundaries and explore new possibilities to create cutting-edge web solutions that stand out.',
    icon: 'Lightbulb',
  },
  {
    title: 'Quality',
    description:
      'I strive for perfection in everything I do, consistently delivering high-quality, pixel-perfect websites.',
    icon: 'Sparkles',
  },
  {
    title: 'Performance',
    description:
      'I optimize every project for speed and efficiency, ensuring fast loading times and excellent user experience.',
    icon: 'Zap',
  },
  {
    title: 'Impact',
    description:
      "I measure my success by the positive difference I make in my clients' businesses and their online presence.",
    icon: 'Globe',
  },
];

export default function AboutPage() {
  const aboutData = {
    title: 'About Me',
    subtitle:
      'Passionate web developer creating beautiful, functional, and user-centered digital experiences.',
    mission:
      'My mission is to help businesses establish a strong online presence through modern, responsive websites that not only look stunning but also drive results and engage users effectively.',
    vision:
      'I envision a world where every business has access to professional, high-quality web development services that help them grow and succeed in the digital landscape.',
    values: defaultValues,
    className: 'relative overflow-hidden py-20',
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden pt-20">
      <HeroMotion />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 50%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 50%, hsla(220, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.06) 0, hsla(220, 100%, 85%, 0.06) 80%, transparent 100%)"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h1 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="text-muted-foreground mt-6 text-xl">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="via-[#0047e0]/40 from-transparent to-transparent"
              />

              <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Rocket className="text-[#0047e0] h-8 w-8" />
              </div>

              <div className="space-y-4">
                <h2 className="from-[#0047e0]/90 to-[#0047e0]/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  My Mission
                </h2>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-[#0047e0]/40 to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0047e0]/20 to-[#0047e0]/5 backdrop-blur-sm">
                <Target className="h-8 w-8 text-[#0047e0]" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-3xl font-bold text-transparent">
                My Vision
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              My Core Values
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              The principles that guide everything I do and every decision I make.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? 'blue'
                        : index === 1
                          ? 'blue'
                          : index === 2
                            ? 'blue'
                            : 'blue'
                    }
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Developer Portrait Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <div className="mb-12 text-center">
            <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Meet The Developer
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Get to know the person behind the code
            </p>
          </div>
          <div className="flex justify-center">
            <DeveloperPortrait className="max-w-md" />
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mb-24"
        >
          <div className="mb-12 text-center">
            <h2 className="from-foreground/80 via-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Technical Skills
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Technologies and tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-3xl"
            >
              <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Code className="h-8 w-8 text-[#0047e0]" />
              </div>
              <h3 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-2xl font-bold text-transparent">
                Frontend Development
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript frameworks.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-3xl"
            >
              <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Palette className="h-8 w-8 text-[#0047e0]" />
              </div>
              <h3 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-2xl font-bold text-transparent">
                UI/UX Design
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                User-centered design, responsive layouts, and creating intuitive user experiences.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="group border-border/40 relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-3xl"
            >
              <div className="from-[#0047e0]/20 to-[#0047e0]/5 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Zap className="h-8 w-8 text-[#0047e0]" />
              </div>
              <h3 className="mb-4 bg-gradient-to-r from-[#0047e0]/90 to-[#0047e0]/70 bg-clip-text text-2xl font-bold text-transparent">
                Performance & SEO
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Optimizing websites for speed, search engines, and overall performance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}