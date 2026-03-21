import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaOutlineInner, CtaPrimaryInner } from "@/components/ui/cta-button-inner"

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="hero-bg pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      <div className="pointer-events-none absolute top-20 left-10 z-0 h-72 w-72 animate-float rounded-full bg-accent/10 blur-3xl" />
      <div
        className="pointer-events-none absolute right-10 bottom-20 z-0 h-96 w-96 animate-float rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: '2s' }}
      />
      <div className="container relative z-10">
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
            <Button asChild variant="cta" className="w-full sm:w-auto">
              <Link href="/contact">
                <CtaPrimaryInner icon={<ArrowUpRight className="size-4" />}>
                  Start Your Project
                </CtaPrimaryInner>
              </Link>
            </Button>
            <Button asChild variant="ctaOutline" className="w-full sm:w-auto">
              <Link href="/pricing">
                <CtaOutlineInner>
                  <ArrowUpRight className="size-4" />
                  View Pricing
                </CtaOutlineInner>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}