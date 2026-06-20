"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, PackageSearch, Phone } from "lucide-react";
import { company } from "@/lib/site";

/**
 * App-style persistent bottom action bar for mobile only (hidden ≥ lg).
 * Suppressed on the pages that ARE these actions (quote / track).
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/quote") || pathname?.startsWith("/track")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="flex items-center gap-2 border-t border-ink/10 bg-white/90 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-8px_30px_-12px_rgba(10,14,12,0.18)] backdrop-blur-xl">
        <Link href="/quote" className="btn btn-primary flex-1 justify-center py-3">
          <FileText className="h-4 w-4" />
          Get Quote
        </Link>
        <Link href="/track" className="btn btn-outline flex-1 justify-center py-3">
          <PackageSearch className="h-4 w-4" />
          Track
        </Link>
        <a
          href={`tel:${company.phone}`}
          aria-label="Call us"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition active:translate-y-px"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
