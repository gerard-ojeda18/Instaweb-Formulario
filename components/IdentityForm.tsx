"use client";

import { useCallback, useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { Toast } from "@/components/Toast";
import { FormField } from "@/components/ui/FormField";
import { FORM_FIELDS } from "@/lib/form-config";
import { EMPTY_FORM, validateField, validateForm } from "@/lib/validation";
import type { FormErrors, IdentityFormData } from "@/types/form";

export function IdentityForm() {
  const [form, setForm] = useState<IdentityFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof IdentityFormData, boolean>>>({});
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4500);
  }, []);

  const updateField = (id: keyof IdentityFormData, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    if (touched[id]) {
      const field = FORM_FIELDS.find((f) => f.id === id)!;
      setErrors((prev) => {
        const next = { ...prev };
        const err = validateField(field, value);
        if (err) next[id] = err;
        else delete next[id];
        return next;
      });
    }
  };

  const blurField = (id: keyof IdentityFormData) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
    const field = FORM_FIELDS.find((f) => f.id === id)!;
    const err = validateField(field, form[id]);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[id] = err;
      else delete next[id];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allTouched = Object.fromEntries(
      FORM_FIELDS.map((f) => [f.id, true])
    ) as Record<keyof IdentityFormData, boolean>;
    setTouched(allTouched);

    const validationErrors = validateForm(form, FORM_FIELDS);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstId = FORM_FIELDS.find((f) => validationErrors[f.id])?.id;
      document.getElementById(firstId ?? "")?.focus();
      showToast("Revisá los campos marcados antes de enviar.");
      return;
    }

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = (await res.json()) as { errors?: FormErrors };
        if (data.errors) setErrors(data.errors);
        showToast("Revisá los campos marcados antes de enviar.");
        return;
      }
    } catch {
      showToast("No pudimos enviar el formulario. Intentá de nuevo.");
      return;
    }

    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    showToast("¡Datos enviados con éxito! Nos pondremos en contacto pronto.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="registro" className="bg-off-white px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-[min(100%,42rem)]">
        <Reveal>
          <article className="overflow-hidden rounded-xl bg-white shadow-card">
            <div className="h-1.5 bg-navy-900" aria-hidden />

            <header className="px-6 pb-4 pt-10 text-center md:px-10 md:pt-14">
              <h2 className="mb-2 text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-navy-900">
                Formulario de Identidad de Marca
              </h2>
              <p className="text-[0.9375rem] text-gray-600">
                Completá los campos estratégicos de marketing para iniciar el desarrollo técnico.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 px-6 pb-10 md:px-10 md:pb-14">
              {FORM_FIELDS.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={form[field.id]}
                  error={errors[field.id]}
                  onChange={(v) => updateField(field.id, v)}
                  onBlur={() => blurField(field.id)}
                />
              ))}

              <button
                type="submit"
                className="w-full rounded-sm bg-navy-900 px-8 py-4.5 text-sm font-bold uppercase tracking-widest text-white transition-[background,box-shadow] duration-200 hover:bg-navy-800 hover:shadow-elevated active:scale-[0.98]"
              >
                Enviar Datos de Identidad
              </button>
            </form>
          </article>
        </Reveal>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
