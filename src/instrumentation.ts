// Runs once when the Next.js server boots — regardless of how it's started
// (`next start`, `npm start`, Passenger, standalone, etc.). We use it to make
// the local SQLite database self-healing: create tables + seed if needed.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  try {
    const path = await import("node:path");
    const { pathToFileURL } = await import("node:url");
    const target = pathToFileURL(path.join(process.cwd(), "scripts", "ensure-db.mjs")).href;
    // Importing the script runs its top-level bootstrap (idempotent + safe).
    await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ target);
  } catch (err) {
    console.error("[instrumentation] DB bootstrap failed:", err);
  }
}
