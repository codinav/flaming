import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

const modes = [
  {
    title: "Air Freight",
    blurb: "Time-critical cargo, expedited worldwide.",
    href: "/services/air-freight",
    img: images.airFreight,
    alt: "Cargo aircraft in flight",
  },
  {
    title: "Ocean Freight",
    blurb: "FCL & LCL across every major trade lane.",
    href: "/services/ocean-freight",
    img: images.oceanFreight,
    alt: "Container ship at sea",
  },
  {
    title: "Road Freight",
    blurb: "Tracked haulage across Nigeria & West Africa.",
    href: "/services/road-freight",
    img: images.roadFreight,
    alt: "Freight truck on the highway",
  },
];

export function ModesBand() {
  return (
    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="How your cargo moves"
        title="Air. Ocean. Road. Whatever it takes."
        description="Multimodal capability means we choose the fastest, most cost-effective path for every shipment — and manage it end to end."
      />

      <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mt-12 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {modes.map((m) => (
          <Link
            key={m.title}
            href={m.href}
            className="group relative block h-[20rem] w-[80%] shrink-0 snap-center overflow-hidden rounded-3xl sm:h-[24rem] md:w-auto md:shrink"
          >
            <Image
              src={m.img}
              alt={m.alt}
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              className="img-zoom object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,12,10,0.15) 0%, rgba(8,12,10,0.35) 45%, rgba(8,12,10,0.92) 100%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{m.title}</h3>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition group-hover:bg-brand-500 group-hover:ring-brand-500">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-2 max-w-xs text-sm text-white/75">{m.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
