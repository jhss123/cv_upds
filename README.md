
# CV Universitario — MVP (Next.js + Supabase + OpenAI)

## 1) Requisitos
- Node.js 18+ y Git instalados en tu PC.
- Cuenta en **Supabase** y **Vercel**.
- **OPENAI_API_KEY** válida.

## 2) Crear proyecto en Supabase
1. Entra a https://supabase.com/ → **New Project**.
2. Copia **Project URL** y **anon key** (Settings → API).
3. En **Authentication → Providers → Email**, activa **Email** (Magic Link).
4. En **SQL Editor**, pega y ejecuta el SQL de `docs/sql.sql` (o el bloque del informe).

### SQL a ejecutar en Supabase
```
-- Perfiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  is_premium boolean default false,
  created_at timestamp with time zone default now()
);
alter table public.profiles enable row level security;
create policy "select own profile" on public.profiles for select using (auth.uid() = id);
create policy "upsert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "update own profile" on public.profiles for update using (auth.uid() = id);

-- CVs
create table if not exists public.cvs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  raw_text text,
  html_version text,
  score int,
  ats_flags jsonb,
  created_at timestamp with time zone default now()
);
alter table public.cvs enable row level security;
create policy "cvs by owner" on public.cvs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Entrevistas
create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  role text,
  transcript jsonb,
  scores jsonb,
  created_at timestamp with time zone default now()
);
alter table public.interviews enable row level security;
create policy "interviews by owner" on public.interviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Bolsa
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  title text not null,
  requirements text,
  created_at timestamp with time zone default now()
);
alter table public.jobs enable row level security;
create policy "jobs readable" on public.jobs for select using (true);

-- Postulaciones
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  job_id uuid not null references public.jobs(id),
  cv_id uuid references public.cvs(id),
  status text default 'enviada',
  created_at timestamp with time zone default now()
);
alter table public.applications enable row level security;
create policy "apps by owner" on public.applications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Datos demo
insert into public.jobs (company, title, requirements) values
('Empresa A', 'Soporte TI Jr', 'Atención a usuarios, tickets, redes básicas'),
('Empresa B', 'Desarrollador Web', 'HTML, CSS, JS, Git, APIs'),
('Empresa C', 'Analista de Datos', 'Excel, SQL, Python (pandas)');
```

> **Restricción de dominio (demo):** En este MVP, se valida en frontend que el email termine en `@TU-DOMINIO.edu.bo`. Agrega en Vercel la var `NEXT_PUBLIC_ALLOWED_DOMAIN`.

## 3) Variables de entorno (local)
Crea `.env.local` en la raíz:
```
NEXT_PUBLIC_SUPABASE_URL=TU_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_SUPABASE_ANON
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ALLOWED_DOMAIN=upds.edu.bo
```

## 4) Ejecutar localmente
```bash
npm install
npm run dev
# abre http://localhost:3000
```

## 5) Desplegar en Vercel
1. Sube el repo a GitHub (o importa este directorio en Vercel directamente).
2. En **Vercel → New Project**, selecciona el repo.
3. En **Settings → Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_ALLOWED_DOMAIN`
4. Deploy → obtendrás una URL pública.

## 6) Flujo de prueba
- Ir a `/login` y usar correo institucional.
- `/cv/evaluar`: pega CV → obtén score y feedback.
- `/cv/corregir`: pega CV → versión mejorada.
- `/cv/crear`: llena los campos → HTML de CV listo para imprimir.
- `/premium/activar`: código `PREMIUM-UPDS` → activa premium.
- `/premium/entrevista`: simula entrevista con IA.
- `/bolsa`: visualizar y postular (demo).

¡Listo!
