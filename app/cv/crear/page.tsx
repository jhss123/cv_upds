return (
  <Protected>
    <div className="container-card p-6 md:p-8">
      <h1>Crear CV desde cero</h1>
      <p className="mt-2 text-sm">Completa los campos y generamos un CV en HTML listo para PDF.</p>

      <div className="mt-6 grid gap-3">
        {["nombre","perfil","educacion","experiencia","skills","proyectos"].map(k=>(
          <textarea key={k} placeholder={k} className="textarea h-28"
            value={(form as any)[k]} onChange={e=>setForm({...form, [k]: e.target.value})}/>
        ))}
        <button onClick={onGen} disabled={loading} className="btn-primary w-fit">
          {loading ? "Generando..." : "Generar CV"}
        </button>
      </div>

      {html && (
        <>
          <h2 className="mt-8">Vista previa</h2>
          <div className="container-card mt-3 p-4" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
    </div>
  </Protected>
);
