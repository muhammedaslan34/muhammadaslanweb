import Link from "next/link"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaOutlineInner, CtaPrimaryInner } from "@/components/ui/cta-button-inner"

export function ServicesCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="heading-lg">Ready to Start Your Project?</h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s discuss your requirements and create something amazing together. 
            Get a free consultation and project estimate.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="cta">
              <Link href="/contact">
                <CtaPrimaryInner icon={<ArrowUpRight className="size-4" />}>
                  Get Free Consultation
                </CtaPrimaryInner>
              </Link>
            </Button>
            <Button asChild variant="ctaOutline">
              <Link href="/pricing">
                <CtaOutlineInner>
                  <Calendar className="size-4" />
                  View Pricing Plans
                </CtaOutlineInner>
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8">
            <div 
              className="text-center p-6 hover-lift rounded-xl border border-border/40 shadow-sm"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div 
              className="text-center p-6 hover-lift rounded-xl border border-border/40 shadow-sm"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="text-3xl font-bold text-accent mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div 
              className="text-center p-6 hover-lift rounded-xl border border-border/40 shadow-sm"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
