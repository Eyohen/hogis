import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { MOVIES } from '../data/movies';
import { IMAGES } from '../data/images';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import MoviePoster from '../components/MoviePoster';

export default function Cinema() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[340px] flex items-end">
        <img src={IMAGES.cinemaHall} alt="Hogis Cinema" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/40 to-transparent" />
        <div className="container-page relative z-10 pb-14 text-cream-50">
          <Badge variant="gold" className="mb-4">Hogis Royale</Badge>
          <h1 className="font-display text-4xl sm:text-5xl">Hogis Cinema</h1>
          <p className="mt-3 text-cream-100/70 max-w-md">Now showing at Hogis Royale — pick a film to see today&rsquo;s times.</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MOVIES.map((movie, i) => (
            <motion.div key={movie.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={`/cinema/movie/${movie.id}`}>
                <Card className="h-full">
                  <MoviePoster movie={movie} className="h-64" />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg text-emerald-900">{movie.title}</h3>
                      <span className="text-xs text-stone-400 border border-stone-200 rounded px-1.5 py-0.5">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-stone-500 mt-2">
                      <span>{movie.genre}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {movie.duration} min</span>
                    </div>
                    <p className="text-sm text-stone-500 mt-3 line-clamp-2">{movie.synopsis}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
