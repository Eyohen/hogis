import { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function MonthGrid({ month, range, hoverDate, setHoverDate, onPick, unavailable, today }) {
  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));
  const days = eachDayOfInterval({ start, end });

  const previewEnd =
    range.start && !range.end && hoverDate && !isBefore(hoverDate, range.start) ? hoverDate : null;

  return (
    <div className="flex-1 min-w-[280px]">
      <p className="text-center font-display text-lg text-emerald-900 mb-4">{format(month, 'MMMM yyyy')}</p>
      <div className="grid grid-cols-7 text-center text-xs text-stone-500 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {days.map((day) => {
          const inMonth = isSameMonth(day, month);
          const isPast = isBefore(day, today);
          const isUnavailable = unavailable.has(format(day, 'yyyy-MM-dd'));
          const disabled = isPast || isUnavailable || !inMonth;

          const isStart = range.start && isSameDay(day, range.start);
          const isEnd = range.end && isSameDay(day, range.end);
          const inRange =
            range.start &&
            (range.end || previewEnd) &&
            isWithinInterval(day, {
              start: range.start,
              end: range.end || previewEnd,
            });

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onMouseEnter={() => setHoverDate(day)}
              onClick={() => onPick(day)}
              className={[
                'relative h-10 mx-auto w-10 rounded-full text-sm transition-colors',
                !inMonth ? 'invisible' : '',
                disabled && inMonth ? 'text-stone-300 line-through cursor-not-allowed' : '',
                !disabled && inMonth ? 'hover:bg-gold-200/60 cursor-pointer' : '',
                (isStart || isEnd) ? 'bg-emerald-900 text-cream-50 font-semibold hover:bg-emerald-900' : '',
                inRange && !isStart && !isEnd ? 'bg-gold-200/60 text-emerald-900' : '',
              ].join(' ')}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function RangeCalendar({ range, onChange, unavailableDates = [], monthsToShow = 2 }) {
  const today = startOfDay(new Date());
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [hoverDate, setHoverDate] = useState(null);
  const unavailable = new Set(unavailableDates);

  const handlePick = (day) => {
    if (isBefore(day, today) || unavailable.has(format(day, 'yyyy-MM-dd'))) return;

    if (!range.start || (range.start && range.end)) {
      onChange({ start: day, end: null });
      return;
    }
    if (isBefore(day, range.start) || isSameDay(day, range.start)) {
      onChange({ start: day, end: null });
      return;
    }
    onChange({ start: range.start, end: day });
  };

  const months = Array.from({ length: monthsToShow }, (_, i) => addMonths(visibleMonth, i));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
          disabled={isSameMonth(visibleMonth, today)}
          className="p-2 rounded-full border border-stone-200 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4 text-emerald-900" />
        </button>
        <div className="flex gap-2 text-xs text-stone-500">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-gold-200/60 inline-block" /> In range</span>
          <span className="flex items-center gap-1 ml-3"><span className="h-2.5 w-2.5 rounded-full bg-stone-200 inline-block" /> Unavailable</span>
        </div>
        <button
          type="button"
          onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
          className="p-2 rounded-full border border-stone-200 hover:bg-cream-100"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4 text-emerald-900" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-8" onMouseLeave={() => setHoverDate(null)}>
        {months.map((m) => (
          <MonthGrid
            key={m.toISOString()}
            month={m}
            range={range}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            onPick={handlePick}
            unavailable={unavailable}
            today={today}
          />
        ))}
      </div>
    </div>
  );
}
