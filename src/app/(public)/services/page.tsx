import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { services } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Logistics & Freight Services",
  description:
    "Air & ocean freight, road freight, customs clearance, warehousing, haulage, and full supply chain solutions from Lagos, Nigeria to 120+ countries.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our capabilities"
        title="Freight, clearance & supply chain — fully integrated"
        description="Fourteen services that work as one system. Choose a capability to see how we plan it, clear it, and deliver it for your business."
        crumbs={[{ label: "Services" }]}
      />

      <Section>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal as="div" key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-500 group-hover:text-white">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink/20 transition group-hover:text-brand-500" />
                </div>
                <h2 className="mt-5 text-lg font-bold text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.summary}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <QuoteCTA />
    </>
  );
}
