# Modern Web Audit — 2026-11-18

**Stack:** Astro 7.4 · Tailwind 4 · `@tailwindcss/vite` · `@astrojs/sitemap` 3.7 · TypeScript (base) · Static output  
**Tool:** `modern-web-guidance@latest` legacy-scan + manual review  
**Previous audit:** `docs/audits/modern-web-audit-2026-11-16.md` — all 15 items ✅ resolved  
**Findings:** 1 high · 5 medium · 4 low = 10 total

---

## Checklist

### 🔴 High

- [x] **[1] NEW — Blog post hero `<img>` missing `fetchpriority="high"`** — `BlogPostLayout.astro` applies `loading="eager"` to the hero image (the page's LCP element) but omits `fetchpriority="high"`. Session D fixed the homepage phone mockup but left blog post heroes unfixed. Without the hint, the browser fetches the LCP image at normal network priority, delaying First Contentful Paint on every blog post.
  - **File:** [`src/layouts/BlogPostLayout.astro:147`](../src/layouts/BlogPostLayout.astro)
  - **Fix:** Add `fetchpriority="high"` to the `<img>` tag inside the `<picture>` block.

---

### 🟡 Medium

- [x] **[2] RETURNING — FAQ page `onmouseover`/`onmouseout` inline event handlers** — The email CTA at the bottom of the FAQ page uses `onmouseover`/`onmouseout` to toggle `style.background`. This is the same pattern fixed on the homepage in Session D (old item [4]), but it survived on the FAQ page. Because the enforced CSP now has `'unsafe-inline'` in `script-src` these handlers still execute today, but they are semantic dead-weight under any future hash/nonce-based CSP tightening and are inconsistent with how every other interactive element on the site handles hover.
  - **File:** [`src/pages/faq.astro:224`](../src/pages/faq.astro)
  - **Fix:** Remove the inline handlers; replace the `style` background with a Tailwind class and add `hover:bg-[hsl(142_76%_30%)]`.

- [x] **[3] NEW — Blog index hero images missing `width`/`height` attributes** — Both the featured post `<img>` (line 91) and the grid post `<img>` (line 124) in `blog/index.astro` have no `width` or `height` attributes. The `Post` type gained `heroImageWidth`/`heroImageHeight` in Session G but `blog/index.astro` never started using them. The browser cannot reserve aspect-ratio space and will shift layout as images load (CLS).
  - **File:** [`src/pages/blog/index.astro:91`](../src/pages/blog/index.astro), [`:124`](../src/pages/blog/index.astro)
  - **Fix:** Add `width={featured.heroImageWidth} height={featured.heroImageHeight}` to the featured post `<img>` and `width={p.heroImageWidth} height={p.heroImageHeight}` to the grid post `<img>`.

- [x] **[4] NEW — `BlogPostLayout` `ImageObject` schema uses hardcoded `1600 × 900`** — The `BlogPosting` JSON-LD in `BlogPostLayout.astro` declares `"width": 1600, "height": 900` on the `ImageObject` for every post. Session G added actual pixel dimensions to `posts.ts` (`heroImageWidth`/`heroImageHeight`), but the schema was never updated to use them. The GLP-1 post hero is 1424 × 752 and the ADHD post is 1600 × 845 — neither is 1600 × 900. Incorrect dimensions in the schema can affect Google's rich result scoring.
  - **File:** [`src/layouts/BlogPostLayout.astro:43-46`](../src/layouts/BlogPostLayout.astro)
  - **Fix:** Replace `width: 1600, height: 900` with `width: post.heroImageWidth, height: post.heroImageHeight`.

- [x] **[5] NEW — `Permissions-Policy` header not set** — The minimum recommended security header set in audit item [1] included `Permissions-Policy` to restrict access to browser APIs (camera, microphone, geolocation, payment). The Session B fix added the other five headers but left `Permissions-Policy` out of `vercel.json`. Without it, the browser applies permissive defaults.
  - **File:** [`vercel.json`](../../vercel.json)
  - **Fix:** Add a `Permissions-Policy` header to the global headers block:
    ```
    Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
    ```

- [ ] **[6] NEW — Production CSP uses `'unsafe-inline'` in `script-src`** — The enforced `Content-Security-Policy` in `vercel.json` includes `'unsafe-inline'` in `script-src`, which allows any inline `<script>` or `javascript:` URL to execute. This largely defeats the XSS protection that CSP provides. The previous audit marked the CSP as Phase 1 (report-only); enforcement was correct to ship, but `'unsafe-inline'` leaves the door open. The root cause is the PostHog `is:inline` snippet and the two other `is:inline` scripts (Header mobile menu, FAQ accordion). Moving to nonces or hashes requires either Astro middleware or rewriting those as module scripts.
  - **Files:** [`vercel.json:24`](../../vercel.json), [`src/layouts/BaseLayout.astro:167`](../src/layouts/BaseLayout.astro), [`src/components/Header.astro:64`](../src/components/Header.astro), [`src/pages/faq.astro:239`](../src/pages/faq.astro)
  - **Fix (Phase 2):** Rewrite the three `is:inline` scripts as external `<script>` modules (Astro will bundle them), then remove `'unsafe-inline'` from `script-src`. PostHog's loader can be loaded via a standard `<script src="…" async>` tag instead of the inline snippet. The dev CSP in `astro.config.mjs` is already report-only and can stay that way during the migration.

---

### 🟢 Low

- [x] **[7] NEW — HSTS header missing `includeSubDomains`** — `vercel.json` sets `Strict-Transport-Security: max-age=31536000` without `includeSubDomains`. The Session B fix description referenced `max-age=31536000; includeSubDomains` but the directive was written without it. Without `includeSubDomains`, any subdomains (e.g. `app.useplenish.com`) are not forced onto HTTPS by the main site's HSTS policy.
  - **File:** [`vercel.json:19`](../../vercel.json)
  - **Fix:** Update the value to `max-age=31536000; includeSubDomains`. (Add `; preload` only after submitting the domain to the HSTS preload list.)

- [ ] **[8] NEW — `Organization` schema `logo` is a plain URL string** — `BaseLayout.astro:63` sets `"logo": "https://useplenish.com/plenish-logo.png"` as a bare string. Google's structured data guidelines and Schema.org spec expect `logo` to be an `ImageObject` with `url`, `width`, and `height` for rich result eligibility. The site already uses `ImageObject` correctly for publisher logos in `BlogPostLayout`.
  - **File:** [`src/layouts/BaseLayout.astro:63`](../src/layouts/BaseLayout.astro)
  - **Fix:** Replace the string with `{ "@type": "ImageObject", "url": "https://useplenish.com/plenish-logo.png", "width": 40, "height": 40 }` (verify actual pixel dimensions of `plenish-logo.png`).

- [ ] **[9] NEW — Release-notes page `<h1>` is outside the `<main>` landmark** — `release-notes.astro` renders the page title section (including the `<h1>`) in a `<div>` at the top level of `<body>` (line 70–74), *above* the `<main>` element that starts at line 77. Screen readers navigating by landmark will skip the heading when jumping to `main`. All other pages (`index.astro`, `blog/index.astro`, `faq.astro`, `BlogPostLayout.astro`) correctly include their `<h1>` inside `<main>`.
  - **File:** [`src/pages/release-notes.astro:70-77`](../src/pages/release-notes.astro)
  - **Fix:** Wrap the hero `<div>` and `<main>` together in a single `<main>`, or move the hero `<div>` inside `<main>` as its first child and remove the outer `<div>`.

- [ ] **[10] NEW — `dateModified` set to `new Date()` at build time on blog index and release-notes** — Both `blog/index.astro:48` and `release-notes.astro:46` use `new Date().toISOString().slice(0, 10)` for `dateModified` in their `WebPage` JSON-LD. This sets the date to whenever a Vercel build runs — including deployments that don't touch those pages — and signals to Google that the pages change more frequently than they do. The same pages could use a static date updated when content actually changes (like the other schema `dateModified` fields in the codebase).
  - **Files:** [`src/pages/blog/index.astro:48`](../src/pages/blog/index.astro), [`src/pages/release-notes.astro:46`](../src/pages/release-notes.astro)
  - **Fix:** Replace `new Date().toISOString().slice(0, 10)` with an explicit date string updated manually whenever the page content meaningfully changes. For `release-notes.astro`, derive from `releaseNotes[0].date` (the most recent release) since the page content changes when a release is added.

---

## Session plan

> Sessions are grouped by shared files and dependencies. Framework upgrades first and on their own — none needed in this cycle.

---

### Session H — BlogPostLayout.astro (batch, single file)
All changes touch `src/layouts/BlogPostLayout.astro`.

| # | Item |
|---|------|
| [x] | **[1]** Add `fetchpriority="high"` to the hero `<img>` tag. |
| [x] | **[4]** Replace hardcoded `width: 1600, height: 900` in `ImageObject` with `post.heroImageWidth` / `post.heroImageHeight`. |

---

### Session I — Blog index (blog/index.astro)
All changes touch `src/pages/blog/index.astro`.

| # | Item |
|---|------|
| [x] | **[3]** Add `width`/`height` from post data to both the featured post `<img>` and grid post `<img>`. |

---

### Session J — FAQ page (faq.astro)
All changes touch `src/pages/faq.astro`.

| # | Item |
|---|------|
| [x] | **[2]** Replace `onmouseover`/`onmouseout` on the email CTA with Tailwind `hover:bg-[hsl(142_76%_30%)]`. |

---

### Session K — Security headers (vercel.json + astro.config.mjs)
Hosting config changes; no Astro component edits for items [5] and [7].

| # | Item |
|---|------|
| [x] | **[5]** Add `Permissions-Policy` header to `vercel.json`. |
| [x] | **[7]** Add `includeSubDomains` to HSTS value in `vercel.json`. |
| [ ] | **[6]** (Phase 2) Eliminate `'unsafe-inline'` from `script-src` — requires rewriting `is:inline` scripts as external modules. Do last; validate with report-only CSP before enforcing. |

---

### Session L — Miscellaneous small fixes (3 files)
Small, isolated changes across different files; can be batched in one session.

| # | Item |
|---|------|
| [ ] | **[8]** Upgrade `logo` to `ImageObject` in Organization schema — `BaseLayout.astro`. |
| [ ] | **[9]** Move release-notes hero section inside `<main>` — `release-notes.astro`. |
| [ ] | **[10]** Replace `new Date()` `dateModified` with explicit/derived dates — `blog/index.astro`, `release-notes.astro`. |
