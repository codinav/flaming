import { PrismaClient } from "@prisma/client";
import path from "node:path";

// Reuse a single PrismaClient across hot reloads / serverless invocations.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * For SQLite, pin the file to an absolute path under the project so it never
 * depends on the process working directory (which differs across hosts and
 * build outputs — the cause of the "no such table" errors on shared hosting).
 * Postgres / already-absolute URLs are passed through unchanged.
 */
function resolveDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (url && url.startsWith("file:")) {
    const file = url.slice(5);
    if (!path.isAbsolute(file)) {
      return "file:" + path.join(process.cwd(), "prisma", path.basename(file));
    }
  }
  return url;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDatabaseUrl(),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
