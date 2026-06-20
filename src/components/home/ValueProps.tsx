import { Check, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { valueProps, certifications } from "@/lib/site";

export function ValueProps() {
  return (
    <Section className="bg-canvas">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why Flaming"
            title="Built for the businesses the world depends on"
            description="When delays cost money and compliance can't be guessed, companies choose a logistics partner that owns the result. That's what we do."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink/10 bg-canvas-soft px-3 py-1.5 text-xs font-medium text-ink-700"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/about">
              Our story &amp; standards
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-[var(--shadow-soft)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <h3 className="mt-4 font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
