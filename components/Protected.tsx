
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Protected({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session?.user.email || "";
      const domain = process.env.NEXT_PUBLIC_ALLOWED_DOMAIN;
      if (!email) { window.location.href = "/login"; return; }
      if (domain && !email.endsWith(`@${domain}`)) {
        await supabase.auth.signOut();
        setMsg(`Solo permitido dominio @${domain}`);
        return;
      }
      setOk(true);
    })();
  }, []);

  if (!ok) return <p className="text-sm text-gray-700">{msg || "Verificando sesión..."}</p>;
  return <>{children}</>;
}
