
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendMagicLink = async () => {
    const domain = process.env.NEXT_PUBLIC_ALLOWED_DOMAIN;
    if (domain && !email.endsWith(`@${domain}`)) {
      setMsg(`Debes usar tu correo @${domain}`);
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMsg(error.message);
    else setMsg("Revisa tu correo y abre el enlace para ingresar.");
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Ingresar</h1>
      <input
        className="border p-2 rounded w-full"
        placeholder="tu.correo@universidad.edu.bo"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <button onClick={sendMagicLink} className="bg-blue-600 text-white px-4 py-2 rounded">Enviar enlace</button>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
