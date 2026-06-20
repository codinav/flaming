"use client";

import dynamic from "next/dynamic";

// Defer the WebGL globe (and the cobe library) out of the initial bundle.
const Globe = dynamic(() => import("./Globe").then((m) => m.Globe), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export function GlobeLazy({ className }: { className?: string }) {
  return <Globe className={className} />;
}
