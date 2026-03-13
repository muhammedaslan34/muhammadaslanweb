import { Globe, Lightbulb, Sparkles, Zap } from 'lucide-react'

const VALUE_ICONS = {
  globe: Globe,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  zap: Zap,
} as const

export type ValueIconKey = keyof typeof VALUE_ICONS

interface Value {
  title: string
  description: string
  icon: ValueIconKey
}

interface CoreValuesSectionProps {
  values: Value[]
  title?: string
  subtitle?: string
}

export function CoreValuesSection({
  values,
  title = 'My Core Values',
  subtitle = 'The principles that guide everything I do and every decision I make.',
}: CoreValuesSectionProps) {
  return (
    <section className="mb-24">
      <div className="mb-10 text-center">
        <h2 className="heading-lg">{title}</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {values.map((value) => {
          const Icon = VALUE_ICONS[value.icon]

          return (
            <article
              key={value.title}
              className="group rounded-2xl border border-border/60 bg-background/75 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-7">
                {value.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
