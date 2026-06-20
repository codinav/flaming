"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight scroll-reveal using a native IntersectionObserver + CSS
 * transition (no animation library). Reveals once when it enters the viewport.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", shown && "reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Container passthrough — children reveal individually as they scroll in. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}
