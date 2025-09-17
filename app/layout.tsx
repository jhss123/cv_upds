import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Universitario",
  description: "Evaluación y creación de CV con IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900`}>
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 h-14">
            <Link href="/" className="font-semibold tracking-tight">
              <span className="rounded-xl bg-slate-900 px-2 py-1 text-white">CV</span>{" "}
              Universitario
            </Link>
            <div className="hidden gap-5 text-sm md:flex">
              <Link href="/cv/evaluar" className="hover:text-slate-900 text-slate-600">Evaluar</Link>
              <Link href="/cv/corregir" className="hover:text-slate-900 text-slate-600">Corregir</Link>
              <Link href="/cv/crear" className="hover:text-slate-900 text-slate-600">Crear</Link>
              <Link href="/premium/entrevista" className="hover:text-slate-900 text-slate-600">Entrevista</Link>
              <Link href="/bolsa" className="hover:text-slate-900 text-slate-600">Bolsa</Link>
            </div>
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Ingresar
            </Link>
          </nav>
        </header>

        {/* Page container */}
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

        <footer className="border-t py-6 text-center text-xs text-slate-500">
          Hecho con ❤️ para la comunidad universitaria
        </footer>
      </body>
    </html>
  );
}
