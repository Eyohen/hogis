import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AMENITIES_CAROUSEL } from '../data/amenitiesCarousel';

export default function AmenitiesCarousel() {
  const [index, setIndex] = useState(0);
  const slide = AMENITIES_CAROUSEL[index];
  const Icon = Icons[slide.icon] || Icons.Sparkles;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % AMENITIES_CAROUSEL.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const go = (delta) => setIndex((i) => (i + delta + AMENITIES_CAROUSEL.length) % AMENITIES_CAROUSEL.length);

  return (
    <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lift">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
        <div className="flex items-center gap-3 text-cream-50">
          <div className="h-10 w-10 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl">{slide.name}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous amenity"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-charcoal-950/40 hover:bg-charcoal-950/60 text-cream-50 flex items-center justify-center z-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next amenity"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-charcoal-950/40 hover:bg-charcoal-950/60 text-cream-50 flex items-center justify-center z-10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute top-6 right-6 flex gap-1.5 z-10">
        {AMENITIES_CAROUSEL.map((a, i) => (
          <span
            key={a.name}
            className={['h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-gold-400' : 'w-1.5 bg-cream-50/50'].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
