import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <li className="space-y-3 rounded-xl border border-accent/10 p-6 hover:border-accent/30 transition-all duration-300 shadow-sm hover:shadow-md bg-white dark:bg-[#0F111E]">
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