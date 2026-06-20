import { saveBlogPost } from "@/app/admin/actions";
import { LabeledInput, LabeledTextarea, LabeledSelect } from "./form";
import { RichTextEditor } from "./RichTextEditor";
import { UploadField } from "./UploadField";
import { postStatuses } from "@/lib/enums";

type PostLike = {
  id: string;
  title: string;
  slug: string;
  status: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  authorName: string | null;
  readingMinutes: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  categoryId: string | null;
};

export function BlogPostForm({
  post,
  categories,
}: {
  post?: PostLike;
  categories: { id: string; name: string }[];
}) {
  return (
    <form action={saveBlogPost} className="space-y-5">
      {post && <input type="hidden" name="id" value={post.id} />}

      <LabeledInput label="Title" name="title" defaultValue={post?.title} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <LabeledInput label="Slug" name="slug" defaultValue={post?.slug} placeholder="auto from title" />
        <LabeledSelect
          label="Status"
          name="status"
          defaultValue={post?.status ?? "Draft"}
          options={postStatuses.map((s) => ({ value: s, label: s }))}
        />
        <LabeledSelect
          label="Category"
          name="categoryId"
          defaultValue={post?.categoryId ?? ""}
          options={[{ value: "", label: "None" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
        />
        <LabeledInput label="Author" name="authorName" defaultValue={post?.authorName} placeholder="Flaming Logistiks Team" />
        <LabeledInput label="Reading minutes" name="readingMinutes" defaultValue={post?.readingMinutes ?? undefined} />
      </div>

      <UploadField label="Cover image" name="coverImageUrl" defaultValue={post?.coverImageUrl} accept="image/*" preview />

      <LabeledTextarea label="Excerpt" name="excerpt" defaultValue={post?.excerpt} rows={2} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink-700">Content</label>
        <RichTextEditor name="content" defaultValue={post?.content} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <LabeledInput label="Meta title (SEO)" name="metaTitle" defaultValue={post?.metaTitle} />
        <LabeledInput label="Meta description (SEO)" name="metaDescription" defaultValue={post?.metaDescription} />
      </div>

      <button type="submit" className="btn btn-primary px-6">
        Save post
      </button>
    </form>
  );
}
