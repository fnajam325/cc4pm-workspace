# Agent Spec: Monday Retention Digest

*Note: fictional course scenario, but the script itself is real and runnable — it pulls the actual public Nudge dataset used throughout this project. See [agents/monday_retention.py](monday_retention.py).*

## Purpose

Runs every Monday morning before standup. Checks Nudge 30-day retention against the prior week's baseline, compares session counts and push notification open rates, and posts a 3-part plain-English digest to Slack.

## What "Last Week" Means Here — Important Caveat

This dataset is a static snapshot with 5 fixed signup cohorts (`cohort_week` 1-5), not a live, continuously-updating analytics feed. There's no true rolling 7-day window to compare. The script uses **the two most recent cohort weeks present in the data** as the closest real analog to "this week vs. last week." In a real deployment against a live warehouse, this comparison would instead be a genuine trailing-7-day vs. prior-7-day window — the script is structured so that swap is a query change, not a rewrite (see "Moving to Production" below).

## Data Source

The same public Google Sheet used throughout this project (`nudge_users`, `nudge_sessions`, `nudge_retention`, `nudge_nudges`, `nudge_weekly_summary_sends`), fetched live via CSV export on each run — not a cached copy. No credentials needed; it's a public sheet.

## Comparison Logic

For the two most recent cohort weeks:
- **30-day retention rate** — `SUM(day_30) / COUNT(*)` from `nudge_retention`
- **Avg sessions per user** — session count joined to users, per cohort week
- **Push notification open rate** — `SUM(opened) / COUNT(*)` from `nudge_nudges`, joined to users

The **"signal to watch"** is whichever of the three moved the most (sessions normalized to a % move so it's comparable to the two percentage-based metrics, not a raw count).

The **"suggested action"** is rule-based, not an AI judgment call — deliberately simple and legible:
- Push open rate dropped most → check nudge relevance/timing before sending more
- Sessions dropped most → check for a broken flow/missing trigger before assuming it's a retention problem
- Retention itself dropped most → look at that cohort's first-week experience
- Biggest mover improved → flag it as worth understanding so it can be repeated
- Nothing moved meaningfully → say so plainly

**Automatic caveat:** if the current cohort week has an active experiment split (`variant` populated), the digest says so explicitly — it reports the blended average across arms, not either arm alone, and flags that rather than silently misleading whoever reads it before standup.

## How to Run It Manually (Verify Before Automating)

```bash
python3 agents/monday_retention.py
```

No dependencies beyond Python 3's standard library (`csv`, `sqlite3`, `urllib`) — nothing to install. This prints the digest and does **not** post anywhere; safe to run repeatedly while checking the output.

**Verified real output from an actual run:**

```
📊 *Nudge Weekly Retention Digest* — cohort week 5 vs. week 4 (n=100)

*Headline:* 30-day retention is 29.0% (↑ 7.0pt vs. 22.0% last week)
*Signal to watch:* avg sessions/user moved the most — 4.48 (was 3.69) (↑ 0.79)
*Suggested action:* avg sessions/user improved the most — worth understanding what changed so it can be repeated.

_Note: Cohort week 5 contains an active experiment split (control vs. treatment) — this digest reports the blended average across both arms, not either arm alone._
```

This matches `data/metric-findings.md`'s numbers exactly (29.0% vs. 22.0% retention) — cross-checked, not coincidental.

## Slack Message Template

```
📊 *Nudge Weekly Retention Digest* — cohort week {this_week} vs. week {last_week} (n={n})

*Headline:* 30-day retention is {retention_this}% ({arrow} {abs_delta}pt vs. {retention_last}% last week)
*Signal to watch:* {signal_name} moved the most — {signal_desc} ({arrow} {abs_signal_delta})
*Suggested action:* {action}

_Note: {caveat, only shown if applicable}_
```

Posting is gated behind `--post-slack` **and** a `SLACK_WEBHOOK_URL` environment variable — without both, it prints what it *would* post rather than fabricating a send. No webhook is configured in this environment; verified this fallback path works correctly rather than assuming it.

```bash
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..." python3 agents/monday_retention.py --post-slack
```

## Moving to Production

This is a manual-run script today. To make it actually run every Monday morning unattended, per the original ask:

- **Cron** (simplest, if it lives on a machine that's always on): `0 8 * * 1 SLACK_WEBHOOK_URL=... python3 /path/to/agents/monday_retention.py --post-slack`
- **n8n**: an Execute Command or HTTP Request node calling this script (or porting its ~3 queries into n8n's native nodes) on a Cron trigger node set to Monday mornings
- **Scheduled cloud function** (e.g., a Lambda/Cloud Function on a timer) if it shouldn't depend on a specific machine being on

None of these are set up yet — this stays a manual script until you pick one.

## Known Limitations

- "Last week" = most recent two cohort weeks in a static dataset, not a true rolling window (see caveat above)
- The "suggested action" is a simple rule-based heuristic on 3 metrics, not a diagnosis — it's meant to point at what to look at, not replace `data/metric-diagnosis.md`-style analysis
- No real Slack webhook connected in this environment — posting is implemented and tested for the no-webhook fallback path, not for an actual successful send
