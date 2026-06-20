import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { db } from "@/lib/db";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/admin/ui";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Logistics Knowledge Center",
  description:
    "Insights on freight forwarding, customs clearance, international trade, and supply chain best practice from Flaming Integrated Logistiks.",
  path: "/blog",
});

function fmt(d: Date | null) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
}

export default async function BlogIndexPage() {
  const posts = await db.blogPost.findMany({
    where: { status: "Published" },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

  return (
    <>
      <PageIntro
        eyebrow="Knowledge center"
        title="Logistics insights & guides"
        description="Practical knowledge on freight, customs, and supply chain for importers, exporters, and operations teams."
        crumbs={[{ label: "Blog" }]}
      />

      <Section>
        {posts.length === 0 ? (
          <EmptyState title="No articles published yet" hint="Check back soon." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-canvas-sunken">
                  {p.coverImageUrl ? (
                    <Image
                      src={p.coverImageUrl}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="img-zoom object-cover"
                    />
                  ) : (
                    <div className="mesh absolute inset-0 bg-brand-50" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {p.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                      {p.category.name}
                    </span>
                  )}
                  <h2 className="mt-2 text-lg font-bold text-ink">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 flex-1 text-sm text-ink-500">{p.excerpt}</p>}
                  <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
                    <span>
                      {fmt(p.publishedAt)}
                      {p.readingMinutes ? ` · ${p.readingMinutes} min read` : ""}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:text-brand-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
