import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { LabeledInput, LabeledSelect, LabeledTextarea } from "@/components/admin/form";
import { UploadField } from "@/components/admin/UploadField";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import {
  updateShipment,
  addTimelineEvent,
  addShipmentDocument,
  deleteShipment,
  deleteShipmentDocument,
} from "@/app/admin/actions";
import { shipmentStatuses } from "@/lib/site";
import { shippingModes } from "@/lib/enums";

export const dynamic = "force-dynamic";

function toDateInput(d: Date | null) {
  return d ? new Date(d).toISOString().slice(0, 10) : undefined;
}
function fmtDateTime(d: Date) {
  return new Date(d).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ShipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shipment = await db.shipment.findUnique({
    where: { id },
    include: {
      timeline: { orderBy: { occurredAt: "desc" } },
      customer: true,
      quote: true,
      documents: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!shipment) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/shipments" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to shipments
      </Link>

      <AdminHeader
        title={shipment.trackingNumber}
        description={`${shipment.origin ?? "—"} → ${shipment.destination ?? "—"}`}
        action={
          <div className="flex items-center gap-3">
            <StatusBadge status={shipment.status} />
            <DeleteButton
              action={deleteShipment}
              id={shipment.id}
              label="Delete shipment"
              message={`Delete shipment ${shipment.trackingNumber}? This removes its timeline and documents too.`}
              className="border border-red-200"
            />
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Edit details */}
        <Panel className="p-6">
          <h2 className="mb-4 font-semibold text-ink">Shipment details</h2>
          <form action={updateShipment} className="space-y-4">
            <input type="hidden" name="id" value={shipment.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <LabeledSelect
                label="Status"
                name="status"
                defaultValue={shipment.status}
                options={shipmentStatuses.map((s) => ({ value: s, label: s }))}
              />
              <LabeledSelect
                label="Mode"
                name="mode"
                defaultValue={shipment.mode ?? ""}
                options={[{ value: "", label: "Select…" }, ...shippingModes.map((m) => ({ value: m, label: m }))]}
              />
              <LabeledInput label="Origin" name="origin" defaultValue={shipment.origin} />
              <LabeledInput label="Destination" name="destination" defaultValue={shipment.destination} />
              <LabeledInput label="Current location" name="currentLocation" defaultValue={shipment.currentLocation} />
              <LabeledInput label="ETA" name="eta" type="date" defaultValue={toDateInput(shipment.eta)} />
              <LabeledInput label="Cargo type" name="cargoType" defaultValue={shipment.cargoType} />
              <LabeledInput label="Weight (kg)" name="weightKg" defaultValue={shipment.weightKg ?? undefined} />
              <LabeledInput label="Pieces" name="pieces" defaultValue={shipment.pieces ?? undefined} />
            </div>
            <button type="submit" className="btn btn-primary px-6">
              Save changes
            </button>
          </form>

          {shipment.customer && (
            <div className="mt-6 border-t border-ink/8 pt-4 text-sm">
              <p className="text-ink-500">Customer</p>
              <p className="font-medium text-ink">
                {shipment.customer.company ?? shipment.customer.name} · {shipment.customer.email}
              </p>
            </div>
          )}
        </Panel>

        {/* Timeline */}
        <Panel className="p-6">
          <h2 className="mb-4 font-semibold text-ink">Tracking timeline</h2>

          <form action={addTimelineEvent} className="space-y-3 rounded-xl border border-ink/8 bg-canvas-soft p-4">
            <input type="hidden" name="shipmentId" value={shipment.id} />
            <p className="text-sm font-medium text-ink-700">Add milestone</p>
            <LabeledSelect
              label="Status"
              name="status"
              defaultValue={shipment.status}
              options={shipmentStatuses.map((s) => ({ value: s, label: s }))}
            />
            <LabeledInput label="Location" name="location" placeholder="e.g. Lagos Port (Apapa), NG" />
            <LabeledTextarea label="Note (optional)" name="note" rows={2} />
            <button type="submit" className="btn btn-primary w-full justify-center">
              <Plus className="h-4 w-4" /> Add event
            </button>
          </form>

          <ol className="mt-5 space-y-4">
            {shipment.timeline.map((ev) => (
              <li key={ev.id} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                <div>
                  <p className="text-sm font-semibold text-ink">{ev.status}</p>
                  {ev.location && <p className="text-sm text-ink-500">{ev.location}</p>}
                  {ev.note && <p className="text-sm text-ink-500">{ev.note}</p>}
                  <p className="text-xs text-ink/40">{fmtDateTime(ev.occurredAt)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      {/* Documents */}
      <Panel className="p-6">
        <h2 className="mb-4 font-semibold text-ink">Documents</h2>
        <form
          action={addShipmentDocument}
          className="flex flex-col gap-3 rounded-xl border border-ink/8 bg-canvas-soft p-4 sm:flex-row sm:items-end"
        >
          <input type="hidden" name="shipmentId" value={shipment.id} />
          <div className="sm:w-48">
            <LabeledInput label="Label" name="label" placeholder="Bill of Lading" />
          </div>
          <div className="flex-1">
            <UploadField name="url" label="File" accept="application/pdf,image/*" folder="fill/shipments" />
          </div>
          <button type="submit" className="btn btn-primary shrink-0">
            Add
          </button>
        </form>

        {shipment.documents.length > 0 ? (
          <ul className="mt-4 divide-y divide-ink/8">
            {shipment.documents.map((d) => (
              <li key={d.id} className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-ink">{d.label}</span>
                <div className="flex items-center gap-3">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-700 hover:underline"
                  >
                    Open
                  </a>
                  <DeleteButton
                    action={deleteShipmentDocument}
                    id={d.id}
                    label=""
                    message={`Delete document "${d.label}"?`}
                    extra={[{ name: "shipmentId", value: shipment.id }]}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-500">No documents uploaded yet.</p>
        )}
      </Panel>
    </div>
  );
}
