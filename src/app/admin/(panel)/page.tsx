import Link from "next/link";
import { Ship, Truck, PackageCheck, FileText, Inbox, Users, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td } from "@/components/admin/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalShipments,
    activeShipments,
    deliveredShipments,
    pendingQuotes,
    newLeads,
    customers,
    recentShipments,
    recentQuotes,
  ] = await Promise.all([
    db.shipment.count(),
    db.shipment.count({ where: { status: { not: "Delivered" } } }),
    db.shipment.count({ where: { status: "Delivered" } }),
    db.quote.count({ where: { status: { in: ["New", "Reviewing"] } } }),
    db.lead.count({ where: { status: "New" } }),
    db.customer.count(),
    db.shipment.findMany({ orderBy: { updatedAt: "desc" }, take: 6, include: { customer: true } }),
    db.quote.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const stats = [
    { label: "Total shipments", value: totalShipments, icon: Ship, href: "/admin/shipments" },
    { label: "Active shipments", value: activeShipments, icon: Truck, href: "/admin/shipments" },
    { label: "Delivered", value: deliveredShipments, icon: PackageCheck, href: "/admin/shipments" },
    { label: "Pending quotes", value: pendingQuotes, icon: FileText, href: "/admin/quotes" },
    { label: "New leads", value: newLeads, icon: Inbox, href: "/admin/leads" },
    { label: "Customers", value: customers, icon: Users, href: "/admin/customers" },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader title="Dashboard" description="Operations overview at a glance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Panel className="p-5 transition hover:border-brand-200 hover:shadow-[var(--shadow-lift)]">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-bold text-ink">{s.value}</p>
              <p className="mt-1 text-sm text-ink-500">{s.label}</p>
            </Panel>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent shipments */}
        <Panel>
          <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
            <h2 className="font-semibold text-ink">Recent shipments</h2>
            <Link href="/admin/shipments" className="flex items-center gap-1 text-sm font-medium text-brand-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Tracking</Th>
                  <Th>Route</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {recentShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-canvas-soft">
                    <Td>
                      <Link href={`/admin/shipments/${s.id}`} className="font-semibold text-ink hover:text-brand-700">
                        {s.trackingNumber}
                      </Link>
                    </Td>
                    <Td className="text-ink-500">
                      {s.origin} → {s.destination}
                    </Td>
                    <Td>
                      <StatusBadge status={s.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Recent quotes */}
        <Panel>
          <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
            <h2 className="font-semibold text-ink">Recent quotes</h2>
            <Link href="/admin/quotes" className="flex items-center gap-1 text-sm font-medium text-brand-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Reference</Th>
                  <Th>Customer</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {recentQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-canvas-soft">
                    <Td className="font-semibold text-ink">{q.reference}</Td>
                    <Td className="text-ink-500">{q.company || q.name}</Td>
                    <Td>
                      <StatusBadge status={q.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
