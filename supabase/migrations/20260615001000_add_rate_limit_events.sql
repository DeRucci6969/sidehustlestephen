create table if not exists public.rate_limit_events (
  id bigint generated always as identity primary key,
  action text not null,
  scope text not null check (scope in ('ip', 'email', 'user')),
  identifier_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_events_lookup_idx
  on public.rate_limit_events (action, scope, identifier_hash, created_at desc);

create index if not exists rate_limit_events_created_at_idx
  on public.rate_limit_events (created_at);

alter table public.rate_limit_events enable row level security;

revoke all privileges on table public.rate_limit_events from anon, authenticated;
revoke all privileges on sequence public.rate_limit_events_id_seq from anon, authenticated;

drop policy if exists "No direct public access" on public.rate_limit_events;
create policy "No direct public access"
on public.rate_limit_events
for all
to anon, authenticated
using (false)
with check (false);
