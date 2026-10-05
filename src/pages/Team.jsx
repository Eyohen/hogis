import { motion } from 'framer-motion';
import { TEAM, initials } from '../data/team';
import Badge from '../components/ui/Badge';

function TeamCard({ person, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      className="rounded-2xl bg-white shadow-soft p-6 text-center"
    >
      {person.photo ? (
        <img
          src={person.photo}
          alt={person.name}
          className="h-20 w-20 rounded-full object-cover mx-auto"
        />
      ) : (
        <div className="h-20 w-20 rounded-full bg-emerald-900 text-cream-50 font-display text-2xl flex items-center justify-center mx-auto">
          {initials(person.name)}
        </div>
      )}
      <h3 className="font-display text-lg text-emerald-900 mt-4">{person.name}</h3>
      <p className="text-sm text-gold-600 font-medium mt-1">{person.role}</p>
      {person.credentials && <p className="text-xs text-stone-400 mt-2">{person.credentials}</p>}
    </motion.div>
  );
}

export default function Team() {
  const leadership = TEAM.filter((p) => p.tier === 'Leadership');
  const management = TEAM.filter((p) => p.tier === 'Management');

  return (
    <div className="pt-32 pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <Badge className="mb-4">Our Team</Badge>
          <h1 className="font-display text-4xl sm:text-5xl text-emerald-900">Leadership & Management</h1>
          <p className="mt-4 text-stone-500 text-lg">The people behind the Hogis Group.</p>
        </div>

        <h2 className="font-display text-xl text-emerald-900 mt-14 mb-6">Leadership</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {leadership.map((p, i) => (
            <TeamCard key={p.name} person={p} i={i} />
          ))}
        </div>

        <h2 className="font-display text-xl text-emerald-900 mt-14 mb-6">Management</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {management.map((p, i) => (
            <TeamCard key={p.name} person={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
