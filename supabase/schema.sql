-- Aylani — Supabase database schema
-- Voer dit uit in Supabase Dashboard → SQL Editor

-- Gebruikersprofielen (gekoppeld aan Clerk user ID)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text,
  name text,
  role text not null default 'client' check (role in ('admin', 'editor', 'client')),
  created_at timestamptz not null default now()
);

-- Intake-resultaten
create table if not exists intake_results (
  id uuid primary key default gen_random_uuid(),
  clerk_id text,
  lang text not null default 'nl' check (lang in ('nl', 'en')),
  profiel_naam text not null,
  profiel_tagline text,
  profiel_beschrijving text,
  patronen jsonb default '[]',
  routines jsonb default '[]',
  voeding jsonb default '[]',
  eerste_stap text,
  created_at timestamptz not null default now()
);

-- Kennisbank artikelen
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  body text,
  read_time_minutes int,
  published boolean not null default false,
  author_clerk_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cliëntnotities
create table if not exists client_notes (
  id uuid primary key default gen_random_uuid(),
  client_clerk_id text not null,
  author_clerk_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Indexen
create index if not exists idx_profiles_clerk_id on profiles(clerk_id);
create index if not exists idx_intake_clerk_id on intake_results(clerk_id);
create index if not exists idx_articles_slug on articles(slug);
create index if not exists idx_articles_published on articles(published);
create index if not exists idx_notes_client on client_notes(client_clerk_id);

-- Row Level Security uitschakelen (we gebruiken service role key server-side)
alter table profiles disable row level security;
alter table intake_results disable row level security;
alter table articles disable row level security;
alter table client_notes disable row level security;
