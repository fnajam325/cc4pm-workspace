# Spec Readiness — Engage v2 Weekly Summary

*Note: fictional course scenario. Produced from an in-character exchange: Claude playing Raj (per [stakeholders/raj.md](../stakeholders/raj.md)) vs. a separate agent playing the PM, pressure-testing [docs/decision-brief.md](decision-brief.md) + [docs/pm-brief.md](pm-brief.md) + [strategy.md](../strategy.md) as a spec.*

**Update (2026-08-08):** the Thursday ranking-logic + instrumentation session described below as a condition of Raj's "yes" has since happened. A v1 insight-selection heuristic was defined and shipped in the real experiment build, and instrumentation is confirmed working (proven by real event data in `data/metric-findings.md`). This session's outcome remains the historical record of *why* those items were required — see `docs/prds/latest.md` for current, resolved status.

## 1. Spec Readiness Summary

**Solid — no changes needed:**
- The problem framing and "why now" (decision brief) — grounded in three independent discovery sources, not disputed.
- The feature concept itself (insight + nudge + goal progress) and the interview decisions behind it (pm-brief.md) — clear and well-reasoned.
- The known open risk (debt-awareness) — already flagged in three docs, just needed a scope decision, not more discovery.

**Needed work — real gaps, not nitpicks:**
1. **No acceptance criteria.** The existing docs describe a concept and a prototype, not a buildable spec. "Done" was undefined.
2. **No success metric.** `docs/hypothesis.md` already flagged this as unknown — confirmed here as a real blocker, not just a research gap.
3. **No empty-state definition.** The prototype was only ever built/tested for "connected, 2 weeks, has spending data, no goal." A user with zero transactions this week — plausibly a large share of the target churn cohort — has no defined experience.
4. **"New ranking logic" was never defined.** This was Raj's own original feasibility caveat (strategy.md), still open. The prototype hardcodes one example (dining category); there's no rule set for insight selection generally. **This is the actual sizing blocker** — everything else can be scoped around, this can't.
5. **Debt-awareness scope was ambiguous** ("TBD" reads as scope creep risk to an engineering lead, even when the intent was "not yet decided"). Resolved in this exchange: **explicitly out of scope for v2, disclosure-stopgap only.**
6. **Instrumentation assumed, not confirmed.** The "leading indicator" metrics proposed during this exchange assumed tap/goal-set event tracking exists. It was checked against the project docs and **found undocumented** — a real open question, not a resolved one.

**Outcome:** Conditional yes from Raj, gated on a scoped working session (ranking-logic rules + instrumentation answer) happening before sprint kickoff.

## 2. Rewritten Sections

### Acceptance Criteria (new — did not exist before)

- [ ] Insight card displays a spending signal genuinely derivable from ≤2 weeks of transaction data (no fabricated multi-month patterns)
- [ ] Nudge is contextually tied to the displayed insight and doubles as the goal-setting action
- [ ] Tapping the nudge opens an inline goal-setting flow; confirming updates goal progress in place, without a page reload
- [ ] Two states are supported and tested: no goal set, has existing goal
- [ ] **Empty state (new):** user with zero transactions this week sees defined fallback content — no insight card claiming data that doesn't exist, no nudge with nothing to reference
- [ ] Debt-awareness: out of scope for this build. Nudge includes the softened-framing/disclosure stopgap (acknowledges the app doesn't know about debt or other priorities) — no reprioritization logic
- [ ] Insight-selection ("ranking") logic: defined via the Thursday timebox session — v1 heuristic acceptable, does not need to be ML-based
- [ ] Success metric and measurement plan confirmed before kickoff (see below)

### Success Metric (new — did not exist before)

- **Leading indicator:** week 1-2 nudge-tap rate and goal-set rate
- **Lagging indicator:** 30-day retention (the project's north star metric)
- **Measurement dependency (open):** whether tap/goal-set event tracking already exists is unconfirmed — checked against current project docs and not found documented. Must be confirmed as existing infra vs. net-new instrumentation before it can be estimated or committed to a specific check-in interval.

### Scope Line: Debt-Awareness (rewritten from "TBD")

**Out of scope for this build.** The nudge will include the disclosure stopgap already validated in prototype testing (acknowledges what the app doesn't know — debt, other priorities). No debt-aware reprioritization logic will be built in this pass. Whether Nudge should pursue debt-aware logic at all — and what data that would require — is separate follow-up discovery, not a v2 build item.

## 3. Async Slack Message (Confirm Scope Before Sprint Kickoff)

```
Hey Raj — locking in what came out of our spec review:

Scope for this sprint:
• Insight + nudge + goal-progress loop, per the AC now in docs/spec-readiness.md
• Empty-state (zero transactions this week) is in scope — not an edge case, defining it upfront
• Debt-awareness: explicitly OUT of scope. Disclosure stopgap only, no reprioritization logic. Written down so it doesn't creep in mid-sprint.

Still need before kickoff:
• Ranking-logic v1 rules (insight-selection heuristic) — this is the real blocker on your estimate
• Confirmation on whether tap/goal-set event tracking exists today or is net-new instrumentation

Proposing Thursday, 45 min, to nail both. Holding sprint kickoff until after that session — let me know if Thursday doesn't work and I'll move it, but I don't want to start the sprint without this locked.

Full writeup: docs/spec-readiness.md
```
