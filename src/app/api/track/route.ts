import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { shipmentStatuses } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Shipment tracking lookup — backed by the database (Shipment + TimelineEvent). */

export type TimelineEntry = {
  status: string;
  location: string;
  timestamp: string | null;
  note?: string;
  done: boolean;
};

export type ShipmentResult = {
  trackingNumber: string;
  status: string;
  service: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string | null;
  weight: string;
  pieces: number;
  timeline: TimelineEntry[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = (searchParams.get("code") ?? "").trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ message: "A tracking number is required." }, { status: 400 });
  }

  const shipment = await db.shipment.findUnique({
    where: { trackingNumber: code },
    include: { timeline: { orderBy: { occurredAt: "asc" } } },
  });

  if (!shipment) {
    return NextResponse.json(
      {
        message:
          "No shipment found for that tracking number. Try the demo number FILL-2025-04471.",
      },
      { status: 404 }
    );
  }

  const currentIndex = Math.max(0, shipmentStatuses.indexOf(shipment.status as never));

  // Most recent stored event per status.
  const eventByStatus = new Map<string, (typeof shipment.timeline)[number]>();
  for (const ev of shipment.timeline) eventByStatus.set(ev.status, ev);

  const timeline: TimelineEntry[] = shipmentStatuses.map((status, i) => {
    const ev = eventByStatus.get(status);
    return {
      status,
      location: ev?.location ?? (i === currentIndex ? shipment.currentLocation ?? "—" : "—"),
      timestamp: ev?.occurredAt ? ev.occurredAt.toISOString() : null,
      note: ev?.note ?? undefined,
      done: i <= currentIndex,
    };
  });

  const result: ShipmentResult = {
    trackingNumber: shipment.trackingNumber,
    status: shipment.status,
    service: shipment.mode ?? "Freight",
    origin: shipment.origin ?? "—",
    destination: shipment.destination ?? "—",
    currentLocation: shipment.currentLocation ?? "—",
    eta: shipment.eta ? shipment.eta.toISOString() : null,
    weight: shipment.weightKg ? `${shipment.weightKg.toLocaleString("en-US")} kg` : "—",
    pieces: shipment.pieces ?? 0,
    timeline,
  };

  return NextResponse.json({ shipment: result });
}
