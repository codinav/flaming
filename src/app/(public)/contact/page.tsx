import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { company, addressOneLine } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Flaming Integrated Logistiks Ltd in Ikeja, Lagos. Call +234 704 997 4905, email info@fill.ng, or send us a message about your shipment.",
  path: "/contact",
});

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Omole Phase 1, Ikeja, Lagos, Nigeria"
)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Talk to a logistics expert"
        description="Whether you need a quote, an update, or advice on a complex shipment — our team is ready to help."
        crumbs={[{ label: "Contact" }]}
      />

      <Section className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Info */}
          <div>
            <div className="space-y-4">
              <ContactRow icon={MapPin} title="Head office">
                {addressOneLine}
              </ContactRow>
              <ContactRow icon={Phone} title="Phone">
                <a href={`tel:${company.phone}`} className="hover:text-brand-700">
                  {company.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} title="Email">
                <a href={`mailto:${company.emails.info}`} className="block hover:text-brand-700">
                  {company.emails.info}
                </a>
                <a href={`mailto:${company.emails.sales}`} className="block hover:text-brand-700">
                  {company.emails.sales}
                </a>
              </ContactRow>
              <ContactRow icon={Clock} title="Business hours">
                {company.hoursDays}: {company.hours}
              </ContactRow>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-ink/8">
              <iframe
                title="Flaming Integrated Logistiks office location"
                src={mapSrc}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            <h2 className="text-xl font-bold text-ink">Send us a message</h2>
            <p className="mt-1 text-sm text-ink-500">
              We typically respond within 4 business hours.
            </p>
            <div className="mt-6">
              <InlineLeadForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-ink/8 bg-canvas-soft p-5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <div className="mt-1 text-sm text-ink-500">{children}</div>
      </div>
    </div>
  );
}
