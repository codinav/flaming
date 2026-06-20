import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { SectionInProgress } from "@/components/layout/SectionInProgress";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Flaming Integrated Logistiks Ltd collects, uses, and protects your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Privacy" }]} />
      <SectionInProgress
        title="Privacy policy coming soon"
        blurb="Our full privacy policy is being finalised. For any data questions, contact info@fill.ng."
      />
    </>
  );
}
