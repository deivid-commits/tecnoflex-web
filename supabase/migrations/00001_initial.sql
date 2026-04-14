-- Create profiles table
create table profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade unique not null,
  full_name text,
  phone text,
  city text,
  locker_code text unique not null,
  locker_address text not null,
  created_at timestamptz default now()
);

-- Create packages table
create table packages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(user_id) on delete cascade not null,
  tracking_number text not null,
  description text,
  status text default 'received' not null check (status in ('received', 'consolidated', 'shipped', 'delivered')),
  weight_lbs decimal(6,2),
  dimensions text,
  received_at timestamptz,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz default now()
);

-- Create shipments table
create table shipments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(user_id) on delete cascade not null,
  tracking_number text unique not null,
  status text default 'pending' not null check (status in ('pending', 'in_transit', 'customs', 'delivered')),
  estimated_delivery date,
  actual_delivery date,
  total_weight_lbs decimal(6,2),
  total_cost_usd decimal(10,2),
  created_at timestamptz default now()
);

-- Create shipment_packages junction table
create table shipment_packages (
  shipment_id uuid references shipments(id) on delete cascade,
  package_id uuid references packages(id) on delete cascade,
  primary key (shipment_id, package_id)
);

-- Enable RLS
alter table profiles enable row level security;
alter table packages enable row level security;
alter table shipments enable row level security;
alter table shipment_packages enable row level security;

-- RLS policies: users can only access their own data
create policy "Users can view own profile" on profiles for select using (user_id = auth.uid());
create policy "Users can update own profile" on profiles for update using (user_id = auth.uid());
create policy "Users can insert own profile" on profiles for insert with check (user_id = auth.uid());

create policy "Users can view own packages" on packages for select using (user_id = auth.uid());
create policy "Users can insert own packages" on packages for insert with check (user_id = auth.uid());
create policy "Users can update own packages" on packages for update using (user_id = auth.uid());

create policy "Users can view own shipments" on shipments for select using (user_id = auth.uid());
create policy "Users can insert own shipments" on shipments for insert with check (user_id = auth.uid());
create policy "Users can update own shipments" on shipments for update using (user_id = auth.uid());

create policy "Users can view own shipment_packages" on shipment_packages for select using (
  shipment_id in (select id from shipments where user_id = auth.uid())
);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  new_locker_code text;
begin
  -- Generate unique locker code
  new_locker_code := 'TFX-' || lpad(nextval('locker_seq')::text, 4, '0');

  insert into profiles (user_id, full_name, locker_code, locker_address)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new_locker_code,
    new_locker_code || chr(10) || '12345 NW 7th St' || chr(10) || 'Portland, OR 97201' || chr(10) || 'United States'
  );
  return new;
end;
$$;

-- Create sequence for locker codes
create sequence locker_seq start with 1000;

-- Trigger to auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();