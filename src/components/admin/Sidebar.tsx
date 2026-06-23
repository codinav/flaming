"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ship,
  FileText,
  Users,
  Inbox,
  Newspaper,
  Briefcase,
  Settings,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { logout } from "@/app/admin/login/actions";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Shipments", href: "/admin/shipments", icon: Ship },
  { label: "Quotes", href: "/admin/quotes", icon: FileText },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-ink/8 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-ink/8 px-5">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive(pathname, href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-canvas-soft"
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-ink/8 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 hover:bg-canvas-soft"
          >
            <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.8} />
            View website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="sticky top-0 z-30 border-b border-ink/8 bg-white lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-ink-500">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="flex items-center gap-1 text-sm font-medium text-ink-500" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium",
                isActive(pathname, href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-canvas-soft"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
