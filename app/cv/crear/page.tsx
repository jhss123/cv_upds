
"use client";
import { useState } from "react";
import Protected from "@/components/Protected";

export default function CrearCV() {
  const [form, setForm] = useState({ nombre:"", perfil:"", educacion:"", experiencia:"", skills:"", proyectos:"" });
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const onGen = async () => {
    setLoading(true);
    const r = await fetch("/api/generate", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ formAnswers: form })
    });
    const json = await r.json(); setHtml(json.html); setLoading(false);
  };

  return (
    <Protected>
      <h1 className="text-2xl font-bold mb-3">Crear CV desde cero</h1>
      {["nombre","perfil","educacion","experiencia","skills","proyectos"].map(k=>(
        <textarea key={k} placeholder={k} className="border p-2 rounded w-full h-28 my-2"
          value={(form as any)[k]} onChange={e=>setForm({...form, [k]: e.target.value})}/>
      ))}
      <button onClick={onGen} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Generando..." : "Generar CV"}</button>
      {html && (
        <>
          <h2 className="text-xl font-semibold mt-4">Vista previa (HTML)</h2>
          <div className="bg-white border rounded p-3" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </Protected>
  );
}
