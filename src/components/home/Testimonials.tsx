import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="Client outcomes"
        title="The results our clients feel"
        description="Shorter dwell times, fewer surprises, and a supply chain they can finally rely on."
      />

      <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mt-12 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="flex h-auto w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-ink/8 bg-canvas-soft p-7 sm:w-[60%] lg:h-full lg:w-auto lg:shrink"
          >
            <Quote className="h-8 w-8 text-brand-300" />
            <div className="mt-3 flex gap-0.5 text-brand-500">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[0.975rem] leading-relaxed text-ink-700">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-ink/10 pt-4">
              <p className="font-semibold text-ink">{t.author}</p>
              <p className="text-sm text-ink-500">
                {t.role}, {t.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
