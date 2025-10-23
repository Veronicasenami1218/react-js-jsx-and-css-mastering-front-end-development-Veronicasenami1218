import Button from '../components/Button';
import Card from '../components/Card';
import { useFetch } from '../hooks/useFetch';

export default function Home() {
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="text-slate-700">This app demonstrates component architecture, Tailwind styling, and routing.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <Card title="Card Title" footer={<div>Footer content</div>}>
          This is a card body. You can put any content here.
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API Data (useFetch)</h2>
        <Card title="Recent Posts">
          {loading && <div className="text-slate-500">Loading...</div>}
          {error && (
            <div className="text-red-600">Error: {error.message}</div>
          )}
          {!loading && !error && posts && (
            <ul className="list-disc pl-5 space-y-2">
              {posts.map((p) => (
                <li key={p.id} className="text-slate-800">
                  <span className="font-medium">{p.title}</span>
                  <p className="text-slate-600 text-sm">{p.body}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}
