# 15-Minute Live Onboarding Demo — Facilitator Script

*Note: fictional course scenario. Run this live with a new teammate, in this Nudge workspace, before they go start their own project. Optional — the alternative is just pointing them straight at [ONBOARDING.md](../ONBOARDING.md) and letting them start a new project cold.*

**Before you start:** have this repo cloned and Claude Code installed on the new person's machine (or yours, if you're driving first). If you don't already know your version's plan-mode toggle, don't guess — just ask Claude directly once the session's open: **"How do I enter plan mode in this version of Claude Code?"** It'll tell you the actual shortcut or slash command for your install.

**Running this solo, with no facilitator?** Everything below still works — just read each step as something you do to yourself rather than to someone else. Where it says "have the new person answer," answer it yourself. Where it says "hand off the keyboard," skip that line and just run the next skill yourself instead of switching people.

---

## 0:00–2:00 — Open the folder, see what Claude already knows

1. `cd` into the Nudge repo, run `claude`.
2. Ask: **"What's the current status of this project?"** — don't give it anything else first.
3. Point out: Claude answers accurately (day-7 significant, day-30 not yet, Tom's objection still open) without being told anything — it read `CLAUDE.md` automatically the moment the session started.
4. The takeaway to say out loud: *"This file is why every session starts warm instead of from zero. If we let it go stale, every future session starts with the wrong picture — that actually happened once in this project, and we had to catch it with an audit."*

## 2:00–7:00 — Run the AI interview, show plan mode

1. Open [docs/demo-scenario-slack-thread.md](demo-scenario-slack-thread.md) — this is the real, original input that started the whole project, not a paraphrase.
2. Toggle plan mode.
3. Paste the Slack thread and type: **"Interview me about this one question at a time before proposing anything — I want to understand the problem before we design a solution."**
4. Let Claude ask its first question. Have the new person answer it live and for real — the answer doesn't need to match this project's actual history, that's the point of a live demo.
5. Once Claude proposes a plan, exit plan mode to confirm it before anything gets built.
6. Say out loud: *"This is the exact pattern this whole project used, every time — interview first, plan before building, nothing gets written until you've confirmed the approach."*

## 7:00–12:00 — Run a status skill, then hand off the keyboard

1. Point out first: **`CLAUDE.md`'s Meta/Tooling section now lists every available skill and its slash command** — that's how you knew this existed, not tribal knowledge.
2. Type `/team-update` (or `/leadership-update`) and watch it run — it reads the relevant stakeholder profile(s) and the current project state, then produces output calibrated to that specific person's communication style.
3. Point out: this only works *because* of the tracking discipline from the first 7 minutes — a skill like this is worthless without a `CLAUDE.md`/`change_log.md` that's actually current.
4. Hand the keyboard to the new person. Have them run the other skill themselves, and feed it one made-up line of "notes" (e.g., "tell it something changed this week") so they see it actually incorporate something new, not just replay the same output.

## 12:00–15:00 — Start their own project

1. Open a new, empty folder. Run `claude` fresh — no `CLAUDE.md`, nothing pre-loaded.
2. Paste the prompt from [docs/recreate-workflow-prompt.md](recreate-workflow-prompt.md), filling in their real product/feature name — the prompt itself ends with "Start the interview now," so pasting it is the whole trigger, nothing extra to say.
3. Watch Claude interview them — point out it'll specifically ask what research they already have (user interviews, NPS/survey data, usage analytics, competitive intel), not just "tell me about your product."
4. Close with: *"That's the whole loop — you just watched it, ran it yourself, and now you're doing it for real."*

---

**If you'd rather skip the guided demo entirely:** that's fine — point the new person straight at [ONBOARDING.md](../ONBOARDING.md) and let them start a new project cold using the portable prompt. This script exists for people who'd rather see it work once before trying it themselves.
