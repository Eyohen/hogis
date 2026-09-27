import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-6xl text-emerald-900">404</p>
      <p className="mt-4 text-stone-500">This page doesn&rsquo;t exist.</p>
      <Button as={Link} to="/" className="mt-8">Back to Home</Button>
    </div>
  );
}
