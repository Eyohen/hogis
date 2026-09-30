import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../lib/format';
import Button from '../ui/Button';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const VERIFY_URL = `${import.meta.env.VITE_PAYMENTS_API_URL}/verify`;

export default function PaystackCheckout({ amountNaira, email, name, phone, metadata, onVerified }) {
  const [status, setStatus] = useState('idle'); // idle | verifying | error
  const [errorMessage, setErrorMessage] = useState('');

  const amountKobo = Math.round(amountNaira * 100);

  const config = {
    reference: `HGS_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
    email,
    amount: amountKobo,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
    phone,
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: name || '' },
      ],
      ...metadata,
    },
  };

  const initializePayment = usePaystackPayment(config);

  const verifyOnServer = async (reference) => {
    setStatus('verifying');
    setErrorMessage('');
    try {
      const res = await fetch(VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, expectedAmount: amountKobo }),
      });
      const data = await res.json();
      if (data.verified) {
        onVerified({ reference: data.reference });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Payment could not be verified. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the verification server. Please try again.');
    }
  };

  const handlePay = () => {
    initializePayment({
      onSuccess: (response) => verifyOnServer(response.reference),
      onClose: () => setStatus('idle'),
    });
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="rounded-2xl bg-white shadow-soft p-8">
        <ShieldCheck className="h-10 w-10 text-emerald-700 mx-auto" />
        <p className="mt-4 text-stone-500 text-sm">
          You&rsquo;ll be securely taken to Paystack to complete this payment.
        </p>
        {status === 'error' && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
        <Button
          className="w-full mt-6"
          variant="gold"
          loading={status === 'verifying'}
          disabled={!email || status === 'verifying'}
          onClick={handlePay}
        >
          Pay {formatCurrency(amountNaira)} with Paystack
        </Button>
        <p className="text-xs text-stone-400 mt-4">Powered by Paystack. Your card details are never seen by Hogis Group.</p>
      </div>
    </div>
  );
}
