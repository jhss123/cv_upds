return (
  <Protected>
    <div className="container-card p-6 md:p-8">
      <h1>Corregir / Mejorar CV</h1>
      <p className="mt-2 text-sm">Reescritura profesional con bullets y sugerencias.</p>

      <textarea className="textarea mt-6" placeholder="Pega tu CV..." value={cvText} onChange={e=>setCvText(e.target.value)} />
      <div className="mt-4">
        <button onClick={onFix} disabled={loading} className="btn-primary">{loading ? "Procesando..." : "Corregir"}</button>
      </div>

      {out && (
        <div className="container-card mt-6 p-4">
          <h3 className="font-semibold">Versión mejorada</h3>
          <pre className="mt-2 whitespace-pre-wrap text-sm">{out}</pre>
        </div>
      )}
    </div>
  </Protected>
);
