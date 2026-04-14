-- Fix: qualify all names with public. schema since search_path = ''
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  new_locker_code text;
begin
  new_locker_code := 'TFX-' || lpad(nextval('public.locker_seq')::text, 4, '0');

  insert into public.profiles (user_id, full_name, locker_code, locker_address)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new_locker_code,
    new_locker_code || chr(10) || '12345 NW 7th St' || chr(10) || 'Portland, OR 97201' || chr(10) || 'United States'
  );
  return new;
end;
$$;
