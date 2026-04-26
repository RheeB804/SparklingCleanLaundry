const Stripe = require('stripe');

let cached = null;

function getStripe() {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  cached = new Stripe(key, { apiVersion: '2024-06-20' });
  return cached;
}

module.exports = { getStripe };
