"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { globeMarkers } from "@/lib/site";

/**
 * Lightweight WebGL globe (cobe v2) tuned to the brand greens. Auto-rotates via
 * a self-driven rAF loop and highlights the global network with Lagos anchored.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = Math.max(canvas.offsetWidth, 320);
    let phi = 4.7; // start roughly over Africa/Europe
    let raf = 0;
    let painted = false;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.22,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 5.2,
      baseColor: [0.13, 0.22, 0.16],
      markerColor: [0.45, 0.92, 0.36],
      glowColor: [0.16, 0.42, 0.22],
      markers: globeMarkers,
    });

    const frame = () => {
      globe.update({ phi });
      phi += 0.0035;
      if (!painted) {
        painted = true;
        canvas.style.opacity = "1";
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
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
