# Audit Fix Session Prompt

How to use: start a new Claude Code session in this repo and say
"Run docs/audits/FIX_PROMPT.md for Session X" (use the session letter or
number from the audit's session plan). Update this file when the process
changes.

---

Read the most recent audit file in docs/audits/ and do only the session
I named.

## Before changing anything

1. Check git status is clean. If not, stop and tell me.
2. For each item in this session, confirm the problem still exists at
   the file and line given. If the code has moved or the issue is
   already fixed, say so.
3. Read the installed modern-web-guidance SKILL.md, then retrieve and
   read in full every guide related to this session's items.
4. Give me your plan in a few bullets: which items (by number), what
   you'll change, any decisions you need from me, and anything that
   needs a tool other than Claude Code (Lovable, Vercel, Supabase
   dashboard). Wait for my OK.

## While working

- Stay within this session's items. Follow CLAUDE.md and AGENTS.md.
- If you find something else that needs fixing, don't fix it. Add it
  to a "Found during fixes" section at the end of the audit file with
  file, line and a one-line description.

## After the changes

1. Run the repo's build (and lint if it has one) and fix any errors.
2. Verify each item is actually resolved: re-run legacy-scan on
   changed files, re-check the specific problem, and check other places
   that use anything you changed.
3. Review your full diff once before reporting.
4. In the audit file, tick off completed items with a one-line note of
   what was done. Mark anything partial or blocked as such instead of
   ticking it.
5. Tell me what changed, what needs a Lovable or dashboard step, and a
   short test list: which pages to check, and any keyboard, mobile or
   screen reader checks for accessibility items.

Don't commit.
