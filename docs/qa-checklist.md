# QA Checklist — Engage v2 Weekly Summary

*Note: fictional course scenario. Sources: [prototype/index.html](../prototype/index.html), [prototype/README.md](../prototype/README.md), [docs/spec-readiness.md](spec-readiness.md).*

## 1. Edge Case List

### Empty States
- **No transactions this week** — not modeled anywhere in the prototype. The insight card's copy and figures are hardcoded; there is no fallback for a week with zero spend data.
- **No savings goal set** — modeled and is in fact the prototype's primary/default state (`goalEmpty` div, tailored nudge copy).
- **No sessions in the past week** (long-absence user, e.g. the target persona who hasn't opened the app in 2 weeks) — not differentiated. The greeting ("Welcome back") is identical regardless of how long the user has been away.
- **Compound empty state** — no goal AND no transactions simultaneously. Only one dimension (goal state) is branched in the prototype; this combination is undefined.

### Edge Data Conditions
- **Single transaction only** (e.g., account connected today) — the week-over-week comparison logic ("up from $96 last week") assumes two comparable weeks of data; undefined behavior with less than that.
- **Duplicate/misclassified categories** — no aggregation or dedup logic exists in the prototype (all values are hardcoded); real behavior is undefined.
- **Zero or negative amounts** (refunds, reversals, pending credits) — the insight framing ("Dining was $X this week") assumes a positive spend figure; undefined for $0 or negative.
- **All categories at $0** — no defined "top category" when there's nothing to rank.
- **Erroneous/outlier amount** (e.g., data pipeline duplicate producing an inflated figure) — no bounds-checking or sanity logic visible.

### Multi-Account Scenarios
- **Multiple banks connected** — prototype and PM brief only ever reference a single connected account ("connected their Chase account"). No multi-account aggregation, no account-level attribution shown.
- **Conflicting data across accounts** (e.g., a shared-card charge appearing on two linked accounts) — no cross-account dedup logic exists.
- **One account healthy, one disconnected/needs re-auth** — no error or reconnect state is shown anywhere in the prototype.

### Permission States
- **Notifications off** — out of scope for this single static screen (no notification content exists in this artifact), but flagged as a real risk: `docs/design-review.md` already identified that the feature's actual retention value depends on an undesigned week-2 re-engagement loop — if that loop turns out to depend on notifications, notifications-off is a critical unhandled case for the broader feature, not just this screen.
- **Background refresh off** (data could be stale when opened) — no "last updated"/staleness indicator exists; the user has no way to know whether "This Week" reflects current data.

## 2. PM QA Checklist — Screen-by-Screen

*Checked against [prototype/index.html](../prototype/index.html) directly, cross-referenced with the acceptance criteria already agreed in [docs/spec-readiness.md](spec-readiness.md).*

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | Insight is genuinely derivable from ≤2 weeks of data (per AC) | **Cannot determine** | The one hardcoded example (dining, $184 vs $96) is consistent with the *intent*, but there's no real insight-selection logic in the code to verify against — see #9. |
| 2 | Nudge is contextually tied to the displayed insight | **Pass** | Nudge copy directly references the specific figure and category shown above it. |
| 3 | Nudge doubles as the goal-setting action | **Pass** | Confirmed in code — `tryStarterBtn`/`openGoalFlow` both lead into goal-setting, no separate/unrelated CTA. |
| 4 | Tapping nudge opens inline flow; confirming updates goal progress in place, no reload | **Pass** | Verified interactively — toast, done-pill, and goal card all update via DOM manipulation, no navigation. |
| 5 | No-goal-set state supported and functional | **Pass** | Default state, fully wired (`renderNoGoalState`, starter-fund flow, upgrade path). |
| 6 | Has-existing-goal state supported and functional | **Pass** | Toggle-accessible, fully wired (`renderHasGoalState`, Europe Trip example, redirect action). |
| 7 | Zero-transactions-this-week empty state exists | **Fail** | Confirmed absent — no code path for this case anywhere in the file. |
| 8 | Debt-awareness disclosure present, no reprioritization logic (per agreed scope) | **Pass** | Fine-print text present verbatim: "We don't know about debt or other priorities yet, so use your judgment." No debt-based logic branches exist, consistent with scope. |
| 9 | Insight-selection ("ranking") logic is defined | **Fail** | Confirmed still TBD in spec-readiness.md — the file only ever renders one hardcoded example; there's no selection logic to inspect. |
| 10 | Instrumentation/analytics hooks exist for the agreed success metrics (tap rate, goal-set rate) | **Fail** | No analytics/event-tracking calls anywhere in the script — confirms spec-readiness.md's flagged instrumentation gap at the code level, not just the planning level. |

**Blocking before launch:**
- #7 — zero-transactions empty state (explicitly agreed as in-scope AC)
- #9 — insight-selection logic (already identified as the actual sizing blocker; nothing beyond the single hardcoded example exists to ship)
- #10 — instrumentation (explicitly agreed to be confirmed *before* sprint kickoff, not after)

**Can ship as known issues, tracked separately:**
- #1 — acceptable as a known limitation once #9 is resolved (same root cause)
- No staleness/last-updated indicator — low risk to the core loop
- No guard against rapid double-submission on "Confirm goal" (low risk — the update is idempotent, but worth a follow-up ticket)

## 3. First PR Comment for Raj

> Quick question before this merges — in the custom-goal-amount flow, the input is collected via a native `prompt()` (`chipRow` handler, "Custom" chip). That works fine in this browser prototype, but `prompt()` isn't available in a real mobile app context — is the plan to replace this with an actual input component before this becomes real engineering work, or is there a reason to keep a native-prompt-style pattern here that I'm missing? Not blocking the prototype review, just want to make sure it doesn't quietly carry over into the real build.
