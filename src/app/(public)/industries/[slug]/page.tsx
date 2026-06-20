import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { Reveal } from "@/components/ui/Reveal";
import { industries, featuredServices } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return pageMetadata({
    title: `${industry.title} Logistics`,
    description: `${industry.title} logistics in Nigeria: ${industry.blurb} Freight, customs clearance, and supply chain solutions tailored to ${industry.title.toLowerCase()}.`,
    path: `/industries/${industry.slug}`,
  });
}

const capabilities = [
  "Dedicated account team that understands your operating rhythm",
  "Compliance and documentation handled end to end",
  "Real-time visibility across every shipment milestone",
  "Flexible capacity for seasonal peaks and project cargo",
];

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <>
      <PageIntro
        eyebrow="Industry"
        title={`${industry.title} Logistics`}
        description={industry.blurb}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: industry.title }]}
      />

      <Section className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-ink">
              Built around how {industry.title.toLowerCase()} actually moves
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              We combine global freight reach with deep local expertise to keep your {industry.title.toLowerCase()} supply
              chain predictable, compliant, and cost-efficient.
            </p>
            <div className="mt-8 space-y-3">
              {capabilities.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.5} />
                  <span className="text-ink-700">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-ink/8 bg-canvas-soft p-8">
            <h3 className="font-bold text-ink">Most-used services</h3>
            <div className="mt-5 grid gap-3">
              {featuredServices.slice(0, 5).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-ink/8 bg-white p-4 transition hover:border-brand-200"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-ink">{s.title}</span>
                  <ArrowRight className="ml-auto h-4 w-4 text-ink/20 transition group-hover:text-brand-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-canvas-soft py-14">
        <SectionHeading eyebrow="Other sectors" title="Explore more industries" />
        <div className="mt-8 flex flex-wrap gap-2">
          {industries
            .filter((i) => i.slug !== industry.slug)
            .map((i) => (
              <Reveal as="span" key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="inline-block rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                >
                  {i.title}
                </Link>
              </Reveal>
            ))}
        </div>
      </Section>

      <QuoteCTA />
    </>
  );
}
