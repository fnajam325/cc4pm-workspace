# Objection Log — PRD Pressure Test

*Note: fictional course scenario. Three reviewers, in sequence, against [docs/prds/latest.md](prds/latest.md): Raj and Marcus in character per their stakeholder profiles, Tom as the churned-user persona from the original interviews.*

**Update (2026-08-08):** the Thursday session referenced in Raj's Q1 has since happened — ranking logic and instrumentation are both resolved, evidenced by the real experiment data now in hand. Raj's Q2 (instrumentation contingency) is moot for the same reason. Marcus's Q2 is partially resolved — the experiment itself was approved and is live — but his underlying concern (a *full-rollout* timeline) is not, since day-30 significance hasn't been reached. **Tom's objections are unaffected by any of this and remain fully live** — see the revised conclusion below.

## 1. Raj (Engineering Lead)

*Per [stakeholders/raj.md](../stakeholders/raj.md): pushes back on underspecified requirements and scope that grows mid-sprint; needs a clear "what does done look like"; async-first, bullets, hates being surprised.*

**Q1 — The blocker is buried, not headlined.**
> Story #1 is P0 and marked "Blocked — ranking logic TBD." That's not a footnote, that's the whole feature — nothing else in this doc matters if that's not solved. Why does "Next Steps" list the Thursday session as item 1 of 4, like it's one task among several, instead of the thing that determines whether any of this is even sizeable? And what does "defined" mean coming out of that session — a heuristic I can actually build against, or another meeting that ends in more open questions?

**Q2 — No contingency if instrumentation is net-new.**
> AC says instrumentation must be "confirmed as existing infra vs. net-new work before kickoff" — fine, but the PRD doesn't say what happens if the answer is net-new. Is that inside this sprint, a separate ticket, or a blocker that pushes the whole launch? I don't want to find out mid-sprint that "confirm" quietly meant "and also go build it."

## 2. Marcus (Head of Product)

*Per [stakeholders/marcus.md](../stakeholders/marcus.md): pushes back on data that doesn't connect to a business outcome; needs a specific ask with a deadline; reads the brief before the meeting, wants the recommendation up front.*

**Q1 — The metric he actually cares about isn't proven yet.**
> You're asking me to greenlight this on a day-7 number. Day-7 isn't what I report to the board — 30-day retention is, and this PRD says that result isn't statistically significant yet. What's my actual confidence that the day-30 lift holds up once the sample grows, and what's the cost to the team if it doesn't?

**Q2 — Still no date.**
> This whole document and I still don't have a timeline. I can't take "pending a Thursday session" to leadership as a rollout plan. When do I get an actual date, and what happens to the Q3 commitment if that session slips?

## 3. Tom (Churned User — 5 Weeks In, Switched to YNAB)

*Profile: feels guilty about money, doesn't want to be lectured, wanted something to act on, found the dashboard static and unrewarding, left for a tool that "asks something" of him.*

**Q1 — This doesn't address why people like him actually left.**
> I didn't quit on day one — I made it five weeks before I left. This PRD's own data says the summary only changes whether people survive the *first* week — the stuff that happens after that, whether people who already stuck around for a while keep sticking around, is exactly the same with or without it. So how does this actually help someone like me, who already got past week one and still walked?

**Q2 — Is the goal-nudge actually different this time, or just another version of the same ask?**
> The whole pitch is "set a goal and we'll nudge you toward it." I've set goals before — in this app and others — and they never got followed up on in a way that felt real. What's actually different about this one, or am I just going to hit the same wall again in a nicer wrapper?

## Which Objection Is Most Likely to Kill the Initiative

**Tom's Q1** — more so now than when this log was first written.

Raj's process-gate objections have since resolved (the Thursday session happened). Marcus's timeline concern is only partially resolved — he approved the experiment, not a full rollout — but that's still a scheduling question with an owner and a next step, not a doubt about whether the feature works.

Tom's objection is different in kind: it's not "we need more time," it's **"this may not solve the problem for a meaningful part of the churn population."** The PRD's own data backs him up — Day7→Day30 conditional stickiness is statistically identical between treatment and control (~47-48% either way). The feature is proven to help people survive week 1; it is not proven — and by the data in hand, does *not currently* help — people who already survived week 1 and churn later, which is exactly Tom's failure mode. The one thing that would address it (the week-2+ re-engagement loop) is explicitly **not designed and out of scope** for this PRD.

This is no longer a hypothetical risk — the experiment is live and the data already confirms it: Day7→Day30 conditional stickiness is statistically identical between treatment and control. Users who survive week 1 don't stay any better because of this feature than they would have anyway. If this goes unaddressed before a full-rollout decision, the risk is declaring the retention problem solved on the strength of a strong day-7 number, scaling the feature, and finding out later that users who look like Tom — the multi-week churners the business actually needs to retain — are leaving at the same rate as before. That's a credibility risk to the whole initiative, not just a scheduling one, and unlike Raj's and Marcus's objections, there's currently no session on the calendar to resolve it.
