
"use client";
import { useState } from "react";
import Protected from "@/components/Protected";

export default function CorregirCV() {
  const [cvText, setCvText] = useState("");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  const onFix = async () => {
    setLoading(true);
    const r = await fetch("/api/improve", {
      method: "POST", headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ cvText })
    });
    const json = await r.json();
    setOut(json.improved);
    setLoading(false);
  };

  return (
    <Protected>
      <h1 className="text-2xl font-bold mb-3">Corregir/Mejorar CV</h1>
      <textarea className="border p-3 w-full h-60 rounded" placeholder="Pega tu CV..." value={cvText} onChange={e=>setCvText(e.target.value)} />
      <button onClick={onFix} disabled={loading} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Procesando..." : "Corregir"}</button>
      {out && <pre className="bg-white border rounded p-3 mt-4 whitespace-pre-wrap">{out}</pre>}
    </Protected>
  );
}
