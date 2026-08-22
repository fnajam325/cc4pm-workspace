# Metric Findings — Weekly Summary Experiment (Week 5)

*Note: fictional course scenario. Source: [public Google Sheet](https://docs.google.com/spreadsheets/d/1jMZXItXhbYxdBkzM74z2BXbCHHbnvqh4Eyclmmhdiww/edit) (`nudge_users`, `nudge_sessions`, `nudge_retention`, `nudge_nudges`, `nudge_weekly_summary_sends`), queried via SQLite. 500 users across cohort weeks 1-5; week 5 only is split 50/50 `control` vs. `summary_v1`.*

## 1. 30-Day Retention by Cohort Week

```sql
SELECT
  cohort_week,
  COUNT(*) AS n_users,
  SUM(day_30) AS retained_day30,
  ROUND(100.0 * SUM(day_30) / COUNT(*), 1) AS retention_pct
FROM nudge_retention
GROUP BY cohort_week
ORDER BY CAST(cohort_week AS INTEGER);
```

| cohort_week | n_users | retained_day30 | retention_pct |
|---|---|---|---|
| 1 | 100 | 32 | 32.0% |
| 2 | 100 | 25 | 25.0% |
| 3 | 100 | 25 | 25.0% |
| 4 | 100 | 22 | 22.0% |
| 5 | 100 | 29 | 29.0% |

**Plain English:** For each weekly signup cohort, count how many users were still active at day 30 out of everyone who signed up that week.

**What the decline looks like:** A clear, steady drop from cohort week 1 (32%) to week 4 (22%) — a 10-point decline, roughly a third of the starting rate, consistent with the retention slide behind this whole project. Week 5 breaks the trend and ticks back up to 29% — but that's misleading on its own. Week 5 is the experiment cohort, and its 100 users are a blend of 50 `control` (22.0% day-30 retention — see Q3, almost exactly on the week-4 trendline) and 50 `summary_v1` (36.0% day-30 retention). **The underlying organic decline didn't reverse; the treatment arm pulled the blended week-5 average up.** Reporting week 5's 29% without separating the arms would understate how bad the control trend actually is and overstate what's happening organically.

**What it means for scaling the weekly summary:** This is the headline argument for scaling — without the treatment, week 5 would almost certainly have continued the week 1→4 decline (control's 22% sits right on that line). The summary feature appears to be the only thing arresting the slide in this dataset.

## 2. Does Setting a Savings Goal in Week 1 Predict Better Retention?

```sql
SELECT
  CASE
    WHEN u.goal_set_date <> '' AND julianday(u.goal_set_date) - julianday(u.signup_date) <= 7
    THEN 'goal_set_week1'
    ELSE 'no_goal_week1'
  END AS goal_group,
  COUNT(*) AS n_users,
  SUM(r.day_30) AS retained_day30,
  ROUND(100.0 * SUM(r.day_30) / COUNT(*), 1) AS retention_pct
FROM nudge_users u
JOIN nudge_retention r ON u.user_id = r.user_id
WHERE u.cohort_week <> '5'  -- excludes the experiment cohort to avoid mixing in the treatment effect
GROUP BY goal_group;
```

| goal_group | n_users | retained_day30 | retention_pct |
|---|---|---|---|
| goal_set_week1 | 132 | 46 | 34.8% |
| no_goal_week1 | 268 | 58 | 21.6% |

**Plain English:** Join users to their own retention record, join their signup date to their goal-set date, and split into "set a goal within 7 days of signup" vs. everyone else — restricted to cohorts 1-4 so the week-5 experiment doesn't contaminate the comparison.

**What it means:** Yes — goal-setters retain at 34.8% vs. 21.6% for non-goal-setters, a 13.2-point gap (goal-setters retain at roughly **1.6x** the rate). This is directionally consistent with, though a bit smaller than, the "~2x churn" figure cited earlier in discovery — worth reconciling which definition of "week 1" and which population the original 2x figure came from before quoting both numbers in the same room.

**What it means for scaling the weekly summary:** This validates the core premise the feature is built on — goal-setting is a real, strong retention predictor in this data, not just a research anecdote. It directly supports the design decision (`docs/pm-brief.md`) to make the nudge *be* the goal-setting action rather than a separate ask.

## 3. Week 5 Only: Day-7 and Day-30 Retention, Treatment vs. Control

```sql
SELECT
  u.variant,
  COUNT(*) AS n_users,
  SUM(r.day_7) AS retained_day7,
  ROUND(100.0 * SUM(r.day_7) / COUNT(*), 1) AS day7_pct,
  SUM(r.day_30) AS retained_day30,
  ROUND(100.0 * SUM(r.day_30) / COUNT(*), 1) AS day30_pct
FROM nudge_users u
JOIN nudge_retention r ON u.user_id = r.user_id
WHERE u.cohort_week = '5'
GROUP BY u.variant;
```

| variant | n_users | day7_retained | day7_pct | day30_retained | day30_pct |
|---|---|---|---|---|---|
| control | 50 | 23 | 46.0% | 11 | 22.0% |
| summary_v1 | 50 | 38 | 76.0% | 18 | 36.0% |

**Plain English:** Filter to week-5 users only (the only cohort with a real control group) and compare day-7 and day-30 retention between the two arms.

**What it means:** A large lift on both windows — +30 points at day 7 (76% vs. 46%), +14 points at day 30 (36% vs. 22%). I ran a quick two-proportion significance check given the small arm size (n=50 each):
- **Day 7: statistically significant** (z ≈ 3.1, p < 0.01) — a real, reliable effect.
- **Day 30: directionally strong but not yet statistically significant at conventional thresholds** (z ≈ 1.5, p ≈ 0.12) — the 14-point gap is the right size to matter, but n=50/arm isn't quite enough to be confident it isn't noise.

**What it means for scaling the weekly summary:** The early-engagement effect (day 7) is real and reliable — the feature clearly changes week-1 behavior. The ultimate metric that matters (day-30 retention, the project's actual target) points the same direction and is a large effect size, but this single week's sample isn't large enough on its own to call it proven. **Recommendation: this is strong enough to justify continuing the experiment and scaling exposure, not strong enough to declare victory and stop measuring** — the day-30 result needs a larger sample (more cohort weeks in the experiment) before it's a settled fact rather than a promising signal.

## 4. Did Weekly Summary Open Rate Improve Across the 4 Sends vs. Control?

```sql
SELECT
  variant,
  week_number,
  COUNT(*) AS n_sends,
  SUM(opened) AS n_opened,
  ROUND(100.0 * SUM(opened) / COUNT(*), 1) AS open_pct,
  SUM(acted_on) AS n_acted
FROM nudge_weekly_summary_sends
GROUP BY variant, week_number
ORDER BY variant, week_number;
```

| variant | week_number | n_sends | opened | open_pct | acted_on |
|---|---|---|---|---|---|
| control | 1 | 50 | 2 | 4.0% | 0 |
| control | 2 | 50 | 2 | 4.0% | 2 |
| control | 3 | 50 | 2 | 4.0% | 1 |
| control | 4 | 50 | 3 | 6.0% | 1 |
| summary_v1 | 1 | 50 | 14 | 28.0% | 6 |
| summary_v1 | 2 | 50 | 26 | 52.0% | 11 |
| summary_v1 | 3 | 50 | 26 | 52.0% | 11 |
| summary_v1 | 4 | 50 | 28 | 56.0% | 7 |

**Plain English:** Group each week's sends by which arm the user was in, and calculate what fraction were opened.

**What it means:** Control stays flat and low (4-6%) across all four sends — essentially no engagement with whatever control users receive. `summary_v1` starts strong (28%) and **improves further** to 52% by week 2, then holds around 52-56% through week 4. This is the opposite of the "novelty wears off" pattern you'd worry about with a new feature — engagement grew and then stabilized at a high plateau rather than decaying.

**What it means for scaling the weekly summary:** This is the cleanest, largest, least ambiguous result in the dataset (28-56% vs. 4-6% doesn't need a significance test to be convincing) and it directly supports the original hypothesis that the email/app disconnect was a real problem worth fixing — engagement with the *in-app* version is 7-14x the control baseline and rising, not fading.

## Summary: What This Means for the Scale Decision

- **Strongest evidence:** open-rate lift (Q4) and day-7 retention lift (Q3) are both large and statistically solid — the feature clearly, reliably changes early behavior.
- **Directionally strong but underpowered:** the day-30 retention lift (Q3, +14pts) is the right effect size to matter but doesn't clear significance at n=50/arm — needs more weeks of experiment data before it's a settled result.
- **Validates the core design premise:** goal-setting predicts retention independent of the experiment (Q2), and the cohort trend (Q1) shows the treatment arm is the only thing breaking an otherwise-continuing decline.
- **Recommendation:** the data supports **continuing and expanding the experiment** — enough signal to justify more exposure and more weeks of data, not yet enough on the primary (day-30) metric alone to declare it proven and stop measuring.
