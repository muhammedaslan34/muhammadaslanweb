import Link from "next/link"
import { MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingCTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5" />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="heading-lg">Ready to Get Started?</h2>
          <p className="body-lg text-muted-foreground">
            Let&apos;s discuss your project requirements and find the perfect solution for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="hover-lift">
              <Link href="/contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Your Project
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="glass-card hover-lift">
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
          
          <div className="text-center pt-8">
            <p className="body-sm text-muted-foreground">
              🚀 Free consultation • 💰 No hidden fees • ⚡ Fast delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
