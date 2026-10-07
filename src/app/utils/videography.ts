export interface VideoPost {
  slug: string;
  youtubeId: string;
  title: string;
  /** Short summary shown on the /videography cards and used as the meta description. */
  excerpt: string;
  /** Long-form write-up for the post page, one string per paragraph. */
  body: string[];
  /** ISO 8601 timestamp of the YouTube upload (used for structured data). */
  publishedAt: string;
  durationSeconds: number;
  location?: string;
  client?: string;
  /** Featured posts appear on the /videography summary page. */
  featured: boolean;
  /** YouTube only generates maxresdefault for HD uploads; fall back for older videos. */
  thumbnail?: 'maxresdefault' | 'hqdefault';
}

// POC content: titles, dates and durations come from the FlyingDolly YouTube
// channel (@flyingdolly8322). Body copy is a first draft to be rewritten per
// project — only facts from the YouTube descriptions are stated.
export const VideoPosts: VideoPost[] = [
  {
    slug: 'guitardeon-latin-american-spring-festival-2026',
    youtubeId: 'EWSnBYwqxZ4',
    title: 'Guitardeon Latin American Spring Festival 2026',
    excerpt:
      'Live Latin American music at Memorial Park, Tauranga — our event video of the Guitardeon Latin American Spring Festival.',
    body: [
      'On 19 September 2026 the Guitardeon Latin American Spring Festival brought live Latin American music to Memorial Park in Tauranga, and we were there to film it.',
      'Event videography is about catching the moments people will want to relive. This piece pulls those moments into a short highlight video the organisers can share straight away.',
      'Running an event in Tauranga or Mount Maunganui? A highlight video gives you content for next year’s promotion, your sponsors and your social channels — and we can build the website it lives on too.',
    ],
    publishedAt: '2026-10-06T10:10:33+00:00',
    durationSeconds: 157,
    location: 'Memorial Park, Tauranga',
    client: 'Guitardeon',
    featured: true,
  },
  {
    slug: 'dj-purs-expo-latina-tauranga-2023',
    youtubeId: '2JSnklB05B4',
    title: 'DJ Purs at Expo Latina Tauranga 2023',
    excerpt:
      'A short video of DJ Purs performing at Expo Latina Tauranga 2023.',
    body: [
      'Expo Latina Tauranga 2023 brought the Latin American community together in the Bay of Plenty, and DJ Purs was part of the line-up.',
      'We cut a short performance video the artist can share on social media and send to promoters.',
    ],
    publishedAt: '2023-06-15T00:34:31+00:00',
    durationSeconds: 42,
    location: 'Tauranga',
    client: 'DJ Purs',
    featured: true,
  },
  {
    slug: 'flyingdolly-showreel-2022',
    youtubeId: 'pqZpxTX3zaE',
    title: 'FlyingDolly Showreel 2022',
    excerpt:
      'A tease of several projects our team has put together, cut into a couple of minutes.',
    body: [
      'It’s hard to summarise all of our work in a couple of minutes, but this showreel is a tease of what we can do for you and your company.',
      'Watch it to get a feel for our style before we talk about your project.',
    ],
    publishedAt: '2022-04-12T09:46:33+00:00',
    durationSeconds: 104,
    featured: true,
  },
  {
    slug: 'dj-selknam-waiheke-session-2021',
    youtubeId: '7f3htvxMWwE',
    title: 'DJ Selknam — Waiheke Session, May 2021',
    excerpt:
      'A mesmerising music trip with DJ Selknam and friends on Waiheke Island.',
    body: [
      'In May 2021 we joined DJ Selknam and friends on Waiheke Island to film a 50-minute DJ session.',
      'A long-form session video gives an artist something substantial to share with promoters and fans, and lets the location do part of the storytelling.',
    ],
    publishedAt: '2021-08-23T06:27:15+00:00',
    durationSeconds: 3021,
    location: 'Waiheke Island, Auckland',
    client: 'DJ Selknam',
    featured: true,
  },
  {
    slug: 'el-humero-restaurant-auckland',
    youtubeId: 'QRIC86JMREc',
    title: 'El Humero Restaurant, Auckland',
    excerpt:
      'A one-minute promotional video for El Humero, one of the best barbecue restaurants in Auckland.',
    body: [
      'Filmed in 2018, this one-minute piece showcases El Humero — one of the best barbecue restaurants in Auckland.',
      'Short restaurant videos like this give a hospitality business something to share across its website and social channels.',
    ],
    publishedAt: '2021-08-24T22:40:22+00:00',
    durationSeconds: 59,
    location: 'Auckland',
    client: 'El Humero',
    featured: true,
    thumbnail: 'hqdefault',
  },
  {
    slug: 'the-barter-barber-matakana',
    youtubeId: 'nSrmDzmKJbs',
    title: 'The Barter Barber — Matakana Pre-production',
    excerpt:
      'Pre-production footage with Sam Dowdall, The Barter Barber, who travelled New Zealand trading haircuts for koha and conversations about men’s mental health.',
    body: [
      'In 2017, Sam Dowdall set off on a two-year journey around New Zealand as The Barter Barber — exchanging haircuts for koha and conversation around men’s mental health.',
      'We filmed this pre-production piece in Matakana as part of telling that story.',
    ],
    publishedAt: '2018-09-16T09:16:59+00:00',
    durationSeconds: 155,
    location: 'Matakana',
    client: 'The Barter Barber',
    featured: false,
  },
];

export function getVideoPost(slug: string): VideoPost | undefined {
  return VideoPosts.find(post => post.slug === slug);
}

export function getFeaturedVideoPosts(): VideoPost[] {
  return VideoPosts.filter(post => post.featured).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getRelatedVideoPosts(slug: string, limit: number): VideoPost[] {
  return VideoPosts.filter(post => post.slug !== slug).slice(0, limit);
}

export function videoThumbnailUrl(post: VideoPost): string {
  return `https://i.ytimg.com/vi/${post.youtubeId}/${post.thumbnail ?? 'maxresdefault'}.jpg`;
}

export function formatIsoDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${seconds ? `${seconds}S` : ''}`;
}
