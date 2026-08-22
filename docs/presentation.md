# Quarterly Review Deck — Engage v2 Weekly Summary

*Note: fictional course scenario. Narrative structure only — see [docs/presentation-notes.md](presentation-notes.md) for full speaker notes. Backbone: [docs/decision-brief.md](decision-brief.md) + [data/metric-findings.md](../data/metric-findings.md), calibrated to [stakeholders/marcus.md](../stakeholders/marcus.md). No numbers or claims beyond what's in those source files.*

## Slide 1 — The Problem

**1 number:** 30-day retention: **44% → 37%** (7-point drop, two quarters)

**1 insight:** The drop isn't at onboarding — it's after week 1. Users get a strong first moment, then the app gives them no reason to come back.

## Slide 2 — Why Now

**What changed:** Three independent discovery sources — user interviews, NPS, competitive research — converged on the same explanation this cycle.

**What we learned:** No competitor (YNAB, Copilot Money, Rocket Money, Monarch Money) owns this white space. The slide is already 7 points deep with no sign of self-correcting — the longer we wait, the more of both the metric and the market position we risk losing.

## Slide 3 — The Proposal

**What it is:** A personalized in-app weekly summary — one spending insight, one nudge that *is* the goal-setting action, and goal progress — engineered to deliver an early, low-confidence signal within week 1-2, not waiting on months of accumulated data.

**What it isn't:**
- Not a debt-aware financial coach (explicitly out of scope)
- Not a channel-only fix (raising in-app content to email's standard, considered and rejected as insufficient on its own)
- Not a finished, fully validated system — a tested experiment, not a shipped guarantee

## Slide 4 — Evidence (Part 1: What Users Told Us)

*Split from a single "Evidence" slide so the qualitative evidence gets real visual weight, not a single small quote buried next to the data.*

**User quotes (real interviews):**
- Amara (new user, day 10): *"The spending breakdown was shocking in a useful way."* — the hook works
- Tom (churned, week 5): *"I switched to YNAB because at least that feels like it is asking something of me."* — why passive isn't enough for everyone
- Priya (power user, 18mo): *"It took about three months to get there — and I think most people give up before that."* — the real stickiness driver is too slow for the window we're measuring

**NPS confirms the same gaps (real NPS comments):**
- *"I set a savings goal but Nudge has never once mentioned it since. It is like it forgot."*
- *"The weekly email is the only thing keeping me engaged. The app itself has not given me a reason to open it."*

## Slide 5 — Evidence (Part 2: What the Data Shows)

**Prototype:** Built, interactive, tested through multiple rounds of iteration.

**Data (week-5 experiment, real users):**
- Day-7 retention: 76% vs. 46% control — statistically significant
- Day-30 retention: 36% vs. 22% control — right effect size, not yet statistically significant at current sample
- Open rate: 28% → 56% across 4 sends vs. flat 4-6% control — engagement growing, not decaying
- Goal-setters retain at 34.8% vs. 21.6% for non-goal-setters, independent of this experiment

## Slide 6 — The Plan

**Timeline:** Continue the experiment for more weeks to reach day-30 statistical significance — no rollout date committed until that's in hand.

**Milestone:** Full-rollout recommendation, with a real timeline, once day-30 significance is reached.

**Risks:**
- Day-30 could resolve either direction — not yet proven
- The feature moves week-1 survival; it does not yet move Day7→Day30 stickiness — meaning users who churn *after* surviving week 1 aren't yet addressed. Mitigation plan exists (a week-2+ continuation loop), not yet built or tested.
- Debt-awareness remains an open, deliberately out-of-scope question

## Slide 7 — The Ask

Approve continuing the experiment to reach day-30 significance, and approve scoping + real-user validation of the week-2+ retention loop in parallel. Full rollout recommendation and timeline back to you once day-30 significance is reached.
