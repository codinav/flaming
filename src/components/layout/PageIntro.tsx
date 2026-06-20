import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Crumb = { label: string; href?: string };

export function PageIntro({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/5 bg-canvas-soft">
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden />
      <Container className="relative py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-ink-500">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-ink/30" />
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-700">
                  {c.label}
                </Link>
              ) : (
                <span className="font-medium text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">{description}</p>
        )}
      </Container>
    </section>
  );
}
