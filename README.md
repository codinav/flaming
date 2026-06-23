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
| Database  | Prisma ORM — SQLite (committed seed), portable to Postgres         |
| Admin     | `/admin` protected by HTTP Basic Auth (env-gated middleware)       |
| Email     | Resend (optional — logs when unconfigured)                         |
| Deploy    | Vercel · Docker (standalone output) · AWS compatible              |

---

## Getting started

```bash
cp .env.example .env          # SQLite by default — no DB to provision
npm install                   # runs prisma generate
npm run db:seed               # (optional) reset demo data; a seeded dev.db is committed
npm run dev                   # http://localhost:3000
```

> Uses **SQLite** out of the box — a seeded `prisma/dev.db` is committed, so it works
> immediately with zero database setup.

Demo tracking number: **`FILL-2025-04471`**. Admin panel: **`/admin`** (login below).

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

Uses **SQLite** with a committed, seeded `prisma/dev.db`, so the app works on first deploy
with no database setup. Status/mode fields are validated strings and settings/meta are text,
so the schema is portable — to move to managed Postgres for durable writes, set
`provider = "postgresql"` in `prisma/schema.prisma` and a `DATABASE_URL`, then
`npx prisma db push && npm run db:seed`. Scripts: `npm run db:push`, `npm run db:seed`,
`npm run db:studio`.

---

## Deployment

### Hostinger (Node.js app)

1. Connect this GitHub repo in Hostinger's Node.js app setup. Build command
   `npm run build`, start command `npm start` (Node 20+).
2. **Set environment variables** (hPanel → your app → Environment):
   | Variable | Required | Notes |
   | --- | --- | --- |
   | `ADMIN_USER` | ✅ | Admin login username (e.g. `admin`) |
   | `ADMIN_PASSWORD` | ✅ | Admin login password — **without these `/admin` is unprotected** |
   | `NEXT_PUBLIC_SITE_URL` | recommended | e.g. `https://fill.ng` |
   | `RESEND_API_KEY`, `MAIL_*` | optional | Email notifications |
   | `CLOUDINARY_*` | optional | File uploads |
3. Deploy. The committed `prisma/dev.db` means tracking, blog, careers, and the admin
   panel work immediately — no DB provisioning.

> Note: with SQLite, data written in production (new quotes/shipments) resets on each
> redeploy back to the committed seed. For durable production data, switch to managed
> Postgres (Neon) as described above.

### Docker (self-host)

Standalone output is enabled:

```bash
docker build -t fill-platform .
docker run -p 3000:3000 -e ADMIN_USER=admin -e ADMIN_PASSWORD=... fill-platform
```

`/api/health` is a ready-made health-check endpoint for load balancers.

---

## Admin access

`/admin` is gated by a session-cookie login page (`/admin/login`). Set `ADMIN_USER` and
`ADMIN_PASSWORD` to enable it; if unset, the panel is open (local-dev convenience).

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
