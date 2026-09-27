import { motion } from 'framer-motion';

export default function Card({ className = '', hover = true, children, ...props }) {
  return (
    <motion.div
      className={[
        'bg-white rounded-2xl overflow-hidden shadow-soft',
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  );
}
