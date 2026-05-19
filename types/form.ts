export type FormFieldType = "text" | "textarea" | "url";

export interface FormFieldConfig {
  id: keyof IdentityFormData;
  label: string;
  type: FormFieldType;
  placeholder: string;
  rows?: number;
  validate?: "url" | "drive" | "references";
}

export interface IdentityFormData {
  propuesta: string;
  emocion: string;
  referencias: string;
  prioridades: string;
  drive: string;
  colores: string;
  objetivo: string;
  publico: string;
  destacar: string;
}

export type FormErrors = Partial<Record<keyof IdentityFormData, string>>;
