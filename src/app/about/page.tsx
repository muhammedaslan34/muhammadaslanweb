import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { CoreValuesSection } from '@/components/about/core-values-section'
import type { ValueIconKey } from '@/components/about/core-values-section'
import { MissionVisionSection } from '@/components/about/mission-vision-section'
import { SkillsSection } from '@/components/about/skills-section'
import type { SkillIconKey } from '@/components/about/skills-section'
import { Button } from '@/components/ui/button'

type CoreValue = {
  title: string
  description: string
  icon: ValueIconKey
}

type TechnicalSkill = {
  title: string
  description: string
  icon: SkillIconKey
}

type ImpactMetric = {
  label: string
  value: string
}

const ABOUT_DATA = {
  title: 'About Me',
  subtitle:
    'I design and build modern web experiences that balance aesthetics, speed, and business impact.',
  story:
    'I work with startups and growing businesses to ship clean, scalable products. My process combines strong UX thinking with production-grade engineering so every release is usable, maintainable, and measurable.',
  mission:
    'My mission is to help businesses establish a strong online presence through modern, responsive websites that engage users and drive real results.',
  vision:
    'I envision a web where every business can access high-quality digital products that are fast, accessible, and built for long-term growth.',
} as const

const IMPACT_METRICS: ImpactMetric[] = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Focused' },
]

const CORE_VALUES: CoreValue[] = [
  {
    title: 'Innovation',
    description:
      'I constantly push boundaries and explore new possibilities to create cutting-edge web solutions.',
    icon: 'lightbulb',
  },
  {
    title: 'Quality',
    description:
      'I aim for clarity in code and polish in UI so products feel professional from day one.',
    icon: 'sparkles',
  },
  {
    title: 'Performance',
    description:
      'I optimize for speed, stability, and user trust, from first paint to interaction details.',
    icon: 'zap',
  },
  {
    title: 'Impact',
    description:
      'I measure success by business outcomes and how effectively products solve real user problems.',
    icon: 'globe',
  },
]

const TECHNICAL_SKILLS: TechnicalSkill[] = [
  {
    title: 'Frontend Engineering',
    description:
      'React, Next.js, TypeScript, and modern UI systems for robust product interfaces.',
    icon: 'code',
  },
  {
    title: 'UI/UX Execution',
    description:
      'Design translation, responsive layouts, and interaction patterns that stay consistent across devices.',
    icon: 'palette',
  },
  {
    title: 'Performance & SEO',
    description:
      'Core Web Vitals, technical SEO, and practical optimization for discoverability and speed.',
    icon: 'zap',
  },
]

const WORK_PRINCIPLES = [
  'Product-first implementation with clear business goals',
  'Fast, accessible interfaces with maintainable architecture',
  'Execution focused on measurable outcomes, not visual noise',
]

export const metadata: Metadata = {
  title: 'About | Muhammad Aslan',
  description:
    'Learn about Muhammad Aslan, a web developer focused on performant, user-centered digital products.',
}

export default function AboutPage() {
  return (
    <section className="bg-main relative w-full overflow-hidden pb-24 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="animate-float absolute left-10 top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div
        className="animate-float absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: '2s' }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <section className="grid gap-10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="glass-card inline-flex items-center px-4 py-2 text-sm">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              About Muhammad Aslan
            </div>

            <div className="space-y-5">
              <h1 className="heading-xl text-balance">
                Designing and building{' '}
                <span className="gradient-text">high-performance products</span>{' '}
                for growing brands
              </h1>
              <p className="body-lg text-muted-foreground max-w-2xl">
                {ABOUT_DATA.subtitle}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button size="lg" asChild className="hover-lift min-w-44">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="glass-card hover-lift min-w-44">
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>

            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {IMPACT_METRICS.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4 text-center backdrop-blur-xl"
                >
                  <p className="text-accent text-2xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">{metric.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-2 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)+2px)]">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Muhammad Aslan portrait"
                  width={1400}
                  height={1400}
                  priority
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-24 max-w-6xl overflow-hidden rounded-3xl border border-border/60 bg-background/75 p-8 backdrop-blur-xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-start">
            <div className="space-y-4">
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
                How I Work
              </p>
              <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                Clear process, reliable delivery, and long-term maintainability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {ABOUT_DATA.story}
              </p>
            </div>
            <ul className="space-y-3">
              {WORK_PRINCIPLES.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-3"
                >
                  <CheckCircle2 className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-muted-foreground text-sm leading-6">
                    {principle}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <MissionVisionSection mission={ABOUT_DATA.mission} vision={ABOUT_DATA.vision} />
        <CoreValuesSection
          values={CORE_VALUES}
          title="Operating Principles"
          subtitle="The standards I apply in every planning, development, and delivery cycle."
        />
        <SkillsSection
          skills={TECHNICAL_SKILLS}
          title="Technical Focus"
          subtitle="Core areas I use to design, build, and optimize digital products."
        />
      </div>
    </section>
  )
}
