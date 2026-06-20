"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, MapPin, Navigation, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "track" | "quote";

export function HeroSearchWidget() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("track");
  const [code, setCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  function trackSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(code.trim() ? `/track?code=${encodeURIComponent(code.trim())}` : "/track");
  }

  function quoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (origin.trim()) params.set("origin", origin.trim());
    if (destination.trim()) params.set("destination", destination.trim());
    const qs = params.toString();
    router.push(qs ? `/quote?${qs}` : "/quote");
  }

  return (
    <div className="w-full rounded-3xl bg-white/95 p-2 shadow-[var(--shadow-lift)] ring-1 ring-black/5 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl bg-canvas-soft p-1">
        <TabButton active={tab === "track"} onClick={() => setTab("track")}>
          <Search className="h-4 w-4" />
          Track shipment
        </TabButton>
        <TabButton active={tab === "quote"} onClick={() => setTab("quote")}>
          <Navigation className="h-4 w-4" />
          Get a quote
        </TabButton>
      </div>

      <div className="p-4 sm:p-5">
        {tab === "track" ? (
          <form onSubmit={trackSubmit}>
            <label htmlFor="hero-track" className="mb-2 block text-sm font-medium text-ink-700">
              Enter your tracking number
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/30" />
                <input
                  id="hero-track"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. FILL-2025-04471"
                  className="w-full rounded-xl border border-ink/12 bg-white py-3.5 pl-12 pr-4 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <button type="submit" className="btn btn-primary justify-center sm:px-7">
                Track
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={quoteSubmit}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Field
                id="hero-origin"
                label="Origin"
                icon={<MapPin className="h-4 w-4" />}
                value={origin}
                onChange={setOrigin}
                placeholder="Shanghai, China"
              />
              <Field
                id="hero-dest"
                label="Destination"
                icon={<Navigation className="h-4 w-4" />}
                value={destination}
                onChange={setDestination}
                placeholder="Lagos, Nigeria"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3 w-full justify-center">
              Get an instant quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
          <Clock className="h-3.5 w-3.5 text-brand-600" />
          Average quote response in under 4 business hours.
        </p>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
        active ? "bg-white text-ink shadow-sm" : "text-ink-500 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/30">
          {icon}
        </span>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-ink/12 bg-white py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
    </div>
  );
}
