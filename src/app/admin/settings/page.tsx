import { AdminHeader, Panel } from "@/components/admin/ui";
import { company, addressOneLine } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const rows = [
    ["Company", company.name],
    ["Phone", company.phoneDisplay],
    ["Email (info)", company.emails.info],
    ["Email (sales)", company.emails.sales],
    ["Business hours", `${company.hoursDays}: ${company.hours}`],
    ["Address", addressOneLine],
  ];

  return (
    <div className="space-y-6">
      <AdminHeader title="Settings" description="Company information & platform configuration." />

      <Panel className="divide-y divide-ink/8">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-ink-500">{label}</span>
            <span className="text-sm font-medium text-ink">{value}</span>
          </div>
        ))}
      </Panel>

      <Panel className="p-6">
        <h2 className="font-semibold text-ink">How to update</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-500">
          <li>• Company details are defined in <code className="rounded bg-canvas-sunken px-1.5 py-0.5">src/lib/site.ts</code>.</li>
          <li>• Admin access is protected by <code className="rounded bg-canvas-sunken px-1.5 py-0.5">ADMIN_USER</code> / <code className="rounded bg-canvas-sunken px-1.5 py-0.5">ADMIN_PASSWORD</code> env vars.</li>
          <li>• Email notifications activate when <code className="rounded bg-canvas-sunken px-1.5 py-0.5">RESEND_API_KEY</code> is set.</li>
        </ul>
      </Panel>
    </div>
  );
}
