import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <li
      className="space-y-3 rounded-xl border p-6 transition-all duration-300 shadow-sm hover:shadow-md border-border/40 hover:border-accent/30 hover:scale-[1.02] relative overflow-hidden group"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      {/* Blue radial gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 40%, transparent 70%)'
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="text-accent w-fit rounded-full border border-accent/20 bg-accent/10 p-4 group-hover:bg-accent/20 transition-colors duration-300">
          {icon}
        </div>
        <h4 className="font-geist text-lg font-bold tracking-tighter group-hover:text-accent transition-colors duration-300">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </li>
  );
}