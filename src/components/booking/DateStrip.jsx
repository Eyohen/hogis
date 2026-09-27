import { format, isSameDay } from 'date-fns';
import { getNextDates } from '../../data/showtimes';

export default function DateStrip({ selectedDate, onSelect, days = 14 }) {
  const dates = getNextDates(days);

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      {dates.map((date) => {
        const active = isSameDay(date, selectedDate);
        return (
          <button
            key={date.toISOString()}
            type="button"
            onClick={() => onSelect(date)}
            className={[
              'flex flex-col items-center shrink-0 rounded-2xl px-4 py-3 min-w-[64px] transition-colors',
              active ? 'bg-emerald-900 text-cream-50' : 'bg-white text-stone-600 hover:bg-cream-100 border border-stone-200',
            ].join(' ')}
          >
            <span className="text-xs uppercase tracking-wide opacity-70">{format(date, 'EEE')}</span>
            <span className="font-display text-xl">{format(date, 'd')}</span>
            <span className="text-xs opacity-70">{format(date, 'MMM')}</span>
          </button>
        );
      })}
    </div>
  );
}
