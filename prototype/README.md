# Prototype: Personalized Weekly Summary — Engage v2

*Note: fictional course scenario. See [../docs/pm-brief.md](../docs/pm-brief.md) and [../docs/decision-brief.md](../docs/decision-brief.md) for full context.*

Open `index.html` directly in a browser — no build step, no dependencies.

## PM Brief

**User:** 28-year-old who connected their Chase account 2 weeks ago and has not opened the app since.

**Job to be done:** Understand where their money went this week and take one action.

**Feature:** Personalized weekly money summary — top spending insight, one contextual nudge, savings goal progress.

**Constraint:** Use data Nudge already has — no new integrations.

## Key Decisions Made During the Interview

- **State prototyped: no savings goal set.** This is the highest-churn cohort in the research (~2x churn rate vs. users who set a goal in week 1) — chosen as the more representative and higher-stakes state over an already-has-a-goal state.
- **Persona age is illustrative, not evidence-backed.** No demographic data exists in the interview or NPS research; the behavioral profile (connected, inactive, no goal) is what's actually supported by evidence, and is what the prototype is built around.
- **The nudge *is* the goal-setting action**, directly tied to the week's spending insight (a dining spend spike prompts redirecting part of it into a new goal) — this is a deliberate fix for the goal-continuity gap NPS surfaced (a user who set a goal and said Nudge "never once mentioned it since").
- **The insight is "week 1-2 honest."** It's a week-over-week category comparison — genuinely derivable from 2 weeks of transaction data — rather than a fabricated deep behavioral pattern. Research showed real pattern-recognition stickiness took ~3 months to earn; showing a false deep insight this early would repeat the "just confirming what I already suspect" complaint from NPS.
- **Fully interactive, not static.** Tapping the nudge expands a lightweight inline goal-setting flow (quick amount chips + confirm) on the same screen. Confirming updates the goal progress card in place, marks the nudge as done, and shows a toast — closing the loop visibly, in real time.
- **Visual direction: Chime-inspired, not a Chime clone.** Polished, near-production quality, phone-shaped viewport, bold sans-serif type, rounded cards, a confident green/navy palette. This is a fictional app — the styling takes stylistic inspiration only, not literal reproduction of Chime's trademarked branding or assets.

## What to Test With Users

- Does the spending insight feel true/earned, or does it feel like a guess?
- Does the nudge feel like a natural next step from the insight, or does it feel like an unrelated upsell?
- Does the inline goal-setting flow feel fast enough, or is it still too much friction for a passive, 2-weeks-in user?
- Does seeing the goal progress card update immediately create a sense that Nudge will "remember" the goal going forward?

## Persona-Testing Iteration History

*Full rationale for each change: [change_log.md](../change_log.md). Full interview transcripts + synthesis: [research/prototype-usability-testing.md](../research/prototype-usability-testing.md). Three rounds of in-character persona testing (Priya, Tom, Amara) against this prototype, each shipping one fix before moving to the next persona.*

**Round 1 — Priya** (retained user, already has a Europe trip savings goal): the original build only modeled a "no goal set" state, so Priya's first reaction was distrust — "if it doesn't know I have a goal, can I trust the $184 number either?" **Fix:** added a demo toggle and a full "has existing goal" state, so the nudge and goal-progress card branch on actual goal state instead of assuming none exists.

**Round 2 — Tom** (skeptical, abandoned 3 budgeting apps, hasn't reopened Nudge since day one): the "Set a savings goal" CTA read as the opening move of a pattern he already associates with failure — "it doesn't know anything about me yet and it's already asking me to commit to something." **Fix:** replaced the full-commitment CTA with a one-tap, low-friction starter action; full goal setup became an optional secondary link instead of the default ask.

**Round 3 — Amara** (financially savvy, paying down credit card debt, high bar for trust): identified that defaulting to a savings nudge could be objectively wrong advice for someone carrying high-interest debt, and questioned whether the redirected $18 was a real transaction or a cosmetic number. **Fix:** softened the nudge from prescriptive to optional framing, and added an explicit disclosure that the starter fund is a real, verifiable sub-account, plus a direct acknowledgment that the app doesn't yet know about debt or other priorities.

**Cross-round pattern:** every fix addressed the same root issue in a different form — the prototype was making an assumption about the user (no goal exists / ready to commit / savings is the correct move) that didn't hold for that persona. Each fix replaced an assumption with a state branch, a smaller ask, or an honest disclosure, rather than a deeper feature build.

**Open item raised, not yet resolved:** Amara's debt-vs-savings finding is a strategic question, not just a UI fix — see [strategy.md](../strategy.md#risk-surfaced-in-prototype-testing).
