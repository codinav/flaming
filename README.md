# Flaming Integrated Logistiks Ltd — Enterprise Logistics Platform

> **We Manage It. We Clear It. We Deliver It.**
> Freight forwarding, customs clearance & supply chain solutions — Lagos, Nigeria → 120+ countries.

A premium, production-ready logistics platform: marketing site + shipment tracking + quote
intake + a full admin panel, built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
and Prisma.

---

## Tech stack

| Layer     | Choice                                                              |
| --------- | ------------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, RSC, Server Actions) + TypeScript          |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens)                        |
| Motion    | Framer Motion + `cobe` WebGL globe                                 |
| Backend   | Next.js Route Handlers + Server Actions (full-stack monolith)      |
| Database  | Prisma ORM — **SQLite** by default, **Postgres**-ready             |
| Admin     | `/admin` protected by HTTP Basic Auth (env-gated middleware)       |
| Email     | Resend (optional — logs when unconfigured)                         |
| Deploy    | Vercel · Docker (standalone output) · AWS compatible              |

---

## Getting started

```bash
cp .env.example .env          # defaults to SQLite, no other config needed
npm install                   # runs prisma generate
npm run db:push               # create the SQLite database
npm run db:seed               # load demo data (shipments, quotes, blog, jobs)
npm run dev                   # http://localhost:3000
```

Demo tracking number: **`FILL-2025-04471`**. Admin panel: **`/admin`**.

Production build:

```bash
npm run build && npm start
```

---

## Site map

```
PUBLIC
/                      Home (hero, services, modes, process, coverage, industries, testimonials)
/about /contact        Company + contact (map, form)
/services /[slug]      Services index + 14 SEO landing pages (FAQ + JSON-LD, lead form)
/industries /[slug]    Industries index + 10 sector pages
/track                 Shipment tracking (DB-backed)  [demo: FILL-2025-04471]
/quote                 Full freight quote request
/blog /[slug]          Knowledge center (DB / CMS-driven)
/careers /[slug]       Job listings + online application

ADMIN  (/admin — Basic Auth in production)
/admin                 Dashboard (live counts + recent activity)
/admin/shipments       List · create · edit · status/ETA/location · tracking timeline
/admin/quotes          Status workflow · convert quote → shipment
/admin/leads           Contact-form enquiries + status
/admin/customers       Customer profiles + shipment/quote counts
/admin/blog            Full CMS (create/edit/publish/delete, SEO fields, categories)
/admin/careers         Job postings + applications (status workflow)
/admin/settings        Company info + configuration reference

API
POST /api/quote        Quote/lead intake → DB (+ email when configured)
GET  /api/track        Shipment lookup → DB
GET  /api/health       Liveness + DB connectivity probe
/sitemap.xml /robots.txt + JSON-LD (Organization, Service, FAQ)
```

---

## Admin panel

- Protected by **HTTP Basic Auth** via `src/middleware.ts`. Set `ADMIN_USER` and
  `ADMIN_PASSWORD` in production. If unset (local dev), access is open.
- All mutations use **Server Actions** (`src/app/admin/actions.ts`) with `revalidatePath`.
- Converting a quote auto-creates/links a Customer and a Shipment with an initial timeline.

---

## Database

`prisma/schema.prisma` — models: `Customer`, `Lead`, `Quote`, `Shipment`, `TimelineEvent`,
`ShipmentDocument`, `BlogPost`/`BlogCategory`, `JobPosting`/`JobApplication`, `Setting`.

Runs on **SQLite** out of the box (zero infra). Kept **Postgres-compatible** (no native enums,
no JSON columns). To go to production Postgres:

1. In `prisma/schema.prisma`, set `datasource.provider = "postgresql"`.
2. Set `DATABASE_URL` to your Postgres connection string.
3. `npx prisma migrate deploy` (or `npx prisma db push`), then `npm run db:seed` if desired.

Scripts: `npm run db:push`, `npm run db:seed`, `npm run db:studio`.

---

## Deployment

**Vercel (recommended)** — connect the repo, add a Postgres database (Vercel Postgres / Neon /
Supabase), set `DATABASE_URL` + `ADMIN_USER` + `ADMIN_PASSWORD` (+ `RESEND_API_KEY` for email),
switch the Prisma provider to `postgresql`, and deploy.

**Docker** — standalone output is enabled:

```bash
docker build -t fill-platform .
docker run -p 3000:3000 -e DATABASE_URL=... -e ADMIN_USER=... -e ADMIN_PASSWORD=... fill-platform
```

`/api/health` is a ready-made health-check endpoint for load balancers.

---

## Project structure

```
src/
├─ app/
│  ├─ (public)/          marketing + public routes (own Header/Footer layout)
│  ├─ admin/             admin panel + server actions
│  ├─ api/               quote, track, health route handlers
│  └─ layout.tsx         root (html/body/fonts)
├─ components/  ui · layout · home · forms · tracking · admin
├─ lib/         site.ts (content) · db.ts · enums.ts · seo.ts · mail.ts · images.ts
└─ middleware.ts         admin Basic Auth
prisma/  schema.prisma · seed.ts
```

---

## Future enhancements

Cloudinary file uploads (resumes, docs, blog media) · rich-text editor · client/vendor/driver
portals · fleet & warehouse management · invoicing & online payments · live GPS tracking.
Login was intentionally removed for this phase; `/admin` uses Basic Auth instead.
