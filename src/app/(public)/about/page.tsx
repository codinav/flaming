import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, ShieldCheck, Gauge, Globe2 } from "lucide-react";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StatsBar } from "@/components/home/StatsBar";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Flaming Integrated Logistiks Ltd is a Lagos-based freight forwarding and supply chain company moving cargo to 120+ countries with one promise: We Manage It. We Clear It. We Deliver It.",
  path: "/about",
});

const values = [
  { icon: ShieldCheck, title: "Integrity", body: "We do what we say. Transparent pricing, honest timelines, no surprises." },
  { icon: Gauge, title: "Reliability", body: "Cargo moves on schedule, every time. Our reputation rides on it." },
  { icon: HeartHandshake, title: "Partnership", body: "We act as an extension of your team, not just a vendor." },
  { icon: Globe2, title: "Global mindset", body: "Local mastery of Nigerian trade, connected to a worldwide network." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="The logistics partner the world depends on"
        description={`${company.tagline} We move freight across borders for businesses that can't afford delay or guesswork.`}
        crumbs={[{ label: "About" }]}
      />

      <Section className="py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-canvas-soft p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Target className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-ink">Our mission</h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                To make international trade effortless for African businesses — managing, clearing,
                and delivering cargo with the reliability and transparency of the world&apos;s best
                logistics companies.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-canvas-soft p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Eye className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-ink">Our vision</h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                To be West Africa&apos;s most trusted integrated logistics company — the first name
                businesses think of when cargo simply has to arrive.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-canvas-soft">
        <SectionHeading
          align="center"
          eyebrow="Our values"
          title="What we stand for"
          description="The principles behind every shipment we handle."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <StatsBar />

      <QuoteCTA />
    </>
  );
}
