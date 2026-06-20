import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-gradient-brand">404</p>
      <h1 className="mt-4 text-3xl font-bold text-ink">This route went off-course</h1>
      <p className="mt-3 max-w-md text-ink-500">
        The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/track" className="btn btn-outline">
          <PackageSearch className="h-4 w-4" />
          Track a shipment
        </Link>
      </div>
    </Container>
  );
}
