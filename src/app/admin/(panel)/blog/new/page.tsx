import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const categories = await db.blogCategory.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>
      <AdminHeader title="New post" />
      <Panel className="p-6 md:p-8">
        <BlogPostForm categories={categories} />
      </Panel>
    </div>
  );
}
