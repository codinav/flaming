import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { industries } from "@/lib/site";

export function IndustriesSection() {
  return (
    <Section className="mesh bg-canvas-soft">
      <SectionHeading
        align="center"
        eyebrow="Industries we serve"
        title="Logistics tuned to your sector"
        description="Every industry moves differently. We bring sector-specific expertise to the way your cargo is planned, cleared, and delivered."
      />

      <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {industries.map((ind) => (
          <Reveal as="div" key={ind.slug}>
            <Link
              href={`/industries/${ind.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-ink">{ind.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-brand-500" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-500">{ind.blurb}</p>
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
