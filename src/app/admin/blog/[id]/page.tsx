import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    db.blogPost.findUnique({ where: { id } }),
    db.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
      <AdminHeader
        title="Edit post"
        action={
          post.status === "Published" ? (
            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
              <ExternalLink className="h-4 w-4" /> View live
            </Link>
          ) : undefined
        }
      />
      <Panel className="p-6 md:p-8">
        <BlogPostForm post={post} categories={categories} />
      </Panel>
    </div>
  );
}
