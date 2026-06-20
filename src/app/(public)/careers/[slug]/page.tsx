import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/layout/PageIntro";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await db.jobPosting.findUnique({ where: { slug } });
  if (!job) return {};
  return pageMetadata({
    title: `${job.title} — Careers`,
    description: `${job.title} at Flaming Integrated Logistiks${job.location ? ` · ${job.location}` : ""}.`,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await db.jobPosting.findUnique({ where: { slug } });
  if (!job) notFound();

  return (
    <>
      <PageIntro
        eyebrow="Open role"
        title={job.title}
        crumbs={[{ label: "Careers", href: "/careers" }, { label: job.title }]}
      />

      <Section className="py-14 md:py-16">
        <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> All roles
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              {job.department && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-brand-600" /> {job.department}
                </span>
              )}
              {job.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-600" /> {job.location}
                </span>
              )}
              {job.type && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-brand-600" /> {job.type}
                </span>
              )}
            </div>

            {job.isOpen ? (
              <div className="prose-fill mt-8" dangerouslySetInnerHTML={{ __html: job.description }} />
            ) : (
              <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                This role is no longer accepting applications.
              </p>
            )}
          </div>

          {job.isOpen && (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="card p-6">
                <h2 className="text-lg font-bold text-ink">Apply for this role</h2>
                <p className="mt-1 text-sm text-ink-500">We review every application.</p>
                <div className="mt-5">
                  <ApplicationForm jobId={job.id} />
                </div>
              </div>
            </aside>
          )}
        </div>
      </Section>
    </>
  );
}
