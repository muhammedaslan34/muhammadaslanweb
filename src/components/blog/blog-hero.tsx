import { BookOpen, TrendingUp } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="hero-bg pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      <div className="pointer-events-none absolute top-20 right-10 z-0 h-80 w-80 animate-float rounded-full bg-accent/10 blur-3xl" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center glass-card px-4 py-2 text-sm">
            <BookOpen className="mr-2 h-4 w-4 text-accent" />
            Knowledge Sharing
          </div>

          <h1 className="heading-xl">
            Web Development{" "}
            <span className="gradient-text">Insights</span>
          </h1>

          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Tutorials, insights, and thoughts on modern web development, WordPress, 
            React, and the latest technologies shaping the web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>Practical Tutorials</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>Industry Insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}