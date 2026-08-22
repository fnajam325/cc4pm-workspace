# Recreate This Workflow for a Different Product

*The canonical copy of the portable setup prompt. Copy the block below into a fresh, empty folder, fill in your product name, and paste it as your first message in a new Claude Code session.*

```
I want to set up a project workspace for [PRODUCT/FEATURE NAME] following a specific PM workflow. Set it up like this:

BEFORE ANYTHING ELSE — RUN A DISCOVERY INTERVIEW
Before creating project.md or strategy.md, interview me one question at a time — don't draft anything from a single sentence, no matter how complete it sounds. At minimum, ask about:
- The problem/opportunity as I currently understand it, even if it's rough
- Who the key stakeholders/collaborators are (names, roles) — so we can set up stakeholders/ profiles for them
- What research or data I already have, asked specifically, not as one vague question: user interview transcripts or notes? NPS or survey data? Usage/product analytics? Competitive intel? An existing brief or leadership ask?
- For anything I don't have yet, note it as an explicit open gap rather than inventing it — never fabricate numbers or findings. We'll fill gaps in as real data becomes available, using the dated-snapshot pattern below once it does.
Track your confidence on each section as we go, tell me what's still fuzzy before generating any file, and confirm your understanding with me before writing project.md/strategy.md for the first time.

TRACKING STRUCTURE
- CLAUDE.md: orientation only — a fictional-scenario disclaimer if applicable, a "Key Tension" section, an "Open Decision" section, a categorized Project Files index (group by phase: Core Tracking / Research & Discovery / Prototype & Testing / Spec & Stakeholder Alignment / Data / Decision & Delivery / Meta-Tooling), a list of available skills with their slash-command names, and a Working Notes section for standing behavioral instructions. Never duplicate content that lives in another file — CLAUDE.md should stay under ~50-70 lines.
- project.md: what the product is, my squad, current phase, key stakeholders, problem statement.
- strategy.md: the working hypothesis and supporting signal, updated (not overwritten) as discovery lands.
- change_log.md: every decision logged as `Date — Decision — Rationale — Owner`, newest first. When it passes ~25-30 entries, archive older coherent phases into change_log_archive/NN-description.md (oldest-first within each file) and leave a pointer.

WORKING PRINCIPLES
- Don't lock a solution direction until supporting data is in hand — say so explicitly in Key Tension/Open Decision until it's actually resolved.
- For anything that recurs (competitive scans, status updates, PRD revisions), use a dated-snapshot pattern: research/thing/YYYY-MM-DD.md (permanent, never overwritten) + latest.md (mirror) + README.md (run index). Don't just overwrite one file each time.
- Before writing to any core tracking file, propose the specific diff and wait for approval — don't silently rewrite.
- Log every meaningful decision to change_log.md with real rationale, not just "updated X."
- When a recurring task's format stabilizes (a synthesis structure, a comms format, a PRD template), turn it into a project-scoped Claude Code skill (.claude/skills/<name>/SKILL.md) instead of re-deriving it each time — and add it to CLAUDE.md's skills list immediately so it's discoverable without reading the skill file directly.
- Build stakeholder profiles (stakeholders/<name>.md) for key people I work with — role, what they push back on, what they need before saying yes, communication preferences, open items. Gitignore individual profiles but keep a stakeholders/TEMPLATE.md tracked, using this exact pattern in .gitignore so the template stays tracked while real profiles don't: `stakeholders/*` then `!stakeholders/TEMPLATE.md`.
- When pressure-testing a spec, design, or decision, offer an "agentic interview": role-play it against a specific stakeholder profile with a separately spawned agent playing the counterpart, so it's a genuine back-and-forth with real pushback and concessions, not a monologue. Always label this explicitly as simulated role-play, never as real stakeholder or user evidence. Keep a running "evidence ledger" distinguishing real user research / real data / simulated roleplay / analytical inference for anything load-bearing.
- Keep a running distinction between what's actually built (real code, if any) and what's assumed/narrated for the exercise — state explicitly if no production codebase exists.

DELIVERABLES AS THEY COME UP
- Research: interview synthesis, NPS/feedback synthesis, competitive scans — cite everything to source.
- Prototype: an interactive HTML/CSS/JS mockup is fine for testing ideas; note explicitly it's not connected to a backend.
- Specs: a PRD with Problem/User/Goals-Non-Goals/Success Metrics/Requirements (user stories as a tracked table with priority/dependencies/commitment/delivery status)/Evidence/Edge Cases/Open Questions/Next Steps/Appendix.
- Comms: stakeholder-calibrated status updates and decks — never invent numbers, always cite sources, match each person's actual communication preferences from their profile.

Start the interview now.
```
