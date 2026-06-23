"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Submits a server action after a confirm() prompt. */
export function DeleteButton({
  action,
  id,
  idName = "id",
  message = "Delete this permanently? This can't be undone.",
  label = "Delete",
  className,
  extra,
}: {
  action: (formData: FormData) => Promise<void> | void;
  id: string;
  idName?: string;
  message?: string;
  label?: string;
  className?: string;
  extra?: { name: string; value: string }[];
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <input type="hidden" name={idName} value={id} />
      {extra?.map((x) => <input key={x.name} type="hidden" name={x.name} value={x.value} />)}
      <button
        type="submit"
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50",
          className
        )}
      >
        <Trash2 className="h-3.5 w-3.5" />
        {label}
      </button>
    </form>
  );
}
