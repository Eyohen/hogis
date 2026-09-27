import { SEAT_ROWS, SEATS_PER_ROW } from '../../data/showtimes';

const MAX_SEATS = 8;

export default function SeatMap({ takenSeats, selectedSeats, onToggle }) {
  const atLimit = selectedSeats.length >= MAX_SEATS;

  return (
    <div>
      <div className="mb-8">
        <div className="mx-auto h-2 w-3/4 max-w-md rounded-t-full bg-gradient-to-b from-gold-400/70 to-transparent blur-[2px]" />
        <p className="text-center text-xs uppercase tracking-widest text-stone-400 mt-2">Screen</p>
      </div>

      <div className="flex flex-col gap-2 items-center">
        {SEAT_ROWS.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-4 text-xs text-stone-400">{row}</span>
            <div className="flex gap-1.5">
              {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((num) => {
                const seatId = `${row}${num}`;
                const isTaken = takenSeats.has(seatId);
                const isSelected = selectedSeats.includes(seatId);
                const disabled = isTaken || (!isSelected && atLimit);

                return (
                  <button
                    key={seatId}
                    type="button"
                    disabled={disabled}
                    onClick={() => onToggle(seatId)}
                    title={seatId}
                    className={[
                      'h-6 w-6 sm:h-7 sm:w-7 rounded-md text-[10px] transition-colors',
                      isTaken
                        ? 'bg-stone-200 text-stone-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gold-500 text-charcoal-950'
                        : disabled
                        ? 'bg-cream-100 text-stone-300 cursor-not-allowed'
                        : 'bg-emerald-900/10 text-emerald-900 hover:bg-emerald-900/20',
                    ].join(' ')}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-6 text-xs text-stone-500">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-900/10 inline-block" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-gold-500 inline-block" /> Selected</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-stone-200 inline-block" /> Taken</span>
      </div>
      <p className="text-center text-xs text-stone-400 mt-2">Up to {MAX_SEATS} seats per booking</p>
    </div>
  );
}
