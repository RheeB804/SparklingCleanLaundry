import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const TIP_PRESETS = [
  { label: 'No tip', pct: 0 },
  { label: '15%', pct: 15 },
  { label: '20%', pct: 20 },
  { label: '25%', pct: 25 },
];

function formatUsd(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function CheckoutForm({ total, onPaid }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'Payment failed. Please try again.');
      setSubmitting(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      onPaid();
      return;
    }
    setMessage('Payment is processing. You will receive a receipt shortly.');
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="pb-1">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-gradient-primary text-white font-semibold py-3 rounded-lg shadow-primary hover:shadow-primary-hover transition disabled:opacity-60"
      >
        {submitting ? 'Processing…' : `Pay ${formatUsd(total)} securely`}
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </form>
  );
}

export default function PayInvoicePage() {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [tipChoice, setTipChoice] = useState('20%');
  const [customTip, setCustomTip] = useState('');
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [preparing, setPreparing] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch(`/api/invoices/${invoiceId}`);
        if (!r.ok) throw new Error((await r.json()).error || 'Not found');
        const data = await r.json();
        if (cancelled) return;
        setInvoice(data);
        if (data.contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact)) {
          setEmail(data.contact);
        }
        if (data.status === 'paid') setPaid(true);
      } catch (err) {
        if (!cancelled) setLoadError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [invoiceId]);

  const deliveryFeeCents = invoice ? invoice.delivery_fee_cents || 0 : 0;

  const tipCents = useMemo(() => {
    if (!invoice) return 0;
    if (tipChoice === 'Custom') {
      const v = Number(customTip);
      if (!Number.isFinite(v) || v < 0) return 0;
      return Math.round(v * 100);
    }
    const preset = TIP_PRESETS.find((p) => p.label === tipChoice);
    if (!preset) return 0;
    // Tip is a % of wash-and-fold subtotal only (not delivery fee).
    return Math.round(invoice.subtotal_cents * (preset.pct / 100));
  }, [invoice, tipChoice, customTip]);

  const totalCents = invoice
    ? invoice.subtotal_cents + deliveryFeeCents + tipCents
    : 0;

  async function startPayment() {
    setPreparing(true);
    try {
      const r = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tip_cents: tipCents, receipt_email: email }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Failed to start payment');
      setClientSecret(data.client_secret);
    } catch (err) {
      alert(err.message);
    } finally {
      setPreparing(false);
    }
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Invoice not found
          </h1>
          <p className="mt-2 text-gray-600">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading invoice…</p>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-8 text-center">
          <div className="text-5xl mb-3">✓</div>
          <h1 className="text-2xl font-bold text-gray-900">
            Thank you, {invoice.customer_name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Your payment was received. A receipt was emailed by Stripe.
          </p>
          <div className="mt-6 text-left border-t pt-4 text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>{invoice.lbs} lbs wash &amp; fold</span>
              <span>{formatUsd(invoice.subtotal_cents)}</span>
            </div>
            {deliveryFeeCents > 0 && (
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>{formatUsd(deliveryFeeCents)}</span>
              </div>
            )}
            {invoice.tip_cents > 0 && (
              <div className="flex justify-between">
                <span>Tip</span>
                <span>{formatUsd(invoice.tip_cents)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Total paid</span>
              <span>{formatUsd(invoice.total_cents || invoice.subtotal_cents)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Sparkling Clean Laundry
        </h1>
        <p className="text-sm text-gray-500">
          Invoice #{invoice.id.slice(0, 8)}
        </p>

        <div className="mt-6 border-t border-b py-4 text-gray-800 space-y-2">
          <div className="flex justify-between">
            <span>
              {invoice.lbs} lbs wash &amp; fold
              <span className="text-gray-500 text-sm"> @ ${Number(invoice.rate).toFixed(2)}/lb</span>
            </span>
            <span>{formatUsd(invoice.subtotal_cents)}</span>
          </div>
          {deliveryFeeCents > 0 && (
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>{formatUsd(deliveryFeeCents)}</span>
            </div>
          )}
          {invoice.note && (
            <p className="text-sm text-gray-500 italic">{invoice.note}</p>
          )}
        </div>

        {!clientSecret && (
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Email for receipt
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Stripe will email you a receipt after payment.
            </p>
          </div>
        )}

        {!clientSecret && (
          <div className="mt-6">
            <h2 className="font-semibold text-gray-900">Add a tip?</h2>
            <p className="text-xs text-gray-500">
              100% goes to your laundry attendant.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIP_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTipChoice(p.label)}
                  className={`py-2 rounded-lg border text-sm font-medium transition ${
                    tipChoice === p.label
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setTipChoice('Custom')}
                className={`py-2 rounded-lg border text-sm font-medium transition ${
                  tipChoice === 'Custom'
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                }`}
              >
                Custom
              </button>
            </div>
            {tipChoice === 'Custom' && (
              <div className="mt-3">
                <label className="text-sm text-gray-600">Custom tip ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  placeholder="0.00"
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 border-t pt-4 space-y-1 text-gray-800">
          <div className="flex justify-between text-sm">
            <span>Wash &amp; fold</span>
            <span>{formatUsd(invoice.subtotal_cents)}</span>
          </div>
          {deliveryFeeCents > 0 && (
            <div className="flex justify-between text-sm">
              <span>Delivery fee</span>
              <span>{formatUsd(deliveryFeeCents)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Tip</span>
            <span>{formatUsd(tipCents)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{formatUsd(totalCents)}</span>
          </div>
        </div>

        {!clientSecret && (
          <button
            onClick={startPayment}
            disabled={preparing || totalCents <= 0}
            className="mt-6 w-full bg-gradient-primary text-white font-semibold py-3 rounded-lg shadow-primary hover:shadow-primary-hover transition disabled:opacity-60"
          >
            {preparing ? 'Preparing…' : `Pay ${formatUsd(totalCents)} securely`}
          </button>
        )}

        {clientSecret && (
          <div className="mt-6 pb-2">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance: { theme: 'stripe' } }}
            >
              <CheckoutForm
                total={totalCents}
                onPaid={() => {
                  setInvoice((prev) =>
                    prev
                      ? {
                          ...prev,
                          status: 'paid',
                          tip_cents: tipCents,
                          total_cents: totalCents,
                        }
                      : prev
                  );
                  setPaid(true);
                }}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
