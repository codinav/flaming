/**
 * Minimal email notifier. Uses Resend when RESEND_API_KEY is set; otherwise
 * logs (so the app works with zero email config). Swap/extend as needed.
 */
export async function notifyNewSubmission(
  kind: "quote" | "lead" | "application",
  data: { name: string; email: string; reference?: string; [k: string]: unknown }
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO_SALES || "sales@fill.ng";
  const from = process.env.MAIL_FROM || "Flaming Logistiks <no-reply@fill.ng>";

  if (!key) {
    console.info(`[mail] (no RESEND_API_KEY) new ${kind} from ${data.email}`);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `New ${kind}${data.reference ? ` ${data.reference}` : ""}: ${data.name}`,
        text: Object.entries(data)
          .map(([k, v]) => `${k}: ${v ?? "—"}`)
          .join("\n"),
      }),
    });
  } catch (err) {
    console.error("[mail] notification failed", err);
  }
}
