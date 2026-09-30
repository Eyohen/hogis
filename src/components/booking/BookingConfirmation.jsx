import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function BookingConfirmation({ reference, title, subtitle, rows, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="inline-flex"
      >
        <CheckCircle2 className="h-16 w-16 text-emerald-700" />
      </motion.div>
      <h2 className="font-display text-3xl text-emerald-900 mt-6">Booking confirmed</h2>
      <p className="text-stone-500 mt-2">{subtitle}</p>

      <div className="mt-8 rounded-2xl bg-white shadow-soft p-6 text-left">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">Booking reference</p>
            <p className="font-display text-lg text-emerald-900">{reference}</p>
          </div>
          <p className="font-display text-xl text-emerald-900">{title}</p>
        </div>
        <dl className="space-y-2 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt className="text-stone-500">{label}</dt>
              <dd className="text-stone-700 font-medium text-right">{value}</dd>
            </div>
          ))}
        </dl>
        {total && (
          <div className="flex justify-between border-t border-stone-100 mt-4 pt-4">
            <dt className="font-semibold text-emerald-900">Total paid</dt>
            <dd className="font-display text-lg text-emerald-900">{total}</dd>
          </div>
        )}
      </div>

      <p className="text-xs text-stone-400 mt-6">
        Your payment was processed securely by Paystack. No confirmation email is sent from this demo site.
      </p>

      <Button as={Link} to="/" variant="outline" className="mt-6">
        Back to Home
      </Button>
    </motion.div>
  );
}
