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
  {
    slug: "adhd-food-tracking-noise-different-approach",
    title: "Food Tracking Makes ADHD Food Noise Worse. Here's a Better Approach.",
    description: "Traditional food tracking apps can worsen food noise and hyperfixation for those with ADHD, making nutrition harder, not easier. Here's what works instead.",
    publishedAt: "2026-06-24",
    category: "ADHD & Nutrition",
    categorySlug: "adhd-nutrition",
    authorName: "Heather P.",
    readingTime: 6,
    heroImage: "/blog/adhd-food-tracking/hero.jpg",
    heroImageAlt: "Abstract illustration showing scattered numbers and food icons on the left transitioning through an orange dot to calm open space on the right, representing mental clarity around food tracking",
    heroFit: "cover",
    ogImage: "https://useplenish.com/blog/adhd-food-tracking/og.jpg",
    tags: ["adhd", "food-tracking", "food-noise", "hyperfixation", "meal-planning", "nutrition", "executive-function"],
    featured: false,
    metaTitle: "Why Food Tracking Worsens Food Noise in ADHD | Plenish Blog",
    metaDescription: "Traditional food tracking apps can worsen food noise and hyperfixation for those with ADHD, making nutrition harder, not easier. Here's what works instead.",
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
