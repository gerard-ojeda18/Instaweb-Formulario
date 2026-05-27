import { NextResponse } from "next/server";
import { FORM_FIELDS } from "@/lib/form-config";
import { validateForm } from "@/lib/validation";
import type { IdentityFormData } from "@/types/form";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const body: IdentityFormData = {
      propuesta: String(formData.get("propuesta") || ""),
      emocion: String(formData.get("emocion") || ""),
      referencias: String(formData.get("referencias") || ""),
      prioridades: String(formData.get("prioridades") || ""),
      drive: String(formData.get("drive") || ""),
      colores: String(formData.get("colores") || ""),
      objetivo: String(formData.get("objetivo") || ""),
      publico: String(formData.get("publico") || ""),
      destacar: String(formData.get("destacar") || ""),
      archivos: formData.getAll("archivos") as File[],
    };

    const errors = validateForm(body, FORM_FIELDS);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "ojedagerard5@gmail.com",
      subject: "Nuevo formulario recibido",
      html: `
        <h2>Nuevo formulario de identidad</h2>

        <p><strong>Propuesta:</strong> ${body.propuesta}</p>

        <p><strong>Emoción:</strong> ${body.emocion}</p>

        <p><strong>Referencias:</strong> ${body.referencias}</p>

        <p><strong>Prioridades:</strong> ${body.prioridades}</p>

        <p><strong>Drive:</strong> ${body.drive}</p>

        <p><strong>Colores:</strong> ${body.colores}</p>

        <p><strong>Objetivo:</strong> ${body.objetivo}</p>

        <p><strong>Público:</strong> ${body.publico}</p>

        <p><strong>Destacar:</strong> ${body.destacar}</p>

        <p><strong>Archivos adjuntos:</strong> ${body.archivos.length}</p>
      `,
    });

    console.info("[InstaWeb API] Nuevo onboarding:", body);

    return NextResponse.json({
      ok: true,
      message: "Datos recibidos correctamente.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "Error al procesar la solicitud.",
      },
      { status: 500 }
    );
  }
}