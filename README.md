This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install deps and start dev

```bash
pnpm install
pnpm dev
```

### Build and serve

```bash
pnpm build
pnpm start
```

### How to run tests

```bash
pnpm test
# or
pnpm jest
```

### Environment variables

Create a .env.local (not committed) with production secrets used by the contact/email route:

- toEmail=EMAIL
- fromEmail=EMAIL
- password=ZOHO PASS

For the `/photography` gallery route, also provide:

- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
- CLOUDINARY_API_KEY=YOUR_API_KEY
- CLOUDINARY_API_SECRET=YOUR_API_SECRET
- CLOUDINARY_FOLDER=YOUR_FOLDER_NAME

### Site content (testimonials, pricing, contact details)

Business content shown on the marketing pages lives in one file:
[`src/app/utils/site-content.ts`](src/app/utils/site-content.ts). Edit the data
there — no component changes needed.

| Export           | Rendered by                                                           | When empty                           |
| ---------------- | --------------------------------------------------------------------- | ------------------------------------ |
| `testimonials`   | `Testimonials` — homepage, above the contact form                     | Section is hidden                    |
| `pricingTiers`   | `PricingSection` — homepage, after "How we work" (`#pricing-section`) | Section is hidden                    |
| `contactDetails` | `ContactDetails` — next to the contact form                           | Only `suburb` shows (it is required) |

**Testimonials** (`Testimonial`):

```ts
{
  quote: 'What the client said…',
  name: 'Client Name',
  business: 'Business, Suburb',
  imageSrc: '/images/client-photo.jpg', // optional
}
```

Put avatar photos in `public/images/`. They render at 48×48 px, so a small
square image (around 250–350 px) is plenty. Only use real quotes, and get the
client's permission first. Invented reviews are misleading under the NZ Fair
Trading Act.

**Pricing tiers** (`PricingTier`):

```ts
{
  service: 'Websites', // 'Websites' | 'Automation' | 'Photography & Video'
  startingFrom: 'NZ$1,500', // shown as "From NZ$1,500"
  description: 'What the starting price includes.',
  href: '/#contact-form-section', // optional link on the card
}
```

The section adds a note that final quotes depend on scope.

**Contact details** (`ContactDetails`): `email` and `phone` are optional, and each
one becomes a `mailto:` / `tel:` link when it's set. `suburb` is always shown.

Components read this file at build time, so rebuild and redeploy after you
change it. Tests mock the module (see `__tests__/components/Testimonials.test.tsx`),
so changing the data won't break them.

### Vulnerability check

```bash
pnpm audit
```

### Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
