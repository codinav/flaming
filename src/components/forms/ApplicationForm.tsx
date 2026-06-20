"use client";

import { useState, useTransition } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitApplication } from "@/lib/public-actions";
import { UploadField } from "@/components/admin/UploadField";

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("jobId", jobId);
    start(async () => {
      const res = await submitApplication(fd);
      if (res?.ok) setDone(true);
      else setError(res?.message ?? "Something went wrong. Please try again.");
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <h3 className="mt-3 font-bold text-ink">Application received</h3>
        <p className="mt-2 text-sm text-ink-500">
          Thank you for applying. Our team will review your application and be in touch.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="ap-name" className="mb-1 block text-xs font-medium text-ink-700">
          Full name <span className="text-brand-600">*</span>
        </label>
        <input id="ap-name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="ap-email" className="mb-1 block text-xs font-medium text-ink-700">
          Email <span className="text-brand-600">*</span>
        </label>
        <input id="ap-email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="ap-phone" className="mb-1 block text-xs font-medium text-ink-700">
          Phone
        </label>
        <input id="ap-phone" name="phone" type="tel" className={field} />
      </div>
      <UploadField
        name="resumeUrl"
        label="Résumé (PDF/DOC — upload or paste a link)"
        accept=".pdf,.doc,.docx,image/*"
        folder="fill/resumes"
      />
      <div>
        <label htmlFor="ap-cover" className="mb-1 block text-xs font-medium text-ink-700">
          Cover note
        </label>
        <textarea id="ap-cover" name="coverLetter" rows={4} className={field} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Submit application"
        )}
      </button>
    </form>
  );
}
