import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <li 
      className="space-y-3 rounded-xl border p-6 transition-all duration-300 shadow-sm hover:shadow-md border-border/40 hover:border-accent/30"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="text-accent w-fit rounded-full border border-accent/20 bg-accent/10 p-4">
        {icon}
      </div>
      <h4 className="font-geist text-lg font-bold tracking-tighter">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </li>
  );
}