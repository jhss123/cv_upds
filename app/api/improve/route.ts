
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { cvText } = await req.json();
  const prompt = `
Eres editor de CV. Reescribe el CV de forma concisa y profesional, con bullets de logros medibles.
Mantén datos factuales. No inventes: si falta info, agrega al final "PREGUNTAS AL USUARIO" con viñetas.
CV original:
${cvText || ""}
  `.trim();

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }]
  });
  return NextResponse.json({ improved: resp.choices[0].message.content });
}
