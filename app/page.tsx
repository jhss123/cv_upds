
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="container-card relative overflow-hidden p-8 md:p-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <span className="badge">Solo comunidad universitaria</span>
        <h1 className="mt-3">Plataforma de CV con IA</h1>
        <p className="mt-2 max-w-2xl">
          Gratis: evaluar, corregir y crear CV desde cero. Premium: entrevista simulada y postulación a bolsa con convenios.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/cv/evaluar" className="btn-primary">Empezar ahora</Link>
          <Link href="/premium/entrevista" className="rounded-xl border px-4 py-2 text-slate-700 hover:bg-slate-50">
            Ver entrevista simulada
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="container-card p-6">
          <h3 className="font-semibold">✔️ Acceso institucional</h3>
          <p className="mt-2 text-sm">Solo correos del dominio permitido.</p>
        </div>
        <div className="container-card p-6">
          <h3 className="font-semibold">🧠 IA en todo el flujo</h3>
          <p className="mt-2 text-sm">Puntaje, feedback y mejoras automáticas.</p>
        </div>
        <div className="container-card p-6">
          <h3 className="font-semibold">📄 Exportable</h3>
          <p className="mt-2 text-sm">CV en HTML listo para imprimir en PDF.</p>
        </div>
      </div>
    </section>
  );
}
