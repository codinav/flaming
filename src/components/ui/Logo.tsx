import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "mark";
  light?: boolean;
  className?: string;
};

/**
 * Brand lockup for Flaming Integrated Logistiks Ltd.
 * The mark is a stylized green "speed wing" (three forward-leaning slabs with a
 * downward tail) rendered as inline SVG; the wordmark uses the display font.
 */
export function Logo({ variant = "full", light = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 128 116"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label="Flaming Integrated Logistiks logo"
      >
        <defs>
          <linearGradient id="fillGreen" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#7bd24f" />
            <stop offset="0.55" stopColor="#39ab38" />
            <stop offset="1" stopColor="#16772b" />
          </linearGradient>
        </defs>
        <g fill="url(#fillGreen)">
          <polygon points="24,8 122,8 108,32 10,32" />
          <polygon points="24,46 106,46 92,70 10,70" />
          <polygon points="24,84 78,84 64,108 10,108" />
          <polygon points="10,70 36,70 10,116" opacity="0.92" />
        </g>
      </svg>

      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.35rem] font-extrabold tracking-tight",
              light ? "text-white" : "text-ink"
            )}
          >
            Flaming
          </span>
          <span
            className={cn(
              "mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em]",
              light ? "text-white/70" : "text-ink-500"
            )}
          >
            Integrated Logistiks Ltd
          </span>
        </span>
      )}
    </span>
  );
}
