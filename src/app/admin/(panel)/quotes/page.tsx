import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState } from "@/components/admin/ui";
import { ActionSelect } from "@/components/admin/ActionSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { setQuoteStatus, convertQuote, deleteQuote } from "@/app/admin/actions";
import { quoteStatuses } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotes = await db.quote.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <AdminHeader title="Quotes" description={`${quotes.length} total`} />

      {quotes.length === 0 ? (
        <EmptyState title="No quote requests yet" hint="Submissions from the quote form land here." />
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-ink/8 bg-canvas-soft">
                <tr>
                  <Th>Reference</Th>
                  <Th>Customer</Th>
                  <Th>Route</Th>
                  <Th>Service</Th>
                  <Th>Status</Th>
                  <Th />
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {quotes.map((q) => (
                  <tr key={q.id} className="align-top hover:bg-canvas-soft">
                    <Td className="font-semibold text-ink">{q.reference}</Td>
                    <Td>
                      <p className="font-medium text-ink">{q.company ?? q.name}</p>
                      <p className="text-xs text-ink-500">{q.email}</p>
                    </Td>
                    <Td className="text-ink-500">
                      {q.originCountry ?? "—"} → {q.destinationCountry ?? "—"}
                    </Td>
                    <Td className="text-ink-500">{q.shippingMethod ?? q.serviceSlug ?? "—"}</Td>
                    <Td>
                      <ActionSelect id={q.id} value={q.status} options={quoteStatuses} action={setQuoteStatus} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        {q.status !== "Converted" && (
                          <form action={convertQuote}>
                            <input type="hidden" name="id" value={q.id} />
                            <button type="submit" className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100">
                              Convert → shipment
                            </button>
                          </form>
                        )}
                        <DeleteButton action={deleteQuote} id={q.id} message={`Delete quote ${q.reference}?`} />
                      </div>
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
