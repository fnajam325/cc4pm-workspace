# PM Brief: Engage v2 Prototype — Personalized Weekly Summary

*Note: fictional course scenario. Builds on [docs/decision-brief.md](decision-brief.md).*

## User

28-year-old who connected their Chase account 2 weeks ago and has not opened the app since.

*Interview note: age is an illustrative detail, not evidence-backed by research (no demographic data exists in the interview/NPS sources). The behavioral profile — connected, inactive, no savings goal set — is strongly evidence-backed as the highest-churn cohort (~2x churn rate vs. goal-setters).*

## Job to Be Done

Understand where their money went this week and take one action.

## Feature

Personalized weekly money summary:
- Top spending insight
- One contextual nudge
- Savings goal progress

## Constraint

Use data Nudge already has — no new integrations.

## Interview Decisions (informing the build)

- **State chosen:** no savings goal set — the more representative, higher-stakes state per churn data, over an already-has-a-goal state.
- **The nudge *is* the goal-setting action** — directly tied to the spending insight (e.g., a spending spike prompts redirecting part of it into a new goal), closing the goal-continuity gap NPS surfaced (a goal set and never mentioned again).
- **Insight must be "week 1-2 honest,"** not a fabricated deep behavioral pattern — the research shows real pattern-recognition stickiness took ~3 months to earn; showing a false deep insight this early repeats the "just confirming what I already suspect" complaint.
- **Interactive, not static** — tapping the nudge expands a lightweight inline goal-setting flow on the same screen; confirming updates the goal progress section in place.
- **Visual direction:** polished, near-production quality, phone-shaped viewport, Chime-inspired aesthetic (not a literal reproduction of Chime's trademarked branding — this is a fictional app).
