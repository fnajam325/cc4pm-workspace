# Design Review — Engage v2 Weekly Summary

*Note: fictional course scenario. Produced from an in-character exchange: Claude playing Lena (per [stakeholders/lena.md](../stakeholders/lena.md)) vs. a separate agent playing the PM, reviewing [prototype/index.html](../prototype/index.html) against [research/interview-synthesis.md](../research/interview-synthesis.md).*

## User Needs vs. Prototype — Evidence Only

*Source: real interviews only (research/interview-synthesis.md) — not the simulated persona-testing round.*

**Addressed well:**
- **Explicit next step.** Amara: *"I have been waiting for Nudge to tell me the next step."* Tom: *"I kept waiting for it to give me something to act on."* → Nudge pairs the insight with a specific action.
- **Change over time.** Tom: *"The app just showed me the same dashboard every time."* Amara: *"Nothing has changed since the first day."* → "This Week" framing + week-over-week delta ($184 vs. $96).
- **Initial hook format.** Amara: *"Shocking in a useful way."* Tom: *"I really wanted it to work."* → Insight-card format matches what already worked at onboarding.

**Not yet addressed:**
- **Pull vs. push differentiation.** Priya: ritual, self-directed, weekly. Tom: *"I switched to YNAB because at least that feels like it is asking something of me."* → No notification/trigger mechanism exists to serve Tom's need.
- **Deep pattern-recognition.** Priya: *"Patterns I had not consciously registered."* → Prototype shows a simple week-over-week delta, not a recognized recurring pattern — untested against what actually created her stickiness.

## Design Review Findings

**1. Evidentiary weight of persona testing.** The 3-round persona testing (Priya/Tom/Amara) was AI role-play, not real users — confirmed directly, not just implied. Useful as a design-critique technique (surfaced a real pattern: the app repeatedly assumed something about the user that wasn't true), but the specific fixes it produced (softened copy, starter-fund concept) are hypotheses to test with real users, not validated findings.

**2. "What happens after the summary" is a real, unresolved gap.** Current prototype: tap nudge → confirmation → nothing. No week-2 re-engagement loop, no notification strategy. **Resolved in this review:** Lena co-designs the shape of this loop with the PM before it becomes an eng ticket — not an eng-authored spec she skins afterward.

**3. "This Week" as a frame is unvalidated and possibly wrong.** Priya's actual behavior is once-a-week, Sunday, pull-driven. Nothing in the interview data supports a reason to open the app mid-week under the current static-per-week frame — and shipping it without a mid-week hook risks reinforcing the exact "nothing changes" complaint from Tom and Amara. **Resolved in this review:** this is now a framing decision on the agenda for the Thursday ranking-logic session, with Lena in the room — not an output she receives after the fact.

## Single Highest-Impact Change for Week-1 Retention

**Design and ship a defined week-2 continuation moment** — even a minimal one (e.g., insight #2 explicitly references or resolves something from week 1, or a re-engagement trigger fires when the goal/starter-fund number moves).

**Why this over anything else:** every other prototype element (insight card, nudge, goal progress) only matters if the user opens the app a second time. The interview data is unambiguous that the drop-off happens *after* a single good first impression (Amara, Tom) — and the prototype currently has no answer for what pulls a user back for session two. Fixing copy, tone, or the starter-fund mechanic improves session one; only a real continuation moment addresses the actual churn point the research identifies.

## Week-2+ Continuation Loop — Design Brief (Mitigating Tom's Objection)

*Added 2026-08-08, after the week-5 experiment confirmed this gap with real data — see [docs/objection-log.md](objection-log.md). Day7→Day30 conditional stickiness is statistically identical between treatment and control (~47-48%): the feature helps users survive week 1, but does nothing measurable for users who already survived week 1 and churn later — exactly Tom's failure mode (churned week 5, not week 1).*

### Design

1. **Make week 2+ reference week 1, not repeat it.** Insight logic today is a single stateless heuristic (category delta) applied fresh each week — no accumulating thread. A week-2 insight that explicitly builds on week 1 ("second week in a row dining was your top category") extends the state-awareness hypothesis (`docs/hypothesis.md`) *across* weeks, not just within a session — proving the app remembers something past a single visit, which nothing in the current build does.
2. **Give push-oriented users an active mechanic, not just better passive content.** The original interviews already predicted this split: Priya's stickiness was pull/ritual; Tom left specifically for a tool that "asks something" of him. The current build is 100% passive delivery. A lightweight weekly check-in tied to the user's own stated goal is a different mechanism than a nicer insight card — and it's the one this project's own research says a real segment needs.
3. **A milestone/streak framing**, not a repeated single-week snapshot. `nudge_nudges` already has a `milestone` type in the data — worth checking whether it's underused. Loss-aversion (protect a streak) is a different lever than "here's something new," and targets someone already 2-3 weeks in — exactly the flat window.

### Build

Scope as its own experiment arm, not a variant of the current one — the mechanic being tested is fundamentally different (longitudinal vs. single-session). Minimum viable version: week 2's content structurally depends on week 1's data, plus one active-accountability touchpoint. Keep it small enough to ship fast; it doesn't need the full milestone/streak system for a first read.

### Test

- **Primary metric must be Day7→Day30 conditional retention specifically**, not top-line day-30 — burying it inside the composite metric is how this gap went unnoticed in the first pass.
- **Validate with real users before committing a full build cycle** — not another simulated persona round. Given the evidentiary gap already flagged repeatedly in this project (`docs/hypothesis.md`, this doc's Finding 1), a decision this consequential warrants a real interview pass with actual multi-week churners — ideally people who match Tom's profile — asking directly what would have kept them past week 5, before locking the design.

## Product Decision vs. Lena's Decision

| Decision | Owner | Why |
|---|---|---|
| Whether "This Week" is the right mental-model frame, or needs to change | **Lena** (with PM + Raj in the room) | Framing is a design decision, not a downstream consequence of engineering logic |
| Shape of the week-2 continuation loop (what it structurally is) | **Lena**, sketched with PM first | Design owns the loop's design; engineering owns implementation after the shape is set |
| Whether debt-awareness is in/out of scope for this build | **Product (PM)** | Resolved in docs/spec-readiness.md — a scoping decision, not a design one |
| Insight-selection ("ranking") logic — which signals qualify as an insight | **Engineering (Raj)**, informed by design's framing decision | Technical feasibility and data constraints are Raj's call, but must follow the framing decision above, not precede it |
| Success metric definition (leading/lagging indicators) | **Product (PM)**, with Raj confirming instrumentation feasibility | Business-outcome decision; needs technical grounding but isn't a design call |
| Whether persona-testing findings get treated as validated or as hypotheses | **Product (PM)** — already resolved: hypotheses, not findings | Evidentiary standards are a product/research integrity call, not a design preference |
