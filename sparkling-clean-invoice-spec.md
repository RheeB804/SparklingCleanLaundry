# Sparkling Clean Laundry — Invoice + Tip Payment System Spec

## Overview
Build a two-sided invoice + payment flow for Sparkling Clean Laundry (sparklingcleanlaundry.com).
The operator creates an invoice by entering lbs. The customer receives a unique link, sees the invoice,
optionally adds a tip, and pays via Stripe.

---

## Business Context
- Business: Sparkling Clean Laundry, Los Angeles
- Location: Whittier Blvd, 4,200 SF NNN lease
- Use case: Commercial and consumer wash & fold clients
- Operator sends payment link via SMS or email after receiving laundry
- Default rate: ~$1.75/lb (operator can adjust per invoice)
- Tip is customer-driven — operator does not set it

---

## User Flow

### Operator side (internal tool, password-protected or admin route)
1. Enter customer name + phone/email
2. Enter weight in lbs + per-lb rate (pre-filled with default)
3. Optional: add a note (e.g. "comforter included, delicate cycle")
4. System calculates subtotal = lbs × rate
5. Click "Generate payment link" → creates invoice record in DB → returns unique URL
6. Copy link or copy pre-written SMS message to send to customer

### Customer side (public page)
URL format: `sparklingcleanlaundry.com/pay/[invoice_id]`

1. Page loads invoice from DB by ID
2. Shows: business name, invoice ID, line item (X lbs wash & fold = $Y), optional note
3. Tip section: No tip / 15% / 20% / 25% / Custom $ amount
4. Running total updates live as tip changes
5. "Pay $X.XX securely" button → calls backend → creates Stripe PaymentIntent → Stripe payment element loads inline
6. On success: show confirmation, mark invoice as paid in DB

---

## Tech Stack (recommended)
- **Frontend**: existing website stack (TBD — Claude Code will detect)
- **Backend**: Vercel serverless functions (or existing backend if present)
- **Database**: Supabase (Postgres) — free tier sufficient
- **Payments**: Stripe (PaymentIntents API + Stripe.js payment element)

---

## Database Schema

### invoices table
```sql
id            uuid primary key default gen_random_uuid()
created_at    timestamp default now()
customer_name text
contact       text          -- phone or email
lbs           numeric
rate          numeric        -- $/lb
subtotal_cents integer       -- lbs × rate × 100, no tip
note          text
status        text default 'pending'   -- pending | paid | cancelled
paid_at       timestamp
stripe_payment_intent_id  text
tip_cents     integer default 0        -- filled when customer pays
total_cents   integer                  -- subtotal + tip, filled on payment
```

---

## API Endpoints

### POST /api/invoices/create
Called by operator when generating a link.
```json
Request:
{
  "customer_name": "Julia",
  "contact": "+1 323-555-0190",
  "lbs": 42,
  "rate": 1.75,
  "note": "Comforter included"
}

Response:
{
  "invoice_id": "uuid",
  "payment_url": "https://sparklingcleanlaundry.com/pay/uuid",
  "subtotal_cents": 7350
}
```

### GET /api/invoices/[id]
Called by customer page on load.
```json
Response:
{
  "id": "uuid",
  "customer_name": "Julia",
  "lbs": 42,
  "rate": 1.75,
  "subtotal_cents": 7350,
  "note": "Comforter included",
  "status": "pending"
}
```

### POST /api/invoices/[id]/pay
Called when customer clicks Pay (after tip selection).
Creates Stripe PaymentIntent for subtotal + tip.
```json
Request:
{
  "tip_cents": 1470
}

Response:
{
  "client_secret": "pi_xxx_secret_xxx",
  "total_cents": 8820
}
```

### POST /api/webhooks/stripe
Stripe webhook — marks invoice as paid when PaymentIntent succeeds.
Updates: status = 'paid', paid_at, tip_cents, total_cents, stripe_payment_intent_id

---

## Stripe Integration Notes
- Use **PaymentIntents** (not Payment Links) — needed so tip amount can be added dynamically
- Load **Stripe.js** + **Payment Element** on customer page
- Payment Element handles card, Apple Pay, Google Pay automatically
- Store `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` as env vars
- Use `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` on frontend

---

## Key UI Details (customer page)
- Show "100% goes to your laundry attendant" under tip section
- Tip buttons: No tip / 15% / 20% / 25% / Custom $
- Live total updates as tip changes
- Button label updates: "Pay $X.XX securely"
- After payment: "Thank you, [name]! Your payment was received." + order summary
- Lock page (show "already paid") if invoice status = paid

---

## Key UI Details (operator page)
- Route: /admin/invoice (protect with simple password env var or Vercel password protection)
- Pre-fill rate from env var DEFAULT_RATE_PER_LB
- After generating: show copyable link + pre-written SMS text
- SMS template: "Hi [name]! Your laundry is ready at Sparkling Clean 🧺 Your order: [X] lbs — $[subtotal] (+ your tip). Pay here: [url]"

---

## Environment Variables Needed
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DEFAULT_RATE_PER_LB=1.75
ADMIN_PASSWORD=
```

---

## What Claude Code Should Do First
1. Examine the existing website structure (framework, routing, existing pages)
2. Check if Supabase and Stripe packages are already installed
3. Ask about any existing auth/admin setup before adding new routes
4. Create the Supabase migration file for the invoices table
5. Build API routes, then customer page, then operator page

