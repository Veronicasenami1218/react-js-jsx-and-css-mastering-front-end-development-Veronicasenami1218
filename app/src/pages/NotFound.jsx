import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-slate-600 mb-6">Page not found</p>
      <Link to="/" className="text-blue-600 hover:underline">Go home</Link>
    </div>
  );
}
