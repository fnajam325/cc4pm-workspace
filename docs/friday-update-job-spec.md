# Spec: Recurring Friday Status Update Job

*Note: fictional course scenario. This is a spec for a future scheduled job — not yet activated. When ready, provide the missing inputs below (marked TBD) and we'll set it up with the `schedule` capability (CronCreate).*

## Purpose

Every Friday, automatically generate the team update (Raj/Lena) and leadership update (Marcus) using the `team-update` and `leadership-update` skills, pulling in both the project's own tracking files and recent signal from Slack, so a fresh, calibrated status update is ready without a manual prompt each week.

## Schedule

- **Cadence:** Weekly, every Friday
- **Time:** 2:00pm **local time** — timezone to confirm at setup (not yet specified; needed for the cron job's actual UTC trigger time)

## Data Sources

**Already available, no setup needed:**
- `change_log.md` (top/newest entries — current decisions and state)
- `docs/prds/latest.md` (Success Metrics, Open Questions, Next Steps)
- `data/metric-findings.md` / `data/metric-diagnosis.md` (live experiment data, if updated)
- `stakeholders/raj.md`, `stakeholders/lena.md`, `stakeholders/marcus.md` (communication calibration)

**Not yet available — needed before activation:**
- **Slack channel IDs.** ⚠️ **TBD — to be provided by the user.** List the channel(s) this job should pull additional context from before we activate it. For each channel, note what kind of signal it's expected to contribute (e.g., "#engage-eng — engineering discussion/blockers," "#engage-design — design decisions," "#product-leadership — exec-level context") so the job knows what to look for, not just where to look.
- **Slack access.** The Slack MCP connector is not yet authorized for this environment — needs to be connected (via `claude mcp` or `/mcp` in an interactive session) before the job can read any channel.

## Process (per run)

1. Pull current state from the project files listed above
2. Pull recent, relevant messages from the specified Slack channel(s) — scoped to the past week, filtered to what's relevant to Engage v2 status (not a full channel dump)
3. Re-read `stakeholders/raj.md`, `stakeholders/lena.md`, `stakeholders/marcus.md` fresh (profiles may have changed since the last run)
4. Generate the team update (`team-update` skill logic) and leadership update (`leadership-update` skill logic), incorporating anything materially new from Slack alongside the project files
5. Write a new dated snapshot to `docs/status-updates/YYYY-MM-DD.md`, refresh `docs/status-updates/latest.md`, and add a row to `docs/status-updates/README.md` — each week's update is preserved as its own permanent file, never overwritten (same pattern as `research/competitive-scans/`)
6. Log the run in `change_log.md`

## Output & Distribution — Open Decision

**Not yet decided — confirm before activation:**
- Does the job just update `docs/status-updates.md` for the user to review and send manually (safer default), or does it also **post directly** to Slack (e.g., DM Raj/Lena, DM or post to a channel for Marcus)?
- Recommendation: start with **draft-only** (updates the file, does not send anything) for the first several runs, then move to auto-send once the output quality is trusted. Sending messages is a standing, repeated action — worth confirming it's producing what you'd actually send before automating the send itself.

## Prerequisites Checklist (must be resolved before this job can activate)

- [ ] Timezone for the 2:00pm trigger
- [ ] Slack channel ID(s), with a note on what each contributes
- [ ] Slack MCP connector authorized
- [ ] Decision: draft-only vs. auto-post to Slack
- [ ] If auto-post: confirm exact destination(s) — DM vs. channel, for each of Raj/Lena/Marcus

## Once Ready

Bring this spec back with the TBD items filled in, and we'll set it up as a recurring scheduled job (Friday 2:00pm local) using the `schedule` capability.
