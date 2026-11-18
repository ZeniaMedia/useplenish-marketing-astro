# Modern Web Audit — 2026-11-16

**Stack:** Astro 4.16 · Tailwind 3.4 · `@astrojs/tailwind` 5.1 · `@astrojs/sitemap` 3.2 · TypeScript (base) · Static output  
**Tool:** `modern-web-guidance@latest` legacy-scan + manual review  
**Findings:** 4 high · 7 medium · 4 low = 15 total

---

## Checklist

### 🔴 High

- [x] **[1] Add security headers** — no `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy` anywhere in the repo. Minimum viable set to add to hosting config (`vercel.json` / `netlify.toml` / CDN headers):
  ```
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  ```
  Add CSP as report-only first (Phase 2 discovery) before enforcing — the site has `is:inline` scripts and PostHog loading from an external origin that must be inventoried before enforcement.
  - **Files:** hosting headers config (new); `astro.config.mjs` (Astro dev server headers as fallback)

- [x] **[2] Add `fetchpriority="high"` and `height` to hero (LCP) image** — homepage phone mockup has `loading="eager"` but is missing `fetchpriority="high"` and the `height` attribute. Both are required: `fetchpriority` to signal LCP priority to the browser, `height` to prevent CLS.
  - **File:** [`src/pages/index.astro:95-101`](../src/pages/index.astro)
  - **Fix:** Add `fetchpriority="high" height="512"` (verify actual pixel height) to the `<img>`.

- [x] **[3] Move PostHog analytics script out of `<head>`** — `is:inline` PostHog snippet sits in `<head>` with no `defer`, blocking DOM construction and hurting LCP. The inner dynamically-created `<script>` sets `p.async = true`, but the outer wrapper tag itself still blocks.
  - **File:** [`src/layouts/BaseLayout.astro:127-133`](../src/layouts/BaseLayout.astro)
  - **Fix:** Move snippet to end of `<body>` (add a `<slot name="body-end">` to BaseLayout) or restructure so the outer `<script>` tag carries `defer`.

- [x] **[4] Replace `onmouseover`/`onmouseout` inline event handlers** — CTA buttons on the homepage use inline `onmouseover`/`onmouseout` to toggle `style.background`. Inline handlers are an HTML anti-pattern and will break under any future CSP `script-src` policy.
  - **File:** [`src/pages/index.astro:72-73`](../src/pages/index.astro), [`:441-442`](../src/pages/index.astro)
  - **Fix:** Replace with Tailwind hover utilities (e.g., `hover:bg-white/90`) — consistent with how hover states are handled everywhere else on the site.

---

### 🟡 Medium

- [ ] **[5] Use `toSorted()` instead of `[...array].sort()`** — ES2023 `toSorted()` is Baseline Widely Available and replaces the copy-then-sort pattern.
  - **Files:**
    - [`src/pages/blog/index.astro:31`](../src/pages/blog/index.astro) — `[...publishedPosts].sort(...)`
    - [`src/pages/release-notes.astro:29`](../src/pages/release-notes.astro) — `[...releaseNotes].sort(...)`
  - **Fix:** `publishedPosts.toSorted(...)` / `releaseNotes.toSorted(...)`

- [x] **[6] Add WebP/AVIF variants and `<picture>` for homepage hero image** — `dashboard-screenshot.png` is a plain `<img>` with no WebP or AVIF variant and no responsive `srcset`/`sizes`. Blog post heroes already use `<picture>` with WebP srcset correctly.
  - **File:** [`src/pages/index.astro:95-101`](../src/pages/index.astro)
  - **Fix:** Generate `dashboard-screenshot-768.webp`, `-1200.webp`, `-1600.webp`; wrap in `<picture>` with `<source type="image/webp" srcset="..." sizes="...">`.

- [ ] **[7] Verify blog hero `width`/`height` match actual image proportions** — the layout declares `width="1600" height="900"` on all blog hero fallback `<img>` tags. The GLP-1 chart hero uses `heroFit: "contain"` with a 16/9 wrapper; if the actual image isn't 16:9, the declared dimensions cause minor CLS.
  - **File:** [`src/layouts/BlogPostLayout.astro:141-148`](../src/layouts/BlogPostLayout.astro)
  - **Fix:** Confirm actual pixel dimensions of each hero image and update the data or layout accordingly.

- [x] **[8] Narrow the Tailwind `safelist` prose pattern** — `{ pattern: /^prose-/ }` safelists every `prose-*` variant and bloats generated CSS with unused modifier classes.
  - **File:** [`tailwind.config.mjs:9`](../tailwind.config.mjs)
  - **Fix:** Replace pattern with the specific classes actually used (e.g., `'prose-lg'`, `'prose-green'`).

- [ ] **[9] Fix `datePublished` to full ISO 8601 dates** — `"datePublished": "2026"` is not valid ISO 8601; Schema.org / Google's rich result parser expects `YYYY-MM-DD`.
  - **Files:**
    - [`src/pages/index.astro:21`](../src/pages/index.astro)
    - [`src/pages/blog/index.astro:47`](../src/pages/blog/index.astro)
    - [`src/pages/release-notes.astro:45`](../src/pages/release-notes.astro)
  - **Fix:** Replace bare year strings with full dates, e.g. `"2026-01-01"`.

- [ ] **[10] Add `aria-label="Main"` to header `<nav>`** — pages with both the site nav and a breadcrumb nav have two unlabelled `<nav>` landmarks. Screen readers announce both as "navigation" with no distinction.
  - **File:** [`src/components/Header.astro:5`](../src/components/Header.astro)
  - **Fix:** Add `aria-label="Main"` to the `<nav>` element. (Breadcrumb nav in BlogPostLayout already has `aria-label="Breadcrumb"`.)

- [ ] **[11] Add `width` attribute to footer logo `<img>`** — has `height="32"` but no `width`, preventing the browser from reserving aspect-ratio space and risking minor CLS.
  - **File:** [`src/components/Footer.astro:14`](../src/components/Footer.astro)
  - **Fix:** Add `width="auto"` or the actual pixel width of `plenish-full-logo.png`.

---

### 🟢 Low

- [x] **[12] Add `preconnect` hints for PostHog origins** — no early connection warmup for PostHog's two domains, adding a TLS round-trip to analytics load time.
  - **File:** [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro)
  - **Fix:** Add to `<head>`:
    ```html
    <link rel="preconnect" href="https://us-assets.i.posthog.com" />
    <link rel="preconnect" href="https://us.i.posthog.com" />
    ```

- [x] **[13] Remove redundant `font-family` declaration on `body`** — the system font stack is defined in both `tailwind.config.mjs` and as an inline style on `body` in BaseLayout. `body` already applies `font-sans` via Tailwind, making the inline declaration redundant.
  - **Files:** [`src/layouts/BaseLayout.astro:160`](../src/layouts/BaseLayout.astro), [`tailwind.config.mjs:54`](../tailwind.config.mjs)
  - **Fix:** Remove the `font-family` line from the `body` rule in BaseLayout's `<style>` block.

- [x] **[14] Derive `softwareVersion` in schema from release data** — `"softwareVersion": "2026.06.28"` is hardcoded in the site-wide `SoftwareApplication` schema and will silently diverge from the actual latest release.
  - **File:** [`src/layouts/BaseLayout.astro:102`](../src/layouts/BaseLayout.astro)
  - **Fix:** Import `releaseNotes` and use `releaseNotes[0].id` or `.date` to derive the version at build time.

- [ ] **[15] Type-safe image variant references in release notes** — the WebP srcset in the release notes page is assembled by runtime string manipulation (replacing file extensions). A missing WebP file silently returns a 404 with no build-time warning.
  - **Files:** [`src/pages/release-notes.astro:132`](../src/pages/release-notes.astro), [`src/data/releaseNotes.ts`](../src/data/releaseNotes.ts)
  - **Fix:** Add typed `heroImageSrcSet` or `heroImageVariants` fields to the `releaseNotes.ts` data, so missing variants fail at the data layer rather than silently at runtime.

---

## Session plan

> Sessions are grouped by shared files and dependencies. Framework upgrades first and on their own — they change the config surface everything else builds on.

---

### Session A — Framework upgrades (do first, isolated)
These change the build config and integration surface; complete before any other session.

| # | Item |
|---|------|
| ✅ | **Astro 4 → 7**: Dropped `@astrojs/tailwind`, adopted `@tailwindcss/vite` plugin via `astro.config.mjs`. Astro upgraded to v7.4.12, `@astrojs/sitemap` to v3.7.5. |
| ✅ | **Tailwind 3 → 4**: Removed `tailwind.config.mjs`; created `src/styles/global.css` with `@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, and `@theme inline` block carrying all custom colors, radii, font family, animations, and container utility. |

> ✅ Item [8] resolved: `tailwind.config.mjs` removed; safelist no longer exists; Tailwind 4 auto-detects `prose-*` modifiers from templates.  
> ⚠️ Item [13] not auto-resolved: inline `font-family` on `body` in BaseLayout.astro still present — address in Session C.

---

### Session B — Security headers (independent, no code changes)
Requires knowing your hosting provider. No source file edits needed.

| # | Item |
|---|------|
| ✅ | **X-Frame-Options**, **X-Content-Type-Options**, **Referrer-Policy**, **HSTS** (`max-age=31536000`, no `includeSubDomains`) added to `vercel.json` and mirrored in `vite.server.headers` in `astro.config.mjs`. |
| ✅ | **`Content-Security-Policy-Report-Only`** deployed (report-only; allows PostHog inline + `us-assets.i.posthog.com` / `us.i.posthog.com`). No `report-uri` yet — violations appear in browser console. Add a reporting endpoint (e.g. Report URI, Sentry) before Phase 2 enforcement. |

---

### Session C — BaseLayout.astro (batch, single file)
All changes touch `src/layouts/BaseLayout.astro`.

| # | Item |
|---|------|
| ✅ | **[3]** Move PostHog script to end of `<body>` (removed from `<head>`, placed before `</body>`). |
| ✅ | **[12]** Added `preconnect` hints for `us-assets.i.posthog.com` and `us.i.posthog.com`. |
| ✅ | **[13]** Removed redundant `font-family` from `body` rule; `font-sans` class already applies it. |
| ✅ | **[14]** `softwareVersion` now derived from `releaseNotes[0].version` at build time. |

---

### Session D — Homepage (batch, single file)
All changes touch `src/pages/index.astro`.

| # | Item |
|---|------|
| ✅ | **[2]** `fetchpriority="high"` and `height="570"` added to hero `<img>` (image is 862×1920; proportional height at display width 256px). |
| ✅ | **[4]** Replaced `onmouseover`/`onmouseout` on all three CTA buttons with Tailwind `hover:bg-white/90` / `hover:bg-white/10`; inline `style` backgrounds moved to Tailwind classes. |
| ✅ | **[6]** Generated `dashboard-screenshot-256.webp` (16 KB) and `dashboard-screenshot-512.webp` (41 KB) with `sharp`; hero `<img>` wrapped in `<picture>` with `<source type="image/webp">` and responsive `sizes`. |

---

### Session E — Shared components (Header + Footer)
Small, isolated, component-level.

| # | Item |
|---|------|
| [10] | Add `aria-label="Main"` to `<nav>` in `Header.astro`. |
| [11] | Add `width` to footer logo `<img>` in `Footer.astro`. |

---

### Session F — Data layer and release notes
Touches data files and the release-notes page.

| # | Item |
|---|------|
| [5] | `toSorted()` in `src/pages/release-notes.astro`. |
| [15] | Add typed image variant fields to `src/data/releaseNotes.ts`; update `src/pages/release-notes.astro` to consume them. |

---

### Session G — Blog and cross-page SEO/schema
Touches blog pages and schema metadata.

| # | Item |
|---|------|
| [5] | `toSorted()` in `src/pages/blog/index.astro`. |
| [7] | Verify hero image dimensions in `BlogPostLayout.astro`. |
| [8] | Narrow Tailwind `safelist` in `tailwind.config.mjs` (skip if Tailwind 4 upgrade already resolved). |
| [9] | Fix `datePublished` bare-year strings in `index.astro`, `blog/index.astro`, `release-notes.astro`. |
