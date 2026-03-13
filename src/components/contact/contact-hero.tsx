import { Mail, MessageSquare } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center glass-card px-4 py-2 text-sm">
            <MessageSquare className="mr-2 h-4 w-4 text-accent" />
            Let&apos;s Work Together
          </div>

          <h1 className="heading-xl">
            Start Your{" "}
            <span className="gradient-text">Project Today</span>
          </h1>

          <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your vision to life? Get in touch for a free consultation 
            and let&apos;s discuss how we can create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>No Obligation Quote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
