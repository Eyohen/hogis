import * as Icons from 'lucide-react';

export default function MoviePoster({ movie, className = '', showTitle = true }) {
  const Icon = Icons[movie.poster.icon] || Icons.Clapperboard;
  return (
    <div className={['relative overflow-hidden', className].join(' ')}>
      <img
        src={movie.poster.image}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/10 to-transparent" />
      <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center">
        <Icon className="h-4 w-4 text-gold-400" />
      </div>
      {showTitle && (
        <span className="absolute bottom-3 left-3 right-3 text-white font-display text-sm leading-tight">
          {movie.title}
        </span>
      )}
    </div>
  );
}
