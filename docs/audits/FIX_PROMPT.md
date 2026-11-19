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
   read in full the guides listed on this session's items (their
   "Guides" lines). If an item lists none, search for related guides.
4. Give me your plan in a few bullets: which items (by number), what
   you'll change, any decisions you need from me, and anything that
   needs a tool other than Claude Code (Vercel, Google Search Console). Wait for my OK.

## While working

- Stay within this session's items. Follow CLAUDE.md and AGENTS.md.
- If you find something else that needs fixing, don't fix it. Add it
  to a "Found during fixes" section at the end of the audit file,
  numbered after the audit's last item ([26], [27]...) and in the same
  format as the checklist: short title, severity, Build Tool, file and
  line, problem, fix, Guides and Verify by.

## After the changes

1. Run the repo's build (and lint if it has one) and fix any errors.
2. Verify each item using its "Verify by" line. Also re-run
   legacy-scan on changed files and check other places that use
   anything you changed.
3. Review your full diff once before reporting.
4. In the audit file, tick off completed items with a one-line note of
   what was done. Mark anything partial or blocked as such instead of
   ticking it.
5. Tell me what changed, what needs a dashboard step, and a short test list: which pages
   to check, and any keyboard, mobile or screen reader checks for
   accessibility items.

## Finish with these, ready to copy

- The git commands: a `git add` with the exact files changed in this
  session (including the audit file), then
  `git commit -m "Audit fixes: Session X [n][n][n]"` with the session
  and the item numbers completed. Don't include unrelated files.
- Asana tasks to close: the completed items' short titles with their
  number at the end, one per line (for example
  `Update security headers [5]`). List partial or blocked items
  separately.
- Any new "Found during fixes" items by number, so I can create tasks
  for them.

Don't commit.
