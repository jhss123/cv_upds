
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Protected from "@/components/Protected";

export default function Entrevista() {
  const [role, setRole] = useState("Soporte TI Jr");
  const [history, setHistory] = useState<{role:"user"|"assistant",content:string}[]>([]);
  const [input, setInput] = useState("");
  const [premium, setPremium] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id;
      if (!uid) return setPremium(false);
      const { data: p } = await supabase.from("profiles").select("is_premium").eq("id", uid).maybeSingle();
      setPremium(!!p?.is_premium);
    })();
  }, []);

  const send = async () => {
    const newHist = [...history, { role: "user", content: input }];
    setHistory(newHist); setInput("");
    const r = await fetch("/api/interview", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ role, history: newHist })
    });
    const json = await r.json();
    setHistory([...newHist, { role: "assistant", content: json.reply }]);
  };

  if (premium === false) return (
    <Protected>
      <p className="text-red-600">Función premium. Actívala en <a className="underline" href="/premium/activar">/premium/activar</a></p>
    </Protected>
  );

  return (
    <Protected>
      <h1 className="text-2xl font-bold mb-3">Entrevista simulada</h1>
      <input className="border p-2 rounded w-full max-w-md" value={role} onChange={e=>setRole(e.target.value)} />
      <div className="border rounded p-3 h-80 overflow-auto bg-white my-3">
        {history.map((m,i)=>(
          <div key={i} className={`mb-2 ${m.role==="user"?"text-right":""}`}>
            <span className="inline-block px-3 py-2 rounded bg-gray-100">{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="border p-2 rounded flex-1" value={input} onChange={e=>setInput(e.target.value)} placeholder="Responde o escribe 'comenzar'"/>
        <button onClick={send} className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
      </div>
    </Protected>
  );
}
