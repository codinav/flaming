import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import { db } from "@/lib/db";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/admin/ui";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Build your career at Flaming Integrated Logistiks Ltd — join a fast-growing freight forwarding and supply chain team in Lagos, Nigeria.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await db.jobPosting.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageIntro
        eyebrow="Careers"
        title="Move the world with us"
        description="We're always looking for people who care about getting cargo where it needs to be."
        crumbs={[{ label: "Careers" }]}
      />

      <Section>
        {jobs.length === 0 ? (
          <EmptyState
            title="No open roles right now"
            hint={`Send your CV to ${company.emails.info} and we'll keep you in mind.`}
          />
        ) : (
          <div className="mx-auto max-w-3xl space-y-4">
            {jobs.map((j) => (
              <Link
                key={j.id}
                href={`/careers/${j.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]"
              >
                <div>
                  <h2 className="text-lg font-bold text-ink">{j.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500">
                    {j.department && (
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" /> {j.department}
                      </span>
                    )}
                    {j.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" /> {j.location}
                      </span>
                    )}
                    {j.type && <span>{j.type}</span>}
                  </div>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-brand-500 group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
