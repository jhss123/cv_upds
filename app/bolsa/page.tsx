
"use client";
import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { supabase } from "@/lib/supabaseClient";

type Job = { id: string; company: string; title: string; requirements: string };

export default function Bolsa() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => { (async () => {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending:false });
    setJobs(data || []);
  })(); }, []);

  const postular = async (job_id: string) => {
    const { data: sess } = await supabase.auth.getUser();
    const user_id = sess.user?.id;
    if (!user_id) return setMsg("No logueado.");
    const { error } = await supabase.from("applications").insert({ user_id, job_id });
    setMsg(error ? error.message : "Postulación enviada.");
  };

  return (
    <Protected>
      <h1 className="text-2xl font-bold mb-4">Bolsa de trabajo (Convenios)</h1>
      {msg && <p className="text-sm text-green-700">{msg}</p>}
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map(j=>(
          <div key={j.id} className="bg-white border rounded p-4">
            <h3 className="font-semibold">{j.company} — {j.title}</h3>
            <p className="text-sm mt-1">{j.requirements}</p>
            <button onClick={()=>postular(j.id)} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded">Postular con mi cuenta</button>
          </div>
        ))}
      </div>
    </Protected>
  );
}
