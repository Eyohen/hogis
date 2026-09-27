import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clapperboard } from 'lucide-react';
import { HOTELS } from '../data/hotels';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Hotels() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <Badge className="mb-4">Our Hotels</Badge>
          <h1 className="font-display text-4xl sm:text-5xl text-emerald-900">Three hotels, one standard of hospitality</h1>
          <p className="mt-4 text-stone-500 text-lg">
            Pick the property that matches your trip — then choose a room and dates.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {HOTELS.map((hotel, i) => (
            <motion.div
              key={hotel.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative h-64">
                  <img src={hotel.heroImage} alt={hotel.name} className="h-full w-full object-cover" />
                  {hotel.slug === 'hogis-royale' && (
                    <Badge variant="gold" className="absolute top-4 left-4">
                      <Clapperboard className="h-3 w-3" /> Cinema here
                    </Badge>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-2xl text-emerald-900">{hotel.name}</h2>
                  <p className="text-sm text-stone-500 mt-1">{hotel.tagline}</p>
                  <p className="text-sm text-stone-500 mt-4 flex-1">{hotel.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hotel.amenities.map((a) => (
                      <span key={a.name} className="text-xs text-stone-500 bg-cream-100 rounded-full px-3 py-1">
                        {a.name}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-stone-500">
                    From <span className="font-semibold text-emerald-900">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(
                        Math.min(...hotel.rooms.map((r) => r.pricePerNight))
                      )}
                    </span> / night
                  </p>
                  <Link
                    to={`/hotels/${hotel.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-emerald-900 font-medium text-sm hover:gap-2.5 transition-all"
                  >
                    View rooms &amp; amenities <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
