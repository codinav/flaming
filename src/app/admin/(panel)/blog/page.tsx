import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState, AdminLinkButton } from "@/components/admin/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { deleteBlogPost } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blog"
        description={`${posts.length} posts`}
        action={
          <AdminLinkButton href="/admin/blog/new">
            <Plus className="h-4 w-4" />
            New post
          </AdminLinkButton>
        }
      />

      {posts.length === 0 ? (
        <EmptyState title="No posts yet" hint="Write your first article." />
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Status</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas-soft">
                    <Td>
                      <Link href={`/admin/blog/${p.id}`} className="font-semibold text-ink hover:text-brand-700">
                        {p.title}
                      </Link>
                    </Td>
                    <Td className="text-ink-500">{p.category?.name ?? "—"}</Td>
                    <Td>
                      <StatusBadge status={p.status} />
                    </Td>
                    <Td>
                      <form action={deleteBlogPost}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </form>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </div>
  );
}
