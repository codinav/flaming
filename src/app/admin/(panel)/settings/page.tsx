import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { LabeledInput } from "@/components/admin/form";
import { createCategory, deleteCategory } from "@/app/admin/actions";
import { company, addressOneLine } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const categories = await db.blogCategory.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  const rows = [
    ["Company", company.name],
    ["Phone", company.phoneDisplay],
    ["Email (info)", company.emails.info],
    ["Email (sales)", company.emails.sales],
    ["Business hours", `${company.hoursDays}: ${company.hours}`],
    ["Address", addressOneLine],
  ];

  return (
    <div className="space-y-8">
      <AdminHeader title="Settings" description="Blog categories, company info & platform configuration." />

      {/* Blog categories — manageable */}
      <section className="space-y-3">
        <h2 className="font-semibold text-ink">Blog categories</h2>
        <Panel className="p-6">
          <form action={createCategory} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <LabeledInput label="Add a category" name="name" placeholder="e.g. Warehousing" required />
            </div>
            <button type="submit" className="btn btn-primary shrink-0">
              Add category
            </button>
          </form>

          {categories.length === 0 ? (
            <p className="mt-5 text-sm text-ink-500">No categories yet.</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full">
                <thead className="border-y border-ink/8 bg-canvas-soft">
                  <tr>
                    <Th>Name</Th>
                    <Th>Slug</Th>
                    <Th>Posts</Th>
                    <Th />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-canvas-soft">
                      <Td className="font-medium text-ink">{c.name}</Td>
                      <Td className="text-ink-500">{c.slug}</Td>
                      <Td className="text-ink-500">{c._count.posts}</Td>
                      <Td>
                        <DeleteButton
                          action={deleteCategory}
                          id={c.id}
                          message={`Delete category "${c.name}"? Its ${c._count.posts} post(s) stay but become uncategorised.`}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </section>

      {/* Company info — read-only */}
      <section className="space-y-3">
        <h2 className="font-semibold text-ink">Company information</h2>
        <Panel className="divide-y divide-ink/8">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-ink-500">{label}</span>
              <span className="text-sm font-medium text-ink">{value}</span>
            </div>
          ))}
        </Panel>
      </section>

      <Panel className="p-6">
        <h2 className="font-semibold text-ink">Configuration</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-500">
          <li>• Company details are defined in <code className="rounded bg-canvas-sunken px-1.5 py-0.5">src/lib/site.ts</code>.</li>
          <li>• Admin login uses the <code className="rounded bg-canvas-sunken px-1.5 py-0.5">ADMIN_USER</code> / <code className="rounded bg-canvas-sunken px-1.5 py-0.5">ADMIN_PASSWORD</code> env vars.</li>
          <li>• Email notifications activate when <code className="rounded bg-canvas-sunken px-1.5 py-0.5">RESEND_API_KEY</code> is set.</li>
          <li>• File uploads activate when <code className="rounded bg-canvas-sunken px-1.5 py-0.5">CLOUDINARY_*</code> vars are set.</li>
        </ul>
      </Panel>
    </div>
  );
}
