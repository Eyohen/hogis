import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Clapperboard } from 'lucide-react';
import { HOTELS } from '../data/hotels';

const navLinkClass = ({ isActive }, light) =>
  [
    'text-sm font-medium tracking-wide transition-colors',
    isActive
      ? light ? 'text-gold-400' : 'text-emerald-900'
      : light ? 'text-cream-100/80 hover:text-gold-400' : 'text-stone-700 hover:text-emerald-900',
  ].join(' ');

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHotelsOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const light = isHome && !scrolled;

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        light ? 'bg-transparent py-6' : 'bg-cream-50/95 backdrop-blur-sm shadow-sm py-3',
      ].join(' ')}
    >
      <nav className="container-page flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className={['font-display text-2xl font-semibold tracking-tight', light ? 'text-cream-50' : 'text-emerald-900'].join(' ')}>
            Hogis
          </span>
          <span className={['text-2xl font-display', light ? 'text-gold-400' : 'text-gold-500'].join(' ')}>Group</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setHotelsOpen(true)}
            onMouseLeave={() => setHotelsOpen(false)}
          >
            <button className={['flex items-center gap-1', navLinkClass({ isActive: location.pathname.startsWith('/hotels') }, light)].join(' ')}>
              Hotels <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {hotelsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-64"
                >
                  <div className="rounded-2xl bg-white shadow-lift p-2">
                    {HOTELS.map((h) => (
                      <Link
                        key={h.slug}
                        to={`/hotels/${h.slug}`}
                        className="block rounded-xl px-4 py-3 hover:bg-cream-100 transition-colors"
                      >
                        <p className="font-display text-emerald-900">{h.name}</p>
                        <p className="text-xs text-stone-500">{h.tagline}</p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/cinema" className={(s) => navLinkClass(s, light)}>
            <span className="flex items-center gap-1.5">
              <Clapperboard className="h-3.5 w-3.5" /> Cinema
            </span>
          </NavLink>
          <NavLink to="/careers" className={(s) => navLinkClass(s, light)}>Careers</NavLink>
          <NavLink to="/team" className={(s) => navLinkClass(s, light)}>Team</NavLink>
          <NavLink to="/about" className={(s) => navLinkClass(s, light)}>About</NavLink>
          <NavLink to="/contact" className={(s) => navLinkClass(s, light)}>Contact</NavLink>
        </div>

        <Link
          to="/hotels"
          className={[
            'hidden lg:inline-flex rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
            light ? 'bg-gold-500 text-charcoal-950 hover:bg-gold-400' : 'bg-emerald-900 text-cream-50 hover:bg-emerald-800',
          ].join(' ')}
        >
          Book Now
        </Link>

        <button
          className={['lg:hidden', light ? 'text-cream-50' : 'text-emerald-900'].join(' ')}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-cream-50 border-t border-stone-200 mt-4"
          >
            <div className="container-page py-6 flex flex-col gap-4">
              <p className="text-xs uppercase tracking-wider text-stone-500">Hotels</p>
              {HOTELS.map((h) => (
                <Link key={h.slug} to={`/hotels/${h.slug}`} className="text-emerald-900 font-display text-lg">
                  {h.name}
                </Link>
              ))}
              <div className="h-px bg-stone-200 my-2" />
              <Link to="/cinema" className="text-emerald-900 font-display text-lg">Cinema</Link>
              <Link to="/careers" className="text-emerald-900 font-display text-lg">Careers</Link>
              <Link to="/team" className="text-emerald-900 font-display text-lg">Team</Link>
              <Link to="/about" className="text-emerald-900 font-display text-lg">About</Link>
              <Link to="/contact" className="text-emerald-900 font-display text-lg">Contact</Link>
              <Link to="/hotels" className="mt-2 rounded-full bg-emerald-900 text-cream-50 text-center py-3 font-semibold">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
