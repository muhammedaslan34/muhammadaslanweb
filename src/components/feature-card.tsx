import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <li className="transform-gpu space-y-3 rounded-xl border border-border/40 bg-section p-4 backdrop-blur-3xl">
      <div className="text-accent w-fit transform-gpu rounded-full border border-border/40 bg-accent/10 p-4 backdrop-blur-sm">
        {icon}
      </div>
      <h4 className="font-geist text-lg font-bold tracking-tighter">
        {title}
      </h4>
      <p className="text-muted-foreground">{description}</p>
    </li>
  );
}