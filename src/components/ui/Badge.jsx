
const VARIANTS = {
  gold: 'bg-gold-500/15 text-gold-600',
  emerald: 'bg-emerald-900/10 text-emerald-900',
  dark: 'bg-charcoal-950/80 text-cream-50',
  outline: 'border border-current',
};

export default function Badge({ variant = 'emerald', className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
        VARIANTS[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
