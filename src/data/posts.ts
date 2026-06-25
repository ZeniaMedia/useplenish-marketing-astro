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
  faqs?: Array<{ q: string; a: string }>;
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
    updatedAt: "2026-06-24",
    metaTitle: "Why Daily Tracking Fails GLP-1 Users (And What Works) | Plenish Blog",
    metaDescription: "GLP-1 medications cause unpredictable appetite. Here's why daily calorie tracking fails GLP-1 users — and what to track instead.",
    faqs: [
      { q: "Why doesn't daily nutrition tracking work for GLP-1 users?", a: "GLP-1 medications slow gastric emptying, which causes appetite to vary significantly from day to day. Traditional daily tracking treats low-appetite days as failures rather than recognizing them as the medication working as intended. Weekly tracking absorbs that variability and gives a more accurate picture of nutritional consistency." },
      { q: "What should GLP-1 users track instead of daily calories?", a: "Protein and fiber are the two nutrients that matter most for GLP-1 users — protein preserves muscle mass during weight loss, and fiber supports the digestive slowdown the medication causes. Tracking these weekly rather than daily matches how GLP-1 medications actually affect appetite and intake." },
      { q: "How do you track nutrition when you're not hungry on GLP-1?", a: "The key is shifting from reactive logging (recording what you ate) to proactive planning (deciding in advance what you'll eat when appetite returns). Batch-entry meal planning — logging food at prep time rather than meal time — keeps nutrition goals visible without requiring daily engagement with the app on low-appetite days." },
      { q: "Can weekly nutrition tracking replace daily tracking for GLP-1 users?", a: "For most GLP-1 users, weekly tracking is more accurate and sustainable than daily tracking. Daily targets assume consistent appetite, which GLP-1 medications deliberately disrupt. A weekly view reflects actual intake patterns more honestly and reduces the psychological burden of missed daily targets on low-appetite days." },
    ],
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
    faqs: [
      { q: "Why does food tracking feel harder with ADHD?", a: "ADHD brains process dopamine differently, which makes food-related thoughts more persistent and intrusive. Actively logging food keeps it in working memory far longer than it does for neurotypical brains, a phenomenon called food noise. The act of tracking can amplify preoccupation with food rather than reducing it." },
      { q: "What is food hyperfixation in ADHD?", a: "Food hyperfixation is an intense, repetitive preoccupation with a specific food or meal, eating it daily for weeks until the interest suddenly disappears. It is driven by dopamine dysregulation in the ADHD brain, which seeks reward from familiar stimuli. The problem is that nutritional blind spots can develop when the same meals repeat without awareness of what is actually in them." },
      { q: "Can people with ADHD track nutrition without triggering food noise?", a: "For some people with ADHD, the key is shifting from real-time daily logging to a plan-ahead approach, entering food in batches when prepping or shopping, then doing a quick check-in rather than detailed manual entry at every meal. This keeps nutrition goals visible without keeping food constantly front of mind." },
      { q: "How does meal planning help ADHD eating habits?", a: "Pre-decided meals reduce the executive function demand of eating. Instead of deciding what to eat multiple times a day, the decision is made once in advance. On low-executive-function days, the plan is already there." },
      { q: "Is Plenish designed for people with ADHD?", a: "Plenish was not built exclusively for people with ADHD, but many of its core features, including batch inventory entry, pre-set meal plans, quick meal check-off, and weekly nutrition goals, emerged directly from conversations with users who found traditional tracking apps made their relationship with food harder, not easier." },
    ],
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
