import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCustomer } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await db.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { shipments: true, quotes: true } } },
  });

  return (
    <div className="space-y-6">
      <AdminHeader title="Customers" description={`${customers.length} total`} />

      {customers.length === 0 ? (
        <EmptyState title="No customers yet" hint="Customers are created when quotes are converted." />
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Contact</Th>
                  <Th>Country</Th>
                  <Th>Shipments</Th>
                  <Th>Quotes</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-canvas-soft">
                    <Td className="font-medium text-ink">{c.name}</Td>
                    <Td className="text-ink-500">{c.company ?? "—"}</Td>
                    <Td className="text-ink-500">
                      <p>{c.email}</p>
                      {c.phone && <p className="text-xs">{c.phone}</p>}
                    </Td>
                    <Td className="text-ink-500">{c.country ?? "—"}</Td>
                    <Td className="text-ink-500">{c._count.shipments}</Td>
                    <Td className="text-ink-500">{c._count.quotes}</Td>
                    <Td>
                      <DeleteButton
                        action={deleteCustomer}
                        id={c.id}
                        message={`Delete ${c.name}? Their shipments/quotes are kept but unlinked.`}
                      />
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
