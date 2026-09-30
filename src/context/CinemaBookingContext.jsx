import { createContext, useContext, useReducer } from 'react';

const CinemaBookingContext = createContext(null);

const initialState = (movie, initialDate, initialShowtime) => ({
  movie,
  step: initialDate && initialShowtime ? 1 : 0,
  date: initialDate || new Date(),
  showtime: initialShowtime || null,
  selectedSeats: [],
  refreshments: {},
  guest: { name: '', email: '', phone: '' },
  reference: null,
});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, date: action.payload, showtime: null, selectedSeats: [] };
    case 'SET_SHOWTIME':
      return { ...state, showtime: action.payload, selectedSeats: [] };
    case 'TOGGLE_SEAT': {
      const has = state.selectedSeats.includes(action.payload);
      return {
        ...state,
        selectedSeats: has
          ? state.selectedSeats.filter((s) => s !== action.payload)
          : [...state.selectedSeats, action.payload],
      };
    }
    case 'SET_REFRESHMENT_QTY': {
      const next = { ...state.refreshments };
      if (action.qty > 0) next[action.itemId] = action.qty;
      else delete next[action.itemId];
      return { ...state, refreshments: next };
    }
    case 'SET_GUEST_FIELD':
      return { ...state, guest: { ...state.guest, [action.field]: action.value } };
    case 'GO_NEXT':
      return { ...state, step: state.step + 1 };
    case 'GO_BACK':
      return { ...state, step: Math.max(0, state.step - 1) };
    case 'SUBMIT_SUCCESS':
      return { ...state, reference: action.payload.reference, step: state.step + 1 };
    default:
      return state;
  }
}

export function CinemaBookingProvider({ movie, initialDate, initialShowtime, children }) {
  const [state, dispatch] = useReducer(reducer, initialState(movie, initialDate, initialShowtime));
  return <CinemaBookingContext.Provider value={{ state, dispatch }}>{children}</CinemaBookingContext.Provider>;
}

export function useCinemaBooking() {
  const ctx = useContext(CinemaBookingContext);
  if (!ctx) throw new Error('useCinemaBooking must be used within CinemaBookingProvider');
  return ctx;
}
