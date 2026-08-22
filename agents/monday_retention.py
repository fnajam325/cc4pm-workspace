#!/usr/bin/env python3
"""
monday_retention.py — Weekly Nudge retention/engagement digest.

Pulls the 5 tabs of the public Nudge dataset, compares the two most recent
signup cohorts (the closest real analog to "this week vs. last week" in this
static dataset), and prints/posts a 3-part plain-English digest.

See agents/monday-retention.md for the full spec, caveats, and how this
would run in production (cron / n8n / etc.).

Usage:
    python3 monday_retention.py                # dry run — prints only
    python3 monday_retention.py --post-slack    # also posts, if SLACK_WEBHOOK_URL is set
"""
import csv
import io
import json
import os
import sqlite3
import sys
import urllib.request

SHEET_ID = "1jMZXItXhbYxdBkzM74z2BXbCHHbnvqh4Eyclmmhdiww"
TABS = {
    "nudge_users": 58602447,
    "nudge_sessions": 1457578788,
    "nudge_retention": 489768283,
    "nudge_nudges": 539312070,
    "nudge_weekly_summary_sends": 991288082,
}


def fetch_csv(gid):
    url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={gid}"
    with urllib.request.urlopen(url, timeout=20) as resp:
        return resp.read().decode("utf-8")


def load_db():
    conn = sqlite3.connect(":memory:")
    for name, gid in TABS.items():
        raw = fetch_csv(gid)
        rows = list(csv.reader(io.StringIO(raw)))
        header, data = rows[0], rows[1:]
        cols = ", ".join(f'"{h}" TEXT' for h in header)
        conn.execute(f"CREATE TABLE {name} ({cols})")
        placeholders = ", ".join("?" for _ in header)
        conn.executemany(f"INSERT INTO {name} VALUES ({placeholders})", data)
    conn.commit()
    return conn


def pct(n, d):
    return round(100.0 * n / d, 1) if d else 0.0


def compute_digest(conn):
    cur = conn.cursor()

    cur.execute(
        "SELECT DISTINCT CAST(cohort_week AS INTEGER) FROM nudge_users ORDER BY 1 DESC LIMIT 2"
    )
    weeks = [r[0] for r in cur.fetchall()]
    if len(weeks) < 2:
        raise SystemExit("Need at least 2 cohort weeks in the data to compare.")
    this_week, last_week = weeks[0], weeks[1]

    def retention(week):
        cur.execute(
            "SELECT COUNT(*), SUM(day_30) FROM nudge_retention WHERE CAST(cohort_week AS INTEGER)=?",
            (week,),
        )
        n, retained = cur.fetchone()
        return pct(retained or 0, n), n

    def avg_sessions(week):
        cur.execute(
            """
            SELECT COUNT(DISTINCT u.user_id), COUNT(s.session_id)
            FROM nudge_users u LEFT JOIN nudge_sessions s ON u.user_id = s.user_id
            WHERE CAST(u.cohort_week AS INTEGER)=?
            """,
            (week,),
        )
        n_users, n_sessions = cur.fetchone()
        return round(n_sessions / n_users, 2) if n_users else 0.0

    def push_open_rate(week):
        cur.execute(
            """
            SELECT COUNT(*), SUM(n.opened)
            FROM nudge_users u JOIN nudge_nudges n ON u.user_id = n.user_id
            WHERE CAST(u.cohort_week AS INTEGER)=?
            """,
            (week,),
        )
        n, opened = cur.fetchone()
        return pct(opened or 0, n)

    def has_variant_split(week):
        cur.execute(
            "SELECT DISTINCT variant FROM nudge_users WHERE CAST(cohort_week AS INTEGER)=? AND variant<>''",
            (week,),
        )
        return len(cur.fetchall()) > 0

    ret_this, n_this = retention(this_week)
    ret_last, _ = retention(last_week)
    sess_this = avg_sessions(this_week)
    sess_last = avg_sessions(last_week)
    push_this = push_open_rate(this_week)
    push_last = push_open_rate(last_week)

    ret_delta = round(ret_this - ret_last, 1)
    sess_delta = round(sess_this - sess_last, 2)
    push_delta = round(push_this - push_last, 1)

    movers = {
        "30-day retention": (ret_delta, f"{ret_this}% (was {ret_last}%)"),
        "avg sessions/user": (sess_delta, f"{sess_this} (was {sess_last})"),
        "push notification open rate": (push_delta, f"{push_this}% (was {push_last}%)"),
    }

    def rel_move(name, delta):
        if name == "avg sessions/user" and sess_last:
            return abs(delta) / sess_last * 100
        return abs(delta)

    signal_name, (signal_delta, signal_desc) = max(
        movers.items(), key=lambda kv: rel_move(kv[0], kv[1][0])
    )

    if signal_name == "push notification open rate" and signal_delta < 0:
        action = "Push open rate dropped the most — check recent nudge copy/timing for relevance before sending more this week."
    elif signal_name == "avg sessions/user" and signal_delta < 0:
        action = "Session frequency dropped the most — check for a broken flow or missing re-engagement trigger before assuming it's a retention problem."
    elif signal_name == "30-day retention" and signal_delta < 0:
        action = "Retention itself moved the most — look at this cohort's first-week experience before anything else."
    elif signal_delta > 0:
        action = f"{signal_name} improved the most — worth understanding what changed so it can be repeated."
    else:
        action = "No signal moved meaningfully this week — a quiet week, still worth a quick skim before standup."

    caveats = []
    if has_variant_split(this_week):
        caveats.append(
            f"Cohort week {this_week} contains an active experiment split (control vs. treatment) — "
            "this digest reports the blended average across both arms, not either arm alone."
        )

    return {
        "this_week": this_week,
        "last_week": last_week,
        "n_this_week": n_this,
        "retention": {"this": ret_this, "last": ret_last, "delta": ret_delta},
        "sessions": {"this": sess_this, "last": sess_last, "delta": sess_delta},
        "push": {"this": push_this, "last": push_last, "delta": push_delta},
        "signal_name": signal_name,
        "signal_desc": signal_desc,
        "signal_delta": signal_delta,
        "action": action,
        "caveats": caveats,
    }


def arrow(x):
    return "↑" if x > 0 else ("↓" if x < 0 else "→")


def format_digest(d):
    lines = [
        f"📊 *Nudge Weekly Retention Digest* — cohort week {d['this_week']} vs. week {d['last_week']} (n={d['n_this_week']})",
        "",
        f"*Headline:* 30-day retention is {d['retention']['this']}% "
        f"({arrow(d['retention']['delta'])} {abs(d['retention']['delta'])}pt vs. {d['retention']['last']}% last week)",
        f"*Signal to watch:* {d['signal_name']} moved the most — {d['signal_desc']} "
        f"({arrow(d['signal_delta'])} {abs(d['signal_delta'])})",
        f"*Suggested action:* {d['action']}",
    ]
    for c in d["caveats"]:
        lines += ["", f"_Note: {c}_"]
    return "\n".join(lines)


def post_to_slack(text):
    webhook = os.environ.get("SLACK_WEBHOOK_URL")
    if not webhook:
        print("\n[No SLACK_WEBHOOK_URL set — would post the message above. Set the env var to enable real posting.]")
        return
    body = json.dumps({"text": text}).encode("utf-8")
    req = urllib.request.Request(webhook, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        print(f"Slack responded: {resp.status}")


def main():
    should_post = "--post-slack" in sys.argv
    conn = load_db()
    digest = compute_digest(conn)
    text = format_digest(digest)
    print(text)
    if should_post:
        post_to_slack(text)
    else:
        print("\n[Dry run — nothing posted. Add --post-slack to actually send, once SLACK_WEBHOOK_URL is set.]")


if __name__ == "__main__":
    main()
