
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { cvText, role } = await req.json();
  const prompt = `
Eres un evaluador de CV experto. Devuelve SOLO JSON válido con esta forma:
{ "score": 0-100, "summary": "...", "improvements": ["..."], "missing_questions": ["..."], "ats_flags": ["..."] }
Criterios y pesos: Estructura15, Compleción25, Logros20, Adecuación15, Ortografía10, Formato10, ATS5.
CV:
${cvText || ""}
Rol objetivo del candidato: ${role || "No especificado"}
  `.trim();

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }]
  });

  let data: any;
  try { data = JSON.parse(resp.choices[0].message.content || "{}"); }
  catch {
    data = { score: 0, summary: "No se pudo parsear JSON", improvements: [], missing_questions: [], ats_flags: [] };
  }
  return NextResponse.json(data);
}
