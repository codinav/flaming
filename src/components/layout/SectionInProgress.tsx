import Link from "next/link";
import { Hammer, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** Intentional placeholder for routes scheduled in a later build phase. */
export function SectionInProgress({
  title,
  blurb,
  bullets = [],
}: {
  title: string;
  blurb: string;
  bullets?: string[];
}) {
  return (
    <Container className="py-24 text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Hammer className="h-7 w-7" />
      </span>
      <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-bold text-ink md:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">{blurb}</p>

      {bullets.length > 0 && (
        <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-xl border border-ink/8 bg-canvas-soft px-4 py-3 text-sm text-ink-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a quote
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/" className="btn btn-outline">
          Back home
        </Link>
      </div>
    </Container>
  );
}
