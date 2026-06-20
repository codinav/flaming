import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  children: React.ReactNode;
};

export function Section({ id, className, containerClassName, bleed, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-20 md:py-28", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className={cn("eyebrow", light && "text-brand-300")}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.05]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/70" : "text-ink-500")}>
          {description}
        </p>
      )}
    </div>
  );
}
