import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Waves, Sofa, Sparkles, UtensilsCrossed, Clapperboard, PartyPopper, Gamepad2,
  Users, Maximize, ArrowRight,
} from 'lucide-react';
import { getHotelBySlug } from '../data/hotels';
import { formatCurrency } from '../lib/format';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const ICONS = { Waves, Sofa, Sparkles, UtensilsCrossed, Clapperboard, PartyPopper, Gamepad2 };

export default function HotelDetail() {
  const { slug } = useParams();
  const hotel = getHotelBySlug(slug);

  if (!hotel) return <Navigate to="/hotels" replace />;

  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img src={hotel.heroImage} alt={hotel.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent" />
        <div className="container-page relative z-10 pb-16 text-cream-50">
          <Badge variant="dark" className="mb-4">{hotel.tagline}</Badge>
          <h1 className="font-display text-4xl sm:text-5xl">{hotel.name}</h1>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="max-w-2xl text-stone-500 text-lg">{hotel.description}</p>

        <h2 className="font-display text-2xl text-emerald-900 mt-14 mb-6">Amenities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotel.amenities.map((a) => {
            const Icon = ICONS[a.icon] || Sparkles;
            const isCinema = a.name === 'Cinema';
            return (
              <div key={a.name} className="relative rounded-2xl overflow-hidden h-32 group">
                <img src={a.image} alt={a.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal-950/50" />
                <div className="relative z-10 h-full flex flex-col justify-between p-4">
                  <Icon className="h-5 w-5 text-gold-400" />
                  <div className="flex items-center justify-between">
                    <span className="text-cream-50 font-medium">{a.name}</span>
                    {isCinema && (
                      <Link to="/cinema" className="text-xs text-gold-400 underline">Book tickets</Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="font-display text-2xl text-emerald-900 mt-14 mb-6">Rooms</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {hotel.rooms.map((room, i) => (
            <motion.div key={room.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full flex flex-col">
                <div className="h-52">
                  <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-emerald-900">{room.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-stone-500 mt-2">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {room.capacity} guests</span>
                    <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {room.size}</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-3 flex-1">{room.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {room.perks.map((p) => (
                      <li key={p} className="text-xs text-emerald-900 bg-emerald-900/5 rounded-full px-2.5 py-1">{p}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-display text-lg text-emerald-900">
                      {formatCurrency(room.pricePerNight)}<span className="text-xs text-stone-400 font-body">/night</span>
                    </p>
                    <Button as={Link} to={`/hotels/${hotel.slug}/book?room=${room.id}`} size="sm">
                      Book Now <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
