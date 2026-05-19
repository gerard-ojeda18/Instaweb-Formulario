import type { FormFieldConfig } from "@/types/form";

export const FORM_FIELDS: FormFieldConfig[] = [
  {
    id: "propuesta",
    label: "¿Qué es tu local y cuál es su propuesta de valor única?",
    type: "textarea",
    rows: 4,
    placeholder:
      "Ej: Somos una vinoteca boutique enfocada en etiquetas de autor y maridajes exclusivos...",
  },
  {
    id: "emocion",
    label: "¿Qué concepto o emoción querés transmitir a tus clientes al entrar a la web?",
    type: "textarea",
    rows: 4,
    placeholder: "Ej: Sofisticación, calidez y confianza absoluta en la elección...",
  },
  {
    id: "referencias",
    label: "Links de páginas web de referencia (estilo visual deseado)",
    type: "text",
    placeholder: "Pegá los links separados por comas...",
    validate: "references",
  },
  {
    id: "prioridades",
    label: "¿Qué 3 elementos, productos o servicios clave debemos priorizar visualmente?",
    type: "textarea",
    rows: 3,
    placeholder: "1.\n2.\n3.",
  },
  {
    id: "drive",
    label: "Enlace a carpeta de Google Drive (fotos del local y productos)",
    type: "url",
    placeholder: "Pegá acá el link de Drive configurado como público...",
    validate: "drive",
  },
  {
    id: "colores",
    label: "Preferencias de identidad visual (colores o tonos corporativos)",
    type: "text",
    placeholder: "Ej: Negro mate, gris Oxford y detalles en bronce sutil...",
  },
  {
    id: "objetivo",
    label: "Objetivo principal de la web",
    type: "textarea",
    rows: 3,
    placeholder:
      "Ej: Generar reservas online, captar leads B2B o posicionar la marca como referente del sector...",
  },
  {
    id: "publico",
    label: "Público objetivo",
    type: "textarea",
    rows: 3,
    placeholder:
      "Ej: Profesionales de 30 a 50 años que valoran calidad y buscan experiencias premium...",
  },
  {
    id: "destacar",
    label: "¿Qué sección querés destacar primero?",
    type: "text",
    placeholder:
      "Ej: Catálogo de productos, servicios estrella, testimonios o historia de la marca...",
  },
];

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#esencia", label: "Nuestra Esencia" },
  { href: "#registro", label: "Alta de Marca" },
] as const;
