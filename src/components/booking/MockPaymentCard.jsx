import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function MockPaymentCard({ card, onChange }) {
  const update = (field) => (e) => {
    let value = e.target.value;
    if (field === 'number') value = formatCardNumber(value);
    if (field === 'expiry') value = formatExpiry(value);
    if (field === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);
    onChange({ ...card, [field]: value });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <motion.div
          animate={{ rotateY: card.flip ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-52 w-full max-w-sm mx-auto"
        >
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-charcoal-950 p-6 text-cream-50 shadow-lift"
          >
            <div className="flex justify-between items-start">
              <span className="font-display text-lg">Hogis Group</span>
              <CreditCard className="h-6 w-6 text-gold-400" />
            </div>
            <p className="mt-8 text-xl sm:text-2xl tracking-widest font-mono">
              {card.number || '•••• •••• •••• ••••'}
            </p>
            <div className="mt-6 flex justify-between text-xs uppercase tracking-wide text-cream-100/70">
              <div>
                <p className="text-[10px]">Card holder</p>
                <p className="text-cream-50 mt-1">{card.name || 'YOUR NAME'}</p>
              </div>
              <div>
                <p className="text-[10px]">Expires</p>
                <p className="text-cream-50 mt-1">{card.expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-charcoal-950 to-emerald-900 shadow-lift"
          >
            <div className="h-8 bg-charcoal-800 mt-6" />
            <div className="mt-6 mx-6 flex justify-end">
              <div className="bg-cream-50 text-charcoal-950 text-sm font-mono px-3 py-1 rounded">
                {card.cvv || '•••'}
              </div>
            </div>
          </div>
        </motion.div>
        <p className="text-center text-xs text-stone-400 mt-4">This is a simulated card entry — no real payment is processed.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Card number</label>
          <input
            value={card.number}
            onChange={update('number')}
            placeholder="4242 4242 4242 4242"
            className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Cardholder name</label>
          <input
            value={card.name}
            onChange={update('name')}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Expiry</label>
            <input
              value={card.expiry}
              onChange={update('expiry')}
              placeholder="MM/YY"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-stone-700 mb-1.5">CVV</label>
            <input
              value={card.cvv}
              onChange={update('cvv')}
              onFocus={() => onChange({ ...card, flip: true })}
              onBlur={() => onChange({ ...card, flip: false })}
              placeholder="123"
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
