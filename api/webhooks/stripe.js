const { getSupabase } = require('../_lib/supabase');
const { getStripe } = require('../_lib/stripe');

// Stripe webhook requires the raw request body to verify the signature.
module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return res.status(500).send('Webhook secret missing');
  }

  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];
  const raw = await readRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error('webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const invoiceId = intent.metadata && intent.metadata.invoice_id;
    const tip_cents = Number((intent.metadata && intent.metadata.tip_cents) || 0);
    if (invoiceId) {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('invoices')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          tip_cents,
          total_cents: intent.amount,
          stripe_payment_intent_id: intent.id,
        })
        .eq('id', invoiceId);
      if (error) {
        console.error('failed to mark invoice paid', error);
        return res.status(500).send('DB update failed');
      }
    }
  }

  return res.status(200).json({ received: true });
};
