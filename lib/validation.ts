import type { FormFieldConfig, FormErrors, IdentityFormData } from "@/types/form";

function isValidUrl(value: string): boolean {
  try {
    new URL(value.trim());
    return true;
  } catch {
    return false;
  }
}

function isDriveUrl(value: string): boolean {
  return /drive\.google\.com|docs\.google\.com/i.test(value.trim());
}

function isValidReferences(value: string): boolean {
  const parts = value.split(/[,;\s]+/).filter(Boolean);
  return parts.some((part) => {
    const url = part.startsWith("http") ? part : `https://${part}`;
    return isValidUrl(url);
  });
}

export function validateField(
  field: FormFieldConfig,
  value: string
): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Este campo es obligatorio.";
  }

  if (field.validate === "drive") {
    if (!isValidUrl(trimmed) || !isDriveUrl(trimmed)) {
      return "Ingresá un enlace válido de Google Drive.";
    }
  }

  if (field.validate === "references" && !isValidReferences(trimmed)) {
    return "Ingresá al menos un link de referencia válido.";
  }

  if (field.type === "url" && !isValidUrl(trimmed)) {
    return "Ingresá una URL válida.";
  }

  return undefined;
}

export function validateForm(
  data: IdentityFormData,
  fields: FormFieldConfig[]
): FormErrors {
  const errors: FormErrors = {};

  for (const field of fields) {
    const error = validateField(field, data[field.id]);
    if (error) errors[field.id] = error;
  }

  return errors;
}

export const EMPTY_FORM: IdentityFormData = {
  propuesta: "",
  emocion: "",
  referencias: "",
  prioridades: "",
  drive: "",
  colores: "",
  objetivo: "",
  publico: "",
  destacar: "",
};
