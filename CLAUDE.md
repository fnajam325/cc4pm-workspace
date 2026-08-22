# Project Context: Nudge — Engage v2 Discovery

**Note:** This project is a fictional scenario for an AI/product management course. Nothing in this file describes the user's real employer, role, or company — it is scoped entirely to this project directory and should not be treated as factual outside this context.

## Key Tension

Direction is committed (personalized weekly summary) and the week-5 experiment shows a real, statistically significant day-7 lift — but two things hold back declaring success: day-30 significance hasn't been reached yet (promising, p≈0.12, underpowered at n=50/arm), and the feature demonstrably doesn't yet help users who churn *after* surviving week 1 (Tom's objection — Day7→Day30 stickiness is flat, treatment or not). The tension is momentum to scale on the strength of the day-7 result vs. discipline to wait for day-30 significance and validate a fix for the week-2+ gap first.

## Open Decision

When to bring Marcus a full-rollout recommendation. Gated on (1) day-30 retention reaching statistical significance — more experiment weeks needed — and (2) real-user validation (not another simulated round) of a fix for the week-2+ continuation gap. Marcus approved the experiment itself, not a Q3 rollout; no rollout timeline exists yet.

## Project Files

**Core Tracking**
- [project.md](project.md) — what Nudge is, squad, current phase, stakeholders, problem statement
- [strategy.md](strategy.md) — retention-recovery hypothesis
- [change_log.md](change_log.md) — decision audit trail (active phase; older phases archived in [change_log_archive/](change_log_archive/README.md))

**Research & Discovery**
- [research/interview-synthesis.md](research/interview-synthesis.md) — user interview synthesis
- [research/nps-analysis.md](research/nps-analysis.md) — NPS feedback findings
- [research/competitive-scans/latest.md](research/competitive-scans/latest.md) — most recent competitive landscape and white-space analysis ([full run history](research/competitive-scans/README.md))

**Prototype & Testing**
- [docs/pm-brief.md](docs/pm-brief.md) — PM brief for the Engage v2 prototype build
- [prototype/README.md](prototype/README.md) — prototype build rationale + persona-testing iteration history ([prototype/index.html](prototype/index.html) is the working prototype itself)
- [research/prototype-usability-testing.md](research/prototype-usability-testing.md) — full transcripts + synthesis from 3-round in-character persona testing of the prototype
- [docs/prototype-testing-deck.pptx](docs/prototype-testing-deck.pptx) — slide deck version of the 3-round persona testing (screenshots + feedback + recommended changes per round)
- [docs/hypothesis.md](docs/hypothesis.md) — learning synthesis (know/assume/unknown) and updated hypothesis statement, post-prototype-testing

**Spec & Stakeholder Alignment**
- [docs/triad-session.md](docs/triad-session.md) — agenda, alignment-doc template, and Slack invite for the Raj/Lena prototype review session
- [docs/spec-readiness.md](docs/spec-readiness.md) — spec pressure-test (Raj persona vs. PM agent), acceptance criteria, and scope lock on debt-awareness
- [docs/design-review.md](docs/design-review.md) — design review (Lena persona vs. PM agent), user-needs evidence check, week-2 continuation gap
- [docs/qa-checklist.md](docs/qa-checklist.md) — edge case list, PM QA pass/fail against the prototype, first PR comment for Raj
- [docs/objection-log.md](docs/objection-log.md) — PRD pressure test: Raj/Marcus personas + Tom (churned user), with the objection most likely to kill the initiative if unaddressed

**Data & Experiment Results**
- [data/metric-findings.md](data/metric-findings.md) — SQL analysis of the week-5 weekly-summary experiment (retention, goal-setting, open rates)
- [data/metric-diagnosis.md](data/metric-diagnosis.md) — retention metric tree, root-cause diagnosis of the weeks 1-4 decline, and 4 ranked/confidence-scored churn hypotheses
- [agents/monday-retention.md](agents/monday-retention.md) — spec for the Monday-morning retention digest agent (data source, comparison logic, Slack template, manual-run + production deployment notes); [agents/monday_retention.py](agents/monday_retention.py) is the runnable script

**Decision & Delivery Artifacts**
- [docs/decision-brief.md](docs/decision-brief.md) — 1-page decision brief for Marcus, synthesized from all discovery inputs
- [docs/prds/latest.md](docs/prds/latest.md) — most recent PRD revision ([full revision history](docs/prds/README.md))
- [docs/status-updates/latest.md](docs/status-updates/latest.md) — most recent team + leadership update ([full run history](docs/status-updates/README.md))
- [docs/friday-update-job-spec.md](docs/friday-update-job-spec.md) — spec for a future recurring Friday status-update job (not yet activated — Slack channel IDs and auth still needed)
- [docs/presentation.md](docs/presentation.md) — quarterly review narrative structure ([speaker notes](docs/presentation-notes.md)), calibrated to Marcus
- [docs/quarterly-review-deck.pptx](docs/quarterly-review-deck.pptx) — the built slide deck (title + 7 content slides + 1-slide backup summary for time-constrained runs)

**Meta / Tooling**
- [docs/skills-marketplace-instructions.md](docs/skills-marketplace-instructions.md) — how to package a project skill as a plugin and publish it to an org marketplace
- [docs/evidence-ledger.md](docs/evidence-ledger.md) — every major finding tagged by source type (real research / real experiment data / simulated roleplay / analytical inference)
- [docs/capstone-session.md](docs/capstone-session.md) — capstone review: build inventory, confidence audit, fixes applied, portability prompt
- [ONBOARDING.md](ONBOARDING.md) — 5-minute read for anyone new: what Claude Code is, first-session paths (join Nudge vs. start a new product), the 3 core habits, and the most common mistake
- [docs/live-demo-script.md](docs/live-demo-script.md) — optional 15-minute facilitator-led live demo in this Nudge workspace, ending with the new person starting their own project ([docs/demo-scenario-slack-thread.md](docs/demo-scenario-slack-thread.md) is the raw scenario input it uses)
- [docs/recreate-workflow-prompt.md](docs/recreate-workflow-prompt.md) — the canonical copy-paste prompt for bootstrapping this same workflow for a different product
- [docs/onboarding-usability-walkthrough.md](docs/onboarding-usability-walkthrough.md) — two-persona usability pass on the onboarding materials, 6 findings, fixes applied

**Available Skills** (type the slash command to run one)
- `/session-save` — reviews the session's changes and proposes updates to the core tracking files before writing
- `/competitive-scan` — re-runs competitive landscape research, saving a dated snapshot
- `/write-prd` — writes/updates the PRD in this project's structure, dated and non-overwriting
- `/team-update` — async status update for Raj/Lena, calibrated to each profile's communication style
- `/leadership-update` — one-page, recommendation-first status update for Marcus

## Working Notes

- Keep this file updated as new discovery inputs (user feedback, competitive intel, etc.) are introduced through the course
- Do not lock in a specific solution direction until supporting data is in hand
- Treat this file as project-scoped only — do not carry Nudge-specific content into global/user-level context
- Proactively prompt the user to save/update project.md, strategy.md, change_log.md (or future tracking files) whenever a conversation produces content worth capturing in one of them
- If the user mentions wanting a fresh competitive/market check (e.g., "run competitive intel," "how's the market looking"), offer to run the `competitive-scan` skill rather than doing ad hoc research
- When building comparison screenshots/decks (e.g., before/after prototype iterations), ask whether the audience needs quick-skim visual diff cues (zoomed crops, side-by-side, annotations) vs. a detailed read-through — full-screen screenshots of near-identical layouts hide text-only changes
- `stakeholders/` holds internal prep notes on Raj/Lena/Marcus — gitignored except `TEMPLATE.md`, not shared on GitHub, and deliberately not listed in Project Files above
- **New user onboarding:** if someone runs this workspace for a different set of collaborators, or a named collaborator has no profile yet in `stakeholders/`, copy `stakeholders/TEMPLATE.md` to `stakeholders/<name>.md` and fill it in (interviewing the user for it if they don't already have the info) before running any persona-based review (spec-readiness, design-review, objection-log style) for that person. This is reactive by design — nothing runs automatically on session start. If the user says something like "I'm new here" / "help me get onboarded" (per README.md's "New Collaborator?" section), proactively: (1) summarize current project status from CLAUDE.md/project.md/the current PRD, (2) ask who they are and who they'll be working with, (3) walk them through building those stakeholder profiles
- **No production codebase exists in this repo.** `prototype/index.html` is the only real artifact. References elsewhere to "the shipped build" describe something this fictional scenario assumes exists, not something present here — see the note in `docs/prds/latest.md` under Requirements before assuming otherwise
- **Standing authorization: commit and push to GitHub (`origin`), not just save locally.** User confirmed this explicitly as a durable preference, not a one-time approval. Commit at natural checkpoints — the same points where a `change_log.md` entry gets written, i.e. after finishing a task/fix — not after every single file edit, so history stays meaningful rather than noisy. Still follow standard git safety: never force-push, never rewrite published history, review `git status`/`diff` before committing, stop and ask if something looks like it shouldn't be public (this repo is public)
