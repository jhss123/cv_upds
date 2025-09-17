
export const metadata = { title: "CV Universitario", description: "Evaluación y creación de CV con IA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <nav className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold">CV Universitario</a>
            <div className="space-x-4 text-sm">
              <a href="/cv/evaluar">Evaluar</a>
              <a href="/cv/corregir">Corregir</a>
              <a href="/cv/crear">Crear</a>
              <a href="/premium/entrevista">Entrevista</a>
              <a href="/bolsa">Bolsa</a>
              <a href="/login" className="px-3 py-1 rounded bg-blue-600 text-white">Ingresar</a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
