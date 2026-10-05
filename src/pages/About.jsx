import { motion } from 'framer-motion';
import { HOTELS } from '../data/hotels';
import { IMAGES } from '../data/images';
import Badge from '../components/ui/Badge';

export default function About() {
  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] flex items-end">
        <img src={IMAGES.exterior} alt="Hogis Group" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent" />
        <div className="container-page relative z-10 pb-14 text-cream-50">
          <Badge variant="dark" className="mb-4">About Us</Badge>
          <h1 className="font-display text-4xl sm:text-5xl">The Hogis Group</h1>
        </div>
      </section>

      <section className="container-page py-16">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-lg text-stone-600 leading-relaxed">
          Hogis Group brings together three distinct hotels under one standard of hospitality — and, at Hogis Royale
          and Apartments, the city&rsquo;s favorite cinema, club, and games arcade. Whether you&rsquo;re booking a quiet weekend
          or a night out, we&rsquo;ve built a Hogis experience for it.
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {HOTELS.map((h, i) => (
            <motion.div key={h.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow-soft">
              <img src={h.heroImage} alt={h.name} className="h-40 w-full object-cover" />
              <div className="p-5 bg-white">
                <h3 className="font-display text-lg text-emerald-900">{h.name}</h3>
                <p className="text-sm text-stone-500 mt-1">{h.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
