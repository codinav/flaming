import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

/**
 * Returns a short-lived Cloudinary upload signature so the client can upload
 * directly. If Cloudinary isn't configured, responds { configured: false } so
 * the UI can fall back to a plain URL field (no error).
 */
export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ configured: false });
  }

  let folder = "fill/uploads";
  try {
    const body = await request.json();
    if (body?.folder && /^[a-z0-9/_-]+$/i.test(body.folder)) folder = String(body.folder);
  } catch {
    /* use default folder */
  }

  const timestamp = Math.round(Date.now() / 1000);
  // Cloudinary signs the alphabetically-sorted params + the api secret.
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");

  return NextResponse.json({ configured: true, cloudName, apiKey, timestamp, signature, folder });
}
