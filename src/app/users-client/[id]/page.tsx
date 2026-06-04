// Server component page - Option B calling a client component
import { ClientUser } from '@/components/ClientUser';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="mt-40 container mx-auto min-h-80">
      <ClientUser id={id} />
    </main>
  );
}