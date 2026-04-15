-- Fix: Remove hyphen from locker code format (TFX-1004 → TFX1004)
-- Also prepend Coordinadora locker prefix (0190266) to the address line
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  new_locker_code text;
  coordinadora_code text;
begin
  -- Generate unique locker code WITHOUT hyphen
  new_locker_code := 'TFX' || lpad(nextval('public.locker_seq')::text, 4, '0');

  -- Coordinadora prefix (black = their code, red = our code)
  coordinadora_code := '0190266 - ' || new_locker_code;

  insert into public.profiles (user_id, full_name, locker_code, locker_address)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coordinadora_code,
    coordinadora_code || chr(10) || '12345 NW 7th St' || chr(10) || 'Portland, OR 97201' || chr(10) || 'United States'
  );
  return new;
end;
$$;

-- Update existing profiles: remove hyphen from locker_code
update public.profiles
set locker_code = replace(locker_code, 'TFX-', 'TFX'),
    locker_address = replace(locker_address, 'TFX-', 'TFX')
where locker_code like 'TFX-%';

-- Now prepend coordinadora prefix to existing codes that don't have it
update public.profiles
set locker_code = '0190266 - ' || locker_code,
    locker_address = replace(locker_address, locker_code, '0190266 - ' || locker_code)
where locker_code NOT LIKE '0190266 - %';