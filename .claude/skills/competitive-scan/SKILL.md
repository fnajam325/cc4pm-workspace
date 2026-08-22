---
name: competitive-scan
description: Runs a competitive-intelligence scan for Nudge Engage v2 — researches spending-insights/budgeting/habit-building apps, produces a comparison matrix and white-space analysis, and saves it as a new dated, non-overwriting snapshot. Use when the user types /competitive-scan, or mentions wanting a fresh competitive check, market scan, or "how's the market looking" for this project.
---

# Competitive Scan

Project-scoped skill for `/Users/faran/cc4pm_workspace_august/` (Nudge — Engage v2 discovery cycle).

## Trigger

- Explicit: `/competitive-scan`
- Implicit: the user mentions wanting a competitive/market check for this project (e.g., "run competitive intel," "how's the market looking," "any new competitor moves"). When implicit, confirm before running — don't launch web research unprompted.

## Methodology (keep consistent run over run)

1. Identify 3-5 competitors in the space: apps built around spending insights, budgeting, and financial habit building after account connection. Exclude apps primarily about banking, investing, or credit monitoring. Use the prior run's competitor set as a starting point (see `research/competitive-scans/README.md`) and add/drop only if the market has genuinely shifted.
2. For each competitor, research via WebSearch/WebFetch:
   - Core features
   - Pricing model
   - Target customer
   - How they keep users engaged after initial account connection
   - Notable recent changes (App Store/Google Play reviews, launch announcements)
3. Produce a comparison matrix (table) across all competitors.
4. Identify 2 gaps none of them own well — the white space for Nudge Engage v2. Cross-reference against `strategy.md`'s existing findings (pull vs. push tension, precision-before-frequency, goal continuity, timeline mismatch) — note where new findings confirm, refine, or contradict prior conclusions.
5. Include a Sources section with markdown links to everything cited.

## Output — dated, non-overwriting

1. Save the full report to `research/competitive-scans/YYYY-MM-DD.md` (today's date). Never overwrite a prior dated file.
2. Overwrite `research/competitive-scans/latest.md` with the new report's content, plus a one-line header noting the run date and linking to the dated file and the README index.
3. Add a row to `research/competitive-scans/README.md` (date, competitors covered, headline finding, link to the dated file).
4. Update `CLAUDE.md`'s Project Files index if the link target isn't already `research/competitive-scans/latest.md`.

## After generating

Propose (don't silently write) the relevant updates to `strategy.md`'s "Competitive White Space" section and a `change_log.md` entry, following the same propose-diff-then-approve pattern used elsewhere in this project. If this run's findings differ meaningfully from the prior run, call that out explicitly — a changed competitive landscape is itself a signal worth logging.
