import { Fragment } from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((label, i) => {
        const isDone = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <Fragment key={label}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                  isDone
                    ? 'bg-emerald-900 text-cream-50'
                    : isCurrent
                    ? 'bg-gold-500 text-charcoal-950'
                    : 'bg-stone-100 text-stone-500',
                ].join(' ')}
              >
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={[
                  'hidden sm:block text-xs font-medium uppercase tracking-wide',
                  isCurrent ? 'text-emerald-900' : 'text-stone-500',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={['h-px w-8 sm:w-16', isDone ? 'bg-emerald-900' : 'bg-stone-200'].join(' ')} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
