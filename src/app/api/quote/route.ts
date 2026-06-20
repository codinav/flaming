import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifyNewSubmission } from "@/lib/mail";

export const runtime = "nodejs";

/**
 * Quote / lead intake. Contact-page submissions (source "inline") are stored as
 * Leads; everything else becomes a Quote (richer model, convertible to a
 * Shipment in the admin panel). Sends an email notification when configured.
 */

type QuotePayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  notes?: string;
  service?: string;
  source?: string;
  originCountry?: string;
  destinationCountry?: string;
  cargoType?: string;
  weight?: string;
  dimensions?: string;
  shippingMethod?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: QuotePayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.trim().length < 2) errors.name = "Name is required.";
  if (!payload.email || !EMAIL_RE.test(payload.email)) errors.email = "A valid email is required.";
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Please check the form.", errors }, { status: 422 });
  }

  const note = payload.notes ?? payload.message ?? null;
  const isLead = payload.source === "inline";

  try {
    if (isLead) {
      await db.lead.create({
        data: {
          name: payload.name!.trim(),
          email: payload.email!.trim(),
          phone: payload.phone || null,
          company: payload.company || null,
          message: note,
          source: payload.source || "contact",
          status: "New",
        },
      });
      await notifyNewSubmission("lead", { name: payload.name!, email: payload.email! });
    } else {
      const reference = `QT-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
      await db.quote.create({
        data: {
          reference,
          name: payload.name!.trim(),
          company: payload.company || null,
          email: payload.email!.trim(),
          phone: payload.phone || null,
          originCountry: payload.originCountry || null,
          destinationCountry: payload.destinationCountry || null,
          cargoType: payload.cargoType || null,
          weight: payload.weight || null,
          dimensions: payload.dimensions || null,
          shippingMethod: payload.shippingMethod || null,
          serviceSlug: payload.service || null,
          notes: note,
          source: payload.source || "quote-page",
          status: "New",
        },
      });
      await notifyNewSubmission("quote", { name: payload.name!, email: payload.email!, reference });
    }
  } catch (err) {
    console.error("[quote] persistence failed", err);
    return NextResponse.json({ message: "Could not submit right now. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Submission received." }, { status: 201 });
}
