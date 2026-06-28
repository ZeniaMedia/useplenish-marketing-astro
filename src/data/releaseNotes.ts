export interface ReleaseEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  showNewBadge: boolean;
  slug: string;
  shortDescription: string;
  heroImage?: { src: string; alt: string; caption?: string };
  ogImage: { src: string; alt: string };
  longDescription?: Array<{ heading: string; body: string }>;
  improvements?: Array<{ label: string; description: string }>;
  fixes?: Array<{ label: string; description: string }>;
}

export const releaseNotes: ReleaseEntry[] = [
  {
    id: "release-2026-06-28",
    version: "2026.06.28",
    date: "2026-06-28",
    title: "Complete Macro Tracking + Smarter Meal Planning",
    showNewBadge: true,
    slug: "complete-macro-tracking-smarter-meal-planning",
    shortDescription: "Plenish now tracks all five core macros: Calories, Protein, Fiber, Carbohydrates, and Fat. You get a complete picture of what you're fueling your body with. This release also cleans up the meal plan view and adds more flexibility to how you log and interact with your food.",
    heroImage: {
      src: "/release-notes/release-2026-06-28-hero.png",
      alt: "Plenish mobile screens showing macro goal settings and daily nutrition summary",
      caption: "Set your targets. See your totals.",
    },
    ogImage: {
      src: "https://useplenish.com/release-notes/release-2026-06-28-hero.png",
      alt: "Plenish mobile screens showing macro goal settings and daily nutrition summary",
    },
    longDescription: [
      {
        heading: "Your full macro picture is here",
        body: "Calories, Protein, and Fiber were just the start. Plenish now tracks Carbohydrates and Fat alongside your existing nutrition data, completing the core macro set. Your daily nutrition summary updates automatically as your meal plan is generated. No manual math; daily and weekly totals to fit your tracking style best.",
      },
      {
        heading: "A cleaner, more flexible meal plan",
        body: "The meal plan view got a meaningful overhaul this cycle. Week cards are now expandable and collapsible. Your current week stays open by default; future weeks collapse out of the way. The Remaining Foods section has been removed to reduce visual clutter. Quick Add foods are now editable directly from the meal plans and sides have been added as a new non-schedulable meal type for foods that may accompany meals.",
      },
      {
        heading: "Feedback form",
        body: "You can now submit feedback directly from the app. Find it in your account settings. Tell us what's working, what's not, and what you want to see next.",
      },
    ],
    improvements: [
      { label: "Google password support", description: "Plenish now works with Google's password suggestion and autofill, making account setup faster on Android and Chrome." },
      { label: "Sticky Save/Cancel buttons", description: "Long dialogs like Add/Edit Food now keep the Save and Cancel buttons visible as you scroll. No more hunting for the button at the bottom." },
      { label: "Consistent password visibility", description: "The show/hide password toggle is now present on every password field across the app." },
      { label: "Real-time sync across platforms", description: "Changes made on web now appear on mobile (and vice versa) without requiring a manual page reload." },
    ],
    fixes: [
      { label: "Mobile nutrition field layout", description: "Nutrition fields in Add/Edit Food were wrapping incorrectly on smaller screens. Fixed." },
      { label: "Goal history preserved on reset", description: "Resetting your nutrition goals was incorrectly overwriting historical goal data. Historical goals are now retained when you update your targets." },
      { label: "Scroll hijacking on number fields", description: "Scrolling while a number input was focused (Add/Edit Food) was changing the field value unintentionally. Fixed." },
      { label: "Save errors now visible", description: "Blocking errors on the Add/Edit Food dialog were rendering off-screen with no visible indicator. They now appear within the visible area." },
      { label: "Toast notifications repositioned", description: "On mobile, toast messages were appearing at the top of the screen and overlapping the navigation bar. They now appear in a non-blocking position." },
    ],
  },
  {
    id: "release-2026-05-08",
    version: "2026.05.1",
    date: "2026-05-08",
    title: "Nutrition Goals, Sign In with Google + Flexible Meal Plan View",
    showNewBadge: true,
    slug: "nutrition-goals-google-signin-flexible-meal-plan",
    shortDescription: "Set daily and weekly targets for Calories, Protein, and Fiber and track progress directly in your meal plan. Sign in with Google for faster account setup. And now choose how many weeks of your meal plan you see at once.",
    ogImage: {
      src: "https://useplenish.com/release-notes/release-og-default.png",
      alt: "Plenish Release Notes",
    },
    longDescription: [
      {
        heading: "Nutrition goals that track alongside your meal plan",
        body: "You can now set daily and weekly targets for Calories, Protein, and Fiber. Progress appears directly in your meal plan view so you can see how your prep stacks up against your goals without switching screens. Set your targets once and Plenish keeps count as your plan is built.",
      },
      {
        heading: "Sign in with Google",
        body: "Creating an account or signing back in now takes one tap if you use Google. No separate password to remember. Existing accounts can continue to use email and password as before.",
      },
      {
        heading: "See as many weeks as you want",
        body: "Your meal plan view now adapts to how you plan. Choose to see one week for focus, or several weeks to plan ahead. The setting lives in your account preferences and can be changed any time.",
      },
    ],
    improvements: [],
    fixes: [],
  },
  {
    id: "release-2026-04-29",
    version: "2026.04.4",
    date: "2026-04-29",
    title: "Weekly Goals, Snack Tracking + Inventory Improvements",
    showNewBadge: true,
    slug: "weekly-goals-snack-tracking-inventory-improvements",
    shortDescription: "Three meaningful additions this week: weekly nutrition goals so a one off-day does not derail your progress, snack logging alongside your meals, and smarter inventory management to keep your prep accurate with less manual cleanup.",
    ogImage: {
      src: "https://useplenish.com/release-notes/release-og-default.png",
      alt: "Plenish Release Notes",
    },
    longDescription: [
      {
        heading: "Weekly goals for real-life eating",
        body: "Daily targets are a useful baseline, but weekly goals give you room to live. A bigger window means one day does not define the week. Weekly Calorie and Protein totals appear alongside your daily view so you always know where you stand.",
      },
      {
        heading: "Snacks, logged alongside meals",
        body: "Snacks are part of how people actually eat, but they do not always belong in a meal slot. Snack Tracking lets you log snacks any time without scheduling them. They count toward your daily and weekly nutrition totals. They do not affect your meal plan generation.",
      },
    ],
    improvements: [
      { label: "UX and UI improvements", description: "Navigation, readability, and layout refinements across several areas of the app." },
      { label: "Smarter inventory management", description: "Improved workflows help catch common gaps and reduce the manual cleanup needed to keep your meal planning on track." },
    ],
    fixes: [],
  },
  {
    id: "release-2026-04-23",
    version: "2026.04.3",
    date: "2026-04-23",
    title: "More Flexible Meal Planning + Estimator Fix",
    showNewBadge: true,
    slug: "more-flexible-meal-planning-estimator-fix",
    shortDescription: "You can now add foods from your inventory to any meal in your plan, and log anything on the fly with Quick Add. The AI nutrition estimator is also back to full speed after an intermittent error was resolved.",
    ogImage: {
      src: "https://useplenish.com/release-notes/release-og-default.png",
      alt: "Plenish Release Notes",
    },
    longDescription: [
      {
        heading: "Mix and match your preps throughout the week",
        body: "Your meal plan used to reflect only what Plenish auto-scheduled. Now you can add any food from your inventory directly to any meal. If you prepped something versatile and want it at lunch on Tuesday and dinner on Thursday, you can set that up yourself without waiting for the next plan generation.",
      },
      {
        heading: "Quick Add for anything not in your inventory",
        body: "Eating out tonight? Throwing something together from the fridge? Quick Add lets you log any food to a meal without it needing to be in your inventory first. It does not affect your inventory or expiration tracking. It is just a fast way to capture what you actually ate.",
      },
    ],
    improvements: [],
    fixes: [
      { label: "Nutrition estimator reliability", description: "An intermittent \"AI service busy\" error in the nutrition estimator has been resolved. If you ran into this before, give it another try." },
    ],
  },
  {
    id: "release-2026-04-15",
    version: "2026.04.2",
    date: "2026-04-15",
    title: "Estimate Nutrition with AI",
    showNewBadge: true,
    slug: "estimate-nutrition-with-ai",
    shortDescription: "Describe what you made and Plenish estimates the Calories, Protein, and Fiber for you. Give it a full recipe, a list of ingredients, or a general description and get back estimated nutrition with a confidence rating.",
    ogImage: {
      src: "https://useplenish.com/release-notes/release-og-default.png",
      alt: "Plenish Release Notes",
    },
    longDescription: [
      {
        heading: "Nutrition estimates for food you didn't prepare",
        body: "Knowing what's in food you didn't cook is genuinely hard. Whether you're eating out, ordering takeout, or eating at a friend's place, there's no label to check. The Plenish nutrition estimator gives you a reasonable estimate based on a description, so you're not logging blind or skipping the entry entirely.",
      },
      {
        heading: "Faster nutrition logging for home cooks",
        body: "Looking up every ingredient in a homemade dish is tedious and often no more accurate than a good description. If you have the recipe, paste it in. If you just know what went into the pot, describe it. Either way, Plenish returns estimated Calories, Protein, and Fiber in seconds.",
      },
      {
        heading: "Confidence ratings tell you how much to trust the numbers",
        body: "Every estimate comes with a confidence rating: High, Medium, or Low. More specific descriptions produce more reliable numbers. Including measurements, brand names, and preparation method (baked vs. fried, for example) pushes a rating toward High. Vague descriptions will land at Medium or Low, which is a signal to review the numbers before relying on them.",
      },
    ],
    improvements: [],
    fixes: [],
  },
  {
    id: "release-2026-04-08",
    version: "2026.04.1",
    date: "2026-04-08",
    title: "Nutrition Tracking Is Here",
    showNewBadge: true,
    slug: "nutrition-tracking-is-here",
    shortDescription: "You can now add nutritional information to everything in your meal prep inventory. Plenish tracks Calories, Protein, and Fiber per item and calculates your total daily nutrition automatically as your meal plan is generated.",
    ogImage: {
      src: "https://useplenish.com/release-notes/release-og-default.png",
      alt: "Plenish Release Notes",
    },
    longDescription: [
      {
        heading: "Track what you prep, not just what you eat",
        body: "Most nutrition apps ask you to log meals after the fact. Plenish works differently: you add nutrition data when you prep, and the app does the rest. As your meal plan is generated from your inventory, your daily Calorie, Protein, and Fiber totals update automatically. No separate logging step, no double entry.",
      },
      {
        heading: "Why we started with Calories, Protein, and Fiber",
        body: "These three cover the core of what most people tracking nutrition actually care about. Calories for energy balance, Protein for muscle and satiety, Fiber for digestive health and fullness. Additional macros are coming in a future release.",
      },
    ],
    improvements: [],
    fixes: [],
  },
];

export function formatReleaseDate(isoDate: string): string {
  return new Date(isoDate + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
