import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { services, industries, company } from "@/lib/site";
import { pageMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} in Nigeria`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

const benefits = [
  "A single point of accountability — one team owns the whole movement.",
  "Transparent, competitive pricing with no hidden surprises.",
  "Real-time tracking and milestone updates from booking to delivery.",
  "Compliance and documentation handled end to end.",
];

const processSteps = [
  { title: "Plan & book", body: "We assess your cargo, route, and timeline, then book the optimal mode and carrier." },
  { title: "Move & monitor", body: "Your shipment moves under active monitoring with proactive milestone updates." },
  { title: "Clear & comply", body: "Licensed brokerage manages duties, permits, and customs for a clean release." },
  { title: "Deliver & confirm", body: "Final-mile delivery, proof of delivery, and a debrief on performance." },
];

function buildFaqs(title: string) {
  return [
    {
      q: `How quickly can you arrange ${title.toLowerCase()}?`,
      a: `For most lanes we can return a quote within four business hours and begin booking the same day once details are confirmed. Time-critical shipments are prioritised.`,
    },
    {
      q: `Do you handle customs clearance as part of ${title.toLowerCase()}?`,
      a: `Yes. As a licensed customs broker we manage duties, tariffs, permits, and documentation so your cargo clears quickly and correctly.`,
    },
    {
      q: `Can I track my shipment in real time?`,
      a: `Absolutely. Every shipment gets a tracking number with live status, current location, and ETA — accessible from our tracking page or your account.`,
    },
    {
      q: `Which countries do you cover?`,
      a: `We operate across 120+ countries through our carrier and agent network, anchored in Lagos with strong West African and global trade-lane coverage.`,
    },
  ];
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const faqs = buildFaqs(service.title);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@type": "Organization", name: company.name, url: siteUrl },
    areaServed: "Worldwide",
    description: service.summary,
  };

  return (
    <>
      <PageIntro
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <Section className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Main content */}
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <ServiceIcon name={service.icon} className="h-7 w-7" />
            </span>

            <h2 className="mt-6 text-2xl font-bold text-ink">
              {service.title} that moves your business forward
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">{service.summary}</p>

            {/* Benefits */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-ink/8 bg-canvas-soft p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.5} />
                  <span className="text-sm text-ink-700">{b}</span>
                </div>
              ))}
            </div>

            {/* Process */}
            <h3 className="mt-12 text-xl font-bold text-ink">How it works</h3>
            <ol className="mt-5 space-y-4">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-ink-500">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Industry applications */}
            <h3 className="mt-12 text-xl font-bold text-ink">Industry applications</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {industries.slice(0, 8).map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
                >
                  {ind.title}
                </Link>
              ))}
            </div>

            {/* FAQ */}
            <h3 className="mt-12 text-xl font-bold text-ink">Frequently asked questions</h3>
            <div className="mt-5 divide-y divide-ink/10 rounded-2xl border border-ink/8 bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5 [&_summary]:cursor-pointer">
                  <summary className="flex list-none items-center justify-between gap-4 font-semibold text-ink marker:hidden">
                    {f.q}
                    <span className="text-brand-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Sticky lead form */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-ink">Request a quote</h3>
              <p className="mt-1 text-sm text-ink-500">
                For {service.title.toLowerCase()} and more. Fast, no-obligation.
              </p>
              <div className="mt-5">
                <InlineLeadForm service={service.slug} />
              </div>
              <div className="mt-5 border-t border-ink/10 pt-4">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-brand-700"
                >
                  <Phone className="h-4 w-4 text-brand-600" />
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related services */}
      <Section className="bg-canvas-soft py-16">
        <SectionHeading eyebrow="Explore more" title="Related services" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((s) => (
            <Reveal as="div" key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <ServiceIcon name={s.icon} className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink/20 transition group-hover:text-brand-500" />
                </div>
                <h3 className="mt-4 font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services" className="btn btn-outline">
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  );
}
