import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { AdminHeader, Panel, Th, Td, EmptyState, AdminLinkButton } from "@/components/admin/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ActionSelect } from "@/components/admin/ActionSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { setApplicationStatus, deleteJob, deleteApplication } from "@/app/admin/actions";
import { applicationStatuses } from "@/lib/enums";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const [jobs, applications] = await Promise.all([
    db.jobPosting.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { applications: true } } } }),
    db.jobApplication.findMany({ orderBy: { createdAt: "desc" }, include: { job: true } }),
  ]);

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Careers"
        description={`${jobs.length} jobs · ${applications.length} applications`}
        action={
          <AdminLinkButton href="/admin/careers/new">
            <Plus className="h-4 w-4" />
            New job
          </AdminLinkButton>
        }
      />

      <section className="space-y-3">
        <h2 className="font-semibold text-ink">Job postings</h2>
        {jobs.length === 0 ? (
          <EmptyState title="No jobs yet" />
        ) : (
          <Panel className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-ink/8 bg-canvas-soft">
                  <tr>
                    <Th>Title</Th>
                    <Th>Department</Th>
                    <Th>Location</Th>
                    <Th>Open</Th>
                    <Th>Applications</Th>
                    <Th />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-canvas-soft">
                      <Td>
                        <Link href={`/admin/careers/${j.id}`} className="font-semibold text-ink hover:text-brand-700">
                          {j.title}
                        </Link>
                      </Td>
                      <Td className="text-ink-500">{j.department ?? "—"}</Td>
                      <Td className="text-ink-500">{j.location ?? "—"}</Td>
                      <Td>
                        <StatusBadge status={j.isOpen ? "Published" : "Archived"} />
                      </Td>
                      <Td className="text-ink-500">{j._count.applications}</Td>
                      <Td>
                        <DeleteButton
                          action={deleteJob}
                          id={j.id}
                          message={`Delete "${j.title}" and its ${j._count.applications} application(s)?`}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-ink">Applications</h2>
        {applications.length === 0 ? (
          <EmptyState title="No applications yet" />
        ) : (
          <Panel className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-ink/8 bg-canvas-soft">
                  <tr>
                    <Th>Candidate</Th>
                    <Th>Role</Th>
                    <Th>Resume</Th>
                    <Th>Status</Th>
                    <Th />
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  {applications.map((a) => (
                    <tr key={a.id} className="align-top hover:bg-canvas-soft">
                      <Td>
                        <p className="font-medium text-ink">{a.name}</p>
                        <p className="text-xs text-ink-500">{a.email}</p>
                      </Td>
                      <Td className="text-ink-500">{a.job.title}</Td>
                      <Td>
                        {a.resumeUrl ? (
                          <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-700 hover:underline">
                            Download
                          </a>
                        ) : (
                          <span className="text-ink-500">—</span>
                        )}
                      </Td>
                      <Td>
                        <ActionSelect id={a.id} value={a.status} options={applicationStatuses} action={setApplicationStatus} />
                      </Td>
                      <Td>
                        <DeleteButton action={deleteApplication} id={a.id} message={`Delete application from ${a.name}?`} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}
      </section>
    </div>
  );
}
