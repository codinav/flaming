import { saveJob } from "@/app/admin/actions";
import { LabeledInput, LabeledSelect } from "./form";
import { RichTextEditor } from "./RichTextEditor";

type JobLike = {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  type: string | null;
  description: string;
  isOpen: boolean;
};

export function JobForm({ job }: { job?: JobLike }) {
  return (
    <form action={saveJob} className="space-y-5">
      {job && <input type="hidden" name="id" value={job.id} />}

      <LabeledInput label="Title" name="title" defaultValue={job?.title} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <LabeledInput label="Slug" name="slug" defaultValue={job?.slug} placeholder="auto from title" />
        <LabeledInput label="Department" name="department" defaultValue={job?.department} placeholder="Operations" />
        <LabeledInput label="Location" name="location" defaultValue={job?.location} placeholder="Ikeja, Lagos" />
        <LabeledSelect
          label="Type"
          name="type"
          defaultValue={job?.type ?? "Full-time"}
          options={["Full-time", "Contract", "Internship"].map((t) => ({ value: t, label: t }))}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Description</label>
        <RichTextEditor name="description" defaultValue={job?.description} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
        <input type="checkbox" name="isOpen" defaultChecked={job?.isOpen ?? true} className="h-4 w-4 accent-brand-500" />
        Open for applications
      </label>

      <button type="submit" className="btn btn-primary px-6">
        Save job
      </button>
    </form>
  );
}
