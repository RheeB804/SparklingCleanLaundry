-- Add a delivery fee (separate from lbs subtotal and tip).
alter table public.invoices
  add column if not exists delivery_fee_cents integer not null default 0;
