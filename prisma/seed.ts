import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
function daysAhead(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  console.log("Seeding database…");

  // Clean (idempotent re-seed)
  await db.timelineEvent.deleteMany();
  await db.shipmentDocument.deleteMany();
  await db.shipment.deleteMany();
  await db.quote.deleteMany();
  await db.lead.deleteMany();
  await db.customer.deleteMany();
  await db.jobApplication.deleteMany();
  await db.jobPosting.deleteMany();
  await db.blogPost.deleteMany();
  await db.blogCategory.deleteMany();
  await db.setting.deleteMany();

  // ── Customers ──────────────────────────────────────────────
  const acme = await db.customer.create({
    data: {
      name: "Adaeze Okafor",
      company: "Sahel Foods Ltd",
      email: "adaeze@sahelfoods.example",
      phone: "+234 801 234 5678",
      country: "Nigeria",
    },
  });
  const meridian = await db.customer.create({
    data: {
      name: "Ibrahim Bello",
      company: "Meridian Industrial",
      email: "ibrahim@meridian.example",
      phone: "+234 802 987 6543",
      country: "Nigeria",
    },
  });

  // ── Quotes ─────────────────────────────────────────────────
  await db.quote.createMany({
    data: [
      {
        reference: "QT-2025-0001",
        name: "Adaeze Okafor",
        company: "Sahel Foods Ltd",
        email: "adaeze@sahelfoods.example",
        phone: "+234 801 234 5678",
        originCountry: "China",
        destinationCountry: "Nigeria",
        cargoType: "Containerized",
        weight: "18,400 kg",
        dimensions: "2 × 40ft",
        shippingMethod: "Ocean (FCL)",
        serviceSlug: "ocean-freight",
        notes: "Recurring monthly volume. Need competitive FCL rate Shanghai → Lagos.",
        source: "quote-page",
        status: "Converted",
        customerId: acme.id,
      },
      {
        reference: "QT-2025-0002",
        name: "Ibrahim Bello",
        company: "Meridian Industrial",
        email: "ibrahim@meridian.example",
        phone: "+234 802 987 6543",
        originCountry: "Germany",
        destinationCountry: "Nigeria",
        cargoType: "Oversized / Project",
        weight: "6,200 kg",
        shippingMethod: "Air",
        serviceSlug: "air-freight",
        notes: "Urgent machine part. Time-critical.",
        source: "service:air-freight",
        status: "Reviewing",
        customerId: meridian.id,
      },
      {
        reference: "QT-2025-0003",
        name: "Grace Eze",
        company: "Vanguard Pharma",
        email: "grace@vanguardpharma.example",
        phone: "+234 803 555 1212",
        originCountry: "India",
        destinationCountry: "Nigeria",
        cargoType: "Perishable / Reefer",
        weight: "3,000 kg",
        shippingMethod: "Air",
        serviceSlug: "import-services",
        notes: "Temperature-controlled pharma import.",
        source: "quote-page",
        status: "New",
      },
    ],
  });

  // ── Leads ──────────────────────────────────────────────────
  await db.lead.createMany({
    data: [
      {
        name: "Tunde Adeyemi",
        email: "tunde@orbittrading.example",
        company: "Orbit Trading",
        message: "Looking for a customs clearance partner in Lagos.",
        source: "contact",
        status: "New",
      },
      {
        name: "Chioma Nwosu",
        email: "chioma@deltaenergy.example",
        company: "Delta Energy",
        message: "Project cargo for an upstream rig. Need a call.",
        source: "service:supply-chain-solutions",
        status: "Contacted",
      },
    ],
  });

  // ── Shipments ──────────────────────────────────────────────
  const shipmentStatuses = [
    "Booked",
    "Processing",
    "Customs Clearance",
    "In Transit",
    "Arrived",
    "Out For Delivery",
    "Delivered",
  ];
  const locations: Record<string, string> = {
    Booked: "Shanghai, CN",
    Processing: "Shanghai, CN",
    "Customs Clearance": "Shanghai Port, CN",
    "In Transit": "Indian Ocean — vessel MV Meridian",
    Arrived: "Lagos Port (Apapa), NG",
    "Out For Delivery": "Ikeja, Lagos, NG",
    Delivered: "Omole Phase 1, Lagos, NG",
  };

  const demoCurrentIndex = shipmentStatuses.indexOf("In Transit");
  const demo = await db.shipment.create({
    data: {
      trackingNumber: "FILL-2025-04471",
      status: "In Transit",
      mode: "Ocean (FCL)",
      origin: "Shanghai, China",
      destination: "Lagos, Nigeria",
      currentLocation: locations["In Transit"],
      cargoType: "Containerized",
      weightKg: 18400,
      pieces: 2,
      eta: daysAhead(5),
      bookedAt: daysAgo(9),
      customerId: acme.id,
      timeline: {
        create: shipmentStatuses.slice(0, demoCurrentIndex + 1).map((status, i) => ({
          status,
          location: locations[status],
          occurredAt: daysAgo(9 - i * 2),
          note:
            status === "Customs Clearance"
              ? "Export documentation verified and cleared."
              : status === "In Transit"
                ? "On schedule. Vessel en route to Lagos."
                : undefined,
        })),
      },
    },
  });

  await db.shipment.create({
    data: {
      trackingNumber: "FILL-2025-04472",
      status: "Delivered",
      mode: "Air",
      origin: "Frankfurt, Germany",
      destination: "Lagos, Nigeria",
      currentLocation: "Lagos, Nigeria",
      cargoType: "General Cargo",
      weightKg: 620,
      pieces: 4,
      eta: daysAgo(2),
      bookedAt: daysAgo(8),
      deliveredAt: daysAgo(2),
      customerId: meridian.id,
      timeline: {
        create: shipmentStatuses.map((status, i) => ({
          status,
          location: status === "Delivered" ? "Lagos, NG" : `Leg ${i + 1}`,
          occurredAt: daysAgo(8 - i),
        })),
      },
    },
  });

  await db.shipment.create({
    data: {
      trackingNumber: "FILL-2025-04473",
      status: "Customs Clearance",
      mode: "Ocean (LCL)",
      origin: "Mumbai, India",
      destination: "Lagos, Nigeria",
      currentLocation: "Lagos Port (Apapa), NG",
      cargoType: "Perishable / Reefer",
      weightKg: 3000,
      pieces: 12,
      eta: daysAhead(3),
      bookedAt: daysAgo(14),
      timeline: {
        create: shipmentStatuses.slice(0, 3).map((status, i) => ({
          status,
          location: locations[status] ?? "In progress",
          occurredAt: daysAgo(14 - i * 3),
        })),
      },
    },
  });

  console.log(`  shipments: 3 (demo ${demo.trackingNumber})`);

  // ── Blog ───────────────────────────────────────────────────
  const categoryNames = [
    "Freight Forwarding",
    "International Trade",
    "Customs Clearance",
    "Supply Chain",
    "Import & Export",
    "Logistics Tips",
  ];
  const categories: Record<string, string> = {};
  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const c = await db.blogCategory.create({ data: { name, slug } });
    categories[name] = c.id;
  }

  const posts = [
    {
      title: "How to Clear Cargo Through Nigerian Customs Without Costly Delays",
      category: "Customs Clearance",
      excerpt:
        "A practical guide to documentation, duties, and the common mistakes that hold shipments at Apapa and Tin Can ports.",
      content:
        "<p>Customs clearance is where many imports lose days — and money. The difference between a 2-day release and a 2-week hold usually comes down to preparation.</p><h2>Get your documentation right</h2><p>Ensure your Form M, PAAR, Bill of Lading, and commercial invoice are consistent. Mismatches in HS codes or values are the most common cause of delays.</p><h2>Classify cargo correctly</h2><p>Accurate HS classification determines your duty rate and required permits. When in doubt, work with a licensed customs broker.</p><h2>Plan for inspections</h2><p>Build inspection time into your schedule and keep your agent reachable. Proactive communication prevents small queries from becoming long holds.</p>",
    },
    {
      title: "Air vs. Ocean Freight: Choosing the Right Mode for Your Cargo",
      category: "Freight Forwarding",
      excerpt:
        "Speed, cost, and reliability trade-offs — and a simple framework for deciding how to ship.",
      content:
        "<p>Choosing between air and ocean freight isn't just about speed. It's about total landed cost, cargo value, and how time-sensitive your supply chain is.</p><h2>When air freight wins</h2><p>High-value, low-weight, or time-critical cargo. The higher freight cost is offset by lower inventory holding and faster cash cycles.</p><h2>When ocean freight wins</h2><p>Bulky, heavy, or non-urgent cargo. FCL for full loads, LCL when you can't fill a container.</p><h2>The hybrid play</h2><p>Many shippers split shipments — air for the urgent portion, ocean for the rest — to balance speed and cost.</p>",
    },
    {
      title: "5 Ways to Make Your Supply Chain More Resilient in 2026",
      category: "Supply Chain",
      excerpt:
        "From dual-sourcing to real-time visibility, here's how to absorb shocks without blowing your budget.",
      content:
        "<p>Resilience is now a board-level priority. Here are five moves that pay off without over-engineering your network.</p><h2>1. Diversify suppliers and lanes</h2><p>Single points of failure are expensive. Qualify backup suppliers and alternate routings before you need them.</p><h2>2. Invest in visibility</h2><p>You can't manage what you can't see. Real-time tracking turns surprises into manageable events.</p><h2>3. Hold strategic buffers</h2><p>Targeted safety stock on critical SKUs beats blanket inventory.</p><h2>4. Build partner relationships</h2><p>In a crunch, trusted logistics partners get you capacity others can't.</p><h2>5. Review and rehearse</h2><p>Run scenario plans so your team knows the playbook.</p>",
    },
  ];

  for (const p of posts) {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await db.blogPost.create({
      data: {
        title: p.title,
        slug,
        excerpt: p.excerpt,
        content: p.content,
        status: "Published",
        authorName: "Flaming Logistiks Team",
        readingMinutes: 4,
        categoryId: categories[p.category],
        metaTitle: p.title,
        metaDescription: p.excerpt,
        publishedAt: daysAgo(Math.floor(Math.random() * 30) + 1),
      },
    });
  }
  console.log(`  blog: ${posts.length} posts, ${categoryNames.length} categories`);

  // ── Careers ────────────────────────────────────────────────
  const jobs = [
    {
      title: "Freight Operations Coordinator",
      department: "Operations",
      location: "Ikeja, Lagos",
      type: "Full-time",
      description:
        "<p>Coordinate end-to-end shipments across air, ocean, and road — bookings, documentation, and milestone updates. You'll be the operational owner keeping cargo moving and clients informed.</p><h3>What you'll do</h3><ul><li>Manage shipment bookings and carrier coordination</li><li>Prepare and verify shipping documentation</li><li>Keep clients updated with proactive status</li></ul><h3>What you bring</h3><ul><li>2+ years in freight forwarding or logistics ops</li><li>Strong attention to detail and communication</li></ul>",
    },
    {
      title: "Customs Clearance Specialist",
      department: "Customs",
      location: "Apapa, Lagos",
      type: "Full-time",
      description:
        "<p>Own the clearance process — classification, duties, permits, and liaison with customs and terminals to release cargo quickly and compliantly.</p><h3>What you bring</h3><ul><li>Licensed customs broker experience preferred</li><li>Deep knowledge of Nigerian customs procedures</li></ul>",
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Lagos (Hybrid)",
      type: "Full-time",
      description:
        "<p>Grow our corporate client base. Identify opportunities, build relationships, and close logistics contracts across manufacturing, FMCG, and energy.</p>",
    },
  ];

  for (const j of jobs) {
    const slug = j.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await db.jobPosting.create({ data: { ...j, slug, isOpen: true } });
  }

  const firstJob = await db.jobPosting.findFirst();
  if (firstJob) {
    await db.jobApplication.create({
      data: {
        jobId: firstJob.id,
        name: "Samuel Adeniran",
        email: "samuel.adeniran@example.com",
        phone: "+234 805 111 2222",
        coverLetter: "5 years in freight ops, looking to grow with a serious team.",
        status: "Screening",
      },
    });
  }
  console.log(`  careers: ${jobs.length} jobs`);

  // ── Settings ───────────────────────────────────────────────
  await db.setting.create({
    data: {
      key: "company",
      value: JSON.stringify({
        phone: "+2347049974905",
        email: "info@fill.ng",
        hours: "9:00 AM – 6:00 PM",
      }),
    },
  });

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
