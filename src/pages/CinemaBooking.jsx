import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import * as Icons from 'lucide-react';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { getMovieById, TICKET_PRICE } from '../data/movies';
import { getShowtimesForMovie, getTakenSeats, dateKey } from '../data/showtimes';
import { REFRESHMENTS, REFRESHMENT_PRICE } from '../data/refreshments';
import { formatCurrency } from '../lib/format';
import { CinemaBookingProvider, useCinemaBooking } from '../context/CinemaBookingContext';
import StepIndicator from '../components/ui/StepIndicator';
import DateStrip from '../components/booking/DateStrip';
import SeatMap from '../components/booking/SeatMap';
import MockPaymentCard from '../components/booking/MockPaymentCard';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import MoviePoster from '../components/MoviePoster';
import Button from '../components/ui/Button';

const STEPS = ['Showtime', 'Seats', 'Refreshments', 'Guest details', 'Payment', 'Confirmation'];

const refreshmentsCount = (refreshments) => Object.values(refreshments).reduce((sum, qty) => sum + qty, 0);
const refreshmentsTotal = (refreshments) => refreshmentsCount(refreshments) * REFRESHMENT_PRICE;
const cinemaTotal = (state) => state.selectedSeats.length * TICKET_PRICE + refreshmentsTotal(state.refreshments);

function ShowtimeStep({ movie }) {
  const { state, dispatch } = useCinemaBooking();
  const showtimes = getShowtimesForMovie(movie.id);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl text-emerald-900 mb-6 text-center">Pick a date &amp; showtime</h2>
      <DateStrip selectedDate={state.date} onSelect={(d) => dispatch({ type: 'SET_DATE', payload: d })} />
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {showtimes.map((s) => (
          <button
            key={s.time}
            onClick={() => dispatch({ type: 'SET_SHOWTIME', payload: s.time })}
            className={[
              'rounded-xl px-5 py-3 text-sm border transition-colors',
              state.showtime === s.time
                ? 'bg-emerald-900 text-cream-50 border-emerald-900'
                : 'border-stone-200 hover:bg-cream-100',
            ].join(' ')}
          >
            <span className="font-medium">{s.time}</span>
            <span className="block text-xs opacity-70">{s.label} &middot; {s.screen}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Button disabled={!state.showtime} onClick={() => dispatch({ type: 'GO_NEXT' })}>
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SeatsStep({ movie }) {
  const { state, dispatch } = useCinemaBooking();
  const taken = getTakenSeats(movie.id, dateKey(state.date), state.showtime);
  const total = state.selectedSeats.length * TICKET_PRICE;

  return (
    <div>
      <h2 className="font-display text-2xl text-emerald-900 mb-2 text-center">Choose your seats</h2>
      <p className="text-center text-sm text-stone-500 mb-8">
        {movie.title} &middot; {format(state.date, 'EEE, d MMM')} &middot; {state.showtime}
      </p>
      <SeatMap
        takenSeats={taken}
        selectedSeats={state.selectedSeats}
        onToggle={(seat) => dispatch({ type: 'TOGGLE_SEAT', payload: seat })}
      />
      <div className="max-w-md mx-auto mt-8 flex items-center justify-between rounded-2xl bg-white shadow-soft p-5">
        <div>
          <p className="text-sm text-stone-500">{state.selectedSeats.length} seat{state.selectedSeats.length !== 1 ? 's' : ''} selected</p>
          <p className="text-xs text-stone-400">{state.selectedSeats.sort().join(', ') || 'None yet'}</p>
        </div>
        <p className="font-display text-xl text-emerald-900">{formatCurrency(total)}</p>
      </div>
      <div className="flex justify-between max-w-md mx-auto mt-6">
        <Button variant="ghost" onClick={() => dispatch({ type: 'GO_BACK' })}><ArrowLeft className="h-4 w-4" /> Back</Button>
        <Button disabled={state.selectedSeats.length === 0} onClick={() => dispatch({ type: 'GO_NEXT' })}>
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function RefreshmentsStep() {
  const { state, dispatch } = useCinemaBooking();
  const setQty = (itemId, qty) => dispatch({ type: 'SET_REFRESHMENT_QTY', itemId, qty: Math.max(0, Math.min(20, qty)) });

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-display text-2xl text-emerald-900 mb-2 text-center">Add refreshments?</h2>
      <p className="text-center text-sm text-stone-500 mb-8">Completely optional — {formatCurrency(REFRESHMENT_PRICE)} each.</p>

      <div className="space-y-3">
        {REFRESHMENTS.map((item) => {
          const Icon = Icons[item.icon] || Icons.Popcorn;
          const qty = state.refreshments[item.id] || 0;
          return (
            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white shadow-soft px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-900/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-emerald-900" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-700">{item.name}</p>
                  <p className="text-xs text-stone-400">{formatCurrency(REFRESHMENT_PRICE)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty(item.id, qty - 1)}
                  disabled={qty <= 0}
                  className="h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-cream-100 disabled:opacity-30"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-5 text-center font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(item.id, qty + 1)}
                  className="h-8 w-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-cream-100"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-cream-100 px-5 py-4">
        <span className="text-sm text-stone-600">Refreshments subtotal</span>
        <span className="font-display text-lg text-emerald-900">{formatCurrency(refreshmentsTotal(state.refreshments))}</span>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => dispatch({ type: 'GO_BACK' })}><ArrowLeft className="h-4 w-4" /> Back</Button>
        <Button onClick={() => dispatch({ type: 'GO_NEXT' })}>
          {refreshmentsCount(state.refreshments) > 0 ? 'Continue' : 'Skip'} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function GuestDetailsStep() {
  const { state, dispatch } = useCinemaBooking();
  const { guest } = state;
  const set = (field) => (e) => dispatch({ type: 'SET_GUEST_FIELD', field, value: e.target.value });
  const canContinue = guest.name.trim() && guest.email.trim() && guest.phone.trim();

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-display text-2xl text-emerald-900 mb-6">Your details</h2>
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
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => dispatch({ type: 'GO_BACK' })}><ArrowLeft className="h-4 w-4" /> Back</Button>
        <Button disabled={!canContinue} onClick={() => dispatch({ type: 'GO_NEXT' })}>Continue <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function PaymentStep() {
  const { state, dispatch } = useCinemaBooking();
  const total = cinemaTotal(state);
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

function ConfirmationStep({ movie }) {
  const { state } = useCinemaBooking();
  const total = cinemaTotal(state);
  const refreshmentRows = REFRESHMENTS
    .filter((item) => state.refreshments[item.id] > 0)
    .map((item) => `${item.name} x${state.refreshments[item.id]}`);

  return (
    <BookingConfirmation
      reference={state.reference}
      title={movie.title}
      subtitle="Your tickets are booked — enjoy the show."
      rows={[
        ['Date', format(state.date, 'EEE, d MMM yyyy')],
        ['Showtime', state.showtime],
        ['Seats', state.selectedSeats.sort().join(', ')],
        ['Tickets', `${state.selectedSeats.length}`],
        ...(refreshmentRows.length ? [['Refreshments', refreshmentRows.join(', ')]] : []),
        ['Guest name', state.guest.name],
      ]}
      total={formatCurrency(total)}
    />
  );
}

function Wizard({ movie }) {
  const { state } = useCinemaBooking();

  return (
    <div className="pt-32 pb-24 container-page">
      <div className="mb-12 flex flex-col items-center gap-6">
        <MoviePoster movie={movie} showTitle={false} className="h-20 w-14 rounded-lg" />
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
          {state.step === 0 && <ShowtimeStep movie={movie} />}
          {state.step === 1 && <SeatsStep movie={movie} />}
          {state.step === 2 && <RefreshmentsStep />}
          {state.step === 3 && <GuestDetailsStep />}
          {state.step === 4 && <PaymentStep />}
          {state.step === 5 && <ConfirmationStep movie={movie} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function CinemaBooking() {
  const [searchParams] = useSearchParams();
  const movie = getMovieById(searchParams.get('movie'));
  const dateParam = searchParams.get('date');
  const timeParam = searchParams.get('time');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movie) return <Navigate to="/cinema" replace />;

  const initialDate = dateParam ? new Date(`${dateParam}T00:00:00`) : null;
  const initialShowtime = timeParam ? decodeURIComponent(timeParam) : null;

  return (
    <CinemaBookingProvider
      key={`${movie.id}-${dateParam || ''}-${timeParam || ''}`}
      movie={movie}
      initialDate={initialDate}
      initialShowtime={initialShowtime}
    >
      <Wizard movie={movie} />
    </CinemaBookingProvider>
  );
}
