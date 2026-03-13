import {
  BlogHighlights,
  FeaturedProjects,
  FinalCTA,
  Hero,
  HomeHighlights,
  Testimonials,
  WhyChooseUs,
} from '@/components/home'

export default function HomePage() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <Hero />

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 " />
        <HomeHighlights />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56   " />
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
