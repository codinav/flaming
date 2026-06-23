"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { sanitizeRichText } from "@/lib/sanitize";

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" && v.trim() ? v.trim() : null;
};
const num = (fd: FormData, k: string) => {
  const v = str(fd, k);
  return v ? Number(v.replace(/[^0-9.]/g, "")) || null : null;
};

/** System-generated, guaranteed-unique tracking number (e.g. FILL-2026-04471). */
async function genTracking(): Promise<string> {
  const year = new Date().getFullYear();
  for (let i = 0; i < 12; i++) {
    const code = `FILL-${year}-${Math.floor(10000 + Math.random() * 90000)}`;
    const existing = await db.shipment.findUnique({ where: { trackingNumber: code } });
    if (!existing) return code;
  }
  // Extremely unlikely fallback — time-based, still unique.
  return `FILL-${year}-${Date.now().toString().slice(-6)}`;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Shipments ─────────────────────────────────────────────── */

export async function createShipment(fd: FormData) {
  const status = str(fd, "status") || "Booked";
  const location = str(fd, "currentLocation") || str(fd, "origin");
  const shipment = await db.shipment.create({
    data: {
      trackingNumber: await genTracking(),
      status,
      mode: str(fd, "mode"),
      origin: str(fd, "origin"),
      destination: str(fd, "destination"),
      currentLocation: location,
      cargoType: str(fd, "cargoType"),
      weightKg: num(fd, "weightKg"),
      pieces: num(fd, "pieces"),
      eta: str(fd, "eta") ? new Date(str(fd, "eta")!) : null,
      timeline: { create: { status, location, occurredAt: new Date() } },
    },
  });
  revalidatePath("/admin/shipments");
  redirect(`/admin/shipments/${shipment.id}`);
}

export async function updateShipment(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  const status = str(fd, "status") || "Booked";
  await db.shipment.update({
    where: { id },
    data: {
      status,
      mode: str(fd, "mode"),
      origin: str(fd, "origin"),
      destination: str(fd, "destination"),
      currentLocation: str(fd, "currentLocation"),
      cargoType: str(fd, "cargoType"),
      weightKg: num(fd, "weightKg"),
      pieces: num(fd, "pieces"),
      eta: str(fd, "eta") ? new Date(str(fd, "eta")!) : null,
      deliveredAt: status === "Delivered" ? new Date() : null,
    },
  });
  revalidatePath(`/admin/shipments/${id}`);
  revalidatePath("/admin/shipments");
}

export async function addTimelineEvent(fd: FormData) {
  const shipmentId = str(fd, "shipmentId");
  const status = str(fd, "status");
  if (!shipmentId || !status) return;
  const location = str(fd, "location");
  await db.timelineEvent.create({
    data: { shipmentId, status, location, note: str(fd, "note"), occurredAt: new Date() },
  });
  await db.shipment.update({
    where: { id: shipmentId },
    data: {
      status,
      currentLocation: location ?? undefined,
      deliveredAt: status === "Delivered" ? new Date() : undefined,
    },
  });
  revalidatePath(`/admin/shipments/${shipmentId}`);
  revalidatePath("/admin/shipments");
}

export async function addShipmentDocument(fd: FormData) {
  const shipmentId = str(fd, "shipmentId");
  const url = str(fd, "url");
  if (!shipmentId || !url) return;
  await db.shipmentDocument.create({
    data: { shipmentId, url, label: str(fd, "label") || "Document" },
  });
  revalidatePath(`/admin/shipments/${shipmentId}`);
}

/* ── Quotes ────────────────────────────────────────────────── */

export async function setQuoteStatus(id: string, status: string) {
  await db.quote.update({ where: { id }, data: { status } });
  revalidatePath("/admin/quotes");
}

export async function convertQuote(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  const q = await db.quote.findUnique({ where: { id } });
  if (!q) return;

  const existingShipment = await db.shipment.findUnique({ where: { quoteId: q.id } });
  if (existingShipment) {
    redirect(`/admin/shipments/${existingShipment.id}`);
  }

  let customerId = q.customerId;
  if (!customerId) {
    const existing = await db.customer.findUnique({ where: { email: q.email } });
    customerId =
      existing?.id ??
      (
        await db.customer.create({
          data: {
            name: q.name,
            company: q.company,
            email: q.email,
            phone: q.phone,
            country: q.destinationCountry,
          },
        })
      ).id;
  }

  const shipment = await db.shipment.create({
    data: {
      trackingNumber: await genTracking(),
      status: "Booked",
      mode: q.shippingMethod,
      origin: q.originCountry,
      destination: q.destinationCountry,
      currentLocation: q.originCountry,
      cargoType: q.cargoType,
      customerId,
      quoteId: q.id,
      timeline: { create: { status: "Booked", location: q.originCountry, occurredAt: new Date() } },
    },
  });
  await db.quote.update({ where: { id }, data: { status: "Converted", customerId } });
  revalidatePath("/admin/quotes");
  redirect(`/admin/shipments/${shipment.id}`);
}

/* ── Leads ─────────────────────────────────────────────────── */

export async function setLeadStatus(id: string, status: string) {
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

/* ── Blog ──────────────────────────────────────────────────── */

export async function saveBlogPost(fd: FormData) {
  const id = str(fd, "id");
  const title = str(fd, "title");
  if (!title) return;
  const status = str(fd, "status") || "Draft";
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    excerpt: str(fd, "excerpt"),
    content: sanitizeRichText(str(fd, "content") || ""),
    coverImageUrl: str(fd, "coverImageUrl"),
    status,
    metaTitle: str(fd, "metaTitle"),
    metaDescription: str(fd, "metaDescription"),
    authorName: str(fd, "authorName"),
    categoryId: str(fd, "categoryId"),
    readingMinutes: num(fd, "readingMinutes"),
    publishedAt: status === "Published" ? new Date() : null,
  };

  if (id) {
    await db.blogPost.update({ where: { id }, data });
  } else {
    await db.blogPost.create({ data });
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

/* ── Careers ───────────────────────────────────────────────── */

export async function saveJob(fd: FormData) {
  const id = str(fd, "id");
  const title = str(fd, "title");
  if (!title) return;
  const data = {
    title,
    slug: str(fd, "slug") || slugify(title),
    department: str(fd, "department"),
    location: str(fd, "location"),
    type: str(fd, "type"),
    description: sanitizeRichText(str(fd, "description") || ""),
    isOpen: fd.get("isOpen") === "on" || fd.get("isOpen") === "true",
  };
  if (id) {
    await db.jobPosting.update({ where: { id }, data });
  } else {
    await db.jobPosting.create({ data });
  }
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function setApplicationStatus(id: string, status: string) {
  await db.jobApplication.update({ where: { id }, data: { status } });
  revalidatePath("/admin/careers");
}

/* ── Deletions ─────────────────────────────────────────────── */

export async function deleteShipment(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.shipment.delete({ where: { id } }); // cascades timeline + documents
  revalidatePath("/admin/shipments");
  redirect("/admin/shipments");
}

export async function deleteShipmentDocument(fd: FormData) {
  const id = str(fd, "id");
  const shipmentId = str(fd, "shipmentId");
  if (!id) return;
  await db.shipmentDocument.delete({ where: { id } });
  if (shipmentId) revalidatePath(`/admin/shipments/${shipmentId}`);
}

export async function deleteQuote(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.shipment.updateMany({ where: { quoteId: id }, data: { quoteId: null } });
  await db.quote.delete({ where: { id } });
  revalidatePath("/admin/quotes");
}

export async function deleteLead(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}

export async function deleteCustomer(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.shipment.updateMany({ where: { customerId: id }, data: { customerId: null } });
  await db.quote.updateMany({ where: { customerId: id }, data: { customerId: null } });
  await db.customer.delete({ where: { id } });
  revalidatePath("/admin/customers");
}

export async function deleteJob(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.jobPosting.delete({ where: { id } }); // cascades applications
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function deleteApplication(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.jobApplication.delete({ where: { id } });
  revalidatePath("/admin/careers");
}

/* ── Blog categories (Settings) ────────────────────────────── */

export async function createCategory(fd: FormData) {
  const name = str(fd, "name");
  if (!name) return;
  const slug = slugify(name);
  await db.blogCategory.upsert({ where: { slug }, create: { name, slug }, update: { name } });
  revalidatePath("/admin/settings");
  revalidatePath("/blog");
}

export async function deleteCategory(fd: FormData) {
  const id = str(fd, "id");
  if (!id) return;
  await db.blogPost.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
  await db.blogCategory.delete({ where: { id } });
  revalidatePath("/admin/settings");
  revalidatePath("/blog");
}
