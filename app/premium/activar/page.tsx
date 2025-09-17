
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Protected from "@/components/Protected";

export default function ActivarPremium() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const DEMO = "PREMIUM-UPDS";

  const onActivate = async () => {
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return setMsg("No logueado.");
    if (code !== DEMO) return setMsg("Código inválido.");
    const { error } = await supabase.from("profiles").upsert({ id: uid, email: data.user!.email!, is_premium: true });
    if (error) setMsg(error.message); else setMsg("Premium activado.");
  };

  return (
    <Protected>
      <h1 className="text-2xl font-bold mb-3">Activar Premium</h1>
      <input className="border p-2 rounded w-full max-w-md" placeholder="Código de activación" value={code} onChange={e=>setCode(e.target.value)} />
      <button onClick={onActivate} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">Activar</button>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </Protected>
  );
}
