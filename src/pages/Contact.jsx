import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent — we'll be in touch shortly.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <Badge className="mb-4">Contact</Badge>
          <h1 className="font-display text-4xl text-emerald-900">Get in touch</h1>
          <p className="mt-4 text-stone-500 max-w-md">
            Questions about a stay, an event, or Hogis Cinema? Reach out and our team will get back to you.
          </p>

          <ul className="mt-10 space-y-4 text-stone-600">
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-emerald-900" /> Calabar, Nigeria</li>
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-emerald-900" /> +234 800 000 0000</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-emerald-900" /> hello@hogisgroup.com</li>
          </ul>
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
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message <Send className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
