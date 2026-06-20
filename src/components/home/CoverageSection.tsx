import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const regions = [
  { name: "Africa", hubs: "Lagos · Tema · Mombasa · Durban" },
  { name: "Europe", hubs: "Rotterdam · Antwerp · Felixstowe" },
  { name: "Middle East", hubs: "Jebel Ali · Dammam" },
  { name: "Asia-Pacific", hubs: "Shanghai · Singapore · Mumbai" },
  { name: "Americas", hubs: "Houston · New York · Santos" },
];

export function CoverageSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            light
            eyebrow="Global coverage"
            title="One network. Every major trade lane."
            description="Anchored in Lagos with an agent and carrier network spanning the world's busiest ports and airports — your cargo is never far from our reach."
          />

          <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06}>
                <div className="border-l-2 border-brand-500/60 pl-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-400" />
                    <h3 className="font-semibold text-white">{r.name}</h3>
                  </div>
                  <p className="mt-1 text-sm text-white/55">{r.hubs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <RouteMap />
        </div>
      </Container>
    </section>
  );
}

/** Abstract animated route graphic — performant SVG, no external assets. */
function RouteMap() {
  const nodes = [
    { cx: 120, cy: 150, label: "Lagos", anchor: true },
    { cx: 60, cy: 70 },
    { cx: 250, cy: 60 },
    { cx: 330, cy: 130 },
    { cx: 300, cy: 230 },
    { cx: 150, cy: 250 },
    { cx: 40, cy: 200 },
  ];
  const hub = nodes[0];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-4">
      <svg viewBox="0 0 380 300" className="h-full w-full" role="img" aria-label="Global route network">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7bd24f" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7bd24f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.slice(1).map((n, i) => {
          const mx = (hub.cx + n.cx) / 2;
          const my = Math.min(hub.cy, n.cy) - 50;
          return (
            <path
              key={i}
              d={`M ${hub.cx} ${hub.cy} Q ${mx} ${my} ${n.cx} ${n.cy}`}
              fill="none"
              stroke="#43be58"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              className="dash-flow"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <g key={i}>
            {n.anchor && <circle cx={n.cx} cy={n.cy} r="22" fill="url(#nodeGlow)" />}
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.anchor ? 6 : 4}
              fill={n.anchor ? "#7bd24f" : "#ffffff"}
              fillOpacity={n.anchor ? 1 : 0.8}
            />
            {n.anchor && (
              <text x={n.cx + 12} y={n.cy + 4} fill="#d2f5d7" fontSize="12" fontWeight="600">
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
