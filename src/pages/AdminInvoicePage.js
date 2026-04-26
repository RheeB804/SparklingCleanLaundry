import React, { useEffect, useState } from 'react';

const DEFAULT_RATE = Number(process.env.REACT_APP_DEFAULT_RATE_PER_LB || 1.75);
const STORAGE_KEY = 'sc_admin_pw';

function formatUsd(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export default function AdminInvoicePage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [lbs, setLbs] = useState('');
  const [rate, setRate] = useState(String(DEFAULT_RATE));
  const [deliveryFee, setDeliveryFee] = useState('');
  const [note, setNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  function logIn(e) {
    e.preventDefault();
    if (!password) return;
    sessionStorage.setItem(STORAGE_KEY, password);
    setAuthed(true);
  }

  function logOut() {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword('');
    setAuthed(false);
    setResult(null);
  }

  const lbsNum = Number(lbs);
  const rateNum = Number(rate);
  const feeNum = Number(deliveryFee) || 0;
  const subtotalCents =
    Number.isFinite(lbsNum) && Number.isFinite(rateNum) && lbsNum > 0 && rateNum > 0
      ? Math.round(lbsNum * rateNum * 100)
      : 0;
  const deliveryFeeCents =
    Number.isFinite(feeNum) && feeNum >= 0 ? Math.round(feeNum * 100) : 0;
  const preTipTotalCents = subtotalCents + deliveryFeeCents;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    setSubmitting(true);
    try {
      const r = await fetch('/api/invoices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({
          customer_name: customerName,
          contact,
          lbs: lbsNum,
          rate: rateNum,
          delivery_fee: feeNum,
          note,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        if (r.status === 401) {
          logOut();
          throw new Error('Invalid admin password');
        }
        throw new Error(data.error || 'Failed');
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function newInvoice() {
    setResult(null);
    setCustomerName('');
    setContact('');
    setLbs('');
    setDeliveryFee('');
    setNote('');
  }

  function copy(text, which) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(''), 1500);
    });
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form onSubmit={logIn} className="max-w-sm w-full bg-white rounded-xl shadow p-8">
          <h1 className="text-xl font-bold text-gray-900">Operator login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the admin password to create invoices.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="mt-4 w-full border rounded-lg px-3 py-2"
            placeholder="Admin password"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-gradient-primary text-white font-semibold py-2 rounded-lg shadow-primary hover:shadow-primary-hover transition"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  if (result) {
    const feePart = result.delivery_fee_cents
      ? ` + ${formatUsd(result.delivery_fee_cents)} delivery`
      : '';
    const smsText = `Hi ${customerName || 'there'}! Your laundry is ready at Sparkling Clean. Your order: ${lbsNum} lbs — ${formatUsd(result.subtotal_cents)}${feePart}. Pay here: ${result.payment_url}`;
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">Invoice created</h1>
          <p className="text-sm text-gray-500">
            Send one of the following to the customer.
          </p>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">Payment link</label>
            <div className="mt-1 flex gap-2">
              <input
                readOnly
                value={result.payment_url}
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-50 text-sm"
              />
              <button
                onClick={() => copy(result.payment_url, 'url')}
                className="px-3 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600"
              >
                {copied === 'url' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">SMS message</label>
            <div className="mt-1 flex gap-2">
              <textarea
                readOnly
                value={smsText}
                rows={4}
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-50 text-sm"
              />
              <button
                onClick={() => copy(smsText, 'sms')}
                className="px-3 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 self-start"
              >
                {copied === 'sms' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={newInvoice}
              className="flex-1 bg-gradient-primary text-white font-semibold py-2 rounded-lg shadow-primary hover:shadow-primary-hover"
            >
              New invoice
            </button>
            <button
              onClick={logOut}
              className="px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">New invoice</h1>
          <button
            onClick={logOut}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Log out
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Customer name</label>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Julia"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone or email (optional)
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="+1 323-555-0190"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Weight (lbs)</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={lbs}
                onChange={(e) => setLbs(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="42"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Rate ($/lb)</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Delivery fee (optional, $)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Note (optional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              placeholder="Comforter included, delicate cycle"
            />
          </div>

          <div className="pt-2 border-t space-y-1 text-gray-800">
            <div className="flex justify-between text-sm">
              <span>Wash &amp; fold</span>
              <span>{formatUsd(subtotalCents)}</span>
            </div>
            {deliveryFeeCents > 0 && (
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span>{formatUsd(deliveryFeeCents)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-1">
              <span>Subtotal (before tip)</span>
              <span>{formatUsd(preTipTotalCents)}</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting || preTipTotalCents <= 0 || !customerName}
            className="w-full bg-gradient-primary text-white font-semibold py-3 rounded-lg shadow-primary hover:shadow-primary-hover transition disabled:opacity-60"
          >
            {submitting ? 'Generating…' : 'Generate payment link'}
          </button>
        </form>
      </div>
    </div>
  );
}
