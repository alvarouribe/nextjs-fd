// Server component page (fully rendered in the server) - Option A
import { fetchUser } from '@/lib/api/user';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await fetchUser(id);

  return (
    <main data-test="home-page" className="mt-40 container mx-auto min-h-80">
      <h1 className="mb-6 text-2xl font-bold">BUILT IN THE SERVER</h1>
      <h2 className="text-gray-500 text-xl font-bold">{user.fullName} ({user.id})</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.fullAddress}</p>
    </main>
  );
}
