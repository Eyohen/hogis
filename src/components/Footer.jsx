import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { HOTELS } from '../data/hotels';
import { IMAGES } from '../data/images';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-cream-100">
      <div className="container-page py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={IMAGES.logo} alt="Hogis Group" className="h-14 w-auto" />
          <p className="mt-4 text-sm text-cream-100/60 leading-relaxed">
            Three hotels, one standard of hospitality — plus the city&rsquo;s favorite cinema, at Hogis Royale and Apartments.
          </p>
          <div className="mt-6 flex gap-4">
            <Instagram className="h-5 w-5 text-cream-100/60 hover:text-gold-400 cursor-pointer transition-colors" />
            <Facebook className="h-5 w-5 text-cream-100/60 hover:text-gold-400 cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 text-cream-100/60 hover:text-gold-400 cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-gold-400 mb-4">Our Hotels</p>
          <ul className="space-y-3 text-sm text-cream-100/70">
            {HOTELS.map((h) => (
              <li key={h.slug}>
                <Link to={`/hotels/${h.slug}`} className="hover:text-cream-50 transition-colors">
                  {h.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-gold-400 mb-4">Explore</p>
          <ul className="space-y-3 text-sm text-cream-100/70">
            <li><Link to="/cinema" className="hover:text-cream-50 transition-colors">Cinema</Link></li>
            <li><Link to="/careers" className="hover:text-cream-50 transition-colors">Careers</Link></li>
            <li><Link to="/team" className="hover:text-cream-50 transition-colors">Team</Link></li>
            <li><Link to="/about" className="hover:text-cream-50 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-cream-50 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-gold-400 mb-4">Get in touch</p>
          <ul className="space-y-3 text-sm text-cream-100/70">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Calabar, Cross River State, Nigeria</li>
            {HOTELS.map((h) => (
              <li key={h.slug} className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" /> {h.name}: {h.phone}
              </li>
            ))}
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> hello@hogisgroup.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream-100/10">
        <div className="container-page py-6 text-xs text-cream-100/40 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Hogis Group. All rights reserved.</p>
          <p>Payments are processed securely by Paystack.</p>
        </div>
      </div>
    </footer>
  );
}
