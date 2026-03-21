import { DollarSign, CheckCircle } from "lucide-react"

export function PricingHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="hero-bg pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-20 left-10 z-0 h-80 w-80 animate-float rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center glass-card px-4 py-2 text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-accent" />
            Transparent Pricing
          </div>

          <h1 className="heading-xl">
            Simple, Fair{" "}
            <span className="gradient-text">Pricing</span>
          </h1>

          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect package for your project. All plans include modern design, 
            responsive development, and ongoing support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>30-Day Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}