---
name: write-prd
description: Writes a PRD for Nudge Engage v2 (or a similarly-scoped feature in this project) using the project's established structure — Problem Statement, User, Goals/Non-Goals, Success Metrics, Requirements (with a tracked User Stories table), Supporting Evidence, Key Edge Cases, Open Questions, Next Steps, and a source-trail Appendix. Use when the user asks to write, build, draft, or update a PRD, or types /write-prd.
---

# Write PRD

Project-scoped skill for `/Users/faran/cc4pm_workspace_august/` (Nudge — Engage v2 discovery cycle).

## Before writing anything

Check what already exists in the project — `project.md`, `strategy.md`, `docs/decision-brief.md`, `docs/pm-brief.md`, `docs/hypothesis.md`, `docs/spec-readiness.md`, `docs/design-review.md`, `docs/qa-checklist.md`, `research/`, `data/`. If the project already has validated discovery, prototyping, stakeholder review, or experiment data for the feature in question, **synthesize the PRD from that rather than re-running discovery from scratch.** Only ask the user clarifying questions for genuine gaps nothing in the workspace answers — don't re-interview for facts already on record.

## Structure (in this order)

1. **Header** — title, status (Draft/In Review/Approved — be honest if real blockers exist, e.g. "pending X session before kickoff"), author/squad/sponsor, one-line note on what the PRD synthesizes from.
2. **Problem Statement** — grounded in real data/research, cited to source files.
3. **User** — who (with a note if any persona detail, like age, is illustrative rather than evidence-backed) + job to be done.
4. **Goals and Non-Goals** — goals as bullets; non-goals should cite *why* each thing is out of scope (a prior decision, a constraint, a follow-up item) rather than just listing exclusions.
5. **Success Metrics** — leading + lagging indicators. If real experiment data exists, state the current read plainly, including whether results are statistically significant or just directional — don't round a "promising but underpowered" result up to "proven."
6. **Requirements** — feature description, then:
   - **User stories as a table**, not a bulleted list: columns `# | User Story | Priority | Dependencies | Commitment | Delivery Status`. Standard story format ("As a [user], I want [X], so that [Y]"). Delivery Status should be honest — `Not Started`, `Prototyped` (and note if UI-only vs. connected to real data/persistence), `Blocked` (name the blocker), or `Shipped`. A story blocked on an undefined dependency should say so, not be marked committed-and-ready.
   - **Acceptance criteria** as a checklist, cross-referenced with any prior spec-readiness/QA docs — bold and flag any AC item that's a known blocker.
   - Any known implementation debt (e.g., a prototype shortcut that won't survive to production) gets its own callout, not buried in AC.
7. **Supporting Evidence** — split qualitative (interviews/NPS, cited to name) from quantitative (experiment data, cited with real numbers and significance where known). Include an honest "unresolved gaps" subsection for anything the data doesn't yet explain — don't omit inconvenient open questions to make the evidence section look more conclusive.
8. **Key Edge Cases** — pull from any existing QA/edge-case doc rather than re-deriving; list only the highest-priority ones here, link out for the full list.
9. **Open Questions** — table: `Risk/Question | Status | Owner`. Include anything genuinely unresolved, even if it's uncomfortable (e.g., "rollout timeline not yet defined anywhere").
10. **Next Steps** — numbered, sequenced, tied to who owns each one.
11. **Appendix — Source Trail** — links to every file this PRD drew from, grouped logically (e.g., problem/strategy, research, prototype/testing, stakeholder alignment, data).

## Tone and honesty rules

- Never invent a rollout timeline, a metric result, or a resolved status for something that's actually still open. If Marcus/Raj/Lena (or their equivalents) haven't signed off on something, the PRD should say so.
- Prefer "directionally strong but not yet statistically significant" over rounding up to "proven" when the underlying data doesn't support it.
- Cite sources inline (file names, or persona names for qualitative quotes) rather than presenting synthesized claims as if self-evident.

## After writing

Follow this project's standard tracking convention: propose adding the new/updated PRD to `CLAUDE.md`'s Project Files index and logging the change in `change_log.md` (decision, rationale, owner) before writing those updates — don't skip the audit trail just because this is "just a PRD."
