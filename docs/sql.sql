
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
