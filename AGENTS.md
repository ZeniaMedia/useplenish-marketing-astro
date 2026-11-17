# Development Rules

## Modern web guidance

When writing or changing HTML, CSS, JS, or Astro components, follow the
`modern-web-guidance` skill before writing ad-hoc solutions or adding
dependencies.

## Astro / integration upgrade checklist

After any Astro or Astro integration upgrade, remind the user to check:

1. `npm run build` passes, then test with `npm run preview`
2. `/sitemap-index.xml` loads and lists all pages
3. Page titles, meta descriptions, and canonical tags on the homepage and
   one blog post (view page source)
4. After deploying, paste the live homepage and one blog post URL into
   opengraph.xyz to confirm share images and titles show correctly

## Post-change audit reminder

After finishing a big change — a redesign, a framework or major package
upgrade, adding a third-party script or service, or a new page template —
remind the user to run a modern web audit and compare it against the
latest file in `docs/audits/`.
