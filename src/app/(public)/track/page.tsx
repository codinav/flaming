import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { TrackingClient } from "@/components/tracking/TrackingClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Track Your Shipment",
  description:
    "Track your Flaming Integrated Logistiks shipment in real time — live status, current location, ETA, and full shipment history.",
  path: "/track",
});

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return (
    <>
      <PageIntro
        eyebrow="Shipment tracking"
        title="Track your shipment"
        description="Enter your tracking number to see live status, current location, estimated arrival, and a full milestone history."
        crumbs={[{ label: "Track Shipment" }]}
      />

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <TrackingClient initialCode={code} />
        </div>
      </Section>
    </>
  );
}
