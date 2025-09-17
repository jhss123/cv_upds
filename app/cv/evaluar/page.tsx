
"use client";
import { useState } from "react";
import Protected from "@/components/Protected";

export default function EvaluarCV() {
  const [role, setRole] = useState("");
  const [cvText, setCvText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onEval = async () => {
    setLoading(true);
    const r = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvText, role })
    });
    const json = await r.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <Protected>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Evaluar CV</h1>
        <input className="border p-2 w-full rounded" placeholder="Rol objetivo (opcional)" value={role} onChange={e=>setRole(e.target.value)} />
        <textarea className="border p-3 w-full h-60 rounded" placeholder="Pega tu CV aquí..." value={cvText} onChange={e=>setCvText(e.target.value)} />
        <button onClick={onEval} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Evaluando..." : "Evaluar"}
        </button>
        {result && (
          <div className="bg-white border rounded p-4">
            <p className="text-xl font-semibold">Puntaje: {result.score}</p>
            <p className="mt-2">{result.summary}</p>
            <h3 className="font-semibold mt-3">Mejoras sugeridas</h3>
            <ul className="list-disc ml-6">{(result.improvements||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
            <h3 className="font-semibold mt-3">Preguntas faltantes</h3>
            <ul className="list-disc ml-6">{(result.missing_questions||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
        )}
      </div>
    </Protected>
  );
}
