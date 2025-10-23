import { useEffect, useMemo, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchPosts } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

export default function Posts() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const { data, total } = await fetchPosts({ page, limit, q: debounced });
        if (!active) return;
        setData(data);
        setTotal(total);
      } catch (e) {
        if (!active) return;
        setError(e);
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [page, limit, debounced]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => { setPage(1); setQuery(e.target.value); }}
            placeholder="Search titles and bodies..."
            className="w-72 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
          />
        </div>
      </div>

      <Card title={loading ? 'Loading…' : error ? 'Error' : 'Results'} footer={
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-300">Page {page} of {totalPages}</div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" disabled={page <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <Button size="sm" variant="secondary" disabled={page >= totalPages || loading} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
          </div>
        </div>
      }>
        {error && (
          <div className="text-red-600">{error.message}</div>
        )}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-md bg-slate-200/60 dark:bg-slate-800 animate-pulse" />
            ))}
            {!loading && data.map((p) => (
              <div key={p.id} className="rounded-md border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{p.body}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
