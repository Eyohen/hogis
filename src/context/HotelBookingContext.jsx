import { createContext, useContext, useReducer } from 'react';

const HotelBookingContext = createContext(null);

const initialState = (hotel, room) => ({
  hotel,
  room,
  step: 0,
  dateRange: { start: null, end: null },
  occupancy: { adults: 2, children: 0, rooms: 1 },
  guest: { name: '', email: '', phone: '', requests: '' },
  reference: null,
});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'SET_OCCUPANCY':
      return { ...state, occupancy: { ...state.occupancy, ...action.payload } };
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

export function HotelBookingProvider({ hotel, room, children }) {
  const [state, dispatch] = useReducer(reducer, initialState(hotel, room));
  return <HotelBookingContext.Provider value={{ state, dispatch }}>{children}</HotelBookingContext.Provider>;
}

export function useHotelBooking() {
  const ctx = useContext(HotelBookingContext);
  if (!ctx) throw new Error('useHotelBooking must be used within HotelBookingProvider');
  return ctx;
}
