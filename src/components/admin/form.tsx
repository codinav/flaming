const fieldClass =
  "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function Label({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-700">
      {label} {required && <span className="text-brand-600">*</span>}
    </label>
  );
}

export function LabeledInput({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label label={label} name={name} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className={fieldClass}
      />
    </div>
  );
}

export function LabeledTextarea({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <Label label={label} name={name} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className={fieldClass}
      />
    </div>
  );
}

export function LabeledSelect({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string | null;
}) {
  return (
    <div>
      <Label label={label} name={name} />
      <select id={name} name={name} defaultValue={defaultValue ?? ""} className={fieldClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
