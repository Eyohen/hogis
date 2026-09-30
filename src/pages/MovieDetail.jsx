import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { getMovieById, TICKET_PRICE } from '../data/movies';
import { getShowtimesForMovie, dateKey } from '../data/showtimes';
import { formatCurrency } from '../lib/format';
import DateStrip from '../components/booking/DateStrip';
import MoviePoster from '../components/MoviePoster';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = getMovieById(id);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!movie) return <Navigate to="/cinema" replace />;

  const showtimes = getShowtimesForMovie(movie.id);

  const pickShowtime = (time) => {
    navigate(`/cinema/book?movie=${movie.id}&date=${dateKey(selectedDate)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-[320px_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <MoviePoster movie={movie} className="h-96 rounded-2xl shadow-lift" />
        </motion.div>

        <div>
          <Badge variant="gold" className="mb-3">{movie.genre}</Badge>
          <h1 className="font-display text-4xl text-emerald-900">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm text-stone-500 mt-3">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {movie.duration} min</span>
            <span className="border border-stone-300 rounded px-1.5 py-0.5 text-xs">{movie.rating}</span>
            <span>{formatCurrency(TICKET_PRICE)} / ticket</span>
          </div>
          <p className="mt-6 text-stone-600 leading-relaxed max-w-xl">{movie.synopsis}</p>

          <h2 className="font-display text-xl text-emerald-900 mt-10 mb-4">Select a date</h2>
          <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />

          <h2 className="font-display text-xl text-emerald-900 mt-8 mb-4">Available showtimes</h2>
          <div className="flex flex-wrap gap-3">
            {showtimes.map((s) => (
              <Button key={s.time} variant="outline" onClick={() => pickShowtime(s.time)} className="gap-2">
                {s.time}
                <span className="text-xs text-stone-400">&middot; {s.label} &middot; {s.screen}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
