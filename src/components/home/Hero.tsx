import { ArrowRight, PackageSearch, Headset, ShieldCheck, Clock4, Globe2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Globe } from "@/components/ui/Globe";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden />
      <div
        className="absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(38,163,61,0.45), rgba(38,163,61,0.08), transparent)",
        }}
        aria-hidden
      />

      <Container className="relative grid items-center gap-10 py-12 sm:py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left: copy */}
        <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
              <Globe2 className="h-3.5 w-3.5" />
              Global Freight &amp; Logistics · Lagos, Nigeria
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Your Trusted Partner For{" "}
              <span className="text-gradient-brand">Global Freight</span> &amp; Logistics
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-lg text-white/70">
              <span className="font-semibold text-white">We Manage It. We Clear It. We Deliver It.</span>{" "}
              From air and ocean freight to customs clearance and last-mile delivery — one
              accountable partner for your entire supply chain.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="/quote" size="lg" className="w-full sm:w-auto">
                Get Instant Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/track" variant="ghost-light" size="lg" className="w-full sm:w-auto">
                <PackageSearch className="h-5 w-5" />
                Track Shipment
              </Button>
              <Button href="/contact" variant="ghost-light" size="lg" className="w-full sm:w-auto">
                <Headset className="h-5 w-5" />
                Talk to a Logistics Expert
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/65 sm:justify-start">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                Licensed customs broker
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-brand-400" />
                120+ countries
              </li>
              <li className="flex items-center gap-2">
                <Clock4 className="h-4 w-4 text-brand-400" />
                24/7 operations
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Right: globe */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[34rem]">
          <div className="relative aspect-square">
            {/* Focused glow behind the sphere */}
            <div
              className="absolute inset-[-10%] rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(38,163,61,0.40), rgba(38,163,61,0.06) 58%, transparent 70%)",
              }}
              aria-hidden
            />

            {/* Boundary rings */}
            <div className="animate-orbit-rev absolute inset-[1%] rounded-full border border-dashed border-white/10" aria-hidden />
            <div className="absolute inset-[8%] rounded-full border border-white/5" aria-hidden />

            {/* Orbit 1 — tilted ellipse + satellite node */}
            <div className="absolute inset-[-3%]" style={{ transform: "rotate(20deg)" }} aria-hidden>
              <div className="absolute inset-0" style={{ transform: "scaleY(0.42)" }}>
                <div className="absolute inset-0 rounded-full border border-brand-400/25" />
                <div className="animate-orbit absolute inset-0">
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300 shadow-[0_0_16px_5px_rgba(123,210,79,0.55)]" />
                </div>
              </div>
            </div>

            {/* Orbit 2 — counter-rotating */}
            <div className="absolute inset-[6%]" style={{ transform: "rotate(-16deg)" }} aria-hidden>
              <div className="absolute inset-0" style={{ transform: "scaleY(0.34)" }}>
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="animate-orbit-rev absolute inset-0">
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(132,204,22,0.5)]" />
                </div>
              </div>
            </div>

            {/* The globe (slightly inset so orbits frame it) */}
            <div className="absolute inset-[5%]">
              <Globe className="h-full w-full" />
            </div>

            {/* HUD corner ticks */}
            <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-brand-400/40" aria-hidden />
            <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-brand-400/40" aria-hidden />
            <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-brand-400/40" aria-hidden />
            <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-brand-400/40" aria-hidden />

            {/* Live network pill */}
            <div className="glass absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-brand-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              Live global network
            </div>

            {/* Floating stat chips */}
            <div className="animate-float absolute left-0 top-1/4 hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-2xl font-bold text-white">45k+</p>
              <p className="text-xs text-white/60">Shipments delivered</p>
            </div>
            <div className="animate-float-slow absolute right-0 top-1/2 hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md sm:block">
              <p className="text-2xl font-bold text-brand-300">99.2%</p>
              <p className="text-xs text-white/60">On-time delivery</p>
            </div>
            <div className="animate-float absolute bottom-1 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center backdrop-blur-md sm:block">
              <p className="text-sm font-semibold text-white">Lagos → Worldwide</p>
              <p className="text-xs text-white/60">Air · Ocean · Road</p>
            </div>
          </div>
        </div>
      </Container>

      {/* bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink/0" aria-hidden />
    </section>
  );
}
