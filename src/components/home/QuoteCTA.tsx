import Image from "next/image";
import { ArrowRight, PhoneCall, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/site";
import { images } from "@/lib/images";

const assurances = [
  { icon: Clock, text: "Response within 4 business hours" },
  { icon: BadgeCheck, text: "No obligation, no hidden fees" },
  { icon: ShieldCheck, text: "Insured, compliant, fully tracked" },
];

export function QuoteCTA() {
  return (
    <section className="bg-canvas py-14 sm:py-20 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-white md:px-16 md:py-20">
          <Image
            src={images.ctaBand}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            aria-hidden
          />
          <div className="absolute inset-0 bg-ink/70" aria-hidden />
          <div className="grain absolute inset-0 opacity-[0.1] mix-blend-overlay" aria-hidden />
          <div
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(38,163,61,0.55), rgba(38,163,61,0.1), transparent)",
            }}
            aria-hidden
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Get a freight quote tailored to your route
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/70">
                Tell us what you&apos;re moving and where. Our logistics experts will come back with
                a clear, competitive plan — covering freight, clearance, and delivery.
              </p>

              <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {assurances.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="h-4 w-4 text-brand-400" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button href="/quote" size="lg" className="w-full justify-center">
                Get Instant Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href={`tel:${company.phone}`}
                variant="ghost-light"
                size="lg"
                className="w-full justify-center"
              >
                <PhoneCall className="h-5 w-5" />
                {company.phoneDisplay}
              </Button>
              <p className="text-center text-xs text-white/45">
                Prefer email? {company.emails.sales}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
