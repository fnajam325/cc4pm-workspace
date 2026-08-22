# Nudge — Engage v2 Discovery

*Fictional course project — not a real company, product, or employer. Built for an AI/product management course. Nothing in this repo describes anyone's real employer, role, or company.*

This repo is a full simulated PM workflow for a single initiative: recovering 30-day retention for a fictional consumer finance app ("Nudge") by shipping a personalized weekly summary feature. It covers discovery research, a tested prototype, a live experiment with real (synthetic) data, a PRD, stakeholder alignment, and leadership communications — end to end, as it actually happened turn by turn.

**New here? Read [ONBOARDING.md](ONBOARDING.md) first — 5 minutes, covers what Claude Code is, what your first session looks like, and the habits/mistakes that matter most.**

## Where to Start

- **[CLAUDE.md](CLAUDE.md)** — project orientation: key tension, open decision, full file index
- **[project.md](project.md)** — what Nudge is, the squad, current phase, stakeholders
- **[docs/prds/latest.md](docs/prds/latest.md)** — the current PRD (source of truth for requirements/status)
- **[change_log.md](change_log.md)** — full decision audit trail, newest first

## Structure

- `docs/` — decision brief, PRD, spec readiness, design review, QA, status updates, presentations
- `research/` — user interviews, NPS analysis, competitive scans, prototype usability testing
- `data/` — SQL analysis and diagnosis of the live experiment
- `prototype/` — the interactive HTML prototype
- `build-scripts/` — scripts used to generate the `.pptx` decks in `docs/`
- `.claude/skills/`, `plugins/` — reusable Claude Code skills built during this project
- `stakeholders/` — internal stakeholder prep notes; individual profiles are gitignored, but [`TEMPLATE.md`](stakeholders/TEMPLATE.md) is tracked — see "New Collaborator?" below

## New Collaborator?

Nothing runs automatically when you open this repo — Claude reads `CLAUDE.md` for context, but it won't interview you unprompted. To get set up, just say something like **"I'm new to this project, help me get onboarded"** and Claude will:

1. Summarize where the project actually stands (pulling from `CLAUDE.md`, `project.md`, and the current PRD)
2. Ask who you are and who you'll be working with
3. Help you build your own stakeholder profiles from [`stakeholders/TEMPLATE.md`](stakeholders/TEMPLATE.md) for the people you'll need persona-based reviews with (see `docs/spec-readiness.md`, `docs/design-review.md`, or `docs/objection-log.md` for what that looks like)

You can also skip straight to asking for a specific review (e.g., "run a design review with [name]") — if that person doesn't have a profile yet, Claude will prompt you to build one at that point instead.

## Note on Format

Several documents in this repo (spec readiness, design review, objection log) were produced by having Claude role-play specific stakeholders — pressure-testing decisions against how a real skeptical engineer, designer, or executive would actually respond, rather than a generic review. Each of those files says so explicitly, and distinguishes real user research from simulated persona testing throughout.
