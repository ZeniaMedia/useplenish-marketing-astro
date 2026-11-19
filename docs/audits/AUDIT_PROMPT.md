# Modern Web Audit Prompt (Marketing Site)

How to use: start a new Claude Code session in this repo and say
"Run the audit prompt in docs/audits/AUDIT_PROMPT.md". Update this file
when the process changes.

---

Run a full modern web audit of this repo. Completeness matters more than
speed: the goal is one audit that doesn't need to be re-run. Don't fix
anything.

Context: Astro + Tailwind static marketing site for useplenish.com, built
with Claude Code, deployed on Vercel. Use today's date wherever this
prompt says DATE.

## Phase 0: Setup

1. Read the installed modern-web-guidance SKILL.md in full and follow its
   current commands. If its commands differ from the ones named here,
   the SKILL.md wins.
2. Record the skill version and the total guide count.
3. List the full guide catalog (don't rely on search alone). Note any
   guides or categories that are new since the last audit.
4. Read the most recent file in docs/audits/ so you can compare.

## Phase 1: Coverage map

5. Start from the previous audit's coverage map (Appendix A), if there
   is one: re-check that each Not applicable reason still holds, and
   fully evaluate any guide that's new or missing from it. For every
   guide in the catalog, decide Applies or Not applicable,
   with a one-line reason. Judge by what this site does or reasonably
   should do, not just by what's in the code today.
6. Retrieve and read every applicable guide in full. If output is saved
   to a temp file, read the whole file, not the first part.

## Phase 2: Findings

7. Run legacy-scan on the whole repo (not just src/). Verify each finding
   against its keepWhen/dropWhen rubric and drop false positives.
8. Check every source file against every applicable guide. Also run
   npm run build and check the built HTML in dist/, since that's what
   visitors get.
9. Beyond the guides, check these angles too:
   - Packages: outdated majors, known vulnerabilities (npm audit),
     unused dependencies
   - Baseline changes: fallbacks or polyfills that are no longer needed,
     and newly safe features worth adopting
   - Browser support policy: is one documented in AGENTS.md? If not,
     flag it
   - Hosting: vercel.json headers, redirects, caching, HTTPS
   - SEO and sharing: titles, descriptions, canonicals, OG/Twitter
     tags, structured data, sitemap, robots.txt, llms.txt
   - Accessibility beyond the guides: color contrast (calculate it),
     focus states, reduced motion, heading order, alt text, link text,
     touch target size, zoom and text scaling
   - Performance: image formats and sizes, LCP element, layout shift,
     render-blocking scripts, third-party scripts (PostHog), fonts
   - Privacy: analytics consent, what PostHog collects, privacy policy
     accuracy
   - Content: broken internal and external links, missing pages,
     outdated dates or copy
   - Anything else a senior web developer would check on a site like
     this. List what you added and why.

## Phase 3: Second pass (independent check)

10. Start a separate subagent that has NOT seen your findings. Give it
    only this repo, the catalog and the coverage map, and have it do its
    own audit. Merge anything it found that you missed.
11. Re-verify every finding yourself: re-open each file and line, re-run
    each grep, recalculate any contrast ratios. Remove anything you
    can't confirm, or mark it [UNVERIFIED] with what's needed to
    confirm it.
12. Re-check the coverage map. For each applicable guide, confirm it
    produced a finding or a "verified clean" note.

## Output

Save to docs/audits/modern-web-audit-DATE.md with:

- Summary: counts by severity, plus skill version and guide count
- Checklist: number every item [1], [2], [3]... in one sequence across
  the whole file. For each item give: title, severity, status vs last
  audit (New / Returning / Fixed), Build Tool (Claude Code, Hosting /
  DNS, Google Search Console or No Code), file paths with line numbers,
  the problem, the fix, and three more lines:
  - Short title: 3 to 8 words, plain language, starts with a verb, no
    em dashes (used as the Asana task name)
  - Guides: the modern-web-guidance guide IDs this finding is based on
    ("none" for findings from the extra angles)
  - Verify by: how to confirm the fix worked (a command, a grep or a
    browser check)
  Severity: High = hurts users, security or search now. Medium = real
  gap, should fix this quarter. Low = cleanup or nice to have.
- Fixed since last audit: items from the previous audit that are now
  resolved
- Verified clean: what was checked and found fine
- Session plan: group items into as few fix sessions as practical
  (Session A, B, C...), with upgrades first.
  Each fix session has a fixed cost (setup, reading guides, build,
  verification, testing, commit), so combine by default. Only put items
  in separate sessions when:
  - the work is high risk and needs its own rollback point (framework or
    major package upgrades, hosting or header changes)
  - it depends on another session being done and tested first
  - it needs a different tool (for example a Vercel dashboard step)
  - one session would be too big to finish and verify well (roughly
    10 to 15 items, or several large changes)
  Put leftover Low items into one cleanup session. Aim for 3 to 5
  sessions unless the audit is unusually large. For each session list
  the items, why they're together, what it depends on and what to test.
- Appendix A: the full coverage map (every guide, Applies or Not
  applicable, reason)
- Appendix B: methodology (commands run, guides read, extra angles
  checked, what the second pass added)

If you run low on context, save progress to the file and keep going
rather than cutting the audit short. When done, tell me the counts and
anything you couldn't verify.
