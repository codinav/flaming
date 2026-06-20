"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "@/lib/site";

type State = "idle" | "submitting" | "success" | "error";

const shippingMethods = ["Air Freight", "Ocean Freight (FCL)", "Ocean Freight (LCL)", "Road Freight", "Multimodal", "Not sure yet"];
const cargoTypes = ["General Cargo", "Containerized", "Perishable / Reefer", "Hazardous (DG)", "Oversized / Project", "Vehicles", "Other"];

export function QuoteForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

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
        body: JSON.stringify({ ...data, source: "quote-page" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Something went wrong. Please try again.");
      }
      setState("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "success") {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-600" />
        <h2 className="mt-4 text-2xl font-bold text-ink">Your request is in</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          Thank you. A logistics expert will review your shipment details and respond within 4
          business hours with a tailored quote.
        </p>
        <button onClick={() => setState("idle")} className="btn btn-outline mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Full name" required placeholder="Jane Doe" />
        <Input name="company" label="Company" placeholder="Acme Ltd" />
        <Input name="email" type="email" label="Work email" required placeholder="jane@acme.com" />
        <Input name="phone" type="tel" label="Phone" placeholder="+234 ..." />
        <Input name="originCountry" label="Origin country" placeholder="China" />
        <Input name="destinationCountry" label="Destination country" placeholder="Nigeria" />
        <Select name="cargoType" label="Cargo type" options={cargoTypes} />
        <Select name="shippingMethod" label="Preferred shipping method" options={shippingMethods} />
        <Input name="weight" label="Total weight" placeholder="e.g. 1,200 kg" />
        <Input name="dimensions" label="Dimensions / volume" placeholder="e.g. 2 × 40ft / 12 CBM" />
        <Select
          name="service"
          label="Service of interest"
          options={services.map((s) => s.title)}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label htmlFor="q-notes" className="mb-1.5 block text-sm font-medium text-ink-700">
            Additional notes
          </label>
          <textarea
            id="q-notes"
            name="notes"
            rows={4}
            placeholder="Timelines, incoterms, special handling, target rates…"
            className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {state === "error" && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={state === "submitting"} className="btn btn-primary mt-6 w-full justify-center sm:w-auto">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Request my quote <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-ink-500">
        By submitting, you agree to be contacted about your request. We never share your details.
      </p>
    </form>
  );
}

function fieldClasses() {
  return "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";
}

function Input({
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
      <label htmlFor={`q-${name}`} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input id={`q-${name}`} name={name} type={type} required={required} placeholder={placeholder} className={fieldClasses()} />
    </div>
  );
}

function Select({
  name,
  label,
  options,
  className,
}: {
  name: string;
  label: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`q-${name}`} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <select id={`q-${name}`} name={name} defaultValue="" className={fieldClasses()}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
