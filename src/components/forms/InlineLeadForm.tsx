"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

type State = "idle" | "submitting" | "success" | "error";

export function InlineLeadForm({ service }: { service?: string }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: service ? `service:${service}` : "inline" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Something went wrong. Please try again.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <h3 className="mt-3 font-bold text-ink">Request received</h3>
        <p className="mt-2 text-sm text-ink-500">
          Thank you — a logistics expert will reach out within 4 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      {service && <input type="hidden" name="service" value={service} />}
      <Field name="name" label="Full name" placeholder="Jane Doe" required />
      <Field name="company" label="Company" placeholder="Acme Ltd" />
      <Field name="email" label="Work email" type="email" placeholder="jane@acme.com" required />
      <Field name="phone" label="Phone" type="tel" placeholder="+234 ..." />
      <div>
        <label htmlFor="lead-message" className="mb-1 block text-xs font-medium text-ink-700">
          What are you shipping?
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Origin, destination, cargo type, weight…"
          className="w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {state === "error" && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={state === "submitting"} className="btn btn-primary w-full justify-center">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-ink-500">No obligation. We reply within 4 business hours.</p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`lead-${name}`} className="mb-1 block text-xs font-medium text-ink-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={`lead-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
