<div key={j.id} className="container-card p-5">
  <h3 className="text-lg font-semibold">{j.company} — {j.title}</h3>
  <p className="mt-1 text-sm text-slate-600">{j.requirements}</p>
  <button onClick={()=>postular(j.id)} className="btn-primary mt-3">Postular con mi cuenta</button>
</div>
