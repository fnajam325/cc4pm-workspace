# Change Log Archive 01: Project Setup, Discovery, Decision Brief

*Archived from `change_log.md`. Oldest phase — earliest entries first, matching the live file's convention.*

---

**2026-08-08** — Solution direction for Engage v2 will remain open (not locked to Lena's weekly-summary concept) until discovery inputs (user feedback, competitive intel, etc.) are gathered — **Rationale:** avoid committing to a solution before validating the underlying problem and options — **Owner:** team (Marcus, Raj, Lena, me)

**2026-08-08** — Established project tracking structure: `CLAUDE.md` (session context), `project.md` (org/team/problem overview), `strategy.md` (retention-recovery hypothesis), `change_log.md` (this file) — **Rationale:** keep CLAUDE.md lean (orientation only) and branch detailed/changing content into dedicated files — **Owner:** me

**2026-08-08** — Built a project-scoped `session-save` skill (`.claude/skills/session-save/`) rather than a global one — **Rationale:** project conventions (file structure, CLAUDE.md hygiene rules) are still being defined this course, so hardcoding them into a project skill was more reliable than a generic cross-project version — **Owner:** me

**2026-08-08** — Folded interview + NPS research findings into strategy.md as confirmed/refined hypothesis elements — **Rationale:** two independent discovery sources triangulated on consistent findings (static experience, email/app disconnect, need for a next step), plus surfaced new tensions (pull vs. push, precision-before-frequency, goal continuity) not previously captured — **Owner:** me

**2026-08-08** — Folded competitive analysis (YNAB, Copilot Money, Rocket Money, Monarch Money) into strategy.md as a Competitive White Space section — **Rationale:** two white-space gaps (early proactive personalization; no competitor bridges passive insight with active goal-accountability) independently reinforce the pull-vs-push tension and goal-continuity gap already surfaced from interviews/NPS, strengthening confidence in the direction rather than just adding more research — **Owner:** me

**2026-08-08** — Built a project-scoped `competitive-scan` skill (`.claude/skills/competitive-scan/`) and restructured competitive research into dated, non-overwriting snapshots (`research/competitive-scans/YYYY-MM-DD.md`, mirrored by `latest.md`, indexed in `README.md`) — **Rationale:** want to re-run competitive intelligence monthly or on trigger phrases and preserve historical snapshots for trend analysis, rather than overwriting a single file each time; cron-based automatic scheduling deliberately deferred until the manual/trigger-word version proves useful — **Owner:** me

**2026-08-08** — Synthesized interviews, NPS, and competitive research into a 1-page decision brief for Marcus (`docs/decision-brief.md`) recommending the personalized weekly summary prototype, re-engineered for early (week 1-2) low-confidence insight delivery — **Rationale:** three independent discovery sources converged on the same conclusion; brief exists to bring Marcus to alignment ahead of Thursday's meeting — **Owner:** me
