const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts?_limit=5`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
