revoke all privileges on table public.profiles from anon, authenticated;
revoke all privileges on table public.subscriptions from anon, authenticated;

grant usage on schema public to authenticated;
grant select on table public.profiles to authenticated;
grant select on table public.subscriptions to authenticated;
