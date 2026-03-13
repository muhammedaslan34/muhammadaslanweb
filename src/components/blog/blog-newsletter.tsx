"use client"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BlogNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5" />
      
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="inline-flex items-center glass-card px-4 py-2 text-sm">
            <Mail className="mr-2 h-4 w-4 text-accent" />
            Stay Updated
          </div>

          <h2 className="heading-lg">Never Miss an Update</h2>
          <p className="body-lg text-muted-foreground">
            Get the latest web development tutorials, tips, and insights delivered 
            straight to your inbox. No spam, unsubscribe anytime.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-card flex-1"
              />
              <Button type="submit" className="hover-lift">
                <Send className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="glass-card p-6 max-w-md mx-auto">
              <div className="text-accent font-semibold mb-2">🎉 Thanks for subscribing!</div>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive a confirmation email shortly.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div>📧 Weekly updates</div>
            <div>🚫 No spam</div>
            <div>✅ Unsubscribe anytime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
