'use client';

import { useEffect, useState } from 'react';
import { fetchUser } from '@/lib/api/user';
import { User } from '@/lib/types/user';

export function ClientUser({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(id)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <main className="mt-40 container mx-auto min-h-80">
      <h1 className="mb-6 text-2xl font-bold">BUILT IN THE CLIENT</h1>

      <h2 className="text-2xl font-bold">{user.fullName} ({user.id})</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.fullAddress}</p>
    </main>
  );
}