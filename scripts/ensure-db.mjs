// Runs before the server starts. Makes the local SQLite database self-healing:
// creates the tables if they don't exist and seeds demo data if empty — so the
// app works on any host with zero manual database setup. Never throws (so the
// server still boots even if this hits a problem).
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import { seed } from "../prisma/seed.mjs";

const url = process.env.DATABASE_URL ?? "file:./dev.db";

async function main() {
  if (!url.startsWith("file:")) {
    console.log("[ensure-db] non-SQLite DATABASE_URL — skipping local DB bootstrap");
    return;
  }

  // Pin to an absolute path so CLI, this script, and the app all use one file.
  const file = url.slice(5);
  const absFile = path.isAbsolute(file)
    ? file
    : path.join(process.cwd(), "prisma", path.basename(file));
  const absUrl = "file:" + absFile;

  const db = new PrismaClient({ datasourceUrl: absUrl });
  try {
    const tables = await db.$queryRawUnsafe(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='Shipment'"
    );
    if (!tables.length) {
      console.log("[ensure-db] creating tables…");
      const sql = readFileSync(path.join(process.cwd(), "prisma", "init.sql"), "utf8");
      for (const stmt of sql.split(";").map((s) => s.trim()).filter(Boolean)) {
        await db.$executeRawUnsafe(stmt);
      }
    }

    const count = await db.shipment.count();
    if (count === 0) {
      console.log("[ensure-db] seeding demo data…");
      await seed(db);
    }
    console.log("[ensure-db] database ready ✅");
  } catch (err) {
    console.error("[ensure-db] warning:", err?.message ?? err);
  } finally {
    await db.$disconnect();
  }
}

await main();
