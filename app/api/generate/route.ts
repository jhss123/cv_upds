
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { formAnswers } = await req.json();
  const prompt = `
Eres un generador de CVs. Con las respuestas del formulario, produce un CV en HTML + Tailwind, listo para imprimir (1–2 páginas), ATS-friendly.
Secciones: Resumen, Educación, Experiencia (bullets con métricas), Proyectos, Habilidades (técnicas y blandas), Certificaciones/Logros (si hay), Idiomas, Contacto (nombre).
Datos:
${JSON.stringify(formAnswers)}
Devuelve SOLO el HTML (sin explicaciones).
  `.trim();

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }]
  });
  return NextResponse.json({ html: resp.choices[0].message.content });
}
