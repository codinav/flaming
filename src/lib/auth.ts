/**
 * Minimal admin session auth. The session cookie holds a SHA-256 token derived
 * from the configured credentials, so it can be verified in both the Edge
 * middleware and Node server actions (uses the global Web Crypto API).
 */
export const ADMIN_COOKIE = "fill_admin";

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASSWORD);
}

export async function getSessionToken(): Promise<string> {
  const secret = `${process.env.ADMIN_USER ?? ""}:${process.env.ADMIN_PASSWORD ?? ""}:fill-admin-v1`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyCredentials(username: string, password: string): boolean {
  return username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD;
}
