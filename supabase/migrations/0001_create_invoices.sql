-- Sparkling Clean Laundry: invoices table
-- Run this in the Supabase SQL editor, or via `supabase db push` if using the CLI.

create extension if not exists "pgcrypto";

create table if not exists public.invoices (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz not null default now(),
  customer_name             text not null,
  contact                   text,
  lbs                       numeric(10, 2) not null,
  rate                      numeric(10, 2) not null,
  subtotal_cents            integer not null,
  note                      text,
  status                    text not null default 'pending'
    check (status in ('pending', 'paid', 'cancelled')),
  paid_at                   timestamptz,
  stripe_payment_intent_id  text,
  tip_cents                 integer not null default 0,
  total_cents               integer
);

create index if not exists invoices_status_idx on public.invoices (status);
create index if not exists invoices_created_at_idx on public.invoices (created_at desc);

-- Row Level Security: deny all by default.
-- The server uses the service_role key, which bypasses RLS.
-- The anon key should NEVER be used to read/write this table directly from the browser.
alter table public.invoices enable row level security;
