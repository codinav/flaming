import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post || post.status !== "Published") return {};
  return pageMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || "",
    path: `/blog/${post.slug}`,
  });
}

function fmt(d: Date | null) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "";
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug }, include: { category: true } });
  if (!post || post.status !== "Published") notFound();

  return (
    <article className="pb-20">
      <div className="border-b border-ink/5 bg-canvas-soft">
        <Container className="max-w-3xl py-14 md:py-20">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          {post.category && (
            <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-brand-700">
              {post.category.name}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-500">
            {post.authorName ? `${post.authorName} · ` : ""}
            {fmt(post.publishedAt)}
            {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl">
        {post.coverImageUrl && (
          <div className="relative -mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-ink/8 shadow-[var(--shadow-soft)]">
            <Image src={post.coverImageUrl} alt={post.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
          </div>
        )}
        <div
          className="prose-fill mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 rounded-2xl border border-ink/8 bg-canvas-soft p-6 text-center">
          <p className="font-semibold text-ink">Need help moving your cargo?</p>
          <p className="mt-1 text-sm text-ink-500">Get a tailored freight quote from our team.</p>
          <Link href="/quote" className="btn btn-primary mt-4">
            Get a quote
          </Link>
        </div>
      </Container>
    </article>
  );
}
