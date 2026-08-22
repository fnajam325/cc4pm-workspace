# Capstone Review Session

*Note: fictional course scenario. Full review of the Engage v2 workspace: what's been built, confidence per artifact, fixes applied, and a portable prompt for reusing this workflow elsewhere.*

*Revision note: this file went through two correction passes after the user caught real gaps — the first draft listed deliverables but not the methods behind them (skills only counted, not named; the agentic-interview technique undocumented; the portable prompt referenced but not saved). A second cross-check against every file in the repo found two more of the same kind (historical-version reconstruction for the persona-testing deck; live interaction verification for the prototype). Documenting this here too, since a review doc that needed reviewing is itself worth being honest about.*

## 1. What's Been Built

A full simulated PM workflow, end to end, for one initiative (recovering 30-day retention via a personalized weekly summary):

- **Foundation:** `CLAUDE.md`, `project.md`, `strategy.md`, `change_log.md` (+ archive)
- **Research:** interview synthesis, NPS synthesis, dated/archived competitive scan
- **Prototype & testing:** interactive HTML prototype, PM brief, 3-round agent-simulated persona testing with a fix shipped per round, a testing deck, a hypothesis synthesis
- **Spec & stakeholder alignment:** triad session prep, spec-readiness pressure-test, design review (produced a week-2+ loop brief), QA checklist, objection log
- **Real data work:** SQL analysis of a live experiment with significance testing, a root-cause diagnosis with 4 ranked/confidence-scored hypotheses (one disconfirmed by follow-up query)
- **Decision & delivery:** decision brief, dated/archived PRD, dated/archived status updates, a not-yet-activated Friday job spec, a quarterly review deck + narrative + speaker notes
- **Tooling — 5 project-scoped skills, named:**
  - `session-save` — reviews a session's changes and proposes updates to the core tracking files before writing
  - `competitive-scan` — re-runs the competitive landscape research on a cadence/trigger, saving dated snapshots
  - `write-prd` — writes/updates the PRD in this project's established structure, dated and non-overwriting
  - `team-update` — async status update for Raj/Lena, calibrated to each profile's communication style
  - `leadership-update` — one-page, recommendation-first status update for Marcus
  - Plus: `write-prd` packaged as an installable plugin, marketplace-publishing instructions, gitignored stakeholder profiles (+ now a portable template), consolidated build scripts, a root README, change-log archiving

- **Agentic interviews — a distinct technique used 3 times:** `docs/spec-readiness.md`, `docs/design-review.md`, and `docs/objection-log.md` weren't single-voice write-ups. Claude played a named persona (Raj, then Lena, then Raj/Marcus/Tom together) while a **separately spawned agent** played the counterpart (the PM defending the work) — genuine back-and-forth negotiation with real pushback and concessions, not one voice simulating a conversation. This is different from the prototype persona testing (single-agent role-play, no counterpart) — see confidence notes below, they carry different reliability.

- **Historical-version reconstruction for the before/after decks:** `docs/prototype-testing-deck.pptx` required screenshots of the prototype at 4 different points in its edit history. Rather than guess, each version (`research/prototype-versions/v1.html` through `v4.html`) was reconstructed exactly from the actual edit diffs applied that session, verified with a real `diff` against the final file before rendering, then screenshotted via headless Chrome (`v1.png`–`v4.png`) and assembled into the deck (`build-scripts/prototype-testing-deck.build.js`). Not a re-creation from memory — a verified reconstruction.

- **Live interaction verification, not just code review:** the interactive prototype (`prototype/index.html`) was verified by actually clicking through its flows in the Browser pane (toggling goal states, confirming the goal-setting flow updates the UI live) — confirming the JavaScript worked as intended, not just that the code looked right on read-through.

## 2. Confidence by Artifact

| Artifact cluster | Confidence | What would close the gap to 95% |
|---|---|---|
| Interview + NPS research | ~75% | Larger, statistically representative sample |
| Competitive scan | ~80% | Re-run on a cadence (skill already supports this) |
| Prototype | ~70% | Real backend, full ranking logic, a real mobile input component |
| 3-round persona testing | ~85% as hypothesis generator, ~40% as validated reaction | Real moderated sessions with actual users |
| Spec-readiness / design-review / QA | ~90% | Verify against the actual shipped codebase (which doesn't exist here — see Fix A) |
| Data analysis (findings + diagnosis) | ~90% on methodology | More experiment weeks — n=50/arm is underpowered for day-30 |
| PRD | ~90% as accurate reflection of state | Inherits the day-30 uncertainty above |
| Objection log / stakeholder pressure-tests | ~65-70% | Run it past the real people, not role-play |
| Decks/presentations | ~95% content, ~80% visual polish | No LibreOffice in this environment — content/bounds QA only, no full visual render |
| Skills/tooling (`session-save`, `competitive-scan`, `write-prd`, `team-update`, `leadership-update`) | ~75% | Actual reuse in a second project or by a second person |
| Agentic interviews (dual-agent: spec-readiness, design-review, objection-log) | ~80% as a technique for surfacing real gaps, same ~65-90% range as their outputs above for content | Run the same negotiation past the actual people the personas represent |

## 3. Fixes Identified and Applied

All three were selected by the user and implemented this session:

**Fix A — Prototype vs. real-build ambiguity.** Several docs referenced "the real build that shipped the experiment" without clarifying whether real code actually exists. Added explicit notes to `docs/prds/latest.md` and `CLAUDE.md`: **no production codebase exists in this repo** — `prototype/index.html` is the only real artifact, and the experiment data is illustrative, engineered to be consistent with the scenario, not output from real running software.

**Fix B — Consolidated evidence ledger.** Real vs. simulated evidence was flagged repeatedly but scattered across `hypothesis.md`, `design-review.md`, `spec-readiness.md`, and `objection-log.md`. Created [docs/evidence-ledger.md](evidence-ledger.md): ~20 major findings tagged by source type (SCENARIO-GIVEN / REAL-USER-RESEARCH / REAL-EXPERIMENT-DATA / EXTERNAL-REAL-DATA / CODE-INSPECTION / SIMULATED-ROLEPLAY / ANALYTICAL-INFERENCE) in one scannable table.

**Fix C — Stakeholder onboarding.** `stakeholders/` was fully gitignored with no path for a new user to build their own profiles. Added `stakeholders/TEMPLATE.md` (tracked via a `stakeholders/*` + `!stakeholders/TEMPLATE.md` gitignore rule, verified with `git check-ignore`), plus a `CLAUDE.md` working note instructing future sessions to use it when a persona-based review is requested for someone without a profile yet.

## 4. Portable Prompt (Recreate This Workflow for a Different Product)

Moved to its own file so it's easy to find and copy without scrolling past this review: **[docs/recreate-workflow-prompt.md](recreate-workflow-prompt.md)**.

*(Originally embedded here in full; extracted after a usability walkthrough found it was buried as "Section 4 of 5" in this doc — see [docs/onboarding-usability-walkthrough.md](onboarding-usability-walkthrough.md) for that full review.)*

## 5. Stakeholder Folder Portability

Resolved by Fix C above: `stakeholders/TEMPLATE.md` is the one tracked file in an otherwise-gitignored folder. A new user copies it to `stakeholders/<name>.md`, fills it in (or has Claude interview them for it, same pattern used for the original three profiles), and it stays private automatically — no manual `.gitignore` editing required per new profile.
