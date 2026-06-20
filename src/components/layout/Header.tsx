"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Menu, X, ChevronDown, ChevronRight, PackageSearch } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { company, mainNav, services } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-ink text-white/80 lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.8rem]">
          <div className="flex items-center gap-6">
            <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand-400" />
              {company.phoneDisplay}
            </a>
            <a
              href={`mailto:${company.emails.info}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-400" />
              {company.emails.info}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/55">
              {company.hoursDays}: {company.hours}
            </span>
            <Link href="/track" className="font-medium hover:text-white">
              Track Shipment
            </Link>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-ink/10 bg-white/85 shadow-[0_8px_30px_-12px_rgba(10,14,12,0.12)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
            : "border-transparent bg-white"
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href="/" aria-label={`${company.name} home`}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-700 transition hover:text-brand-700"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                />
              </button>
              {servicesOpen && <ServicesMega />}
            </div>

            {mainNav
              .filter((l) => l.label !== "Services")
              .map((link) => (
                <NavItem key={link.href} href={link.href} active={pathname === link.href}>
                  {link.label}
                </NavItem>
              ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/track" variant="outline" size="sm">
              <PackageSearch className="h-4 w-4" />
              Track
            </Button>
            <Button href="/quote" size="sm">
              Get a Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>
      </div>

      {mobileOpen && <MobileMenu />}
    </header>
  );
}

function NavItem({
  href,
  active,
  light,
  children,
}: {
  href: string;
  active?: boolean;
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3.5 py-2 text-sm font-medium transition",
        light
          ? active
            ? "text-white"
            : "text-white/85 hover:text-white"
          : active
            ? "text-brand-700"
            : "text-ink-700 hover:text-brand-700"
      )}
    >
      {children}
    </Link>
  );
}

function ServicesMega() {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(46rem,90vw)] -translate-x-1/2 pt-3">
      <div className="card overflow-hidden p-2 shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-canvas-soft"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand-300 transition group-hover:bg-brand-500" />
              <span>
                <span className="block text-sm font-semibold text-ink">{s.title}</span>
                <span className="block text-xs text-ink-500">{s.short}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-1 flex items-center justify-between rounded-xl bg-canvas-soft px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-canvas-sunken"
        >
          View all services & capabilities
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Link>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="lg:hidden">
      <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-t border-ink/10 bg-white">
        <Container className="flex flex-1 flex-col py-5">
          {/* Primary navigation */}
          <nav className="space-y-1">
            {mainNav
              .filter((l) => l.label !== "Services")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold text-ink active:bg-canvas-soft"
                >
                  {link.label}
                  <ChevronRight className="h-5 w-5 text-ink/30" />
                </Link>
              ))}
          </nav>

          {/* Services */}
          <p className="mt-6 px-3 pb-2.5 text-xs font-semibold uppercase tracking-wider text-ink-500">
            Services
          </p>
          <div className="grid grid-cols-2 gap-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-xl border border-ink/8 bg-canvas-soft px-3 py-2.5 text-sm font-medium text-ink-700 active:bg-canvas-sunken"
              >
                {s.title}
              </Link>
            ))}
          </div>

          {/* Primary CTAs */}
          <div className="mt-6 grid gap-2.5">
            <Button href="/quote" size="lg" className="w-full">
              Get a Quote
            </Button>
            <Button href="/track" variant="outline" size="lg" className="w-full">
              <PackageSearch className="h-5 w-5" />
              Track Shipment
            </Button>
          </div>

          {/* Quick contact */}
          <div className="mt-auto border-t border-ink/10 pt-5">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${company.phone}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-canvas-soft px-3 py-3 text-sm font-medium text-ink active:bg-canvas-sunken"
              >
                <Phone className="h-4 w-4 text-brand-600" />
                Call us
              </a>
              <a
                href={`mailto:${company.emails.info}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-canvas-soft px-3 py-3 text-sm font-medium text-ink active:bg-canvas-sunken"
              >
                <Mail className="h-4 w-4 text-brand-600" />
                Email
              </a>
            </div>
            <p className="mt-3 text-center text-xs text-ink-500">
              {company.hoursDays}: {company.hours}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
