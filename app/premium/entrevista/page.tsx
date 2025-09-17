return (
  <Protected>
    <div className="container-card p-6 md:p-8">
      <h1>Entrevista simulada</h1>
      <input className="input mt-3 max-w-md" value={role} onChange={e=>setRole(e.target.value)} />

      <div className="mt-4 h-96 overflow-auto rounded-2xl border bg-slate-50 p-4">
        {history.map((m,i)=>(
          <div key={i} className={`mb-2 flex ${m.role==="user"?"justify-end":"justify-start"}`}>
            <span className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm
              ${m.role==="user" ? "bg-blue-600 text-white" : "bg-white border"}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input className="input flex-1" value={input} onChange={e=>setInput(e.target.value)} placeholder="Responde o escribe 'comenzar'"/>
        <button onClick={send} className="btn-primary">Enviar</button>
      </div>
    </div>
  </Protected>
);
