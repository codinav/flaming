import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState, AdminLinkButton } from "@/components/admin/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

function fmt(d: Date | null) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
}

export default async function ShipmentsPage() {
  const shipments = await db.shipment.findMany({
    orderBy: { updatedAt: "desc" },
    include: { customer: true },
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Shipments"
        description={`${shipments.length} total`}
        action={
          <AdminLinkButton href="/admin/shipments/new">
            <Plus className="h-4 w-4" />
            New shipment
          </AdminLinkButton>
        }
      />

      {shipments.length === 0 ? (
        <EmptyState title="No shipments yet" hint="Create one or convert a quote." />
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Tracking</Th>
                  <Th>Route</Th>
                  <Th>Mode</Th>
                  <Th>Status</Th>
                  <Th>ETA</Th>
                  <Th>Customer</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-canvas-soft">
                    <Td>
                      <Link
                        href={`/admin/shipments/${s.id}`}
                        className="font-semibold text-ink hover:text-brand-700"
                      >
                        {s.trackingNumber}
                      </Link>
                    </Td>
                    <Td className="text-ink-500">
                      {s.origin} → {s.destination}
                    </Td>
                    <Td className="text-ink-500">{s.mode ?? "—"}</Td>
                    <Td>
                      <StatusBadge status={s.status} />
                    </Td>
                    <Td className="text-ink-500">{fmt(s.eta)}</Td>
                    <Td className="text-ink-500">{s.customer?.company ?? s.customer?.name ?? "—"}</Td>
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
