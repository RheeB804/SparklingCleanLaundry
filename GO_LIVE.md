# Go-Live Checklist — Invoice + Payment System

Pick up here when resuming.

## 1. Clean up `.env.example`
Real keys were written into `.env.example` earlier. That file is tracked by git — restore it to placeholders (`pk_test_xxx`, etc.). Real values stay in `.env` / `.env.local` only, which are gitignored. If `.env.example` with real keys was ever committed/pushed, rotate those keys in Stripe + Supabase.

## 2. Supabase (production)
- Use the existing project or create a new prod project.
- Run both migrations in the SQL editor:
  - `supabase/migrations/0001_create_invoices.sql`
  - `supabase/migrations/0002_add_delivery_fee.sql`
- Copy prod `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## 3. Stripe (live mode)
- Dashboard top-right → switch **Test mode OFF**.
- Developers → API keys → copy live publishable (`pk_live_...`) and secret (`sk_live_...`).
- Settings → Emails → confirm **Successful payments** toggle is ON in live mode.

## 4. Push to GitHub, deploy on Vercel
- `git push` the repo to GitHub.
- Vercel → New Project → import the repo (auto-detects CRA).
- Before first deploy: Project Settings → Environment Variables → add:
  - `STRIPE_SECRET_KEY` (live)
  - `STRIPE_WEBHOOK_SECRET` (set after step 5)
  - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_PASSWORD`
  - `REACT_APP_STRIPE_PUBLISHABLE_KEY` (live `pk_live_...`)
  - `REACT_APP_DEFAULT_RATE_PER_LB=1.75`
- Deploy.

## 5. Stripe webhook for production
- Stripe (live mode) → Developers → Webhooks → Add endpoint.
- URL: `https://<your-vercel-domain>/api/webhooks/stripe`
- Event: `payment_intent.succeeded`
- Copy the signing secret → Vercel env vars as `STRIPE_WEBHOOK_SECRET` → redeploy.

## 6. Domain (optional)
- Vercel → Domains → add `sparklingcleanlaundry.com`. Update DNS.

## 7. Smoke test on production
- Create an invoice at `/admin/invoice`, pay with a real card at `/pay/<id>` (Stripe minimum $0.50).
- Confirm: Stripe receipt arrives, invoice row in Supabase shows `status='paid'`, re-visiting `/pay/<id>` shows "already paid".

## Deferred for later
- Itemized receipt email via EmailJS server-side (decided but not built).
