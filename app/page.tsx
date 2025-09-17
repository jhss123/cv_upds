
export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Plataforma de CV con IA (Comunidad Universitaria)</h1>
      <p>Gratis: Evaluar, corregir y crear CV desde cero. Premium: Entrevista simulada y postulación a bolsa.</p>
      <ul className="list-disc ml-6">
        <li>Acceso con correo institucional</li>
        <li>CV listo para imprimir en PDF</li>
        <li>IA para puntaje, feedback y simulación de entrevista</li>
      </ul>
      <a href="/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Comenzar</a>
    </section>
  );
}
