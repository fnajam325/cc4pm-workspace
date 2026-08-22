*This file always mirrors the most recent dated update in this folder. Run date: 2026-08-08 — see [2026-08-08.md](2026-08-08.md) for the permanent snapshot, or [README.md](README.md) for the full run index.*

# Status Updates — Engage v2 Weekly Summary

*Note: fictional course scenario. Two updates, calibrated to [stakeholders/raj.md](../../stakeholders/raj.md), [stakeholders/lena.md](../../stakeholders/lena.md), and [stakeholders/marcus.md](../../stakeholders/marcus.md).*

## Team Update — Raj & Lena

*Async, posted to the team channel — not a meeting.*

**Quick status:** week-5 experiment is live. Day-7 retention lift is significant (76% vs. 46%). Day-30 isn't significant yet (36% vs. 22%, n=50/arm) — letting it run longer before we call it. Full data: `data/metric-findings.md` + `data/metric-diagnosis.md`.

---

**Raj —**

- Ranking logic + instrumentation: resolved from Thursday, confirmed working via real event data. Nothing outstanding from that session.
- Still open, no surprises, flagging now:
  - Empty-transactions state — not designed, blocking before we go past this one experiment cohort
  - The `prompt()` issue from QA — unconfirmed whether the real build has it too, need a direct answer from you rather than us assuming either way
  - Platform gap (Android ~0 lift vs. iOS +25pts) — friction-in-app already ruled out by query, likely outside this squad (notification delivery / perf), not asking you to own it, just tracking it
- New scoping request coming, not asking for an estimate yet: a week-2+ continuation loop, to address a real gap the data confirmed (Day7→Day30 stickiness is flat, treatment or not — full brief in `docs/design-review.md`). Lena's shaping the design first; you'll get something concrete to size once that's ready, not a vague ask.

**Lena —**

Here's what the real experiment data told us, not just interviews this time: the gap you flagged in design review — no defined week-2 moment — is confirmed with actual numbers. Day7→Day30 conditional retention is statistically identical between treatment and control (~47-48% either way). The feature gets people through week 1. It does nothing measurable for people who already got through week 1 and left later — which is Tom's exact profile from the original interviews.

That validates both of your open decisions from the design review:
- The "This Week" framing question — real data now backs your instinct that it's incomplete, not just your read of the interviews
- The week-2+ loop shape — I've drafted a starting design brief (`docs/design-review.md`) with a few directions (state-carrying insights across weeks, an active-accountability touchpoint, milestone/streak framing). It's a starting point for you to shape, not a spec to skin — same deal as last time.

One more thing per your standing bar: none of this has touched real users yet. Before we build the week-2 loop for real, I'd want a real interview round with actual multi-week churners, not another simulated pass — flagging that now so it's not a surprise later.

---

## Leadership Update — Marcus

*One page. Recommendation first.*

**Recommendation: let the Engage v2 experiment run 2 more weeks before deciding on full rollout. Early results are strong, but the number you actually care about isn't statistically significant yet.**

**What we know:**
- Day-7 retention: 76% (treatment) vs. 46% (control) — statistically significant, real effect
- Day-30 retention: 36% vs. 22% — the right size to matter, but not yet significant at this sample size (p≈0.12). This is the number that matters for your call, and it's not there yet.
- Goal-setting predicts retention independent of this experiment (34.8% vs. 21.6%) — the underlying premise holds up outside the test too

**New risk, with a plan:** the data also shows this feature doesn't yet help users who churn *after* surviving week 1 — a meaningful segment (matches the "Tom" profile from our original interviews: didn't leave on day one, left at week 5). We have a concrete design brief to address it (`docs/design-review.md`), including a real-user validation step before we build — not asking you for anything on this yet, just flagging it so it's not new information later.

**Cost of waiting:** two more weeks of experiment data, not an indefinite delay. We're not blocked — we're powering the metric you need before committing sprint time to full rollout.

**Ask:** no decision needed from you today. Come back to you in ~2 weeks with either a significant day-30 result and a rollout timeline, or a clear read on why it didn't move.
