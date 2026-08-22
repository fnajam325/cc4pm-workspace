---
name: team-update
description: Writes an async team status update for Raj and Lena, calibrated to each of their stakeholder profiles (communication style, what they push back on, what they need to feel informed). Use when the user asks for a team update, status update for Raj/Lena/the squad, or types /team-update.
---

# Team Update

Project-scoped skill for `/Users/faran/cc4pm_workspace_august/` (Nudge — Engage v2 discovery cycle).

## Before writing

1. Re-read `stakeholders/raj.md` and `stakeholders/lena.md` in full — don't rely on memory, their profiles get updated as the project evolves.
2. Pull current status from the freshest sources: the top few entries of `change_log.md` (newest first), `docs/prds/latest.md`'s Open Questions/Next Steps, and any live experiment data (`data/metric-findings.md`, `data/metric-diagnosis.md`) if relevant. Status updates go stale fast in this project — always check what's actually current, don't reuse a prior update's content.

## Format

One doc, two clearly separated sections — this is a single async post to a shared channel, not two DMs.

**Shared top-line:** 2-3 sentences max, no framing needed for either person specifically — just the current state anyone glancing at the channel needs.

**Raj's section:**
- Bullets, not paragraphs
- Every open item flagged explicitly and proactively — his profile says he dislikes being surprised in standups, so nothing should reach him for the first time in a meeting
- Resolved items stated as resolved, plainly — don't make him re-ask something already answered
- Any new ask framed by what stage it's at (e.g., "scoping request coming, not an estimate ask yet") rather than an open-ended or underspecified ask landing on him
- If a known blocker or edge case exists, name it even if it's not urgent — his bar is "what does done look like," and silence on a known gap reads as it being hidden, not resolved

**Lena's section:**
- Frame around evidence, ideally "here's what users told us" — her profile responds to that framing specifically
- Be explicit about the evidentiary weight of anything cited: real user data vs. simulated/agent-generated testing vs. inference. Don't blur this even if it makes the update longer — she's flagged this distinction as mattering to her before
- Name explicitly which decisions are hers to own (design/framing calls) vs. what's just informational
- If nothing new has real user validation yet, say so directly rather than letting silence imply it does

## After writing — dated, non-overwriting

Status updates are archived like the competitive scans in `research/competitive-scans/`: one permanent file per run, never overwritten.

1. Write (or update) `docs/status-updates/YYYY-MM-DD.md` (today's date) with the Team Update section. If `leadership-update` has already run for today and a file for today's date exists, add/update only the Team Update section in that same file — don't create a second file for the same day.
2. Overwrite `docs/status-updates/latest.md` with the current full contents of today's dated file, plus the one-line header noting the run date and linking to the dated file and the README index (same pattern as `research/competitive-scans/latest.md`).
3. Add or update today's row in `docs/status-updates/README.md` (date, one-line headline, link to the dated file).
4. Follow this project's standard tracking convention: propose adding/confirming `docs/status-updates/latest.md` and `README.md` in `CLAUDE.md`'s Project Files index (only needed once, not every run) and logging the update in `change_log.md`.
