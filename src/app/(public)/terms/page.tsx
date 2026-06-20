import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { SectionInProgress } from "@/components/layout/SectionInProgress";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms governing use of Flaming Integrated Logistiks Ltd services and website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Terms of Service" crumbs={[{ label: "Terms" }]} />
      <SectionInProgress
        title="Terms of service coming soon"
        blurb="Our full terms of service are being finalised. For questions, contact info@fill.ng."
      />
    </>
  );
}
