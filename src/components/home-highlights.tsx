import { Clock3, Gauge, ShieldCheck, Sparkles } from 'lucide-react'

const highlights = [
  {
    icon: Gauge,
    title: 'Performance First',
    description:
      'Fast-loading pages, lean bundles, and clean architecture designed for scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Delivery',
    description:
      'Production-ready code with clear structure and maintainable patterns.',
  },
  {
    icon: Sparkles,
    title: 'Design With Intent',
    description:
      'Interfaces that feel premium, consistent, and focused on user clarity.',
  },
  {
    icon: Clock3,
    title: 'Iterative Workflow',
    description:
      'Tight feedback loops to ship improvements quickly without quality loss.',
  },
]

export function HomeHighlights() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container">
        <div className="from-accent/20 via-accent/5 to-accent/10 rounded-3xl border border-border/60 bg-gradient-to-br p-6 md:p-8">
          <div className="mb-6 max-w-2xl">
            <p className="text-accent mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
              Why Clients Choose Me
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Built for business outcomes, not just visuals
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-background/80 p-5 backdrop-blur-sm transition-colors hover:border-accent/40"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-2.5 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-6">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
