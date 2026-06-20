/**
 * Canonical status / mode values (stored as strings — Postgres-portable, and
 * promotable to native enums later). Display strings are the source of truth.
 */

export const quoteStatuses = ["New", "Reviewing", "Approved", "Rejected", "Converted"] as const;
export type QuoteStatus = (typeof quoteStatuses)[number];

export const leadStatuses = ["New", "Contacted", "Qualified", "Closed"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const postStatuses = ["Draft", "Published", "Archived"] as const;
export type PostStatus = (typeof postStatuses)[number];

export const applicationStatuses = [
  "New",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
] as const;
export type ApplicationStatus = (typeof applicationStatuses)[number];

export const shippingModes = ["Air", "Ocean (FCL)", "Ocean (LCL)", "Road", "Multimodal"] as const;
export type ShippingMode = (typeof shippingModes)[number];

// Color tokens for status badges (Tailwind utility fragments).
export const statusBadge: Record<string, string> = {
  // shipment
  Booked: "bg-neutral-100 text-neutral-700",
  Processing: "bg-blue-50 text-blue-700",
  "Customs Clearance": "bg-amber-50 text-amber-700",
  "In Transit": "bg-indigo-50 text-indigo-700",
  Arrived: "bg-cyan-50 text-cyan-700",
  "Out For Delivery": "bg-violet-50 text-violet-700",
  Delivered: "bg-brand-50 text-brand-700",
  // quote / lead / application
  New: "bg-blue-50 text-blue-700",
  Reviewing: "bg-amber-50 text-amber-700",
  Approved: "bg-brand-50 text-brand-700",
  Rejected: "bg-red-50 text-red-700",
  Converted: "bg-emerald-50 text-emerald-700",
  Contacted: "bg-amber-50 text-amber-700",
  Qualified: "bg-indigo-50 text-indigo-700",
  Closed: "bg-neutral-100 text-neutral-600",
  Screening: "bg-amber-50 text-amber-700",
  Interview: "bg-indigo-50 text-indigo-700",
  Offer: "bg-violet-50 text-violet-700",
  Hired: "bg-brand-50 text-brand-700",
  // post
  Draft: "bg-neutral-100 text-neutral-700",
  Published: "bg-brand-50 text-brand-700",
  Archived: "bg-neutral-100 text-neutral-500",
};
