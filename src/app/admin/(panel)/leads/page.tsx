import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState } from "@/components/admin/ui";
import { ActionSelect } from "@/components/admin/ActionSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { setLeadStatus, deleteLead } from "@/app/admin/actions";
import { leadStatuses } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <AdminHeader title="Leads" description={`${leads.length} total — contact form & service enquiries`} />

      {leads.length === 0 ? (
        <EmptyState title="No leads yet" hint="Contact form submissions appear here." />
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Message</Th>
                  <Th>Source</Th>
                  <Th>Status</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {leads.map((l) => (
                  <tr key={l.id} className="align-top hover:bg-canvas-soft">
                    <Td>
                      <p className="font-medium text-ink">{l.name}</p>
                      <p className="text-xs text-ink-500">{l.email}</p>
                    </Td>
                    <Td className="text-ink-500">{l.company ?? "—"}</Td>
                    <Td className="max-w-xs text-ink-500">{l.message ?? "—"}</Td>
                    <Td className="text-ink-500">{l.source ?? "—"}</Td>
                    <Td>
                      <ActionSelect id={l.id} value={l.status} options={leadStatuses} action={setLeadStatus} />
                    </Td>
                    <Td>
                      <DeleteButton action={deleteLead} id={l.id} message={`Delete lead from ${l.name}?`} />
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
