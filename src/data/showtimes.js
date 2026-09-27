import { addDays, format } from 'date-fns';

export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const SEATS_PER_ROW = 10;

const SHOWTIME_SLOTS = [
  { time: '11:00 AM', label: 'Matinee', screen: 'Screen 1' },
  { time: '2:30 PM', label: 'Afternoon', screen: 'Screen 2' },
  { time: '5:45 PM', label: 'Evening', screen: 'Screen 1' },
  { time: '8:30 PM', label: 'Night', screen: 'Screen 2' },
];

// Simple deterministic string hash so mock data is stable across renders
// without needing shared/global mutable state.
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getNextDates(days = 14) {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => addDays(today, i));
}

// Every movie plays 3 of the 4 daily slots, chosen deterministically per movie.
export function getShowtimesForMovie(movieId) {
  const skipIndex = hashString(movieId) % SHOWTIME_SLOTS.length;
  return SHOWTIME_SLOTS.filter((_, i) => i !== skipIndex);
}

// Deterministic set of already-taken seats for a given movie/date/time.
export function getTakenSeats(movieId, dateKey, time) {
  const seed = hashString(`${movieId}-${dateKey}-${time}`);
  const totalSeats = SEAT_ROWS.length * SEATS_PER_ROW;
  const takenCount = 8 + (seed % 15); // between 8 and 22 taken seats
  const taken = new Set();
  let cursor = seed;
  while (taken.size < takenCount) {
    cursor = (cursor * 1103515245 + 12345) & 0x7fffffff;
    const index = cursor % totalSeats;
    const row = SEAT_ROWS[Math.floor(index / SEATS_PER_ROW)];
    const num = (index % SEATS_PER_ROW) + 1;
    taken.add(`${row}${num}`);
  }
  return taken;
}

export const dateKey = (date) => format(date, 'yyyy-MM-dd');
