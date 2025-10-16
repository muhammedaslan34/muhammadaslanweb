import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-main">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center glass-card px-4 py-2 text-sm">
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
            Crafting Digital Excellence
          </div>

          <h1 className="heading-xl">
            Professional{" "}
            <span className="gradient-text">Web Development</span>{" "}
            Services
          </h1>

          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            From custom WordPress solutions to cutting-edge React applications, 
            I deliver high-performance websites that drive results and exceed expectations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="hover-lift w-full sm:w-auto">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="glass-card hover-lift w-full sm:w-auto">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}