# Evidence Ledger

*One place to check what kind of evidence backs any given claim in this project, without reading eight files. Built as part of a capstone review — see [docs/capstone-session.md](capstone-session.md).*

## Legend

| Tag | Meaning |
|---|---|
| **SCENARIO-GIVEN** | Stated as fact in the original course prompt/Slack thread — treated as ground truth for this exercise, not independently verified |
| **REAL-USER-RESEARCH** | Real interview transcripts or NPS comments, provided as raw text |
| **REAL-EXPERIMENT-DATA** | Actual SQL queries against the provided dataset (Google Sheet) |
| **EXTERNAL-REAL-DATA** | Real web research about real companies (competitive scan) |
| **CODE-INSPECTION** | Checked directly against `prototype/index.html` — a real file, not a claim taken on faith |
| **SIMULATED-ROLEPLAY** | Claude playing a named persona (Priya/Tom/Amara/Raj/Lena/Marcus) — a design-critique technique, not user or stakeholder evidence |
| **ANALYTICAL-INFERENCE** | Claude's own synthesis/reasoning connecting other evidence — only as strong as what it's built on |

## Findings

| Finding | Source Type | Where |
|---|---|---|
| 30-day retention dropped 44% → 37% | SCENARIO-GIVEN | Original Slack thread |
| Goal-setters churn ~2x less (original claim) | SCENARIO-GIVEN | Original Slack thread (Raj) |
| Goal-setters retain 34.8% vs. 21.6% (independent confirmation) | REAL-EXPERIMENT-DATA | `data/metric-findings.md` Q2 |
| Initial spending breakdown lands well universally | REAL-USER-RESEARCH | `research/interview-synthesis.md` |
| App goes static after week 1; email is the only re-engagement channel | REAL-USER-RESEARCH | `research/interview-synthesis.md`, `research/nps-analysis.md` |
| Real stickiness driver (pattern recognition) takes ~3 months | REAL-USER-RESEARCH | Priya interview quote |
| No competitor owns this white space | EXTERNAL-REAL-DATA | `research/competitive-scans/latest.md` |
| Priya/Tom/Amara reactions to the prototype (3 rounds) | SIMULATED-ROLEPLAY | `research/prototype-usability-testing.md` |
| Empty-state, ranking-logic, instrumentation gaps in the prototype | CODE-INSPECTION | `docs/qa-checklist.md`, checked against `prototype/index.html` |
| Native `prompt()` won't work in a real mobile app | CODE-INSPECTION | `docs/qa-checklist.md` |
| Raj's spec pushback and AC negotiation | SIMULATED-ROLEPLAY | `docs/spec-readiness.md` |
| Lena's design review, week-2 loop gap identified | SIMULATED-ROLEPLAY | `docs/design-review.md` |
| Day-7 lift is statistically significant (76% vs. 46%) | REAL-EXPERIMENT-DATA | `data/metric-findings.md` Q3 |
| Day-30 lift is directional, not yet significant (36% vs. 22%, p≈0.12) | REAL-EXPERIMENT-DATA | `data/metric-findings.md` Q3 |
| Open rate climbs 28%→56% vs. flat control | REAL-EXPERIMENT-DATA | `data/metric-findings.md` Q4 |
| Day7→Day30 stickiness is flat regardless of treatment | REAL-EXPERIMENT-DATA | `data/metric-diagnosis.md` §1, §3 |
| Weeks 1-4 decline traced to falling session frequency | REAL-EXPERIMENT-DATA | `data/metric-diagnosis.md` §2 |
| 4 ranked churn hypotheses (platform, channel, novelty, goal-status) | REAL-EXPERIMENT-DATA + ANALYTICAL-INFERENCE | `data/metric-diagnosis.md` §4 — one (platform friction) later tested and disconfirmed by a follow-up query |
| "State-awareness" hypothesis reframe | ANALYTICAL-INFERENCE, built mainly on SIMULATED-ROLEPLAY | `docs/hypothesis.md` — explicitly flagged there as a lead, not a finding |
| Tom's objection (feature doesn't help multi-week churners) | SIMULATED-ROLEPLAY, **later independently confirmed** by REAL-EXPERIMENT-DATA | `docs/objection-log.md`, confirmed by `data/metric-diagnosis.md`'s Day7→Day30 finding — a real instance of simulated hypothesis-generation getting validated, though still one data point, not a pattern to over-trust |
| Raj's/Marcus's process objections (timeline, AC) | SIMULATED-ROLEPLAY | `docs/objection-log.md` |
| PRD content overall | ANALYTICAL-SYNTHESIS | `docs/prds/latest.md` — inherits the confidence level of whichever row above backs each specific claim |
| Stakeholder profiles (Raj/Lena/Marcus) | SCENARIO-GIVEN (named in original thread) + user-provided default templates + ANALYTICAL-INFERENCE | `stakeholders/*.md` |

## How to Use This

Before treating any claim in this project as settled, find its row here. **SIMULATED-ROLEPLAY** rows are hypotheses worth testing with real people, not conclusions — this project says so in the originating doc every time, but this table makes it checkable in one place instead of eight.
