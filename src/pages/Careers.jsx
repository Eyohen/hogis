import { motion } from 'framer-motion';
import { Briefcase, MapPin, Mail } from 'lucide-react';
import { VACANCIES } from '../data/careers';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export default function Careers() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <Badge className="mb-4">Careers</Badge>
          <h1 className="font-display text-4xl sm:text-5xl text-emerald-900">Join the Hogis Group</h1>
          <p className="mt-4 text-stone-500 text-lg">Current openings across our hotels.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {VACANCIES.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card hover={false} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-emerald-900">{job.title}</h3>
                    <p className="text-sm text-stone-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {job.hotel}
                    </p>
                  </div>
                  <Badge variant="emerald" className="shrink-0">
                    <Briefcase className="h-3 w-3" /> {job.type}
                  </Badge>
                </div>
                <p className="text-sm text-stone-500 mt-4">{job.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-cream-100 p-8 text-center">
          <p className="text-stone-600">
            Don&rsquo;t see a role that fits? Send your CV to{' '}
            <a href="mailto:careers@hogisgroup.com" className="text-emerald-900 font-medium inline-flex items-center gap-1.5 underline">
              <Mail className="h-3.5 w-3.5" /> careers@hogisgroup.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
