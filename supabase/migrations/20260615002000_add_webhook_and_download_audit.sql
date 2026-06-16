create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  status text not null default 'processing'
    check (status in ('processing', 'processed', 'failed')),
  attempts integer not null default 1,
  last_error text,
  received_at timestamptz not null default now(),
  processing_started_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists stripe_webhook_events_status_idx
  on public.stripe_webhook_events (status, processing_started_at desc);

alter table public.stripe_webhook_events enable row level security;

revoke all privileges on table public.stripe_webhook_events from anon, authenticated;

drop policy if exists "No direct public access" on public.stripe_webhook_events;
create policy "No direct public access"
on public.stripe_webhook_events
for all
to anon, authenticated
using (false)
with check (false);

create table if not exists public.download_events (
  id bigint generated always as identity primary key,
  supabase_user_id uuid not null references auth.users(id) on delete cascade,
  download_type text not null
    check (download_type in ('asset', 'pack_zip')),
  pack_slug text not null,
  asset_id text,
  asset_count integer,
  ip_hash text not null,
  user_agent_hash text,
  created_at timestamptz not null default now()
);

create index if not exists download_events_user_created_at_idx
  on public.download_events (supabase_user_id, created_at desc);

create index if not exists download_events_ip_created_at_idx
  on public.download_events (ip_hash, created_at desc);

create index if not exists download_events_pack_created_at_idx
  on public.download_events (pack_slug, created_at desc);

alter table public.download_events enable row level security;

revoke all privileges on table public.download_events from anon, authenticated;
revoke all privileges on sequence public.download_events_id_seq from anon, authenticated;

drop policy if exists "No direct public access" on public.download_events;
create policy "No direct public access"
on public.download_events
for all
to anon, authenticated
using (false)
with check (false);
