const { getSupabase } = require('../../_lib/supabase');
const { getStripe } = require('../../_lib/stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing id' });
  }

  const body = req.body || {};
  const tipRaw = body.tip_cents;
  const tip_cents = Math.max(0, Math.round(Number(tipRaw) || 0));
  const emailRaw = typeof body.receipt_email === 'string' ? body.receipt_email.trim() : '';
  const receipt_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw) ? emailRaw : null;

  const supabase = getSupabase();
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('id, subtotal_cents, delivery_fee_cents, status, customer_name, stripe_payment_intent_id')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('fetch invoice failed', error);
    return res.status(500).json({ error: 'Failed to fetch invoice' });
  }
  if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
  if (invoice.status === 'paid') {
    return res.status(409).json({ error: 'Invoice already paid' });
  }
  if (invoice.status === 'cancelled') {
    return res.status(409).json({ error: 'Invoice cancelled' });
  }

  const delivery_fee_cents = invoice.delivery_fee_cents || 0;
  const total_cents = invoice.subtotal_cents + delivery_fee_cents + tip_cents;
  const stripe = getStripe();

  const metadata = {
    invoice_id: invoice.id,
    tip_cents: String(tip_cents),
    subtotal_cents: String(invoice.subtotal_cents),
    delivery_fee_cents: String(delivery_fee_cents),
  };

  let intent;
  if (invoice.stripe_payment_intent_id) {
    const updates = { amount: total_cents, metadata };
    if (receipt_email) updates.receipt_email = receipt_email;
    intent = await stripe.paymentIntents.update(
      invoice.stripe_payment_intent_id,
      updates
    );
  } else {
    intent = await stripe.paymentIntents.create({
      amount: total_cents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: `Sparkling Clean Laundry — ${invoice.customer_name}`,
      metadata,
      ...(receipt_email ? { receipt_email } : {}),
    });
    await supabase
      .from('invoices')
      .update({ stripe_payment_intent_id: intent.id })
      .eq('id', invoice.id);
  }

  return res.status(200).json({
    client_secret: intent.client_secret,
    total_cents,
  });
};
