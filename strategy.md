# Strategy: Recovering the 7-Point Retention Drop

*Note: fictional course scenario. See [CLAUDE.md](CLAUDE.md) for full context.*

## The Gap

30-day retention: 44% → 37% over two quarters (-7 points).

## Working Hypothesis

Users go passive because the app stops feeling relevant after the first "aha moment" (the initial spending breakdown). After that, Nudge gives users no reason to come back that feels personal, timely, or actionable — so engagement decays until churn.

## Supporting Signal

- Users who don't set a savings goal in week 1 churn at ~2x the rate of those who do
- No clear "next step" after the dashboard/spending breakdown (user research)
- Home feed is static — doesn't reflect recency or change in user behavior
- Weekly summary email gets a healthy 22% open rate, but the in-app experience doesn't continue that story — click-through is jarring

## Candidate Direction (Not Committed)

A personalized in-app weekly summary screen: top insight for the week, one actionable nudge based on the user's own patterns, and progress toward their savings goal (if set).

- Raj: technically feasible with existing data sources; needs new ranking logic to select which insight to surface
- Status: one candidate among possibly others — not yet validated against discovery data

## Discovery Findings (Confirmed/Refined)

*Based on: 3 user interviews + 10 NPS comments — see [research/interview-synthesis.md](research/interview-synthesis.md), [research/nps-analysis.md](research/nps-analysis.md).*

- **Confirmed:** static post-onboarding experience, desire for a clear next step, and the email/app disconnect all independently reappear in both the interviews and NPS data.
- **Refined:** the mechanism that actually created stickiness (personalized pattern-recognition, per power-user interview) has historically taken ~3 months to emerge — a timeline mismatch against the 30-day retention window being measured.
- **New — pull vs. push tension:** some users want passive personalized insight (ritual-like checking); others want active coaching/accountability (a churned user left for a tool that "asks something" of them). The candidate direction may need to address both.
- **New — precision-before-frequency constraint:** one irrelevant nudge was enough for an NPS respondent to disable notifications entirely. Increasing nudge volume/assertiveness before relevance is solved risks making retention worse.
- **New — goal continuity gap:** validates including goal progress in the candidate direction, but raises execution risk — it must stay reliably current or it repeats the exact complaint it's meant to fix.

## Competitive White Space

*Based on: analysis of YNAB, Copilot Money, Rocket Money, Monarch Money — see [research/competitive-scans/latest.md](research/competitive-scans/latest.md) ([run history](research/competitive-scans/README.md)).*

- **Gap 1 — no competitor proactively delivers an early personalized insight.** The market splits between slow-build (YNAB's manual discipline, Copilot's behavioral rebalancing) and on-demand/reactive (Monarch's AI Q&A assistant). Nobody hands users something specific and true about their own behavior early and unprompted — directly supporting the "early lightweight personalization" direction implied by the 3-month timeline mismatch above.
- **Gap 2 — no competitor bridges passive insight and active goal-accountability in one loop.** The market is split cleanly between all-manual (YNAB) and all-passive/reactive (Copilot, Monarch), with Rocket Money's engagement being transactional (one-time subscription cancellation) rather than sustained. This directly reinforces the pull-vs-push tension and goal-continuity gap already identified from interviews/NPS.

## Recommended Action

*Full rationale: [docs/decision-brief.md](docs/decision-brief.md).*

Build and user-test a prototype of the personalized in-app weekly summary, engineered specifically to deliver an early, low-confidence version of a personalized insight within the first 1-2 weeks and reliably tie it to the user's stated goal — rather than waiting on the ~3-month accumulation the current candidate direction implicitly assumed.

## Risk Surfaced in Prototype Testing

*Full detail: [prototype/README.md](prototype/README.md#persona-testing-iteration-history).*

In-character persona testing of the prototype (Amara — financially savvy, paying down high-interest credit card debt) surfaced a risk beyond UI/UX: defaulting the nudge to "redirect spend into savings" may be objectively poor advice for users currently carrying high-interest debt, where paying down principal is the better move. The prototype's fix (softened framing + explicit disclosure of what the app doesn't know) is a stopgap, not a real solution — it doesn't require new integrations, but it also doesn't make the nudge correct for that user. Whether Engage v2 should incorporate debt-awareness (and what data that would require) is an open question for the next round of discovery, not yet resolved.

## How We'll Validate

Discovery cycle inputs (user feedback, competitive intelligence, others TBD) will confirm, redirect, or replace this direction before it's built into a prototype for user testing. Direction stays open until that data is in hand.

**Status: validated, direction committed, experiment live.** The prototype was built, tested across 3 rounds, and — following the Thursday ranking-logic/instrumentation session and Marcus's approval of the decision brief — shipped to a real week-5 experiment. Day-7 retention lift is statistically significant (76% vs. 46%); day-30 lift is directionally strong but not yet significant at current sample size (`data/metric-findings.md`). Full requirements and remaining open items are now tracked in [docs/prds/latest.md](docs/prds/latest.md) ([revision history](docs/prds/README.md)), not this file — this section stays as the historical validation plan.
