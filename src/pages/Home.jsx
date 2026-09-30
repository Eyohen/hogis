import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clapperboard, BedDouble, Sparkles, ArrowRight } from 'lucide-react';
import { HOTELS } from '../data/hotels';
import { IMAGES } from '../data/images';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[560px] flex items-end">
        <img
          src={IMAGES.heroExteriorNight}
          alt="Hogis Group at night"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-charcoal-950/40" />
        <div className="container-page relative z-10 pb-24 sm:pb-28 text-cream-50">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="dark" className="mb-6">Three hotels &middot; one cinema &middot; one standard</Badge>
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl">
              Hospitality, entertainment, and everything in between.
            </h1>
            <p className="mt-6 max-w-lg text-cream-100/80 text-lg">
              Book a room across any of our three hotels, or reserve your seat at Hogis Cinema — all in a few clicks.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button as={Link} to="/hotels" variant="gold" size="lg">
                Book a Room <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as={Link} to="/cinema" variant="solid" size="lg">
                Book Cinema Tickets <Clapperboard className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-page py-20 sm:py-28">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <Badge className="mb-4">The Hogis Group</Badge>
          <h2 className="font-display text-3xl sm:text-4xl text-emerald-900">Three properties, each with its own personality</h2>
          <p className="mt-4 text-stone-500">
            From quiet, pool-side luxury to the city&rsquo;s liveliest nights out — find the Hogis experience that fits the occasion.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HOTELS.map((hotel, i) => (
            <motion.div key={hotel.slug} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Card className="h-full flex flex-col">
                <div className="relative h-56">
                  <img src={hotel.heroImage} alt={hotel.name} className="h-full w-full object-cover" />
                  {hotel.slug === 'hogis-royale' && (
                    <Badge variant="gold" className="absolute top-4 left-4">
                      <Clapperboard className="h-3 w-3" /> Cinema here
                    </Badge>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-emerald-900">{hotel.name}</h3>
                  <p className="text-sm text-stone-500 mt-1">{hotel.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((a) => (
                      <span key={a.name} className="text-xs text-stone-500 bg-cream-100 rounded-full px-3 py-1">
                        {a.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/hotels/${hotel.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-emerald-900 font-medium text-sm hover:gap-2.5 transition-all"
                  >
                    View hotel <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cinema teaser */}
      <section className="relative py-24 sm:py-32 bg-charcoal-950 text-cream-50 overflow-hidden">
        <img src={IMAGES.cinemaHall} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="container-page relative z-10 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div {...fadeUp}>
            <Badge variant="gold" className="mb-4"><Clapperboard className="h-3 w-3" /> Only at Hogis Royale</Badge>
            <h2 className="font-display text-3xl sm:text-4xl">Hogis Cinema</h2>
            <p className="mt-4 text-cream-100/70 max-w-md">
              Catch the latest releases in comfort, right inside Hogis Royale. Pick your movie, choose your seats, and settle in.
            </p>
            <Button as={Link} to="/cinema" variant="gold" size="lg" className="mt-8">
              See What&rsquo;s Showing <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div {...fadeUp} className="flex justify-end">
            <div className="grid grid-cols-3 gap-3 max-w-xs">
              {['Flame', 'Waves', 'Radio'].map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-xl bg-gradient-to-br from-emerald-800 to-charcoal-800 flex items-center justify-center">
                  <Clapperboard className="h-8 w-8 text-gold-400/70" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Hogis */}
      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            { icon: BedDouble, title: 'Rooms for every stay', body: 'From Standard to Executive Suite, across three distinct properties.' },
            { icon: Clapperboard, title: 'Entertainment built in', body: 'A full cinema, club, and games arcade — all at Hogis Royale.' },
            { icon: Sparkles, title: 'One booking experience', body: 'Reserve a room or a movie seat in minutes, with instant confirmation.' },
          ].map(({ icon: Icon, title, body }, i) => (
            <motion.div key={title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/10 text-emerald-900 mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg text-emerald-900">{title}</h3>
              <p className="text-sm text-stone-500 mt-2">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
