# Onboarding — Read This First (5 min)

## What Is Claude Code?

Claude Code is an AI assistant that works directly inside your project folder — it can read your files, write new ones, run commands, and keep context across a whole conversation. Think of it as a collaborator who can research, write documents, build prototypes, and keep records, as long as you tell it what you're trying to do.

## Your First Session

**Joining this Nudge project as a collaborator?** Just say: *"I'm new to this project, help me get onboarded."* Claude will summarize where things stand and help you set up a stakeholder profile for whoever you're working with. (Full detail: [README.md](README.md).)

**Starting something new — a different product, a different team — using this same workflow?** Open Claude Code in a fresh, empty folder and paste the setup prompt from **[docs/recreate-workflow-prompt.md](docs/recreate-workflow-prompt.md)**, filling in your product name where marked. That prompt starts by interviewing you — including asking specifically what research you already have (user interviews, NPS/survey data, usage analytics, competitive intel) and flagging anything you don't have yet as an open gap rather than inventing it — before it sets up the same tracking structure this project used. You can do this cold, on your own — or, if someone who's already used this workflow can spend 15 minutes with you first, [docs/live-demo-script.md](docs/live-demo-script.md) walks through all of it live in the Nudge workspace before you go try it yourself.

## The 3 Habits That Matter Most

1. **Update `CLAUDE.md` every session.** It's the first thing Claude reads, every time. If it goes stale, every future session starts from a wrong picture of where things actually stand.
2. **Use the interview before building anything.** Before a PRD, a prototype, or a spec gets written, Claude should ask questions one at a time and confirm it understands what you actually need — not assume it from a one-line request.
3. **Save everything.** Decisions, research, even "just exploratory" conversations — if it's worth remembering, write it to a file and log it in `change_log.md`. If it's not written down, it doesn't exist for your next session.

## The Single Most Common Mistake

**Treating a simulated interview as if it were real evidence.** Claude can role-play a specific stakeholder or user persona to pressure-test an idea — genuinely useful, and this project leaned on it heavily. But it's not the same as a real person actually weighing in. The mistake is letting a persuasive-sounding simulated conversation quietly become "the data" a real decision gets based on.

**How to avoid it:** always ask whether a finding is real (actual user research, actual data) or simulated (role-play) — and keep that distinction visible, not buried. See [docs/evidence-ledger.md](docs/evidence-ledger.md) for how this project tracked it end to end.
