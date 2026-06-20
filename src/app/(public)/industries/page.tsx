import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { industries } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "Sector-specific logistics for manufacturing, oil & gas, healthcare, retail, automotive, agriculture, FMCG, e-commerce, construction, and government.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Industries"
        title="Logistics expertise, tuned to your sector"
        description="Every industry has its own constraints — compliance, temperature, project cargo, peak seasons. We bring the right playbook to yours."
        crumbs={[{ label: "Industries" }]}
      />

      <Section>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <Reveal as="div" key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-bold text-ink">{ind.title}</h2>
                  <ArrowUpRight className="h-5 w-5 text-ink/20 transition group-hover:text-brand-500" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{ind.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <QuoteCTA />
    </>
  );
}
