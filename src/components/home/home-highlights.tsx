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
    <section className="relative bg-background py-12 md:py-16">
      {/* Match hero background: radial glow + subtle grid */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15" />
      </div>

      <div className="container relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 md:p-8 dark:bg-background/70">
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl dark:bg-accent/20" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl dark:bg-accent/20" />
          {/* Dot grid: dark dots in light mode, light dots in dark mode */}
          <div
            className="pointer-events-none absolute inset-0 bg-[length:20px_20px] bg-[radial-gradient(circle,rgba(15,23,42,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)]"
            aria-hidden
          />

          <div className="relative z-10 mb-6 max-w-2xl">
            <p className="text-accent mb-2 text-xs font-semibold tracking-[0.2em] uppercase">
              Why Clients Choose Me
            </p>
            <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              Built for business outcomes, not just visuals
            </h2>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/80 bg-muted/30 p-5 backdrop-blur-sm transition-colors hover:border-accent/40 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-accent/15 p-2.5 text-accent dark:bg-accent/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground mb-2 text-base font-semibold">
                    {item.title}
                  </h3>
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
