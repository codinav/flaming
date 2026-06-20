import { Container } from "@/components/ui/Container";
import { clientLogos } from "@/lib/site";

export function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-ink/5 bg-canvas-soft py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          Trusted by teams moving cargo across borders
        </p>
      </Container>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap font-display text-xl font-bold tracking-tight text-ink/35"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
