-- Run this once in Supabase: SQL Editor → New query → paste → Run.
create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  device text,
  type text not null,
  lesson text,
  step int,
  from_name text,
  meta jsonb default '{}'::jsonb
);

create index if not exists events_type_idx on public.events (type);
create index if not exists events_created_idx on public.events (created_at desc);

-- Only the server (service role key) reads and writes. No public access.
alter table public.events enable row level security;

-- Lessons made for a parent: they ask for something with no lesson, and someone close
-- types the steps, records a voice note, or uploads a screen recording / screenshots.
create table if not exists public.custom_lessons (
  id text primary key,
  created_at timestamptz not null default now(),
  question text,
  lang text,
  app text,
  steps jsonb,
  author text,
  media jsonb default '[]'::jsonb,
  status text default 'asked'
);
alter table public.custom_lessons enable row level security;

-- Voice notes, videos and screenshots: create a PRIVATE storage bucket named "recordings"
-- (Supabase → Storage → New bucket → name: recordings → leave "Public" off).

-- Lesson voice clips (generated once by Sarvam, then reused): create a PRIVATE storage bucket named "tts".

-- "Ask anything": step-by-step guides the AI made for questions we had no lesson for.
-- The same question (same language, same phone) is answered from here the next time, free.
create table if not exists public.ai_tutorials (
  id text primary key,
  created_at timestamptz not null default now(),
  question text,
  lang text,
  phone text,
  title text,
  app text,
  steps jsonb,
  caution text
);
alter table public.ai_tutorials enable row level security;
