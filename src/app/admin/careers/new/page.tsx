import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminHeader, Panel } from "@/components/admin/ui";
import { JobForm } from "@/components/admin/JobForm";

export const dynamic = "force-dynamic";

export default function NewJobPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/careers" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Back to careers
      </Link>
      <AdminHeader title="New job posting" />
      <Panel className="p-6 md:p-8">
        <JobForm />
      </Panel>
    </div>
  );
}
