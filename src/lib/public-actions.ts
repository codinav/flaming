"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notifyNewSubmission } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitApplication(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" && v.trim() ? v.trim() : null;
  };

  const jobId = get("jobId");
  const name = get("name");
  const email = get("email");

  if (!jobId || !name) return { ok: false, message: "Your name is required." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, message: "A valid email is required." };

  const job = await db.jobPosting.findUnique({ where: { id: jobId } });
  if (!job || !job.isOpen) return { ok: false, message: "This role is no longer open." };

  await db.jobApplication.create({
    data: {
      jobId,
      name,
      email,
      phone: get("phone"),
      resumeUrl: get("resumeUrl"),
      coverLetter: get("coverLetter"),
      status: "New",
    },
  });

  await notifyNewSubmission("application", { name, email, role: job.title });
  revalidatePath("/admin/careers");
  return { ok: true };
}
