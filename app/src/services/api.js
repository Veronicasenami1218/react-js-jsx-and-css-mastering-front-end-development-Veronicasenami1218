const BASE_URL = 'https://jsonplaceholder.typicode.com';
  
  export async function getPosts() {
    const res = await fetch(`${BASE_URL}/posts?_limit=5`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  }
  
// Fetch posts with pagination and optional search
export async function fetchPosts({ page = 1, limit = 10, q = '' } = {}) {
  // Helper to support timeouts
  async function fetchWithTimeout(resource, options = {}, timeout = 8000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(resource, { ...options, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  // Try JSONPlaceholder first
  try {
    const params = new URLSearchParams();
    params.set('_page', String(page));
    params.set('_limit', String(limit));
    if (q) params.set('q', q);
    const url = `${BASE_URL}/posts?${params.toString()}`;
    const res = await fetchWithTimeout(url, undefined, 8000);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const total = Number(res.headers.get('x-total-count') || '100');
    const data = await res.json();
    return { data, total, source: 'jsonplaceholder' };
  } catch (e) {
    // Fallback to DummyJSON when blocked/timeouts
    const skip = (page - 1) * limit;
    const base = 'https://dummyjson.com';
    const url = q
      ? `${base}/posts/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
      : `${base}/posts?limit=${limit}&skip=${skip}`;
    const res = await fetchWithTimeout(url, undefined, 8000);
    if (!res.ok) throw new Error('Failed to fetch posts (fallback)');
    const json = await res.json();
    const data = json.posts || json; // dummyjson returns { posts, total }
    const total = Number(json.total ?? (Array.isArray(data) ? data.length : 0));
    return { data, total, source: 'dummyjson' };
  }
}
