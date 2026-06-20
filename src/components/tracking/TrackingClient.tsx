"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  PackageSearch,
  MapPin,
  CalendarClock,
  Ship,
  Boxes,
  Check,
  AlertCircle,
} from "lucide-react";
import type { ShipmentResult } from "@/app/api/track/route";

const DEMO = "FILL-2025-04471";

export function TrackingClient({ initialCode }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ShipmentResult | null>(null);

  useEffect(() => {
    if (initialCode) lookup(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  async function lookup(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(trimmed)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.message ?? "Lookup failed.");
      setResult(body.shipment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(code);
        }}
        className="card flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/30" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter tracking number (e.g. FILL-2025-04471)"
            className="w-full rounded-xl border border-transparent bg-canvas-soft py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            aria-label="Tracking number"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary justify-center sm:px-7">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setCode(DEMO);
          lookup(DEMO);
        }}
        className="mt-3 text-sm text-ink-500 hover:text-brand-700"
      >
        Try the demo shipment → <span className="font-medium text-brand-700">{DEMO}</span>
      </button>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!result && !error && !loading && <EmptyState />}

      {result && <Result shipment={result} />}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-canvas-soft p-12 text-center">
      <PackageSearch className="mx-auto h-10 w-10 text-ink/25" />
      <p className="mt-4 text-ink-500">
        Enter your tracking number above to see live status, location, and ETA.
      </p>
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Result({ shipment }: { shipment: ShipmentResult }) {
  return (
    <div className="mt-8 space-y-6">
      {/* Summary */}
      <div className="card overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-ink/8 bg-canvas-soft p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Tracking number</p>
            <p className="font-display text-xl font-bold text-ink">{shipment.trackingNumber}</p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
            {shipment.status}
          </span>
        </div>

        <div className="grid gap-px bg-ink/8 sm:grid-cols-2 lg:grid-cols-4">
          <Detail icon={MapPin} label="Route" value={`${shipment.origin} → ${shipment.destination}`} />
          <Detail icon={Ship} label="Service" value={shipment.service} />
          <Detail
            icon={CalendarClock}
            label="Estimated arrival"
            value={shipment.eta ? fmtDate(shipment.eta) : "—"}
          />
          <Detail icon={Boxes} label="Cargo" value={`${shipment.pieces} units · ${shipment.weight}`} />
        </div>
        <div className="bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Current location</p>
          <p className="mt-1 flex items-center gap-2 font-medium text-ink">
            <MapPin className="h-4 w-4 text-brand-600" />
            {shipment.currentLocation}
          </p>
        </div>
      </div>

      {/* Progress stepper */}
      <Stepper shipment={shipment} />

      {/* Timeline */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-ink">Shipment history</h2>
        <ol className="mt-5">
          {[...shipment.timeline].reverse().map((ev, i, arr) => (
            <li key={ev.status} className="relative flex gap-4 pb-6 last:pb-0">
              {i < arr.length - 1 && (
                <span className="absolute left-[11px] top-6 h-full w-px bg-ink/12" aria-hidden />
              )}
              <span
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  ev.done ? "bg-brand-500 text-white" : "border border-ink/20 bg-white text-ink/30"
                }`}
              >
                {ev.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <div className={ev.done ? "" : "opacity-50"}>
                <p className="font-semibold text-ink">{ev.status}</p>
                <p className="text-sm text-ink-500">{ev.location}</p>
                {ev.note && <p className="mt-0.5 text-sm text-ink-500">{ev.note}</p>}
                <p className="mt-0.5 text-xs text-ink/40">
                  {ev.done && ev.timestamp ? fmtDateTime(ev.timestamp) : "Pending"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function Stepper({ shipment }: { shipment: ShipmentResult }) {
  const steps = shipment.timeline;
  const currentIndex = steps.findIndex((s) => s.status === shipment.status);
  const pct = (currentIndex / (steps.length - 1)) * 100;

  return (
    <div className="card p-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-3 h-1 rounded-full bg-ink/10" aria-hidden />
        <div
          className="absolute left-0 top-3 h-1 rounded-full bg-brand-500 transition-all"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
        <ol className="relative flex justify-between">
          {steps.map((s, i) => (
            <li key={s.status} className="flex flex-1 flex-col items-center text-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                  i <= currentIndex
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-ink/15 bg-white text-ink/30"
                }`}
              >
                {i < currentIndex ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <span className={`mt-2 hidden text-[0.7rem] font-medium sm:block ${i <= currentIndex ? "text-ink" : "text-ink/40"}`}>
                {s.status}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
