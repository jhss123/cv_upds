return (
  <Protected>
    <div className="container-card p-6 md:p-8">
      <h1>Evaluar CV</h1>
      <p className="mt-2 text-sm">Pega tu CV en texto y obtén un puntaje con recomendaciones.</p>

      <div className="mt-6 grid gap-4">
        <input className="input" placeholder="Rol objetivo (opcional)" value={role} onChange={e=>setRole(e.target.value)} />
        <textarea className="textarea" placeholder="Pega tu CV aquí..." value={cvText} onChange={e=>setCvText(e.target.value)} />
        <button onClick={onEval} disabled={loading} className="btn-primary w-fit">
          {loading ? "Evaluando..." : "Evaluar"}
        </button>
      </div>

      {result && (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="container-card p-4">
            <div className="text-5xl font-bold text-blue-700">{result.score ?? "-"}</div>
            <div className="mt-1 text-sm text-slate-600">Puntaje</div>
          </div>
          <div className="container-card p-4 md:col-span-2">
            <h3 className="font-semibold">Resumen</h3>
            <p className="mt-1">{result.summary}</p>
          </div>
          <div className="container-card p-4">
            <h3 className="font-semibold">Mejoras</h3>
            <ul className="mt-2 list-disc pl-6 text-sm">
              {(result.improvements||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}
            </ul>
          </div>
          <div className="container-card p-4 md:col-span-2">
            <h3 className="font-semibold">Preguntas faltantes</h3>
            <ul className="mt-2 list-disc pl-6 text-sm">
              {(result.missing_questions||[]).map((x:string,i:number)=><li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  </Protected>
);
