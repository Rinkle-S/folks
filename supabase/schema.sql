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

-- No audio is stored for now (voice is off, and lesson wording changes often). If it is turned on later,
-- create a PRIVATE bucket for it then, and key each clip by a hash of the text so a wording change makes a new clip.

-- The "ask anything" AI helper was removed, so there is no ai_tutorials table.

-- Changing content later: lessons are identified by a short stable id (for example "qr-pay") and events only store that id plus
-- a free-form "meta" column. Rename a lesson's title freely. If you ever rename an id, add a line to docs/CONTENT-IDS.md so
-- old events can still be read. New fields never need a migration: put them in "meta".
