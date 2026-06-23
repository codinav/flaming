/**
 * Single source of truth for company data, navigation, services, industries,
 * and marketing content. UI reads from here; later the admin panel / DB can
 * override these via the Settings model.
 */

export const company = {
  name: "Flaming Integrated Logistiks Ltd",
  shortName: "Flaming Logistiks",
  legalName: "Flaming Integrated Logistiks Ltd",
  tagline: "We Manage It. We Clear It. We Deliver It.",
  domain: "fill.ng",
  url: "https://fill.ng",
  phone: "+2347049974905",
  phoneDisplay: "+234 704 997 4905",
  emails: {
    info: "info@fill.ng",
    sales: "sales@fill.ng",
  },
  hours: "9:00 AM – 6:00 PM",
  hoursDays: "Monday – Saturday",
  address: {
    line1: "No. 1 Ali Balogun Street",
    line2: "Off Ademola Ajasa Street",
    area: "Omole Phase 1, Ikeja",
    city: "Lagos",
    country: "Nigeria",
  },
  founded: 2014,
  social: {
    linkedin: "https://www.linkedin.com/company/flaming-integrated-logistiks",
    twitter: "https://twitter.com/fill_ng",
    instagram: "https://www.instagram.com/fill.ng",
    facebook: "https://www.facebook.com/fill.ng",
  },
} as const;

export const addressOneLine = `${company.address.line1}, ${company.address.line2}, ${company.address.area}, ${company.address.city}, ${company.address.country}`;

/* ── Services ─────────────────────────────────────────────────── */
export type Service = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  icon: ServiceIcon;
  featured?: boolean;
};

export type ServiceIcon =
  | "globe"
  | "plane"
  | "ship"
  | "truck"
  | "clipboard"
  | "import"
  | "export"
  | "boxes"
  | "container"
  | "haulage"
  | "warehouse"
  | "building"
  | "network"
  | "door"
  | "courier";

export const services: Service[] = [
  {
    slug: "international-freight-forwarding",
    title: "International Freight Forwarding",
    short: "End-to-end global freight",
    summary:
      "We orchestrate multimodal shipments across borders — carriers, routing, documentation, and compliance handled as one seamless movement.",
    icon: "globe",
    featured: true,
  },
  {
    slug: "air-freight",
    title: "Air Freight",
    short: "Time-critical air cargo",
    summary:
      "Priority, consolidated, and charter air solutions with global carrier partnerships for cargo that simply has to arrive on time.",
    icon: "plane",
    featured: true,
  },
  {
    slug: "ocean-freight",
    title: "Ocean Freight",
    short: "FCL & LCL sea freight",
    summary:
      "Full-container and less-than-container ocean freight with competitive rates, reliable schedules, and full visibility port to port.",
    icon: "ship",
    featured: true,
  },
  {
    slug: "road-freight",
    title: "Road Freight",
    short: "Regional road transport",
    summary:
      "Dependable road freight across Nigeria and West Africa with tracked fleets and flexible FTL/LTL options.",
    icon: "truck",
    featured: true,
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    short: "Fast, compliant clearance",
    summary:
      "Licensed customs brokerage that clears your cargo quickly and correctly — tariffs, duties, permits, and documentation managed end to end.",
    icon: "clipboard",
    featured: true,
  },
  {
    slug: "import-services",
    title: "Import Services",
    short: "Seamless imports",
    summary:
      "We manage the full import lifecycle — sourcing coordination, freight, clearance, and last-mile delivery into Nigeria.",
    icon: "import",
  },
  {
    slug: "export-services",
    title: "Export Services",
    short: "Export with confidence",
    summary:
      "Export documentation, compliance, and freight management that gets Nigerian goods to global markets without friction.",
    icon: "export",
  },
  {
    slug: "cargo-consolidation",
    title: "Cargo Consolidation",
    short: "Lower cost per shipment",
    summary:
      "Combine multiple shipments into optimized loads to cut freight costs while keeping individual cargo fully traceable.",
    icon: "boxes",
  },
  {
    slug: "container-handling",
    title: "Container Handling",
    short: "Terminal & yard ops",
    summary:
      "Professional container handling, stuffing, de-stuffing, and terminal coordination with safety and turnaround as priorities.",
    icon: "container",
  },
  {
    slug: "haulage",
    title: "Haulage",
    short: "Heavy & containerized haulage",
    summary:
      "Containerized and heavy-cargo haulage with a tracked, well-maintained fleet and experienced operators.",
    icon: "haulage",
  },
  {
    slug: "warehousing",
    title: "Warehousing",
    short: "Secure storage & 3PL",
    summary:
      "Secure, organized warehousing with inventory control, cross-docking, and value-added 3PL services.",
    icon: "warehouse",
    featured: true,
  },
  {
    slug: "corporate-logistics",
    title: "Corporate Logistics",
    short: "Managed logistics programs",
    summary:
      "Dedicated logistics programs for enterprises — SLAs, reporting, and a single point of accountability for your supply chain.",
    icon: "building",
  },
  {
    slug: "supply-chain-solutions",
    title: "Supply Chain Solutions",
    short: "Design & optimize",
    summary:
      "We design, optimize, and run supply chains end to end — from procurement flows to distribution networks.",
    icon: "network",
    featured: true,
  },
  {
    slug: "door-to-door-delivery",
    title: "Door-to-Door Delivery",
    short: "Origin to destination",
    summary:
      "One accountable partner from the supplier's door to yours — freight, clearance, and final-mile in a single managed service.",
    icon: "door",
  },
  {
    slug: "onboard-courier-obc",
    title: "Onboard Courier (OBC)",
    short: "Hand-carried, time-critical",
    summary:
      "When every hour counts, a dedicated courier hand-carries your shipment on the next available flight — personally escorted, door to door, anywhere in the world.",
    icon: "courier",
  },
];

export const featuredServices = services.filter((s) => s.featured);

/* ── Industries ──────────────────────────────────────────────── */
export type Industry = { slug: string; title: string; blurb: string };

export const industries: Industry[] = [
  { slug: "manufacturing", title: "Manufacturing", blurb: "JIT inbound materials & finished-goods distribution." },
  { slug: "construction", title: "Construction", blurb: "Project cargo, heavy lift, and equipment logistics." },
  { slug: "retail", title: "Retail", blurb: "Replenishment, consolidation, and seasonal peaks." },
  { slug: "automotive", title: "Automotive", blurb: "Parts, CKD/SKD kits, and vehicle movement." },
  { slug: "agriculture", title: "Agriculture", blurb: "Inputs inbound, commodities and produce export." },
  { slug: "healthcare", title: "Healthcare", blurb: "Temperature-sensitive & compliant pharma freight." },
  { slug: "oil-gas", title: "Oil & Gas", blurb: "Upstream equipment, OCTG, and project logistics." },
  { slug: "government", title: "Government", blurb: "Tenders, aid cargo, and compliant public logistics." },
  { slug: "ecommerce", title: "E-commerce", blurb: "Cross-border fulfilment and last-mile delivery." },
  { slug: "fmcg", title: "FMCG", blurb: "High-velocity distribution and inventory flow." },
];

/* ── Navigation ──────────────────────────────────────────────── */
export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Track Shipment", href: "/track" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: services.slice(0, 8).map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  tools: [
    { label: "Track a Shipment", href: "/track" },
    { label: "Request a Quote", href: "/quote" },
    { label: "Talk to an Expert", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

/* ── Stats ───────────────────────────────────────────────────── */
export type Stat = { value: number; suffix?: string; prefix?: string; label: string; decimals?: number };

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Countries served" },
  { value: 45000, suffix: "+", label: "Shipments delivered" },
  { value: 99.2, suffix: "%", label: "On-time delivery", decimals: 1 },
  { value: 24, suffix: "/7", label: "Operations & support" },
];

/* ── The 3-step promise ──────────────────────────────────────── */
export const processSteps = [
  {
    no: "01",
    verb: "Manage",
    title: "We Manage It",
    body: "From booking to routing, carrier selection to documentation — your shipment is planned and coordinated by a dedicated logistics team.",
  },
  {
    no: "02",
    verb: "Clear",
    title: "We Clear It",
    body: "Licensed customs brokerage handles duties, tariffs, and compliance so your cargo moves through borders without costly delays.",
  },
  {
    no: "03",
    verb: "Deliver",
    title: "We Deliver It",
    body: "Tracked, insured, and on time — to the port, the warehouse, or the final door. One partner, fully accountable, end to end.",
  },
];

/* ── Why choose us ───────────────────────────────────────────── */
export const valueProps = [
  {
    title: "Global network, local mastery",
    body: "Agents and carrier partners across 120+ countries, backed by deep expertise in Nigerian customs and West African corridors.",
  },
  {
    title: "Real-time shipment visibility",
    body: "Track every milestone from booking to delivery with live status, ETAs, and document access in one place.",
  },
  {
    title: "Customs cleared, correctly",
    body: "Licensed brokerage and compliance-first processes mean fewer holds, fewer surprises, and faster release.",
  },
  {
    title: "One accountable partner",
    body: "A single point of contact for freight, clearance, warehousing, and delivery — no finger-pointing across vendors.",
  },
];

/* ── Certifications / trust ──────────────────────────────────── */
export const certifications = [
  "Licensed Customs Broker",
  "IATA Cargo Agent",
  "FIATA Member",
  "ISO 9001 Aligned",
  "NSC Registered",
  "AEO Compliant",
];

/* ── Testimonials ────────────────────────────────────────────── */
export type Testimonial = { quote: string; author: string; role: string; company: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Flaming took over our import clearance and cut our average port dwell time by more than half. Their team simply makes the complexity disappear.",
    author: "Adaeze Okafor",
    role: "Head of Supply Chain",
    company: "A leading FMCG manufacturer",
  },
  {
    quote:
      "When a critical machine part was stuck overseas, they arranged air freight and cleared it in days. That responsiveness kept our plant running.",
    author: "Ibrahim Bello",
    role: "Operations Director",
    company: "Industrial equipment group",
  },
  {
    quote:
      "Reliable, transparent, and genuinely consultative. We finally have one partner accountable for our entire inbound supply chain.",
    author: "Grace Eze",
    role: "Procurement Lead",
    company: "Healthcare distribution company",
  },
];

/* ── Client logos (placeholders — wordmarks until real assets supplied) ── */
export const clientLogos = [
  "Northbridge",
  "Sahel Foods",
  "Atlas Motors",
  "Meridian Pharma",
  "Delta Energy",
  "Lagos Retail Co.",
  "Vanguard Steel",
  "Orbit Trading",
];

/* ── Globe markers (lat, lng) for the hero network ───────────── */
export const globeMarkers: { location: [number, number]; size: number }[] = [
  { location: [6.5244, 3.3792], size: 0.12 }, // Lagos (HQ)
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
  { location: [31.2304, 121.4737], size: 0.07 }, // Shanghai
  { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
  { location: [51.9244, 4.4777], size: 0.05 }, // Rotterdam
  { location: [29.7604, -95.3698], size: 0.05 }, // Houston
  { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
  { location: [-26.2041, 28.0473], size: 0.06 }, // Johannesburg
  { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
  { location: [30.0444, 31.2357], size: 0.05 }, // Cairo
];

/* ── Shipment tracking statuses (shared w/ admin + tracking) ─── */
export const shipmentStatuses = [
  "Booked",
  "Processing",
  "Customs Clearance",
  "In Transit",
  "Arrived",
  "Out For Delivery",
  "Delivered",
] as const;

export type ShipmentStatus = (typeof shipmentStatuses)[number];
