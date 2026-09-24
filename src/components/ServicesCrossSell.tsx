import Link from 'next/link';

const cards = [
  {
    title: 'Websites that show off your work',
    description:
      'A fast, SEO-ready website turns your best photos and video into enquiries, not just likes.',
  },
  {
    title: 'Automation that follows up your leads',
    description:
      'Booking, enquiry and follow-up automation makes sure every lead from your gallery gets a timely reply.',
  },
];

export default function ServicesCrossSell() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Photos are one part of the system
      </h2>
      <p className="mt-3 max-w-2xl text-base text-gray-300">
        FlyingDolly is one team for your website, automation, and
        photography/video — so your online presence and your operations grow
        together.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {cards.map(card => (
          <Link
            key={card.title}
            href="/#services-section"
            className="block rounded-xl border border-gray-700 bg-gray-900/70 p-6 transition hover:border-green-600 hover:bg-gray-900"
          >
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{card.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/about"
          className="text-sm font-semibold text-green-500 hover:text-green-400"
        >
          Learn about the FlyingDolly system &rarr;
        </Link>
      </div>
    </section>
  );
}
