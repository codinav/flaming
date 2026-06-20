import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";

export function ServicesOverview() {
  return (
    <Section id="services" className="bg-canvas">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="What we do"
          title="A complete logistics capability, under one roof"
          description="Fourteen integrated services that move your cargo from origin to destination — planned, cleared, and delivered by one accountable team."
        />
        <Button href="/services" variant="outline" size="sm" className="shrink-0">
          All services
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
        {services.map((s) => (
          <Reveal as="div" key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-500 group-hover:text-white sm:h-12 sm:w-12">
                  <ServiceIcon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <ArrowUpRight className="hidden h-5 w-5 text-ink/20 transition group-hover:text-brand-500 sm:block" />
              </div>
              <h3 className="mt-3 text-sm font-bold leading-snug text-ink sm:mt-5 sm:text-lg">{s.title}</h3>
              <p className="mt-1 hidden text-sm leading-relaxed text-ink-500 sm:mt-2 sm:block">{s.summary}</p>
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
