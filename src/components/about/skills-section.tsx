import { Code, Palette, Zap } from 'lucide-react'

const SKILL_ICONS = {
  code: Code,
  palette: Palette,
  zap: Zap,
} as const

export type SkillIconKey = keyof typeof SKILL_ICONS

interface Skill {
  title: string
  description: string
  icon: SkillIconKey
}

interface SkillsSectionProps {
  skills: Skill[]
  title?: string
  subtitle?: string
}

export function SkillsSection({
  skills,
  title = 'Technical Skills',
  subtitle = 'Technologies and tools I use to bring ideas to life.',
}: SkillsSectionProps) {
  return (
    <section className="mb-24">
      <div className="mb-10 text-center">
        <h2 className="heading-lg">{title}</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((skill) => {
          const Icon = SKILL_ICONS[skill.icon]

          return (
            <article
              key={skill.title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/75 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                {skill.title}
              </h3>
              <p className="text-muted-foreground leading-7">
                {skill.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
