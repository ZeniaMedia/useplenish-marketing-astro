# Modern Web Audit — 2026-11-19

**Stack:** Astro 7.4.12 · Tailwind 4.3.5 · `@tailwindcss/vite` · `@astrojs/sitemap` 3.7 · TypeScript · Static output  
**Analysis:** Four passes — (1) `modern-web-guidance@latest legacy-scan src --json` → 0 findings across 38 guides/52 rules; (2) exhaustive manual read of every `.astro`, `.ts`, `.css`, `.json` source file; (3) guide-driven review of all 209 guides in catalog — full catalog listed, then guides retrieved: `motion`, `accessibility` (1074 lines, complete), `performance`, `deliver-optimized-decorative-images`, `html`, `breadcrumbs`, `navbar`, `color`, `typography`, `security`, `privacy`; (4) built-HTML inspection of `dist/` for all 23 pages  
**Previous audit:** `docs/audits/modern-web-audit-2026-11-18.md` — 9 of 10 items ✅ resolved; item [6] (CSP `unsafe-inline`) carries forward as Phase 2  
**Findings:** 1 high · 8 medium · 9 low = 18 total

---

## Checklist

### 🔴 High

- [x] **[1] NEW — Blog index featured image missing `fetchpriority="high"`** — Added `fetchpriority="high"` to featured `<img>` in `blog/index.astro`; also wrapped in `<picture>` with WebP source (Session M).  
  The featured post `<img>` in `blog/index.astro` (line 93) has `loading="eager"` but no `fetchpriority="high"`. This image spans roughly half the viewport above the fold and is the LCP element. Without the fetch-priority hint the browser requests it at normal network priority, delaying First Contentful Paint. The same pattern was fixed for `BlogPostLayout` in Session H — it was simply never applied to the index page. Confirmed in `dist/blog/index.html`.  
  - **File:** [`src/pages/blog/index.astro:93`](../src/pages/blog/index.astro)  
  - **Fix:** Add `fetchpriority="high"` to the featured post `<img>` tag.

---

### 🟡 Medium

- [x] **[2] NEW — Category and tag page `<img>` elements missing `width`/`height`** — Added `width={p.heroImageWidth}` and `height={p.heroImageHeight}` to card `<img>` in `[category].astro` and `[tag].astro`; also wrapped in `<picture>` (Session M).  
  The post-card `<img>` tags in `[category].astro` (lines 82–87) and `[tag].astro` (lines 84–89) have `src`, `alt`, and `loading="lazy"` but no `width` or `height`. The browser cannot reserve layout space → CLS (Core Web Vital). The `posts.ts` data type already carries `heroImageWidth` and `heroImageHeight` for every post; they're just not passed through on these two pages. The blog index grid uses them correctly as of Session I; category and tag were missed.  
  - **Files:** [`src/pages/blog/category/[category].astro:82`](../src/pages/blog/category/%5Bcategory%5D.astro), [`src/pages/blog/tag/[tag].astro:84`](../src/pages/blog/tag/%5Btag%5D.astro)  
  - **Fix:** Add `width={p.heroImageWidth}` and `height={p.heroImageHeight}` to the `<img>` tag in both files.

- [ ] **[3] NEW — Release notes hero `<img>` missing `width`/`height`**  
  `release-notes.astro` renders a hero `<img>` for each release entry (lines 138–141) with no `width` or `height`. The `ReleaseEntry.heroImage` type in `releaseNotes.ts` only has `src`, `alt`, `caption`, and `srcSet`; dimension fields do not exist. Currently one entry has a hero image.  
  - **Files:** [`src/pages/release-notes.astro:138`](../src/pages/release-notes.astro), [`src/data/releaseNotes.ts`](../src/data/releaseNotes.ts)  
  - **Fix:** Add optional `width?: number` and `height?: number` to `ReleaseEntry.heroImage` in `releaseNotes.ts`; populate the existing entry; add `width={entry.heroImage.width}` / `height={entry.heroImage.height}` on the `<img>`.

- [ ] **[4] RETURNING — Production CSP uses `'unsafe-inline'` in `script-src`**  
  Carry-forward from previous audit item [6]. Root cause: PostHog `is:inline` snippet in `BaseLayout.astro`, plus `is:inline` scripts in `Header.astro` (mobile menu) and `faq.astro` (accordion + search). `'unsafe-inline'` in `script-src` largely defeats XSS protection.  
  - **Files:** [`vercel.json:28`](../../vercel.json), [`src/layouts/BaseLayout.astro:167`](../src/layouts/BaseLayout.astro), [`src/components/Header.astro:64`](../src/components/Header.astro), [`src/pages/faq.astro:237`](../src/pages/faq.astro)  
  - **Fix (Phase 2):** Rewrite three `is:inline` scripts as external `<script>` modules; load PostHog via `<script src="…" async>`; remove `'unsafe-inline'` from `script-src`. Keep `Content-Security-Policy-Report-Only` during migration.

- [x] **[5] NEW — Category and tag pages use `new Date()` for `dateModified`** — Replaced with static `"2026-11-19"` in both `[category].astro` and `[tag].astro` (Session M).  
  `[category].astro` (line 39) and `[tag].astro` (line 41) set `"dateModified": new Date().toISOString().slice(0, 10)` in their `WebPage` JSON-LD. This emits whichever date the site was last built — Google treats a bouncing `dateModified` as a freshness signal, so a date that updates on every deploy misrepresents the page. The same bug was fixed in `blog/index.astro` and `release-notes.astro` in Session L; it was missed on these two pages.  
  - **Files:** [`src/pages/blog/category/[category].astro:39`](../src/pages/blog/category/%5Bcategory%5D.astro), [`src/pages/blog/tag/[tag].astro:41`](../src/pages/blog/tag/%5Btag%5D.astro)  
  - **Fix:** Replace `new Date().toISOString().slice(0, 10)` with a static date string (e.g. `"2026-11-18"`) in both files.

- [ ] **[6] NEW — No skip-navigation link (WCAG 2.4.1 Level A)**  
  Neither `Header.astro` nor `BaseLayout.astro` includes a skip-to-main-content link. Users navigating by keyboard must tab through the entire fixed navigation bar on every page. No `<main>` element in any page has an `id` to target such a link. Confirmed by `modern-web-guidance` accessibility guide (§1 Skip links: "Provide skip links prior to repeated content like site headers … WCAG 2.4.1 Bypass Blocks Level A") and by reading all 23 built HTML files.  
  - **Files:** [`src/components/Header.astro`](../src/components/Header.astro) (add link), all 9 page/layout files with `<main>` (add `id="main-content"` and `tabindex="-1"`)  
  - **Fix:** Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to content</a>` as the first element in `<body>` (or first element of `Header.astro`); add `id="main-content" tabindex="-1"` to the `<main>` in every page file. The `tabindex="-1"` fixes screen-magnifier focus per the guide.

- [ ] **[7] NEW — FAQ accordion buttons have `focus:outline-none` with no ring replacement**  
  Every FAQ trigger button in `faq.astro` (line 191) carries `focus:outline-none` with no `focus-visible:ring-*` alternative. This removes the browser's default focus indicator for keyboard users without substituting another. The `modern-web-guidance` accessibility guide states: "Never set `outline: none` or `outline: 0` on a focusable element without replacing it with a visible custom focus indicator."  
  - **File:** [`src/pages/faq.astro:191`](../src/pages/faq.astro)  
  - **Fix:** Replace `focus:outline-none` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 rounded-sm` on the `.faq-trigger` class string.

- [x] **[8] NEW — Blog listing pages serve PNG/JPG without `<picture>`/WebP srcset** — Created `src/utils/heroSrcSet.ts`; wrapped all card `<img>` elements in `<picture>` with WebP `<source>` in `blog/index.astro`, `[category].astro`, and `[tag].astro` (Session M).  
  `blog/index.astro`, `[category].astro`, and `[tag].astro` all render card images as plain `<img>` tags. The WebP variants (`hero-768.webp`, `hero-1200.webp`, `hero-1600.webp`) already exist in `/public/` and `BlogPostLayout.astro` already implements the full `<picture>` element with `heroBase` auto-computation (lines 16–17). Browsers always receive the heavier PNG/JPG on listing pages. Confirmed by reading `dist/blog/index.html` (featured image: 1424×752 PNG via `<img>`, no `<source>`). The `deliver-optimized-decorative-images` guide (and by extension the `performance` guide) endorses `<picture>` with `type="image/webp"` and `srcset`.  
  - **Files:** [`src/pages/blog/index.astro`](../src/pages/blog/index.astro), [`src/pages/blog/category/[category].astro`](../src/pages/blog/category/%5Bcategory%5D.astro), [`src/pages/blog/tag/[tag].astro`](../src/pages/blog/tag/%5Btag%5D.astro)  
  - **Fix:** Extract the `heroBase`/`srcSet` logic from `BlogPostLayout.astro` lines 16–17 into a shared utility (e.g., `src/utils/heroSrcSet.ts`); wrap each card `<img>` in a `<picture>` with `<source type="image/webp" srcset={heroSrcSet(p.heroImage)} sizes="(min-width: 768px) 768px, 100vw" />`. Featured image on blog/index benefits most (LCP element).

- [ ] **[17] NEW — No dark mode support (`prefers-color-scheme: dark`)**  
  `BaseLayout.astro` defines all CSS custom properties in a single `:root` block with no `@media (prefers-color-scheme: dark)` variant. There is no `color-scheme` CSS property set on `body` or `:root`. Users who have enabled dark mode at the OS level see a bright white background and deep green text (#1a3d1a equivalent) regardless. The `color` guide states: "Support light and dark color schemes: Honor `@media (prefers-color-scheme: dark)` and pair it with the `color-scheme` CSS property so form controls, scrollbars, and other UA-rendered surfaces match." Confirmed: no instance of `prefers-color-scheme` or `color-scheme` exists anywhere in the codebase.  
  - **File:** [`src/layouts/BaseLayout.astro:133`](../src/layouts/BaseLayout.astro) (inline `<style>` block)  
  - **Fix:** Add a `@media (prefers-color-scheme: dark)` block to the inline `<style>` in `BaseLayout.astro` redefining the custom properties with dark-appropriate values; add `color-scheme: light dark` to `:root`.

---

### 🟢 Low

- [ ] **[9] NEW — `index.astro` and `faq.astro` have stale `dateModified`**  
  Both pages hardcode `"dateModified": "2026-06-30"`. The homepage was updated in Session D (fetchpriority on the phone mockup) and the FAQ in Session J (hover handler replacement). `blog/index.astro` and `release-notes.astro` were corrected in Session L; these two were missed. Confirmed in `dist/index.html`.  
  - **Files:** [`src/pages/index.astro:21`](../src/pages/index.astro), [`src/pages/faq.astro:100`](../src/pages/faq.astro)  
  - **Fix:** Update `dateModified` to `"2026-11-18"` in both files.

- [ ] **[10] NEW — `privacy.astro` and `terms.astro` `dateModified` contradicts stated content date**  
  Both pages have `"dateModified": "2026-06-30"` in their `WebPage` schemas, but their visible content says "Last updated May 05, 2026." The schema reports a date *later* than the actual content date, which is misleading to crawlers. Neither page has been updated through any audit session.  
  - **Files:** [`src/pages/privacy.astro:42`](../src/pages/privacy.astro), [`src/pages/terms.astro:53`](../src/pages/terms.astro)  
  - **Fix:** Change `dateModified` to `"2026-05-05"` in both files to match the stated "Last updated" date.

- [ ] **[11] NEW — `BlogPostLayout` publisher logo `ImageObject` missing `width`/`height`**  
  The `publisher.logo` `ImageObject` inside `blogPostingJsonLd` (lines 50–55) has only `@type` and `url`. The site-wide `Organization` schema correctly includes `width: 1024, height: 1024`; the per-post `BlogPosting` publisher logo does not. Google's structured data validator flags logo `ImageObject` entries without dimensions for `BlogPosting` rich results.  
  - **File:** [`src/layouts/BlogPostLayout.astro:50`](../src/layouts/BlogPostLayout.astro)  
  - **Fix:** Add `width: 1024, height: 1024` to the `publisher.logo` object inside `blogPostingJsonLd`.

- [ ] **[12] NEW — No `<link rel="sitemap">` in `<head>`**  
  `BaseLayout.astro` does not include a `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />` tag. The sitemap is generated correctly by `@astrojs/sitemap` and `robots.txt` already references it at `https://useplenish.com/sitemap-index.xml`. Adding the in-`<head>` hint improves crawler discoverability across all search engines without waiting for a manual Search Console submission. Confirmed absent in all 23 built HTML files.  
  - **File:** [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro)  
  - **Fix:** Add `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />` inside `<head>`.

- [x] **[13] NEW — `aria-hidden` without `="true"` on separator spans (10 instances, 4 files)** — Changed all 10 bare `aria-hidden` to `aria-hidden="true"` across `BlogPostLayout.astro`, `blog/index.astro`, `[category].astro`, `[tag].astro` (Session M).  
  Bare `aria-hidden` (no value) is non-standard; the spec requires `aria-hidden="true"`. All 10 instances are purely decorative separators (` / ` in breadcrumbs, ` · ` in post meta). Previous audit item [7] from 2026-11-18 reported only 4 instances in `BlogPostLayout` and `blog/index`; the same pattern exists in `[category].astro` (3 instances) and `[tag].astro` (3 instances). Confirmed in built HTML.  
  - **Files:**  
    - [`src/layouts/BlogPostLayout.astro:114`](../src/layouts/BlogPostLayout.astro), [`:116`](../src/layouts/BlogPostLayout.astro) (2×)  
    - [`src/pages/blog/index.astro:112`](../src/pages/blog/index.astro), [`~:148`](../src/pages/blog/index.astro) (2×)  
    - [`src/pages/blog/category/[category].astro:61`](../src/pages/blog/category/%5Bcategory%5D.astro), [`:63`](../src/pages/blog/category/%5Bcategory%5D.astro), [`~:101`](../src/pages/blog/category/%5Bcategory%5D.astro) (3×)  
    - [`src/pages/blog/tag/[tag].astro:62`](../src/pages/blog/tag/%5Btag%5D.astro), [`:64`](../src/pages/blog/tag/%5Btag%5D.astro), [`~:106`](../src/pages/blog/tag/%5Btag%5D.astro) (3×)  
  - **Fix:** Change all 10 instances from `aria-hidden` to `aria-hidden="true"`.

- [ ] **[14] NEW — No custom 404 error page**  
  No `src/pages/404.astro` exists. Astro serves its default 404, which has no site branding, header/footer, or helpful navigation links. A custom 404 keeps users on the site when they hit broken links and is consistent with every other page.  
  - **File:** `src/pages/404.astro` (new file)  
  - **Fix:** Create `src/pages/404.astro` using `BaseLayout` with the site header/footer; include a friendly heading, a brief message, and links to Home, Blog, and FAQ.

- [x] **[15] NEW — Card hover `scale-105` transform lacks `motion-safe:` guard** — Added `motion-safe:` prefix to `group-hover:scale-105 transition-transform duration-500` in `blog/index.astro`, `[category].astro`, and `[tag].astro` (Session M).  
  Blog post card images in `blog/index.astro` (and likely `[category].astro` / `[tag].astro`) use `group-hover:scale-105 transition-transform duration-500`. The `modern-web-guidance` motion guide states: "only dampen or disable spatial movement, scaling, rotation, or persistent animations" under reduced-motion preferences, and recommends defaulting to the static state and enabling spatial transforms only inside `@media (prefers-reduced-motion: no-preference)`. Tailwind's `motion-safe:` variant is the idiomatic way to do this.  
  - **Files:** [`src/pages/blog/index.astro`](../src/pages/blog/index.astro) (confirmed), `[category].astro` / `[tag].astro` (likely — same card pattern)  
  - **Fix:** Change `group-hover:scale-105 transition-transform duration-500` to `motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500`.

- [ ] **[16] NEW — Decorative inline SVGs missing `aria-hidden="true"`**  
  Multiple decorative `<svg>` elements are used as pure visual icons inside already-labelled interactive elements or as content decoration, but none carry `aria-hidden="true"`. The `accessibility` guide states: "Do hide decorative SVGs from assistive technologies: Apply `aria-hidden="true"` to decorative `<svg>` elements." Key instances: (a) `Header.astro` lines 39, 42 — hamburger/close icons inside `<button aria-label="Toggle menu">`, the button already has an accessible name so the SVGs are purely visual; (b) `faq.astro` line 146 (search magnifier inside search `<div>`), line 194 (chevron inside accordion button with text), line 223 (envelope inside `<a>` with text); (c) `index.astro` line 73 and 446 (ArrowRight icons inside `<a>Get Started</a>` links), and all feature/step/benefit icon SVGs (lines 135, 150, 165, 179, 198, 215, 243, 255, 271, 302, 322, 338, 373, 394, 409) which are decorative illustrations for nearby heading+body text.  
  - **Files:** [`src/components/Header.astro:39`](../src/components/Header.astro), [`src/pages/faq.astro:146`](../src/pages/faq.astro), [`src/pages/index.astro:73`](../src/pages/index.astro) (and several more lines in each file — see description above)  
  - **Fix:** Add `aria-hidden="true"` to each decorative `<svg>` element listed above.

- [ ] **[18] NEW — CSP missing `object-src 'none'` and `base-uri 'none'`**  
  The `Content-Security-Policy` in `vercel.json` (line 28) omits two directives the `security` guide classifies as mandatory: `object-src 'none'` (blocks Flash and other plugin-based code execution via `<object>`/`<embed>`) and `base-uri 'none'` (blocks `<base>` tag hijacking of relative URLs). Current CSP: `default-src 'self'; script-src 'self' 'unsafe-inline' …; connect-src …; img-src …; style-src …; font-src 'self'; frame-ancestors 'none'`. Neither `object-src` nor `base-uri` is in the policy. These two are safe to add immediately — they block attack vectors the site does not use — and do not require the Phase 2 CSP remediation.  
  - **File:** [`vercel.json:28`](../../vercel.json)  
  - **Fix:** Append `; object-src 'none'; base-uri 'none'` to the existing CSP `value` string.

---

## Session plan

> Sessions grouped by shared files and dependencies. No framework upgrades needed this cycle. Items within a session are safe to batch. Aim: 3–5 sessions; combine by default; only split for high-risk work, hard dependencies, or different tools.

---

### Session M — Blog listing pages + BlogPostLayout (6 items)
All items touch `blog/index.astro`, `[category].astro`, `[tag].astro`, or `BlogPostLayout.astro`. Doing them together opens each file once and avoids a second pass.

| Item | Change |
|------|--------|
| **[1]** | Add `fetchpriority="high"` to the featured post `<img>` in `blog/index.astro`. |
| **[8]** | Extract `heroBase`/`srcSet` logic into `src/utils/heroSrcSet.ts`; wrap card `<img>` elements in `<picture>` with WebP `<source>` in all three listing pages. |
| **[2]** | Add `width={p.heroImageWidth}` / `height={p.heroImageHeight}` to the card `<img>` in `[category].astro` and `[tag].astro`. |
| **[5]** | Replace `new Date().toISOString().slice(0, 10)` with a static date string in the `dateModified` fields of both category/tag pages. |
| **[13]** | Change all 10 bare `aria-hidden` instances to `aria-hidden="true"` across `BlogPostLayout.astro`, `blog/index.astro`, `[category].astro`, `[tag].astro`. |
| **[15]** | Change `group-hover:scale-105 transition-transform duration-500` to `motion-safe:group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500` in all three listing pages. |

**Depends on:** nothing  
**Test:** `npm run build` passes; `dist/blog/index.html` has `fetchpriority="high"` and a `<picture>` with WebP `<source>`; category/tag card `<img>` elements have `width`/`height`; no bare `aria-hidden` in built HTML; hover scale classes include `motion-safe:`.

---

### Session N — Sitewide layout, accessibility + dark mode (6 items)
All items touch shared layout files (`BaseLayout.astro`, `Header.astro`) or cross-page concerns. `[6]`, `[12]`, and `[17]` all edit `BaseLayout.astro`; `[7]` and `[16]` both touch `faq.astro`; `[16]` and `[6]` both touch `Header.astro`. Doing them together avoids re-opening those files in a later session.

| Item | Change |
|------|--------|
| **[6]** | Add `<a href="#main-content" class="sr-only focus:not-sr-only …">Skip to content</a>` as the first body element in `Header.astro` or `BaseLayout.astro`; add `id="main-content" tabindex="-1"` to `<main>` in all 9 page/layout files. |
| **[12]** | Add `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />` to `<head>` in `BaseLayout.astro`. |
| **[17]** | Add `@media (prefers-color-scheme: dark) { :root { … } }` block to the inline `<style>` in `BaseLayout.astro`; add `color-scheme: light dark` to `:root`. |
| **[7]** | Replace `focus:outline-none` on `.faq-trigger` in `faq.astro` with `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 rounded-sm`. |
| **[16]** | Add `aria-hidden="true"` to all decorative `<svg>` elements in `Header.astro`, `faq.astro`, and `index.astro`. |
| **[3]** | Add optional `width?: number` / `height?: number` to `ReleaseEntry.heroImage` in `releaseNotes.ts`; populate the existing entry; pass them on the `<img>` in `release-notes.astro`. |

**Depends on:** nothing (can run before or after Session M)  
**Test:** build passes; skip link appears on keyboard focus across pages; `dist/index.html` has `<link rel="sitemap">`; `BaseLayout.astro` inline style block has dark-mode `@media` and `color-scheme: light dark`; FAQ buttons show a visible ring on focus; decorative SVGs have `aria-hidden="true"`; release-notes hero `<img>` has `width`/`height`.

---

### Session O — Schema, metadata, cleanup + safe CSP append (5 items)
Low-impact cleanup items plus one safe 1-line append to `vercel.json`. `[18]` is a simple CSP addition (no breaking change); it is grouped here rather than in its own session because the risk is minimal. Deploy and verify headers with `curl -I` after this session.

| Item | Change |
|------|--------|
| **[9]** | Update `dateModified` to `"2026-11-18"` in `index.astro` and `faq.astro`. |
| **[10]** | Change `dateModified` to `"2026-05-05"` in `privacy.astro` and `terms.astro`. |
| **[11]** | Add `width: 1024, height: 1024` to the `publisher.logo` object inside `blogPostingJsonLd` in `BlogPostLayout.astro`. |
| **[14]** | Create `src/pages/404.astro` using `BaseLayout` with header, footer, friendly heading, and links to Home, Blog, FAQ. |
| **[18]** | Append `; object-src 'none'; base-uri 'none'` to the existing CSP value in `vercel.json`. |

**Depends on:** nothing (do before Session P, which also edits `vercel.json`)  
**Test:** build passes; `dateModified` values in built HTML match the static strings; Google Rich Results Test on a blog post shows logo dimensions; `/404` renders with site layout; `curl -I https://useplenish.com` shows `object-src 'none'` and `base-uri 'none'` in the CSP header.

---

### Session P — CSP Phase 2: eliminate `unsafe-inline` (1 item)
High-risk multi-file rewrite. Separated because it rewrites three `is:inline` scripts across files that Sessions M and N also touch, and it needs its own rollback point. Validate with `Content-Security-Policy-Report-Only` before switching to enforce.

| Item | Change |
|------|--------|
| **[4]** | Rewrite the three `is:inline` scripts (`BaseLayout.astro`, `Header.astro`, `faq.astro`) as external `<script>` modules; load PostHog via `<script src="…" async>`; remove `'unsafe-inline'` from `script-src` in `vercel.json`. |

**Depends on:** Sessions M, N, O complete (those files should be in their final state before this rewrite)  
**Test:** deploy with `Content-Security-Policy-Report-Only` first; check PostHog console for CSP violations; once clean, switch to enforce and confirm no violations in browser console.

---

## Analysis methodology (for future audits)

The following analysis methods were used in this audit. Running all three eliminates the gap where previous cycles missed issues.

1. **`legacy-scan`** — `npx -y modern-web-guidance@latest legacy-scan src --json` — detects ~20% of the guidance catalog via deterministic rules (inline handlers, deprecated APIs, etc.)
2. **Full 209-guide catalog sweep** — `npx -y modern-web-guidance@latest list` to get all 209 guide IDs, then retrieve every applicable guide for this stack (Astro, Tailwind, static marketing site with blog) — 11 guides fully read: `motion`, `accessibility` (1074 lines), `performance`, `deliver-optimized-decorative-images`, `html`, `breadcrumbs`, `navbar`, `color`, `typography`, `security`, `privacy`
3. **Built-HTML inspection** — `npm run build` then read `dist/` output for all pages; catches issues that only manifest in rendered output (schema rendering, missing attributes that weren't in the source, etc.)
4. **Full file tree read** — Glob `src/**/*.astro` + `public/**/*` to ensure no source file is missed; read every `.astro`, `.ts`, `.css`, and `.json` file before writing the audit
