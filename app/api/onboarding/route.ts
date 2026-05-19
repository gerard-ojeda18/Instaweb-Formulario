import { NextResponse } from "next/server";
import { FORM_FIELDS } from "@/lib/form-config";
import { validateForm } from "@/lib/validation";
import type { IdentityFormData } from "@/types/form";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IdentityFormData;
    const errors = validateForm(body, FORM_FIELDS);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Integrar: email, CRM, base de datos, Slack, etc.
    console.info("[InstaWeb API] Nuevo onboarding:", body);

    return NextResponse.json({ ok: true, message: "Datos recibidos correctamente." });
  } catch {
    return NextResponse.json({ ok: false, message: "Error al procesar la solicitud." }, { status: 500 });
  }
}
