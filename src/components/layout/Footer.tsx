import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { company, footerNav, addressOneLine } from "@/lib/site";

const social = [
  { short: "in", href: company.social.linkedin, label: "LinkedIn" },
  { short: "X", href: company.social.twitter, label: "Twitter / X" },
  { short: "IG", href: company.social.instagram, label: "Instagram" },
  { short: "f", href: company.social.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-ink pb-24 text-white/70 lg:pb-0">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Ready to move your cargo?
            </h2>
            <p className="mt-2 max-w-xl text-white/60">
              Get a tailored freight quote in hours, not days. Talk to a logistics expert who knows
              your route.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link href="/quote" className="btn btn-primary w-full justify-center sm:w-auto">
              Get Instant Quote
            </Link>
            <Link href="/contact" className="btn btn-ghost-light w-full justify-center sm:w-auto">
              Talk to an Expert
            </Link>
          </div>
        </Container>
      </div>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 lg:grid-cols-12">
        {/* Brand + contact */}
        <div className="col-span-2 lg:col-span-4">
          <Logo light motto />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            {company.tagline} Flaming Integrated Logistiks delivers freight forwarding, customs
            clearance, and supply chain solutions across {`120+`} countries — anchored in Lagos,
            Nigeria.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{addressOneLine}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`tel:${company.phone}`} className="hover:text-white">
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${company.emails.sales}`} className="hover:text-white">
                {company.emails.sales}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-brand-400" />
              <span>
                {company.hoursDays}: {company.hours}
              </span>
            </li>
          </ul>
        </div>

        <FooterCol title="Services" links={footerNav.services} className="lg:col-span-3" />
        <FooterCol title="Company" links={footerNav.company} className="lg:col-span-2" />
        <FooterCol title="Quick Tools" links={footerNav.tools} className="col-span-2 lg:col-span-3" />
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p className="text-white/50">
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/50 hover:text-white">
                {l.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              {social.map(({ short, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/60 transition hover:border-brand-400 hover:bg-white/10 hover:text-white"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="py-4">
          <p className="text-center text-xs text-white/40">
            Designed &amp; developed by{" "}
            <a
              href="https://github.com/codinav"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/60 transition hover:text-brand-300"
            >
              Abhinav Saxena
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/60 transition hover:text-brand-300">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
