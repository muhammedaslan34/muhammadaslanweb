import Link from "next/link"
import { ArrowUpRight, Check, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaOutlineInner, CtaPrimaryInner } from "@/components/ui/cta-button-inner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "$1,500",
    description: "Perfect for small businesses and personal projects",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Basic SEO optimization",
      "Contact form",
      "Social media integration",
      "30-day support",
      "Basic analytics setup"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Professional",
    price: "$3,500",
    description: "Ideal for growing businesses and e-commerce",
    features: [
      "Up to 15 pages",
      "Advanced responsive design",
      "Advanced SEO optimization",
      "E-commerce functionality",
      "Payment integration",
      "Custom animations",
      "90-day support",
      "Advanced analytics",
      "Performance optimization",
      "Content management system"
    ],
    popular: true,
    cta: "Most Popular"
  },
  {
    name: "Premium",
    price: "$6,500",
    description: "For complex applications and enterprise solutions",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Advanced functionality",
      "Third-party integrations",
      "Custom admin dashboard",
      "Advanced security",
      "6-month support",
      "Priority support",
      "Performance monitoring",
      "Custom training",
      "Ongoing maintenance",
      "Scalable architecture"
    ],
    popular: false,
    cta: "Enterprise"
  }
]

export function PricingPlans() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`glass-card hover-lift relative flex flex-col h-full ${
                plan.popular 
                  ? 'ring-2 ring-accent scale-105 shadow-2xl' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">per project</span>
                </div>
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow space-y-6">
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                      <span className="body-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full justify-center"
                    variant={plan.popular ? "cta" : "ctaOutline"}
                  >
                    <Link href="/contact">
                      {plan.popular ? (
                        <CtaPrimaryInner icon={<Zap className="size-4" />}>
                          {plan.cta}
                        </CtaPrimaryInner>
                      ) : (
                        <CtaOutlineInner>
                          <ArrowUpRight className="size-4" />
                          {plan.cta}
                        </CtaOutlineInner>
                      )}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="body-sm text-muted-foreground">
            Need something custom? All projects are tailored to your specific requirements.
          </p>
          <Button asChild variant="ctaOutline">
            <Link href="/contact">
              <CtaOutlineInner>
                <ArrowUpRight className="size-4" />
                Request Custom Quote
              </CtaOutlineInner>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}