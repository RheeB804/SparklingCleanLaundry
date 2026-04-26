const { getSupabase } = require('../_lib/supabase');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing id' });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('invoices')
    .select(
      'id, customer_name, contact, lbs, rate, subtotal_cents, delivery_fee_cents, note, status, tip_cents, total_cents'
    )
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('fetch invoice failed', error);
    return res.status(500).json({ error: 'Failed to fetch invoice' });
  }
  if (!data) return res.status(404).json({ error: 'Invoice not found' });

  return res.status(200).json(data);
};
