# Project: Nudge — Engage v2

*Note: fictional course scenario. See [CLAUDE.md](CLAUDE.md) for full context.*

## What Nudge Is

Consumer personal finance app. Users connect bank accounts, see where their money goes, set savings goals, and get nudges to stay on track.

- Launched 4 years ago, Series B ($42M)
- 2.1M registered users, 340K MAU, growing 28% YoY on MAU

## My Squad — Engage

Owns everything related to keeping users active after they connect their first account: home feed, weekly money summaries, savings nudges, push notifications.

- Raj — Senior Engineer
- Lena — Product Designer
- Me — PM

## Current Phase

**Experiment live, evaluating for full-scale rollout.** The Thursday ranking-logic/instrumentation session happened, Marcus approved the decision brief, and the week-5 experiment launched and is running (`data/metric-findings.md`). Direction is committed — the personalized weekly summary, validated by a statistically significant day-7 retention lift. Not yet resolved: day-30 significance (the number Marcus actually needs before committing to full rollout), the empty-transactions state, and — per `docs/objection-log.md` — whether this addresses multi-week churners at all, since Day7→Day30 stickiness is unchanged by the treatment. Done = day-30 significance + a rollout timeline Marcus signs off on.

## Key Stakeholders

- **Marcus** — Head of Product. Sponsor of Engage v2, wants problem alignment before solution design, needs to sign off.
- **Raj** — Senior Engineer, Engage triad. Assesses technical feasibility.
- **Lena** — Product Designer, Engage triad. Owns UX direction, sketched the initial candidate concept.

## Problem Statement

30-day retention dropped from 44% to 37% over the last two quarters.

Churn is sharpest among users who don't set a savings goal in week 1 — nearly double the churn rate vs. users who do. Users who connect their account and view the dashboard don't have a clear next step after the spending breakdown. The home feed doesn't change based on usage — same experience whether last opened yesterday or three weeks ago. The weekly summary email has a 22% open rate, but the in-app experience doesn't continue what the email started.

*Source: #product-engage Slack thread, Monday 9:14am.*
