'use client';

export default function PhotographyErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-950 px-6 pb-20 pt-32 text-white lg:px-8">
      <section className="mx-auto max-w-3xl rounded-xl border border-rose-700/60 bg-rose-950/30 p-8">
        <h1 className="text-2xl font-semibold">Unable to load photography gallery</h1>
        <p className="mt-3 text-sm text-rose-100/90">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-rose-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          type="button"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
