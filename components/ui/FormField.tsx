import type { ChangeEvent } from "react";
import type { FormFieldConfig } from "@/types/form";

interface FormFieldProps {
  field: FormFieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const inputBase =
  "w-full rounded-sm border border-gray-200 bg-gray-100 px-4 py-3.5 text-[0.9375rem] text-navy-900 transition-[border-color,box-shadow,background] duration-150 placeholder:text-gray-400 placeholder:italic hover:border-bronze focus:border-gold focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-gold/15";

export function FormField({ field, value, error, onChange, onBlur }: FormFieldProps) {
  const invalid = Boolean(error);

  const shared = {
    id: field.id,
    name: field.id,
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
    placeholder: field.placeholder,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? `${field.id}-error` : undefined,
    className: `${inputBase} ${invalid ? "border-red-600 ring-[3px] ring-red-600/10" : ""}`,
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={field.id}
        className="text-[0.6875rem] font-bold uppercase leading-snug tracking-wide text-navy-900"
      >
        {field.label} <span className="text-red-600">*</span>
      </label>

      {field.type === "textarea" ? (
        <textarea {...shared} rows={field.rows ?? 4} className={`${shared.className} min-h-28 resize-y`} />
      ) : (
        <input {...shared} type={field.type === "url" ? "url" : "text"} />
      )}

      {error && (
        <p id={`${field.id}-error`} className="text-[0.8125rem] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
