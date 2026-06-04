import { deserializeUser } from '@/lib/serializers/user';
import { User } from '@/lib/types/user';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchUser(id: string): Promise<User> {
  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    const json = await res.json();
    console.log("Fetched user.json():", json);

    return deserializeUser(json);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw error to let the page component handle it
  }
}
