import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-emerald-900 text-cream-50 hover:bg-emerald-800',
  solid: 'bg-emerald-900 text-cream-50',
  gold: 'bg-gold-500 text-charcoal-950 hover:bg-gold-400',
  outline: 'border border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-cream-50',
  outlineLight: 'border border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-charcoal-950',
  ghost: 'text-emerald-900 hover:bg-emerald-900/5',
  goldOutline: 'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-charcoal-950',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const Comp = as;
  return (
    <Comp
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide',
        'transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Comp>
  );
}
