import { useEffect } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInCalendarDays, format } from 'date-fns';
import { Minus, Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { getHotelBySlug, getRoomById, getUnavailableDates } from '../data/hotels';
import { formatCurrency } from '../lib/format';
import { HotelBookingProvider, useHotelBooking } from '../context/HotelBookingContext';
import StepIndicator from '../components/ui/StepIndicator';
import RangeCalendar from '../components/booking/RangeCalendar';
import MockPaymentCard from '../components/booking/MockPaymentCard';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import Button from '../components/ui/Button';

const STEPS = ['Dates', 'Guest details', 'Payment', 'Confirmation'];

function Stepper({ label, value, onChange, min = 0, max = 10 }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-stone-600">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-cream-100 disabled:opacity-30"
          disabled={value <= min}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-cream-100 disabled:opacity-30"
          disabled={value >= max}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function DatesStep({ hotel, room }) {
  const { state, dispatch } = useHotelBooking();
  const { dateRange, occupancy } = state;
  const nights = dateRange.start && dateRange.end ? differenceInCalendarDays(dateRange.end, dateRange.start) : 0;
  const subtotal = nights * room.pricePerNight * occupancy.rooms;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <h2 className="font-display text-2xl text-emerald-900 mb-6">Choose your dates</h2>
        <RangeCalendar
          range={dateRange}
          onChange={(r) => dispatch({ type: 'SET_DATE_RANGE', payload: r })}
          unavailableDates={getUnavailableDates(room.id)}
        />
      </div>
      <div>
        <div className="rounded-2xl bg-white shadow-soft p-6 sticky top-28">
          <div className="flex gap-3">
            <img src={room.image} alt={room.name} className="h-16 w-16 rounded-xl object-cover" />
            <div>
              <p className="font-display text-emerald-900">{room.name}</p>
              <p className="text-xs text-stone-500">{hotel.name}</p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-stone-100">
            <Stepper label="Adults" min={1} max={6} value={occupancy.adults} onChange={(v) => dispatch({ type: 'SET_OCCUPANCY', payload: { adults: v } })} />
            <Stepper label="Children" min={0} max={6} value={occupancy.children} onChange={(v) => dispatch({ type: 'SET_OCCUPANCY', payload: { children: v } })} />
            <Stepper label="Rooms" min={1} max={3} value={occupancy.rooms} onChange={(v) => dispatch({ type: 'SET_OCCUPANCY', payload: { rooms: v } })} />
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-sm">
            {dateRange.start && (
              <p className="text-stone-500">Check-in: <span className="text-stone-700 font-medium">{format(dateRange.start, 'EEE, d MMM yyyy')}</span></p>
            )}
            {dateRange.end && (
              <p className="text-stone-500 mt-1">Check-out: <span className="text-stone-700 font-medium">{format(dateRange.end, 'EEE, d MMM yyyy')}</span></p>
            )}
            {nights > 0 && <p className="text-stone-500 mt-1">{nights} night{nights > 1 ? 's' : ''} &times; {occupancy.rooms} room{occupancy.rooms > 1 ? 's' : ''}</p>}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-stone-500 text-sm">Subtotal</span>
            <span className="font-display text-xl text-emerald-900">{formatCurrency(subtotal)}</span>
          </div>

          <Button
            className="w-full mt-6"
            disabled={nights <= 0}
            onClick={() => dispatch({ type: 'GO_NEXT' })}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function GuestDetailsStep() {
  const { state, dispatch } = useHotelBooking();
  const { guest } = state;
  const set = (field) => (e) => dispatch({ type: 'SET_GUEST_FIELD', field, value: e.target.value });
  const canContinue = guest.name.trim() && guest.email.trim() && guest.phone.trim();

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-display text-2xl text-emerald-900 mb-6">Guest details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Full name</label>
          <input value={guest.name} onChange={set('name')} className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
            <input type="email" value={guest.email} onChange={set('email')} className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
            <input value={guest.phone} onChange={set('phone')} className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Special requests (optional)</label>
          <textarea rows={3} value={guest.requests} onChange={set('requests')} className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => dispatch({ type: 'GO_BACK' })}><ArrowLeft className="h-4 w-4" /> Back</Button>
        <Button disabled={!canContinue} onClick={() => dispatch({ type: 'GO_NEXT' })}>Continue <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function PaymentStep({ room }) {
  const { state, dispatch } = useHotelBooking();
  const nights = differenceInCalendarDays(state.dateRange.end, state.dateRange.start);
  const total = nights * room.pricePerNight * state.occupancy.rooms;
  const canPay = state.card.number.replace(/\s/g, '').length >= 12 && state.card.name && state.card.expiry && state.card.cvv;

  const handlePay = () => {
    dispatch({ type: 'START_SUBMIT' });
    setTimeout(() => dispatch({ type: 'SUBMIT_SUCCESS' }), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-emerald-900 mb-6 text-center">Payment</h2>
      <MockPaymentCard card={state.card} onChange={(card) => dispatch({ type: 'SET_CARD', payload: card })} />
      <div className="flex items-center justify-between mt-8">
        <Button variant="ghost" onClick={() => dispatch({ type: 'GO_BACK' })}><ArrowLeft className="h-4 w-4" /> Back</Button>
        <Button disabled={!canPay} loading={state.submitting} onClick={handlePay} variant="gold">
          Pay {formatCurrency(total)}
        </Button>
      </div>
    </div>
  );
}

function ConfirmationStep({ hotel, room }) {
  const { state } = useHotelBooking();
  const nights = differenceInCalendarDays(state.dateRange.end, state.dateRange.start);
  const total = nights * room.pricePerNight * state.occupancy.rooms;

  return (
    <BookingConfirmation
      reference={state.reference}
      title={hotel.name}
      subtitle={`Your stay at ${room.name} is booked.`}
      rows={[
        ['Room', room.name],
        ['Check-in', format(state.dateRange.start, 'EEE, d MMM yyyy')],
        ['Check-out', format(state.dateRange.end, 'EEE, d MMM yyyy')],
        ['Nights', `${nights}`],
        ['Rooms', `${state.occupancy.rooms}`],
        ['Guests', `${state.occupancy.adults} adults, ${state.occupancy.children} children`],
        ['Guest name', state.guest.name],
      ]}
      total={formatCurrency(total)}
    />
  );
}

function Wizard({ hotel, room }) {
  const { state } = useHotelBooking();

  return (
    <div className="pt-32 pb-24 container-page">
      <div className="mb-12">
        <StepIndicator steps={STEPS} currentStep={state.step} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {state.step === 0 && <DatesStep hotel={hotel} room={room} />}
          {state.step === 1 && <GuestDetailsStep />}
          {state.step === 2 && <PaymentStep room={room} />}
          {state.step === 3 && <ConfirmationStep hotel={hotel} room={room} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HotelBooking() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const hotel = getHotelBySlug(slug);
  const room = getRoomById(hotel, searchParams.get('room'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hotel || !room) return <Navigate to={`/hotels/${slug || ''}`} replace />;

  return (
    <HotelBookingProvider key={`${hotel.slug}-${room.id}`} hotel={hotel} room={room}>
      <Wizard hotel={hotel} room={room} />
    </HotelBookingProvider>
  );
}
