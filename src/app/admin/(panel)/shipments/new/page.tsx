import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { LabeledInput, LabeledSelect } from "@/components/admin/form";
import { createShipment } from "@/app/admin/actions";
import { shipmentStatuses } from "@/lib/site";
import { shippingModes } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default function NewShipmentPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/shipments" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to shipments
      </Link>
      <AdminHeader title="New shipment" description="A unique tracking number is generated automatically." />

      <Panel className="p-6 md:p-8">
        <form action={createShipment} className="space-y-5">
          <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
            The tracking number (e.g. <span className="font-semibold">FILL-{new Date().getFullYear()}-XXXXX</span>) is created automatically by the system on save.
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <LabeledSelect
              label="Status"
              name="status"
              defaultValue="Booked"
              options={shipmentStatuses.map((s) => ({ value: s, label: s }))}
            />
            <LabeledSelect
              label="Mode"
              name="mode"
              options={[{ value: "", label: "Select…" }, ...shippingModes.map((m) => ({ value: m, label: m }))]}
            />
            <LabeledInput label="Cargo type" name="cargoType" placeholder="Containerized" />
            <LabeledInput label="Origin" name="origin" placeholder="Shanghai, China" />
            <LabeledInput label="Destination" name="destination" placeholder="Lagos, Nigeria" />
            <LabeledInput label="Current location" name="currentLocation" placeholder="Defaults to origin" />
            <LabeledInput label="ETA" name="eta" type="date" />
            <LabeledInput label="Weight (kg)" name="weightKg" placeholder="18400" />
            <LabeledInput label="Pieces" name="pieces" placeholder="2" />
          </div>
          <button type="submit" className="btn btn-primary px-6">
            Create shipment
          </button>
        </form>
      </Panel>
    </div>
  );
}
