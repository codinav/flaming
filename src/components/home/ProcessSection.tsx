import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

export function ProcessSection() {
  return (
    <Section className="mesh bg-canvas-soft">
      <SectionHeading
        align="center"
        eyebrow="How we work"
        title={
          <>
            We Manage It. <span className="text-gradient-brand">We Clear It.</span> We Deliver It.
          </>
        }
        description="Three promises, one seamless movement. From the first booking to the final signature, your cargo is handled by people who own the outcome."
      />

      <div className="relative mt-16 grid gap-6 md:grid-cols-3">
        {/* connecting line */}
        <div
          className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 md:block"
          aria-hidden
        />
        {processSteps.map((step, i) => (
          <Reveal key={step.no} delay={i * 0.12} className="relative">
            <div className="flex h-full flex-col items-center rounded-2xl border border-ink/8 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 font-display text-lg font-bold text-white shadow-[var(--shadow-glow)]">
                {step.no}
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
