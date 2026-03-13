import { Hero } from '@/components/hero'
import { HomeHighlights } from '@/components/home-highlights'
import { WhyChooseUs } from '@/components/why-choose-us'
import { FeaturedProjects } from '@/components/featured-projects'
import { Testimonials } from '@/components/testimonials'
import { BlogHighlights } from '@/components/blog-highlights'
import { FinalCTA } from '@/components/final-cta'

export default function HomePage() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <Hero />

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-accent/10 to-transparent" />
        <HomeHighlights />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <WhyChooseUs />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-muted/60 to-transparent" />
        <FeaturedProjects />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-accent/5 to-transparent" />
        <Testimonials />
      </div>

      <BlogHighlights />
      <FinalCTA />
    </div>
  )
}
