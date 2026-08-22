# Metric Diagnosis — 30-Day Retention

*Note: fictional course scenario. Builds on [data/metric-findings.md](metric-findings.md). All numbers below are freshly queried from the same dataset — see queries inline.*

## 1. Metric Tree: What Actually Moves 30-Day Retention

```
30-day retention rate
= (users retained at day 7 / total signups)          <- "Day-7 gate"
  × (users retained at day 30 / users retained at day 7)  <- "Day7→Day30 stickiness"
```

Measured directly from the week-5 experiment data:

| | Day-7 gate | Day7→Day30 stickiness | Day-30 retention (gate × stickiness) |
|---|---|---|---|
| Control | 46.0% | 47.8% (11/23) | 22.0% |
| summary_v1 | 76.0% | 47.4% (18/38) | 36.0% |

**This decomposition is the single most important finding in this diagnosis:** the two levers are not equally movable. The Day-7 gate is a completely different problem from Day7→Day30 stickiness, and they respond to different things (see Q3).

**What we know moves the Day-7 gate**, from the data already gathered:
- The weekly summary treatment itself (+30pts, Q3 in metric-findings.md)
- Platform (iOS retention nearly doubles with treatment; Android barely moves — see Q4 below)
- Acquisition channel (organic retains meaningfully better than paid/referral, in both arms)
- Setting a savings goal in week 1 (+13.2pts, independent of the experiment — metric-findings.md Q2)

**What does NOT appear to move it**, checked directly against the data:
- Summary open count and act-on count within the treated group (nearly identical between retained and churned — see Q4)
- Raw session count within a cohort (nearly identical average sessions for retained vs. churned users, 4.77 vs 4.74, cohorts 1-4)

**What we don't yet have data on:** what moves Day7→Day30 stickiness specifically. It's identical across both arms (~47-48%), meaning nothing tested so far — including the summary itself — has touched it. This is a real, open gap, not something this diagnosis can answer from existing data.

## 2. What Caused the Decline in Weeks 1-4 — Specifically

```sql
SELECT u.cohort_week, ROUND(1.0*COUNT(s.session_id)/COUNT(DISTINCT u.user_id),2) avg_sessions
FROM nudge_users u LEFT JOIN nudge_sessions s ON u.user_id=s.user_id
WHERE u.cohort_week IN ('1','2','3','4')
GROUP BY u.cohort_week;
```

| cohort_week | day30_retention | avg_sessions_per_user |
|---|---|---|
| 1 | 32.0% | 5.74 |
| 2 | 25.0% | 5.08 |
| 3 | 25.0% | 4.48 |
| 4 | 22.0% | 3.69 |

**Average sessions per user fell 36% (5.74 → 3.69) across the same four cohorts where retention fell 31% (32% → 22%)** — the cleanest, most specific driver in the data, and it's not a compositional artifact. I checked the two obvious alternative explanations and ruled them out:

- **Not acquisition-channel mix shift.** Paid-channel share fluctuates (31% → 42% → 32% → 31%) but doesn't trend monotonically the way sessions and retention do — it can't explain a steady 4-cohort decline.
- **Not goal-setting rate.** Week-1 goal-setting rate by cohort is 32%, 29%, 44%, 27% — noisy, not declining, and cohort 3's spike to 44% doesn't produce a retention bump, meaning goal-rate isn't driving the cohort-level trend.

So the decline isn't explained by *who* signed up changing — it's that engagement itself eroded, cohort over cohort. This is a quantitative confirmation of the exact complaint already documented in the qualitative research: Tom (*"the same dashboard every time"*) and Amara (*"nothing has changed since the first day"*) both describe a static, non-returning-worthy app — and here, independently, the session data shows users are literally opening the app less as cohorts progress. **This isn't two separate findings converging by coincidence — it's the same root cause showing up in both a small qualitative sample and the full quantitative dataset.**

One caveat: this is observational, not causal. It's consistent with "the app gives people less reason to return over time," but the dataset can't rule out an external factor (seasonality, marketing spend changes, etc.) affecting all four cohorts simultaneously.

## 3. What the Week-5 Treatment vs. Control Split Tells Us the Summary Actually Fixed

Referring back to the metric tree in section 1: **the summary's entire effect runs through the Day-7 gate (46% → 76%), not through Day7→Day30 stickiness (47.8% vs. 47.4% — statistically indistinguishable).**

In plain terms: the weekly summary gets meaningfully more people to survive the first week. It does **not** appear to make people who already survived the first week any more likely to stay through day 30. That's a precise, falsifiable claim the data supports directly — and it reframes what "scaling this feature" would actually buy the business: **a bigger, healthier pool of week-1 survivors, not a fix for whatever causes people to drop off later in the month.** If there's a second problem in the day7-to-day30 window, this feature isn't evidence of solving it — nothing in the current build was designed to.

## 4. Four Ranked Hypotheses: Why Some Treatment Users Still Churned

*32 of 50 treatment users (64%) churned by day 30 despite receiving the summary. All checks below are against that group of 50.*

### Rank 1 — Acquisition-channel fit mismatch

**Testable prediction:** Treatment users acquired via paid or referral channels retain at a meaningfully lower rate than organic treatment users, even with similar summary engagement — because channel reflects underlying intent/fit that the summary can't compensate for.

**Confidence: 7/10** — the gap is large and directionally clean (organic 43.3% vs. paid 28.6% vs. referral 16.7%, n=30/14/6), and treatment appears to widen the channel gap rather than just carry it over (organic gains +14.1pts vs. its own control baseline; paid gains only +7.3pts) — suggesting the summary itself works less well for paid/referral users, not just that they started worse. Held back from higher confidence because referral's n=6 is too small to trust on its own, and this is correlational — the underlying mechanism (intent vs. something else about paid/referral users) isn't confirmed.

**Confirms it:** a larger sample (more experiment weeks) showing the organic-vs-paid retention gap is significantly *wider* in the treatment arm than in control — i.e., the summary helps organic users more than paid users, not just that paid users are worse across the board.

**Rules it out:** if paid/referral treatment retention converges toward organic treatment retention as sample size grows, the current gap is noise, not a real channel effect.

**What would raise this from 7 to 9-10:**

1. **A real interaction test, not eyeballed subgroups.** Currently this is a comparison of raw point estimates across small groups. A logistic regression with a `variant × channel` interaction term would confirm whether "treatment helps organic more than paid" is a genuine, significant interaction or just two noisy subgroups that happen to look different. This is the biggest gap — everything else is secondary to getting this right.
2. **Enough sample to trust paid, and especially referral.** n=14 and n=6 are too small to move past directional. At least 3-4x that per channel — more experiment weeks, not just this one cohort — before treating the gap as real rather than noise.
3. **Ruling out platform as a confound.** If paid/referral acquisition skews Android (which Rank 2 already shows has ~zero treatment lift), the "channel effect" could just be the platform effect wearing a different label. Needs the channel × platform crosstab and a model that controls for platform before channel can be said to matter independently.
4. **A direct measure of engagement-within-channel, not just the retention outcome.** Right now the data only shows paid/referral users retain worse — not whether they open/act on the summary at rates similar to organic users (supporting "intent mismatch downstream of the product") or at lower rates (which would look more like an engagement-execution problem, not a pure fit problem). That breakdown doesn't exist yet and would sharpen what "the summary can't compensate for intent" actually means.

Lower priority but still relevant: confirming treatment/control arms were channel-balanced at randomization (so the observed gap isn't a lucky/unlucky split), and — to close the loop fully — a small real-user round with a few churned paid-acquired users asking directly why they didn't stick, rather than inferring motive from channel as a label.

### Rank 2 — Platform-specific friction (Android/web underperforming iOS) — TESTED, MECHANISM DISCONFIRMED

**Testable prediction:** Android users who open the summary act on it (tap the nudge) at a lower rate than iOS users, indicating platform-specific UX friction rather than lower baseline engagement.

**Original confidence: 6/10.** Tested directly:

```sql
WITH per_user AS (
  SELECT u.user_id, u.platform,
    MAX(w.opened) AS ever_opened,
    MAX(w.acted_on) AS ever_acted
  FROM nudge_users u
  JOIN nudge_weekly_summary_sends w ON u.user_id = w.user_id
  WHERE u.cohort_week='5' AND u.variant='summary_v1'
  GROUP BY u.user_id, u.platform
)
SELECT platform, COUNT(*) n_users,
  ROUND(100.0*SUM(ever_opened)/COUNT(*),1) pct_ever_opened,
  ROUND(100.0*SUM(ever_acted)/COUNT(*),1) pct_ever_acted,
  ROUND(100.0*SUM(ever_acted)/NULLIF(SUM(ever_opened),0),1) pct_acted_given_opened
FROM per_user GROUP BY platform;
```

| platform | n_users | ever_opened | ever_acted | acted \| opened |
|---|---|---|---|---|
| android | 22 | 95.5% | 59.1% | 61.9% |
| ios | 23 | 95.7% | 52.2% | 54.5% |
| web | 5 | 100.0% | 80.0% | 80.0% |

**Result: the prediction is disconfirmed.** Android users open and act on the summary at essentially the same rate as iOS users — if anything, slightly *higher* (61.9% vs. 54.5% conditional act-rate). There is no gap in engagement with the summary feature itself between platforms. **Revised confidence: 3/10** — the platform retention gap is still real (confirmed separately, not in question), but the specific mechanism this hypothesis proposed — friction in the goal-setting/nudge interaction — is ruled out by this result. Whatever is causing Android's ~zero treatment lift, it isn't happening inside this feature's UI.

**What this redirects toward:** since in-feature engagement is equal, the platform gap likely sits outside this dataset entirely — e.g., notification delivery reliability, app performance/crash rates, or a platform-correlated population difference unrelated to the summary. None of that is answerable from the current tables.

### Rank 3 — Front-loaded engagement that doesn't sustain (novelty decay at the individual level)

**Testable prediction:** Users who churned despite the treatment opened the summary in week 1 but stopped opening in later weeks, indicating the summary's value doesn't sustain past first exposure even though aggregate open rates rose.

**Confidence: 3/10** — the data already gathered mostly argues against this. The "opened week 1 only, then never again" pattern is rare in both groups (3% of churned users, 6% of retained users) — most people who open the summary at all open it more than once (avg 1.88-1.89 opens out of 4 for both churned and retained). If individual-level novelty decay were the churn driver, you'd expect churned users to show a distinct front-loaded pattern, and they don't.

**Confirms it:** a week-by-week (not just total) open pattern specifically for churned users showing concentration in week 1 vs. spread across weeks — this diagnosis only checked the "week-1-only" extreme case, not the full distribution, so it isn't fully ruled out yet.

**Rules it out:** what's already shown — nearly identical average total opens between churned (1.88) and retained (1.89) users is a strong signal this isn't the driver, though not a complete disproof without the full weekly distribution.

### Rank 4 — No savings goal set means the summary has nothing to reinforce

**Testable prediction:** Users who churned despite opening the summary did not have a savings goal set — without a goal, the summary has nothing to make progress on, so it fails to retain them.

**Confidence: 2/10** — this is the most intuitive-sounding hypothesis, and the data already directly contradicts it: goal-setting rate is **identical** between churned and retained treatment users (44% in both groups). Whatever is driving churn within the treated group, it isn't goal-setting status — that variable simply doesn't differ between the two outcomes here.

**Confirms it:** nothing in the current data would confirm this — it would need a completely different underlying pattern (a real gap in goal-setting rate between churned/retained) that isn't present.

**Rules it out:** already ruled out by what's in hand — the 44%/44% split is about as clean a null result as this dataset produces.

## 5. Which Hypothesis to Test First — Revised After Testing Rank 2

**Original recommendation was Rank 2 (platform friction), on the logic that it was cheap to test and directly actionable by this squad. It was tested (see above) and the specific mechanism was disconfirmed** — Android users engage with the summary itself at parity with iOS (61.9% vs. 54.5% act-given-open), so the retention gap isn't a product-surface problem this team can fix by redesigning the nudge flow. That closes off the "low cost to test, high value if confirmed" path this recommendation depended on.

**Revised recommendation: Rank 1 — acquisition-channel fit — is now the one to act on next**, by default rather than by a stronger case than before. It remains the best-evidenced hypothesis on the list (7/10, now the highest surviving score), and while acting on it sits partly outside this squad (targeting/acquisition strategy is growth's lever), the *product-relevant* piece — whether paid/referral users engage with the summary itself differently, per the "what would raise confidence" item #4 already queued — is something this team can check next without waiting on growth. That's the concrete next step: pull open/act rate by channel the same way it was just pulled by platform, before deciding whether this is a targeting problem, a product problem, or both.

**Separately, the platform gap itself is still open and worth a ticket** — just not an engineering-sprint ticket. Since in-feature engagement is ruled out as the cause, the next owner for that question is whoever can see notification delivery logs and crash/performance data by platform, not product/design.
