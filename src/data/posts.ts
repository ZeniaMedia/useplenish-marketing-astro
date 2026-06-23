export interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  categorySlug: string;
  authorName: string;
  readingTime: number;
  heroImage: string;
  heroImageAlt: string;
  heroFit: "contain" | "cover";
  ogImage: string;
  tags: string[];
  featured?: boolean;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const posts: Post[] = [
  {
    slug: "glp1-daily-nutrition-tracking-doesnt-work",
    title: "Why Daily Nutrition Tracking Doesn't Work for GLP-1 Users — And What to Do Instead",
    description: "GLP-1 medications create variable appetite day to day. Here's why daily calorie tracking sets most users up to feel like they're failing — and what actually works instead.",
    publishedAt: "2026-05-14",
    category: "GLP-1 Journey",
    categorySlug: "glp-1-journey",
    authorName: "Heather P.",
    readingTime: 6,
    heroImage: "/blog/glp1-weekly-tracking/hero.png",
    heroImageAlt: "Bar chart titled 'Consistency beats perfection' showing daily nutrition varying across Mon through Sun with a dashed weekly goal line marked On Track",
    heroFit: "contain",
    ogImage: "https://useplenish.com/blog/glp1-weekly-tracking/og.png",
    tags: ["glp1", "nutrition tracking", "weekly goals", "semaglutide", "protein", "fiber"],
    featured: true,
    metaTitle: "Why Daily Tracking Fails GLP-1 Users (And What Works) | Plenish Blog",
    metaDescription: "GLP-1 medications cause unpredictable appetite. Here's why daily calorie tracking fails GLP-1 users — and what to track instead.",
  },
];

export const publishedPosts = posts;

export const getFeaturedPost = (): Post | undefined =>
  posts.find((p) => p.featured) ?? posts[0];

export const getPostsByTag = (tag: string): Post[] =>
  posts.filter((p) => p.tags.includes(tag));

export const getAllTags = (): string[] =>
  [...new Set(posts.flatMap((p) => p.tags))];

export const getPostsByCategory = (categorySlug: string): Post[] =>
  posts.filter((p) => p.categorySlug === categorySlug);

export const getAllCategories = (): { slug: string; name: string }[] =>
  [...new Map(posts.map((p) => [p.categorySlug, { slug: p.categorySlug, name: p.category }])).values()];

export const formatDate = (iso: string, opts?: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-US", opts ?? {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
