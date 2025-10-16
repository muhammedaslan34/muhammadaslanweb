import type { ReactNode } from 'react';
import {
  Code,
  Terminal,
  Paintbrush,
  Rocket,
  Book,
  PlusCircle,
} from 'lucide-react';
import { FeatureCard } from './feature-card';

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Developer-Friendly',
    desc: 'Tailored for developers to create and iterate fast, with minimal overhead and maximum flexibility.',
  },
  {
    icon: <Terminal className="h-6 w-6" />,
    title: 'CLI Support',
    desc: 'Command-line interface support for seamless development and workflow integration.',
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: 'Easily Customizable',
    desc: 'Every block is built to be editable. From layout to logic, style to structure—make it your own.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'v0 Support',
    desc: 'Launch fast with confidence. Perfect for MVPs, prototypes, and weekend projects.',
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: 'Full Documentation',
    desc: 'Comprehensive documentation to understand every feature and maximize your development experience.',
  },
  {
    icon: <PlusCircle className="h-6 w-6" />,
    title: 'Contribute Yours',
    desc: 'Add your own blocks to the library and become part of the MVPBlocks community.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h3 className="font-geist mt-4 text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Let's help build your MVP
            </h3>
            <p className="font-geist text-foreground/60 mt-3 leading-relaxed">
              Transform your ideas into reality with powerful, customizable components designed for rapid development and seamless integration.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(59, 130, 246, 0.3) 4.54%, rgba(37, 99, 235, 0.4) 34.2%, rgba(29, 78, 216, 0.2) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mt-5 h-px w-1/2" />
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.desc}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}