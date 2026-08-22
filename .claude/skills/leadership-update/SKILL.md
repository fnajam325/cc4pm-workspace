---
name: leadership-update
description: Writes a leadership status update for Marcus, calibrated to his stakeholder profile (recommendation-first, one page, business-outcome framing, specific ask with a deadline or explicit no-ask). Use when the user asks for a leadership update, exec update, update for Marcus, or types /leadership-update.
---

# Leadership Update

Project-scoped skill for `/Users/faran/cc4pm_workspace_august/` (Nudge — Engage v2 discovery cycle).

## Before writing

1. Re-read `stakeholders/marcus.md` in full — don't rely on memory, his profile and open items get updated as the project evolves.
2. Pull current status from the freshest sources: the top few entries of `change_log.md`, `docs/prds/latest.md`'s Success Metrics and Open Questions, and any live experiment data (`data/metric-findings.md`, `data/metric-diagnosis.md`). Marcus reads the doc before any meeting — it has to be accurate standalone, not a jumping-off point for verbal context.

## Format — hard constraints from his profile

- **One page.** If it doesn't fit, cut detail, don't shrink the font or wrap sections — his profile says he pushes back on anything requiring more than one page.
- **Recommendation in the first sentence, not the last.** Never build up to it.
- **Business-outcome framing throughout.** Connect every data point to what it means for 30-day retention or the decision at hand — he pushes back on data that doesn't connect to a business outcome. Avoid presenting metrics as pure status without stating their implication.
- **A specific ask with a deadline, or an explicit statement that no decision is needed yet.** Never leave him to infer what's being asked of him.
- **State the cost of waiting, if relevant** — he's on record asking this before ("what is the cost of waiting another quarter?"). If a recommendation involves more time, quantify how much and why, don't leave it open-ended.
- **Surface real risk even if not required.** His profile shows he wants confidence the team has pressure-tested the idea — don't omit an inconvenient finding to make the update read cleaner; state it plainly and say whether it has a plan yet.

## Structure

1. **Recommendation** (1-2 sentences, states the ask or explicitly says none is needed)
2. **What we know** (the specific numbers tied to business outcome — significance status, not just point estimates)
3. **New risk, if any** (with a one-line plan or explicit "no plan yet")
4. **Cost of waiting**, if the recommendation involves time
5. **Ask** (deadline or explicit "no decision needed, checking back on [date]")

## After writing — dated, non-overwriting

Status updates are archived like the competitive scans in `research/competitive-scans/`: one permanent file per run, never overwritten.

1. Write (or update) `docs/status-updates/YYYY-MM-DD.md` (today's date) with the Leadership Update section. If `team-update` has already run for today and a file for today's date exists, add/update only the Leadership Update section in that same file — don't create a second file for the same day.
2. Overwrite `docs/status-updates/latest.md` with the current full contents of today's dated file, plus the one-line header noting the run date and linking to the dated file and the README index (same pattern as `research/competitive-scans/latest.md`).
3. Add or update today's row in `docs/status-updates/README.md` (date, one-line headline, link to the dated file).
4. Follow this project's standard tracking convention: propose adding/confirming `docs/status-updates/latest.md` and `README.md` in `CLAUDE.md`'s Project Files index (only needed once, not every run) and logging the update in `change_log.md`.
