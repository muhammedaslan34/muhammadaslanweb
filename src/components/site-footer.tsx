import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Muhammad Aslan</h3>
            <p className="body-sm text-muted-foreground">
              Web Developer &amp; WordPress Specialist creating modern digital solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="mailto:hello@muhammadaslan.dev"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="body-sm text-muted-foreground space-y-2">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="body-sm text-muted-foreground space-y-2">
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Get in Touch</h4>
            <div className="body-sm text-muted-foreground space-y-2">
              <p>Ready to start your project?</p>
              <Link
                href="/contact"
                className="inline-block font-medium text-primary hover:underline"
              >
                Let&apos;s talk →
              </Link>
            </div>
          </div>
        </div>

        <div className="body-sm text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>© {new Date().getFullYear()} Muhammad Aslan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
