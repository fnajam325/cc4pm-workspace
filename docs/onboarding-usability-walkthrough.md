# Onboarding Usability Walkthrough — Two Personas

*Note: fictional course scenario. A persona-based usability pass on the onboarding materials themselves, checked against the real files rather than assumed — the same technique this project used to test the prototype (`research/prototype-usability-testing.md`), applied to the onboarding docs.*

## Persona 1: New Teammate, Nudge Workspace + Live Demo

**Setup:** Clones the repo solo (no facilitator physically present, the most realistic default), opens it, follows README's "New here? Read ONBOARDING.md first" pointer into `docs/live-demo-script.md`.

**0:00–2:00 (Open folder, see what Claude knows)** — Frictionless. `cd` + `claude` + "what's the current status?" works exactly as scripted.

**2:00–7:00 (AI interview + plan mode)** — Friction found: the script deferred the plan-mode toggle to "confirm ahead of time," assuming a facilitator who already knows Claude Code. A solo user had no self-serve path.

**7:00–12:00 (Run a status skill)** — Bigger friction found: `CLAUDE.md` never listed the 5 skills anywhere — only `competitive-scan` got one passing mention, tied to a trigger phrase, not presented as "here are your commands." A solo user had no path to discovering skills exist at all.

**12:00–15:00 (Start their own project)** — Friction found: the portable prompt was Section 4 of a 5-section, ~90-line review document — not mislabeled, just not where a first-time user would expect a "copy this" artifact to live.

**Structural issue:** the whole script's "hand them the keyboard" framing assumed two people, with no note that a solo run needed reinterpretation.

## Persona 2: PM at Airbnb, Building "Team Bookings"

**Setup:** Reads `ONBOARDING.md`, decides not to join Nudge — wants their own product. Follows path 2.

**Finding the prompt** — same friction as Persona 1's minute 12.

**Pasting it into a fresh folder** — frictionless mechanically.

**What happens next** — real gap, not just friction: the prompt said *"Confirm this structure with me, then let's start with [FIRST THING]"* — it never explicitly required an interview before drafting `project.md`/`strategy.md`. `ONBOARDING.md`'s headline habit #2 promised *"use the interview before building anything,"* but the prompt that was supposed to produce that behavior only implied it.

**How does the from-scratch path get research inputs (user interviews, NPS, usage data)?** This was the sharpest version of the same gap — nothing in the prompt asked for these by name. A receiving session might ask generically ("tell me about your product") without ever surfacing that user research, NPS data, or usage analytics were things it should specifically check for.

**Stakeholder setup** — minor gap: the prompt said profiles should be "gitignored" and the template "tracked, not gitignored," but never gave the actual working `.gitignore` recipe.

**What worked well:** the dated-snapshot pattern, evidence-ledger discipline, no-codebase honesty rule, and the agentic-interview technique were all properly generalized into the prompt, not left Nudge-specific.

## Findings Table

| # | Finding | Persona | Severity |
|---|---|---|---|
| 1 | Live demo assumed a facilitator; no solo fallback | 1 | Medium |
| 2 | Plan-mode toggle deferred, no self-serve answer | 1 | Medium |
| 3 | Skills never listed/named anywhere in `CLAUDE.md` | 1 | High — blocked minute 7-12 entirely for a solo user |
| 4 | Portable prompt buried in Section 4 of a review doc | 1, 2 | Medium |
| 5 | Prompt didn't require interview-before-writing `project.md`, including asking for research inputs by name | 2 | High — the exact habit ONBOARDING.md promised wasn't enforced |
| 6 | Prompt said "gitignored" without the working recipe | 2 | Low-Medium |

## Fixes Applied

All 6 — see the corresponding `change_log.md` entries dated the same day as this file. Summary: solo-fallback + self-serve plan-mode note added to `docs/live-demo-script.md`; an "Available Skills" list added to `CLAUDE.md`; the prompt extracted to its own file (`docs/recreate-workflow-prompt.md`) and rewritten to require a discovery interview that names user interviews / NPS / usage analytics / competitive intel explicitly, flagging gaps rather than inventing data; the exact `stakeholders/*` + `!stakeholders/TEMPLATE.md` gitignore recipe spelled out in the prompt itself.
