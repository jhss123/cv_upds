
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { history, role } = await req.json();
  const system = `
Eres reclutador técnico. Simula una entrevista para el rol: ${role}.
Una sola pregunta por turno. Progresión: base -> práctica -> comportamiento.
Evalúa Comunicación, Resolución de problemas, Conocimiento técnico, Experiencia, Adaptabilidad.
Tras 8-10 preguntas, entrega un RESUMEN con puntajes 1-5 por competencia y recomendaciones.
  `.trim();

  const messages = [{ role: "system" as const, content: system }, ...(history||[])];
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages
  });

  return NextResponse.json({ reply: resp.choices[0].message.content });
}
