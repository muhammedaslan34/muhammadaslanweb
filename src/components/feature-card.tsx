import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <li className="transform-gpu space-y-3 rounded-xl border border-accent/10 bg-white dark:bg-[#0F111E] p-6 backdrop-blur-3xl hover:border-accent/30 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="text-accent w-fit transform-gpu rounded-full border border-accent/20 bg-accent/10 p-4 backdrop-blur-sm">
        {icon}
      </div>
      <h4 className="font-geist text-lg font-bold tracking-tighter">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </li>
  );
}