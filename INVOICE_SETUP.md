# Invoice + Tip Payment — Setup Guide

This app adds two routes on top of the existing marketing site:

- `/admin/invoice` — operator tool to create an invoice and generate a payment link
- `/pay/:invoiceId` — customer payment page (tip selector + Stripe Payment Element)

Backend lives in `/api/*` as Vercel serverless functions.

---

## 1. Supabase

1. Create a free project at https://supabase.com (project region close to LA).
2. Open **SQL Editor**, paste the contents of `supabase/migrations/0001_create_invoices.sql`, and run it.
3. In **Project Settings → API**, copy:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (server only — never commit, never ship to browser)

## 2. Stripe

1. Create a Stripe account. Use **Test mode** while developing.
2. In **Developers → API keys**, copy:
   - Publishable key → `REACT_APP_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
3. Webhook (once deployed to Vercel):
   - **Developers → Webhooks → Add endpoint**
   - URL: `https://<your-domain>/api/webhooks/stripe`
   - Event: `payment_intent.succeeded`
   - Copy the signing secret → `STRIPE_WEBHOOK_SECRET`

## 3. Local development

Copy `.env.example` to `.env` and fill in values. Then:

```
npm install
npm run build       # optional, sanity check
npm start           # CRA dev server — marketing site + /pay + /admin routes
```

The React dev server (`npm start`) does **not** run the `/api` functions.
To test the full flow locally, install the Vercel CLI once:

```
npm i -g vercel
vercel link         # link to your Vercel project
vercel dev          # runs CRA + serverless /api together on one port
```

To test Stripe webhooks locally, use the Stripe CLI:

```
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` it prints into `STRIPE_WEBHOOK_SECRET` for your dev env.

## 4. Deploy

1. Push the repo to GitHub.
2. In Vercel, **New Project** → import the repo. Framework preset: **Create React App** (auto-detected).
3. Add every variable from `.env.example` under **Project Settings → Environment Variables**.
4. Deploy. After the first deploy, create the Stripe webhook pointing at the production URL.

## 5. Operator workflow

1. Visit `/admin/invoice`, enter the `ADMIN_PASSWORD`.
2. Enter customer name, weight, rate, optional note → **Generate payment link**.
3. Copy either the link or the pre-written SMS and send via your phone.

## 6. Notes & limits

- Tips are set by the customer; the operator never enters one.
- Webhook is the source of truth: an invoice is not marked `paid` until `payment_intent.succeeded` arrives and the signature verifies.
- Row Level Security is enabled on `invoices`. Server uses the service role key (bypasses RLS). Never use the anon key from the browser for this table.
- Stripe fees are ~2.9% + $0.30 per charge, including the tip portion.
