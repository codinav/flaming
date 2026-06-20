import { Section } from "@/components/ui/Section";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/site";

export function StatsBar() {
  return (
    <Section className="py-10 sm:py-16 md:py-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              <AnimatedCounter
                value={stat.value}
                decimals={stat.decimals ?? 0}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </p>
            <p className="mt-2 text-sm font-medium text-ink-500">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
