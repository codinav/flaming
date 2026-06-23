import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="mesh flex min-h-dvh items-center justify-center bg-canvas-soft px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Link href="/" aria-label="Back to website">
            <Logo />
          </Link>
        </div>

        <div className="card p-7">
          <h1 className="font-display text-xl font-bold text-ink">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-500">
            Enter your credentials to access the dashboard.
          </p>
          <div className="mt-6">
            <LoginForm from={from} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-500">
          Flaming Integrated Logistiks · Internal admin
        </p>
      </div>
    </div>
  );
}
