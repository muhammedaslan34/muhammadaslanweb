'use client';

import { Spotlight } from '@/components/ui/spotlight';
import { HeroMotion } from '@/components/hero-motion';
import {
  AboutHeader,
  MissionVisionSection,
  CoreValuesSection,
  DeveloperSection,
  SkillsSection
} from '@/components/about';
import {
  Globe,
  Lightbulb,
  Sparkles,
  Zap,
  Code,
  Palette,
} from 'lucide-react';

export default function AboutPage() {
  const aboutData = {
    title: 'About Me',
    subtitle:
      'Passionate web developer creating beautiful, functional, and user-centered digital experiences.',
    mission:
      'My mission is to help businesses establish a strong online presence through modern, responsive websites that not only look stunning but also drive results and engage users effectively.',
    vision:
      'I envision a world where every business has access to professional, high-quality web development services that help them grow and succeed in the digital landscape.',
  };

  const coreValues = [
    {
      title: 'Innovation',
      description:
        'I constantly push boundaries and explore new possibilities to create cutting-edge web solutions that stand out.',
      icon: Lightbulb,
    },
    {
      title: 'Quality',
      description:
        'I strive for perfection in everything I do, consistently delivering high-quality, pixel-perfect websites.',
      icon: Sparkles,
    },
    {
      title: 'Performance',
      description:
        'I optimize every project for speed and efficiency, ensuring fast loading times and excellent user experience.',
      icon: Zap,
    },
    {
      title: 'Impact',
      description:
        "I measure my success by the positive difference I make in my clients' businesses and their online presence.",
      icon: Globe,
    },
  ];

  const technicalSkills = [
    {
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript frameworks.',
      icon: Code,
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design, responsive layouts, and creating intuitive user experiences.',
      icon: Palette,
    },
    {
      title: 'Performance & SEO',
      description: 'Optimizing websites for speed, search engines, and overall performance.',
      icon: Zap,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pt-20">
      <HeroMotion />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(220, 100%, 50%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 50%, hsla(220, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.08) 0, hsla(220, 100%, 55%, 0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 85%, 0.06) 0, hsla(220, 100%, 85%, 0.06) 80%, transparent 100%)"
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <AboutHeader 
          title={aboutData.title}
          subtitle={aboutData.subtitle}
        />

        <MissionVisionSection 
          mission={aboutData.mission}
          vision={aboutData.vision}
        />

        <CoreValuesSection 
          values={coreValues}
        />

        <DeveloperSection />

        <SkillsSection 
          skills={technicalSkills}
        />
      </div>
    </section>
  );
}