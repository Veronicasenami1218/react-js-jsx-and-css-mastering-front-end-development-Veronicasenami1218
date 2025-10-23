const BASE_URL = 'https://jsonplaceholder.typicode.com';
  
  export async function getPosts() {
    const res = await fetch(`${BASE_URL}/posts?_limit=5`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  }
  
// Fetch posts with pagination and optional search
export async function fetchPosts({ page = 1, limit = 10, q = '' } = {}) {
  const params = new URLSearchParams();
  params.set('_page', String(page));
  params.set('_limit', String(limit));
  if (q) params.set('q', q);
  const url = `${BASE_URL}/posts?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch posts');
  const total = Number(res.headers.get('x-total-count') || '100'); // JSONPlaceholder has 100 posts
  const data = await res.json();
  return { data, total };
}
