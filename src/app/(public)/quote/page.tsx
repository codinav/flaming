import type { Metadata } from "next";
import { Clock, ShieldCheck, BadgeCheck, Globe2, Phone, Mail } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a Freight Quote",
  description:
    "Get a tailored freight quote for air, ocean, road, customs clearance, or full supply chain. Fast, no-obligation response within 4 business hours.",
  path: "/quote",
});

const assurances = [
  { icon: Clock, title: "Fast response", body: "A tailored quote within 4 business hours." },
  { icon: BadgeCheck, title: "No obligation", body: "Transparent pricing, no hidden fees." },
  { icon: ShieldCheck, title: "Fully compliant", body: "Insured, tracked, customs-cleared." },
  { icon: Globe2, title: "Global reach", body: "120+ countries from one partner." },
];

export default function QuotePage() {
  return (
    <>
      <PageIntro
        eyebrow="Request a quote"
        title="Tell us what you're moving"
        description="Share your shipment details and our logistics experts will come back with a clear, competitive plan covering freight, clearance, and delivery."
        crumbs={[{ label: "Request a Quote" }]}
      />

      <Section className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
          <QuoteForm />

          <aside className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {assurances.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-ink/8 bg-canvas-soft p-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="text-sm text-ink-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-bold">Prefer to talk?</h3>
              <p className="mt-1 text-sm text-white/60">Our team is available {company.hours}.</p>
              <a href={`tel:${company.phone}`} className="mt-4 flex items-center gap-2 text-sm font-medium hover:text-brand-300">
                <Phone className="h-4 w-4 text-brand-400" /> {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.emails.sales}`} className="mt-2 flex items-center gap-2 text-sm font-medium hover:text-brand-300">
                <Mail className="h-4 w-4 text-brand-400" /> {company.emails.sales}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
