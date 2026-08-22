*This file always mirrors the most recent dated PRD in this folder. Run date: 2026-08-08 — see [2026-08-08.md](2026-08-08.md) for the permanent snapshot, or [README.md](README.md) for the full revision history.*

# PRD: Engage v2 — Personalized Weekly Summary

*Status: Thursday ranking-logic/instrumentation session complete. Marcus approved the decision brief; the week-5 experiment launched and ran on a real build (distinct from the static `prototype/index.html` demo artifact — see note under Requirements). Results are in (`data/metric-findings.md`); this PRD now reflects what's needed to move from single-cohort experiment to full-scale rollout, not what's needed to start the experiment.*
*Author: PM · Squad: Engage (Raj — Eng, Lena — Design) · Sponsor: Marcus, Head of Product*
*Note: fictional course scenario. This PRD synthesizes everything already validated across discovery, prototyping, stakeholder review, and the live experiment — see Appendix for full source trail.*

## Problem Statement

30-day retention has dropped from 44% to 37% over the last two quarters. Three independent discovery sources (user interviews, NPS, competitive research) converge on the same explanation: the app gives users a strong initial moment (the spending breakdown) but nothing that pulls them back after — the home feed is static, and the weekly email is currently the only thing doing re-engagement work the product itself should be doing.

Quantitative confirmation (`data/metric-diagnosis.md`): average sessions per user fell 36% across cohort weeks 1-4 (5.74 → 3.69), in lockstep with the retention decline (32% → 22%) — a quantitative echo of the exact "nothing changes" complaint from the qualitative research.

## User

**Who:** connected an account, hasn't returned since — the highest-churn cohort (no goal set in week 1, ~2x churn rate vs. goal-setters). Age/demographics are illustrative only, not evidence-backed (`docs/pm-brief.md`).

**Job to be done:** understand where their money went this week, and take one action.

## Goals and Non-Goals

**Goals:**
- Recover week-1 engagement by giving users a personalized reason to return, without waiting on the ~3-month data accumulation that historically produced real stickiness (`docs/hypothesis.md`)
- Close the goal-continuity gap NPS surfaced (a user sets a goal, the app never references it again)
- Validate the broader hypothesis: retention depends on the app demonstrating state-awareness and calibrating asks to earned trust, not on any single mechanic (`docs/hypothesis.md` TL;DR)

**Non-Goals / Out of Scope:**
- **Debt-awareness logic.** Explicitly locked out of scope for this build (`docs/spec-readiness.md`). The nudge includes a disclosure stopgap (acknowledges the app doesn't know about debt or other priorities) but does not reprioritize savings advice based on debt. Follow-up discovery, not this PRD.
- **New data integrations.** Constraint carried from the original PM brief — this feature uses data Nudge already has.
- **Multi-account aggregation.** Current scope assumes a single connected account; multi-account scenarios are an identified edge case, not in scope (`docs/qa-checklist.md`).
- **The week-2+ re-engagement loop.** Identified in design review as the single highest-impact gap for retention, but explicitly not designed yet — Lena co-owns this as a follow-on design effort, not bundled into this PRD's scope (`docs/design-review.md`).

## Success Metrics

- **Leading indicator:** week 1-2 nudge-tap rate and goal-set rate
- **Lagging indicator:** 30-day retention (the project's north star)
- **Current read:** day-7 effect is proven (76% vs. 46% treatment vs. control, p<0.01); day-30 effect is promising but needs a larger sample before it's a settled result, not just this single week-5 cohort (36% vs. 22%, p≈0.12)

## Supporting Evidence

**Qualitative (real interviews + NPS):**
- Initial onboarding hook isn't the problem — lands well universally (Amara, Tom)
- Users want an explicit next step, not just information (Amara, Tom)
- One irrelevant nudge is enough to make a user disable notifications entirely — precision must precede frequency (NPS)
- No competitor (YNAB, Copilot Money, Rocket Money, Monarch Money) currently bridges passive insight with active goal-accountability (`research/competitive-scans/latest.md`)

**Quantitative (live week-5 experiment, `data/metric-findings.md` + `data/metric-diagnosis.md`):**
- Goal-setting in week 1 predicts retention independent of this experiment: 34.8% vs. 21.6% (cohorts 1-4)
- Day-7 retention lift is large and **statistically significant**: 76% (treatment) vs. 46% (control), p<0.01
- Day-30 retention lift is directionally strong but **not yet statistically significant** at n=50/arm: 36% vs. 22%, p≈0.12
- **The treatment's entire measured effect runs through the Day-7 gate — Day7→Day30 conditional stickiness is statistically identical between arms (~47-48%).** This feature is evidence of fixing the week-1 drop-off, not evidence of fixing month-long stickiness.
- Open rate climbs across sends rather than decaying: 28% → 52% → 52% → 56% (treatment) vs. flat 4-6% (control)

**Unresolved, real gaps (not yet explained by any data in hand):**
- A ~20-point retention gap between iOS and Android within treatment, with the friction mechanism inside the feature already ruled out by direct query (Android act-rate matches iOS) — cause is likely outside this feature's UI (notification delivery, app performance) and outside this PRD's ability to fix
- Acquisition-channel gap (organic outperforms paid/referral within treatment) — real but underpowered (n=14/6), and the actionable lever sits partly outside this squad

## Requirements

**Feature:** Personalized weekly money summary — top spending insight, one contextual nudge, savings goal progress. Fully interactive: tapping the nudge opens an inline goal-setting flow; confirming updates progress in place, no reload.

**User stories:**

| # | User Story | Priority | Dependencies | Commitment | Delivery Status |
|---|---|---|---|---|---|
| 1 | As a user without a savings goal, I want to see a specific insight about my spending this week, so that I understand where my money went without digging through transactions myself. | P0 | None — ranking logic defined in the Thursday session | Committed | Shipped to experiment — v1 heuristic running in the live week-5 test |
| 2 | As a user without a goal, I want a low-friction way to redirect part of my spending into a starter fund, so that I can take action without committing to a full goal-setting flow upfront. | P0 | #1 | Committed | Prototyped |
| 3 | As a user without a goal, I want the option to turn my starter fund into a real savings goal, so that I can build toward something specific once I'm ready. | P1 | #2 | Committed | Prototyped |
| 4 | As a user who already has a savings goal, I want the summary to reference my actual goal, so that I trust the app remembers what I've already told it. | P0 | None (goal data already exists) | Committed | Prototyped |
| 5 | As a user with an existing goal, I want to see progress toward that goal update immediately after I take an action, so that I know the app is tracking it going forward. | P0 | #4; instrumentation for real (non-UI-only) tracking | Committed | Prototyped — UI only, not connected to persistence |
| 6 | As a user with other financial priorities (e.g., debt), I want the nudge to acknowledge uncertainty rather than prescribe savings blindly, so that I don't get generic advice that could be wrong for my situation. | P1 | None | Committed | Prototyped |
| 7 | As a user with no transactions this week, I want to see something meaningful instead of a broken or misleading insight, so that I don't lose trust in the app. | P0 | None | Committed | Not Started |

**Acceptance criteria** (agreed with Raj, `docs/spec-readiness.md`):
- [x] Insight reflects a signal genuinely derivable from ≤2 weeks of transaction data — no fabricated multi-month patterns
- [x] Nudge is contextually tied to the insight and doubles as the goal-setting action
- [x] No-goal-set and has-existing-goal states both supported and tested
- [ ] **Empty state (zero transactions this week)** — still missing; not exercised by the week-5 experiment population, still blocking for full rollout (`docs/qa-checklist.md`)
- [x] Debt-awareness disclosure present; no reprioritization logic
- [x] **Insight-selection ("ranking") logic defined** — resolved in the Thursday session; a v1 heuristic was defined and is what ran in the live experiment
- [x] **Instrumentation for tap-rate/goal-set-rate confirmed** — resolved: the shipped experiment build includes working event tracking, evidenced directly by the real `opened`/`acted_on` data in `data/metric-findings.md`

**Note — prototype vs. shipped build:** `docs/qa-checklist.md`'s findings (no instrumentation, ranking logic undefined) were checked against `prototype/index.html`, the static HTML demo used for persona testing — not the real build that shipped to the week-5 experiment. Those two are different artifacts: the prototype was a design tool, not what actually ran the experiment. The prototype itself was never updated after the Thursday session and should not be read as reflecting current build status — treat `data/metric-findings.md`'s real event data as the source of truth for what's actually instrumented and shipped.

**Important for anyone picking this up:** this repo contains **no production codebase**. `prototype/index.html` is the only real artifact — a static HTML/JS demo, not connected to any backend. References above to "the real build that shipped the experiment" describe a build this fictional scenario assumes exists, not something present in this repo. The experiment data in `data/metric-findings.md` is illustrative data engineered to be consistent with that assumption, not output from real running software. Don't go looking for the shipped build here — it doesn't exist as code, only as a narrative device the analysis is built on top of.

**Known implementation issue, still open:** the custom-goal-amount input in `prototype/index.html` uses a native browser `prompt()`, which doesn't exist in a real mobile app context (`docs/qa-checklist.md`). Unconfirmed whether the shipped experiment build has the same issue or already solved it differently — worth a direct check with Raj rather than assuming either way.

## Key Edge Cases

Full list: `docs/qa-checklist.md`. Highest-priority gaps:
- Zero transactions this week (blocking, not yet designed)
- Multiple accounts connected / conflicting data across accounts (not modeled)
- Data staleness — no "last updated" indicator anywhere in the current build

## Open Questions

| Risk / Question | Status | Owner |
|---|---|---|
| Week-2+ re-engagement loop undesigned | Open — Lena co-designs shape before it becomes an eng ticket. Higher priority now: this is the gap behind Tom's objection in `docs/objection-log.md` — the experiment shows no measured effect on exactly the multi-week churn this loop would address | Lena + PM |
| Insight-selection logic undefined | **Resolved** — defined in the Thursday session, running in the live experiment as a v1 heuristic | Raj + Lena (framing) |
| Instrumentation existence unconfirmed | **Resolved** — shipped build has working event tracking, confirmed by real data | Raj |
| Empty-transactions state | Open — still not designed; not exercised by the current experiment population but blocking before broader rollout | Lena + Raj |
| Platform gap (Android underperforms) | Open — mechanism outside this feature, needs infra/perf investigation | TBD, likely not this squad |
| Acquisition-channel gap | Open — partly a growth/targeting question outside this squad's direct control | Growth (not currently assigned) |
| Debt-awareness | Resolved — explicitly out of scope | — |
| Full-scale rollout timeline | **Partially resolved.** Marcus approved the decision brief and the experiment is live — that's not the same as a committed full-rollout date. Day-30 significance hasn't been reached yet (see Success Metrics); Marcus has previously indicated he wants that confidence before committing further | PM |

## Next Steps

1. Continue the week-5 experiment for more weeks to power the day-30 result past current significance threshold — the primary blocker to a full-rollout commitment
2. Build and test the week-2+ continuation loop — design brief now in `docs/design-review.md` (state-carrying insights, an active-accountability touchpoint, milestone/streak framing; own experiment arm; primary metric is Day7→Day30 conditional retention, not top-line day-30)
3. Design and build the empty-transactions state before scaling beyond the current experiment population
4. Bring Marcus a specific full-rollout timeline once (1) produces a significant day-30 result

## Appendix — Source Trail

Problem/strategy: [project.md](../../project.md) · [strategy.md](../../strategy.md) · [decision-brief.md](../decision-brief.md) · [hypothesis.md](../hypothesis.md)
Research: [research/interview-synthesis.md](../../research/interview-synthesis.md) · [research/nps-analysis.md](../../research/nps-analysis.md) · [research/competitive-scans/latest.md](../../research/competitive-scans/latest.md)
Prototype & testing: [prototype/README.md](../../prototype/README.md) · [research/prototype-usability-testing.md](../../research/prototype-usability-testing.md)
Stakeholder alignment: [spec-readiness.md](../spec-readiness.md) · [design-review.md](../design-review.md) · [qa-checklist.md](../qa-checklist.md) · [triad-session.md](../triad-session.md)
Data: [data/metric-findings.md](../../data/metric-findings.md) · [data/metric-diagnosis.md](../../data/metric-diagnosis.md)
