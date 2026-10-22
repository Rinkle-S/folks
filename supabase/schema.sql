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
