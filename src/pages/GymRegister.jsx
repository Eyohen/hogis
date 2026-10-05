import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Dumbbell } from 'lucide-react';
import { IMAGES } from '../data/images';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function GymRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', hotel: 'Hogis Luxury Suites' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks! We'll be in touch about gym membership.");
    setForm({ name: '', email: '', phone: '', hotel: 'Hogis Luxury Suites' });
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 items-start">
        <div>
          <Badge variant="gold" className="mb-4"><Dumbbell className="h-3 w-3" /> Fitness (Gym)</Badge>
          <h1 className="font-display text-4xl text-emerald-900">Register for the gym</h1>
          <p className="mt-4 text-stone-500 max-w-md">
            Leave your details and our team will reach out with membership options and gym hours at your preferred Hogis property.
          </p>
          <img src={IMAGES.gym} alt="Hogis gym" className="mt-8 rounded-2xl shadow-soft h-56 w-full object-cover" />
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-soft p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Preferred property</label>
            <select
              value={form.hotel}
              onChange={(e) => setForm({ ...form, hotel: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option>Hogis Luxury Suites</option>
              <option>Hogis Royale and Apartments</option>
              <option>Hogis Kings Court</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Register Interest</Button>
        </motion.form>
      </div>
    </div>
  );
}
