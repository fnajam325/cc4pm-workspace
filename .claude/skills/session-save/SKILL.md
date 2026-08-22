---
name: session-save
description: End-of-session hygiene pass for the Nudge Engage v2 project. Reviews what was discussed/decided in the current conversation and proposes updates to project.md, strategy.md, change_log.md, and CLAUDE.md — asking for approval before writing anything. Use when the user types /session-save or asks to wrap up / save session progress.
---

# Session Save

Project-scoped skill for `/Users/faran/cc4pm_workspace_august/` (Nudge — Engage v2 discovery cycle).

## What this project's files are for

- `CLAUDE.md` — orientation only: fictional-scenario disclaimer, Key Tension, Open Decision, Project Files index, Working Notes. **Never duplicate content that lives in another file.**
- `project.md` — what Nudge is, squad, current phase, stakeholders, problem statement
- `strategy.md` — retention-recovery hypothesis and candidate direction(s)
- `change_log.md` — audit trail of decisions, format: `Date — Decision — Rationale — Owner`, newest entries at top

## Steps

1. **Review the session.** Look back over the current conversation (since the last save, or from the start if this is the first save) for anything that changes the project's understanding: new facts, hypothesis changes, stakeholder/context updates, or decisions made.

2. **Sort findings by destination:**
   - New/changed facts about the product, squad, phase, or stakeholders → `project.md`
   - New/changed hypothesis, supporting signal, or candidate direction → `strategy.md`
   - A decision that was made (not just discussed) → `change_log.md`, dated with today's date, one line: decision, rationale, owner
   - Anything that doesn't cleanly fit an existing file → do **not** force it into one. Ask the user whether it warrants a new file, and if so, confirm the filename and one-line purpose before creating it.

3. **Check CLAUDE.md hygiene.** If anything from this session would duplicate content now stored in `project.md`/`strategy.md`/`change_log.md` (or a new file), it does not get added to CLAUDE.md — only update CLAUDE.md's Key Tension, Open Decision, or Working Notes if those specifically have changed, and update the Project Files index if a new file was created.

4. **Present a proposed diff before writing anything.** Summarize, file by file, exactly what would be added/changed — do not write to disk yet. Wait for explicit approval.

5. **On approval, write the changes.** Use each file's existing structure and tone; don't reformat unrelated content.

6. **If nothing in the session warrants an update,** say so plainly rather than inventing changes to justify the save.
