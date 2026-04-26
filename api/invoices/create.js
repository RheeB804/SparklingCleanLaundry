const { getSupabase } = require('../_lib/supabase');
const { requireAdmin } = require('../_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!requireAdmin(req, res)) return;

  const { customer_name, contact, lbs, rate, note, delivery_fee } = req.body || {};

  if (!customer_name || typeof customer_name !== 'string') {
    return res.status(400).json({ error: 'customer_name is required' });
  }
  const lbsNum = Number(lbs);
  const rateNum = Number(rate);
  if (!Number.isFinite(lbsNum) || lbsNum <= 0) {
    return res.status(400).json({ error: 'lbs must be a positive number' });
  }
  if (!Number.isFinite(rateNum) || rateNum <= 0) {
    return res.status(400).json({ error: 'rate must be a positive number' });
  }
  const feeNum = Number(delivery_fee) || 0;
  if (feeNum < 0 || !Number.isFinite(feeNum)) {
    return res.status(400).json({ error: 'delivery_fee must be >= 0' });
  }

  const subtotal_cents = Math.round(lbsNum * rateNum * 100);
  const delivery_fee_cents = Math.round(feeNum * 100);

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('invoices')
    .insert({
      customer_name: customer_name.trim(),
      contact: contact ? String(contact).trim() : null,
      lbs: lbsNum,
      rate: rateNum,
      subtotal_cents,
      delivery_fee_cents,
      note: note ? String(note).trim() : null,
    })
    .select('id, subtotal_cents, delivery_fee_cents')
    .single();

  if (error) {
    console.error('create invoice failed', error);
    return res.status(500).json({ error: 'Failed to create invoice' });
  }

  const origin =
    req.headers['origin'] ||
    (req.headers['x-forwarded-host']
      ? `https://${req.headers['x-forwarded-host']}`
      : `https://${req.headers.host}`);

  return res.status(200).json({
    invoice_id: data.id,
    payment_url: `${origin}/pay/${data.id}`,
    subtotal_cents: data.subtotal_cents,
    delivery_fee_cents: data.delivery_fee_cents,
  });
};
