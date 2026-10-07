export interface VideoPostSection {
  /** Rendered as an h2; omit for an untitled intro section. */
  heading?: string;
  paragraphs: string[];
}

export interface VideoPost {
  slug: string;
  youtubeId: string;
  title: string;
  /** Short summary shown on the /videography cards and used as the meta description. */
  excerpt: string;
  /** Long-form write-up for the post page. */
  body: VideoPostSection[];
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

// Titles, dates and durations come from the FlyingDolly YouTube channel
// (@flyingdolly8322). Copy only states facts from the video descriptions and
// the footage itself — add project specifics (brief, crew, gear, results) as
// they're confirmed.
export const VideoPosts: VideoPost[] = [
  {
    slug: 'guitardeon-latin-american-spring-festival-2026',
    youtubeId: 'EWSnBYwqxZ4',
    title: 'Guitardeon Latin American Spring Festival 2026',
    excerpt:
      'Live Latin American music at Memorial Park, Tauranga — our event video of the Guitardeon Latin American Spring Festival.',
    body: [
      {
        paragraphs: [
          'On 19 September 2026 the Guitardeon Latin American Spring Festival brought live Latin American music to Memorial Park in Tauranga, and FlyingDolly was there with cameras rolling.',
          'The result is a two-and-a-half-minute highlight video of the festival: guitar, accordion and hand percussion on stage, outdoors at Memorial Park in early spring.',
        ],
      },
      {
        heading: 'Event videography in Tauranga',
        paragraphs: [
          'A festival happens once. The people who were there want to relive it, and the people who missed it need a reason to come next year. A short highlight video does both jobs.',
          'This piece puts the focus on the music and the atmosphere: the musicians, the instruments and the feel of a community festival in Memorial Park. At two and a half minutes it’s short enough to share on Instagram and Facebook, and it works just as well embedded on a website.',
          'The video was published in up to 4K resolution, so it holds up on a big screen, in a sponsor presentation or as a background loop at next year’s event.',
        ],
      },
      {
        heading: 'Why festivals and community events need video',
        paragraphs: [
          'Organisers of community events in the Bay of Plenty are usually volunteers with limited time. Good event video gives them ready-made content for the months between festivals: posts announcing the next date, material for funding and sponsorship applications, and proof to performers that the event is worth playing.',
          'It also gives the community something to share. Every share puts the festival in front of new people across Tauranga, Mount Maunganui and beyond — far more reach than a poster on a noticeboard.',
        ],
      },
      {
        heading: 'Planning an event in the Bay of Plenty?',
        paragraphs: [
          'Whether it’s a cultural festival, a sports tournament, a concert or a business launch, we can capture it and turn it into a highlight video you can use straight away. Because FlyingDolly also builds websites and automation, we can make sure that video lands somewhere useful — on a fast event page that turns viewers into ticket sales, registrations or enquiries.',
          'Follow Guitardeon on Instagram at @guitardeon.nz to hear about their next performance.',
        ],
      },
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
      {
        paragraphs: [
          'Expo Latina Tauranga 2023 brought the Latin American community of the Bay of Plenty together. DJ Purs was part of the line-up, and we filmed the set.',
          'This is a 42-second performance video — short by design, because that’s the length that works best on Instagram Reels, TikTok and Facebook.',
        ],
      },
      {
        heading: 'Short-form video for performers',
        paragraphs: [
          'For a DJ or live performer, a great short clip is one of the most valuable things they can own. It’s what promoters look at before a booking, it’s what fans share, and it shows the energy of a live set in a way a photo can’t.',
          'Short-form video is also where most people discover new artists today. A tight, well-shot clip that gets to the point in the first few seconds will travel much further than a long recording from a phone at the back of the room.',
          'For this video we kept the focus on DJ Purs and the performance, with branded titles that make it clear who the artist is and where the set was played — so the clip still makes sense when it’s shared without context.',
          'A performer can also reuse a single clip in many places: pinned to the top of their Instagram profile, in an electronic press kit, on a booking agency’s roster page and on their own website. One good shoot keeps paying off long after the set is over.',
        ],
      },
      {
        heading: 'Expo Latina and Tauranga’s Latin community',
        paragraphs: [
          'Tauranga has a growing Latin American community, and events like Expo Latina are where it comes together. Documenting those events matters: it helps organisers grow their audience and gives performers material to build their careers on.',
          'We’ve also filmed the Guitardeon Latin American Spring Festival at Memorial Park — another celebration of Latin American music in Tauranga.',
        ],
      },
      {
        heading: 'Need a performance video?',
        paragraphs: [
          'If you’re a DJ, band or performer in Tauranga or Mount Maunganui, we can film your next set and cut it into short clips ready for social media, plus a longer edit for your website or press kit. Get in touch for a free quote.',
        ],
      },
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
      {
        paragraphs: [
          'It’s hard to summarise all of our work in a couple of minutes, but this showreel is a tease of what we can do for you and your company.',
          'At just under two minutes, the 2022 reel pulls together footage from several FlyingDolly projects into one fast-moving edit. If you’re deciding whether we’re the right fit for your video, this is the best place to start.',
        ],
      },
      {
        heading: 'What a showreel tells you',
        paragraphs: [
          'A showreel isn’t a case study — it’s a feel for style. Watch for the things that matter to you: how shots are framed, how the edit moves with the music, how colour is handled, and whether the overall tone suits your brand.',
          'Every project is different, and the reel only shows a slice of each one. For the full story behind individual projects, browse the rest of our videography portfolio, where each video has its own write-up.',
        ],
      },
      {
        heading: 'Video as part of a bigger system',
        paragraphs: [
          'FlyingDolly isn’t only a video team. We build websites and business automation too, and that changes how we think about video. A beautiful video that sits unwatched on a hard drive doesn’t help your business; a video embedded on a fast, well-optimised page, shared on social media and followed up by automated email does.',
          'That’s why we plan video with its destination in mind: what it needs to say, where people will watch it, and what we want them to do next.',
          'In practice that might mean shooting vertical versions alongside the main edit, adding captions for people watching with the sound off, or building a landing page around the video so it can be found in Google search — like this one.',
        ],
      },
      {
        heading: 'Work with us',
        paragraphs: [
          'We’re based in Mount Maunganui and work with businesses, events and artists across Tauranga, the Bay of Plenty and New Zealand. If something in the reel caught your eye, get in touch for a free quote and we’ll talk through what your project needs.',
        ],
      },
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
      {
        paragraphs: [
          'Come and join us in this mesmerising music trip with DJ Selknam and friends on Waiheke Island.',
          'Filmed in May 2021, this is a full 50-minute DJ session — a long-form video made for listening as much as watching.',
        ],
      },
      {
        heading: 'Long-form DJ session videos',
        paragraphs: [
          'Not every music video needs to be 30 seconds long. Full-length session videos have become one of the main ways electronic artists build an audience: listeners put them on while they work, cook or drive, and come back to them again and again.',
          'Filming a session is different from filming a festival highlight. There’s no fast edit doing the heavy lifting — the camera work and the setting have to hold attention across the whole set. Done well, a session gives an artist a calling card that says far more about their taste and skill than any short clip.',
        ],
      },
      {
        heading: 'Setting the mood',
        paragraphs: [
          'Waiheke sits in the Hauraki Gulf, a short ferry ride from downtown Auckland, and it’s known for its relaxed pace — a good fit for an unhurried, immersive set like this one.',
          'In a session video the setting is part of the music. The room, the light and the colour all shape how a set feels before a single note is heard — and they make the video instantly recognisable when it’s shared.',
          'Over a 50-minute take there’s nowhere to hide, so the practical details matter as much as the look: clean audio straight from the mixer, lighting that stays consistent from start to finish, and camera positions that keep the performance interesting without getting in the artist’s way.',
        ],
      },
      {
        heading: 'Filming your next session',
        paragraphs: [
          'If you’re a DJ or producer looking to film a session anywhere around Tauranga, Mount Maunganui or the wider Bay of Plenty, FlyingDolly can help you plan the setting, capture it and publish it on YouTube and your website. Get in touch for a free quote.',
        ],
      },
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
      {
        paragraphs: [
          'A video about one of the best barbecue restaurants in Auckland: El Humero.',
          'We filmed this one-minute promotional piece in 2018. It’s set to “The Rover” by S Strong, licensed under Creative Commons (CC BY 3.0).',
        ],
      },
      {
        heading: 'Restaurant and hospitality video',
        paragraphs: [
          'People decide where to eat with their eyes. Before they book a table, most diners will look the restaurant up online, scroll its Instagram and check its photos. A short, well-made video is often the thing that turns “maybe” into a booking.',
          'Hospitality video works best when it captures what you can’t get from a menu: the atmosphere of the room, the way the food is prepared and the feeling of being there. A one-minute format keeps it short enough to watch to the end on a phone, and it suits a website homepage, a Google Business Profile and social media equally well.',
        ],
      },
      {
        heading: 'Making one video work harder',
        paragraphs: [
          'A single shoot can produce much more than one video. From the same footage we can cut a full-length promo for the website, short vertical clips for Reels and TikTok, and still frames for menus and ads. Planning for all of those up front means the restaurant gets months of content from a single day of filming.',
          'We also build websites, so we can make sure the video sits on a fast page with a clear path to booking — rather than slowing down the site or getting lost below the fold.',
          'Music matters too. Licensed or Creative Commons tracks — like the one used here — keep a video safe to publish on YouTube and social media without copyright claims, which is easy to overlook until a video gets muted or taken down.',
        ],
      },
      {
        heading: 'Own a restaurant or café in the Bay of Plenty?',
        paragraphs: [
          'From Mount Maunganui’s waterfront to Tauranga’s city centre, the Bay of Plenty has a thriving food scene. If you’d like a video that shows off your venue, get in touch with FlyingDolly for a free quote.',
        ],
      },
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
      {
        paragraphs: [
          'In 2017, Sam Dowdall set off on a two-year journey around New Zealand as The Barter Barber — exchanging haircuts for koha and conversation around men’s mental health.',
          'This is pre-production footage we filmed with Sam in Matakana, north of Auckland, as part of telling that story.',
        ],
      },
      {
        heading: 'A story worth telling',
        paragraphs: [
          'The idea behind The Barter Barber is simple and powerful. A barber’s chair is one of the few places where many men sit still, face to face with someone, for half an hour. Sam used that time to open up conversations about mental health that might never happen anywhere else.',
          'Stories like this deserve to be told carefully. The aim isn’t a slick advertisement but something honest — giving the person at the centre room to speak and letting the audience feel the weight of what they’re saying.',
        ],
      },
      {
        heading: 'What pre-production is for',
        paragraphs: [
          'Pre-production is the work that happens before the main shoot: getting to know the subject, testing locations, working out how they come across on camera and finding the shape of the story. Footage from this stage is often never seen, but it shapes every decision that comes after.',
          'For documentary and personal-story projects, it’s also how trust is built. People speak more openly to a camera when they already know the people behind it.',
          'Good pre-production also saves money. Problems that are spotted early — a location that’s too noisy, light that disappears by mid-afternoon, a story that needs a different angle — are cheap to fix before the main shoot and expensive to fix after it.',
        ],
      },
      {
        heading: 'Telling your story',
        paragraphs: [
          'If you’re a charity, social enterprise or business with a story to tell, FlyingDolly can help you plan it, film it and get it in front of the right people. We’re based in Mount Maunganui and work across Tauranga, the Bay of Plenty and New Zealand.',
        ],
      },
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
