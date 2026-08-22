# Decision Brief: Engage v2 — Recovering 30-Day Retention

*Prepared for: Marcus, Head of Product*
*Note: fictional course scenario.*

## Situation

30-day retention has dropped from 44% to 37% over the last two quarters, driven by users going passive after their first week. Three independent discovery sources — user interviews, NPS feedback, and competitive research — now converge on the same explanation and point toward the same white space.

## Key Findings

- **The onboarding hook isn't the problem.** The initial spending breakdown consistently lands well across users, regardless of whether they ultimately stayed, churned, or are new — interviews and NPS both confirm this independently.
- **The app goes static after week 1, and only the weekly email pulls users back.** Users describe the home feed as unchanged over time; the product itself gives them no reason to return, while the email — a separate channel — is doing that job alone.
- **The proven retention driver is too slow for the window we're measuring.** The mechanism that created real stickiness (personalized pattern-recognition surfaced from a user's own behavior) has historically taken ~3 months to emerge — well outside the 30-day retention window.
- **Users want guidance, but punish irrelevant pushes harshly.** One irrelevant nudge was enough for a user to disable notifications entirely, and a stated savings goal went unacknowledged after being set — precision and follow-through matter more than volume.
- **No competitor owns this white space.** Across YNAB, Copilot Money, Rocket Money, and Monarch Money, none proactively deliver an early personalized insight or bridge passive insight with active goal-accountability in one loop — the market is split between all-manual and all-passive/reactive models.

## Options Considered

1. **Personalized in-app weekly summary** (existing candidate direction) — top insight, one actionable nudge, and goal progress — re-engineered to surface an early, lower-confidence signal within week 1-2 rather than waiting on months of accumulated data.
2. **Active coaching/accountability model** (YNAB-style push) — more assertive guidance, but risks the same backlash seen when nudges feel generic or irrelevant, and doesn't serve users who prefer a passive/pull experience.
3. **Channel-only fix** — bring in-app notifications/content up to the standard the weekly email already sets, without deeper personalization investment. Lowest effort, but doesn't address the root personalization or goal-continuity gaps.

## Recommended Action

Build and user-test a prototype of the personalized in-app weekly summary, engineered specifically to deliver an early, low-confidence version of a personalized insight within the first 1-2 weeks and reliably tie it to the user's stated goal.

## Risk to Flag

Early prototype testing surfaced a risk beyond UX: defaulting the nudge to "redirect spend into savings" may be objectively poor advice for users carrying high-interest debt, where paying down principal is the better move. This doesn't change the recommendation, but debt-awareness in the nudge logic is an open question for the next round of discovery — full detail in [strategy.md](../strategy.md#risk-surfaced-in-prototype-testing).

## Why Now

Three independent data sources landed on the same conclusion this discovery cycle, the retention slide is already 7 points deep and shows no sign of self-correcting, and competitive research confirms the specific gap we'd be filling is currently unclaimed — the longer we wait, the more of both the metric and the market position we risk losing.
