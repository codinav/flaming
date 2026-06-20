"use client";

import { useTransition } from "react";
import { cn } from "@/lib/utils";

/** A <select> that calls a server action(id, value) on change. */
export function ActionSelect({
  id,
  value,
  options,
  action,
  className,
}: {
  id: string;
  value: string;
  options: readonly string[];
  action: (id: string, value: string) => Promise<void>;
  className?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <select
      defaultValue={value}
      disabled={pending}
      onChange={(e) => {
        const v = e.target.value;
        start(() => action(id, v));
      }}
      className={cn(
        "rounded-lg border border-ink/12 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink outline-none transition focus:border-brand-500",
        pending && "opacity-50",
        className
      )}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
