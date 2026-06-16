create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_name text not null check (char_length(event_name) between 1 and 80),
  path text not null check (char_length(path) between 1 and 320),
  referrer text check (char_length(referrer) <= 500),
  properties jsonb not null default '{}'::jsonb,
  session_hash text,
  ip_hash text not null,
  user_agent_hash text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_name_created_at_idx
  on public.analytics_events (event_name, created_at desc);

create index if not exists analytics_events_path_created_at_idx
  on public.analytics_events (path, created_at desc);

create index if not exists analytics_events_session_created_at_idx
  on public.analytics_events (session_hash, created_at desc)
  where session_hash is not null;

alter table public.analytics_events enable row level security;

revoke all privileges on table public.analytics_events from anon, authenticated;
revoke all privileges on sequence public.analytics_events_id_seq from anon, authenticated;

drop policy if exists "No direct public access" on public.analytics_events;
create policy "No direct public access"
on public.analytics_events
for all
to anon, authenticated
using (false)
with check (false);
