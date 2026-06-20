"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

/**
 * Text URL field with a Cloudinary direct-upload button. If Cloudinary isn't
 * configured, the upload gracefully degrades — the URL field still works.
 */
export function UploadField({
  name,
  label,
  defaultValue,
  accept,
  folder = "fill/uploads",
  preview = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  accept?: string;
  folder?: string;
  preview?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      const sign = await signRes.json();
      if (!sign.configured) {
        setError("Cloudinary not configured — paste a URL instead.");
        return;
      }

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sign.apiKey);
      fd.append("timestamp", String(sign.timestamp));
      fd.append("signature", sign.signature);
      fd.append("folder", sign.folder);

      const up = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await up.json();
      if (data.secure_url) setUrl(data.secure_url);
      else setError(data?.error?.message ?? "Upload failed.");
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={name}
          name={name}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://… or upload a file"
          className={fieldClass}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="btn btn-outline shrink-0 px-4 py-2.5 text-sm"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          Upload
        </button>
        <input ref={fileRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
      </div>
      {error && <p className="mt-1 text-xs text-amber-700">{error}</p>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {preview && url && (
        <img src={url} alt="" className="mt-3 h-32 w-full max-w-sm rounded-xl border border-ink/8 object-cover" />
      )}
      {!preview && url && <p className="mt-1 truncate text-xs text-ink-500">Attached: {url}</p>}
    </div>
  );
}
