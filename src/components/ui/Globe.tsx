"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { globeMarkers } from "@/lib/site";

/**
 * Lightweight WebGL globe (cobe). To protect Total Blocking Time it paints a
 * single static frame immediately, then defers starting the (throttling-heavy)
 * animation loop until after initial load — and pauses it whenever off-screen
 * or when the user prefers reduced motion.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const size = Math.max(canvas.offsetWidth, 320);
    let phi = 4.7;
    let raf = 0;
    let painted = false;
    let canRun = false;
    let visible = true;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.22,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 11000,
      mapBrightness: 5.2,
      baseColor: [0.13, 0.22, 0.16],
      markerColor: [0.45, 0.92, 0.36],
      glowColor: [0.16, 0.42, 0.22],
      markers: globeMarkers,
    });

    const paint = () => {
      globe.update({ phi });
      if (!painted) {
        painted = true;
        canvas.style.opacity = "1";
      }
    };

    const frame = () => {
      phi += 0.0035;
      paint();
      raf = requestAnimationFrame(frame);
    };

    const sync = () => {
      if (canRun && visible && !raf) raf = requestAnimationFrame(frame);
      else if ((!canRun || !visible) && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    paint(); // immediate static frame

    let io: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!reduceMotion) {
      if (typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver(
          (entries) => {
            visible = entries[0]?.isIntersecting ?? true;
            sync();
          },
          { threshold: 0 }
        );
        io.observe(canvas);
      }
      // Defer the animation past the initial load/TBT window.
      timer = setTimeout(() => {
        canRun = true;
        sync();
      }, 1400);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1",
        contain: "layout paint size",
        opacity: 0,
        transition: "opacity 1s ease",
      }}
      aria-hidden
    />
  );
}
