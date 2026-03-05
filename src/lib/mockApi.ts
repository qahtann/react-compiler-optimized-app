import type { User, Post } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUsers(): Promise<User[]> {
  await delay(300);
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(300);
  const response = await fetch(`${API_BASE}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export async function fetchUserPosts(userId: number): Promise<Post[]> {
  await delay(200);
  const response = await fetch(`${API_BASE}/posts?userId=${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user posts');
  return response.json();
}

// Generate large dataset for performance testing
export function generateLargeDataset<T>(generator: (index: number) => T, count: number): T[] {
  return Array.from({ length: count }, (_, i) => generator(i));
}

export function generateMockUsers(count: number): User[] {
  return generateLargeDataset((index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    username: `user${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `555-${String(index + 1).padStart(4, '0')}`,
    website: `user${index + 1}.com`,
    address: {
      street: `${index + 1} Main St`,
      suite: `Suite ${index + 1}`,
      city: 'City',
      zipcode: `${String(index + 1).padStart(5, '0')}`,
      geo: {
        lat: `${40 + index * 0.01}`,
        lng: `${-74 + index * 0.01}`,
      },
    },
    company: {
      name: `Company ${index + 1}`,
      catchPhrase: `Catch phrase ${index + 1}`,
      bs: `BS ${index + 1}`,
    },
  }), count);
}
