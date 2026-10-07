import {
  VideoPosts,
  formatIsoDuration,
  getFeaturedVideoPosts,
  getRelatedVideoPosts,
  getVideoPost,
} from '../../src/app/utils/videography';

describe('videography data', () => {
  it('gives every post a unique, URL-safe slug', () => {
    const slugs = VideoPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('gives every post an 11-character YouTube id, an excerpt and a body', () => {
    VideoPosts.forEach((post) => {
      expect(post.youtubeId).toMatch(/^[A-Za-z0-9_-]{11}$/);
      expect(post.excerpt.length).toBeGreaterThan(0);
      expect(post.body.length).toBeGreaterThan(0);
    });
  });

  it('looks up a post by slug and returns undefined for unknown slugs', () => {
    const [first] = VideoPosts;
    expect(getVideoPost(first.slug)).toBe(first);
    expect(getVideoPost('does-not-exist')).toBeUndefined();
  });

  it('returns only featured posts, newest first', () => {
    const featured = getFeaturedVideoPosts();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((post) => post.featured)).toBe(true);
    const dates = featured.map((post) => post.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it('formats durations as ISO 8601 for structured data', () => {
    expect(formatIsoDuration(42)).toBe('PT42S');
    expect(formatIsoDuration(157)).toBe('PT2M37S');
    expect(formatIsoDuration(3021)).toBe('PT50M21S');
    expect(formatIsoDuration(3600)).toBe('PT1H');
  });

  it('returns related posts that exclude the current one', () => {
    const [first] = VideoPosts;
    const related = getRelatedVideoPosts(first.slug, 3);
    expect(related).toHaveLength(3);
    expect(related.map((post) => post.slug)).not.toContain(first.slug);
  });
});
