import * as Icons from 'lucide-react';

export default function MoviePoster({ movie, className = '' }) {
  const Icon = Icons[movie.poster.icon] || Icons.Clapperboard;
  return (
    <div
      className={[
        'relative flex items-center justify-center bg-gradient-to-br',
        movie.poster.from,
        movie.poster.to,
        className,
      ].join(' ')}
    >
      <Icon className="h-10 w-10 text-white/90" strokeWidth={1.5} />
      <span className="absolute bottom-3 left-3 right-3 text-center text-white/95 font-display text-sm leading-tight">
        {movie.title}
      </span>
    </div>
  );
}
