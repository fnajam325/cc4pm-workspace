# Triad Working Session — Engage v2 Prototype Review

*Note: fictional course scenario. Prep for a 30-min session with Raj (Eng) and Lena (Design).*

## 1. Session Agenda (30 min)

**Goal:** Align the triad on whether the prototype is ready for real user testing, and scope what's still open before it gets there.

| Time | Segment | What happens |
|---|---|---|
| 0-3 min | Framing | Recap the problem (37% retention, down from 44%) and the recommendation from the decision brief. State the goal of this session up front: leave with a go/no-go on real user testing + owners for open items. |
| 3-13 min | Prototype walkthrough | Live demo of `prototype/index.html`. Show the arc: v1 (original) → the 3 fixes shipped from persona testing (state branching, smaller ask, honest disclosure) → v4 (current). Keep this tight — the deck (`docs/prototype-testing-deck.pptx`) can back up detail if needed rather than re-explaining every round live. |
| 13-16 min | The reframe | Walk through the updated hypothesis TL;DR from `docs/hypothesis.md`: retention depends on demonstrated state-awareness and trust-calibrated asks, not the specific mechanic. Be explicit that this came from agent-simulated persona testing, not real users yet — that's exactly what this session is deciding how to fix. |
| 16-26 min | Open discussion | Structured questions for Raj and Lena — see below. |
| 26-30 min | Decisions + owners | Lock the 3 decisions below, assign owners, confirm timeline. |

### Questions for Raj (feasibility)

- Is the "starter fund" sub-account a real, movable transaction, or does it need new backend work beyond what we assumed ("no new integrations")?
- What's involved in building goal-state branching (has-goal vs. no-goal) as real logic instead of a prototype toggle?
- How would we even detect "carrying high-interest debt" if we wanted to make the nudge debt-aware — do we have that data today, or is it a new integration?
- Rough sizing: if we move to a real-user-testable build next, what's realistic in the next 2-3 weeks?

### Questions for Lena (design/UX)

- Does the softened nudge language ("if savings is a priority right now...") read as the right voice, or does it feel hedgy?
- Any concerns with the inline goal-setting flow or the fine-print disclosure placement?
- Chime-inspired visual direction — keep evolving it, or is it just prototype scaffolding we should replace before real users see it?
- How would you want to handle the debt-vs-savings risk visually, if we don't have real debt data — a lightweight priority check-in? Something else?

## 2. Decisions to Walk Out With

1. **Go / no-go on real user testing** — does this prototype move to moderated sessions with real users as-is, or does it need another design/eng pass first?
2. **Debt-awareness scope** — fold into this build, defer to a v2.1 follow-up, or explicitly out of scope for now? (Open item flagged in `strategy.md` and `docs/decision-brief.md`.)
3. **Owners for the next 1-2 weeks** — who's doing what before the next checkpoint.

---

## 3. Post-Session Alignment Doc (Template)

*Fill this in immediately after the session and save as `docs/triad-alignment-[date].md`.*

```markdown
# Triad Alignment — Engage v2 Prototype Review
Date: [date]
Attendees: [names]

## Context Recap
[1-2 sentences — what prompted this session]

## What We Reviewed
- Prototype: prototype/index.html (v4, post 3-round persona testing)
- Hypothesis update: docs/hypothesis.md
- [Anything else discussed]

## Decisions Made
1. Real user testing: [go / no-go / conditional — and why]
2. Debt-awareness scope: [in scope / deferred / out of scope — and why]
3. [Any other decisions made]

## Open Questions / Risks Still Unresolved
- [Carry forward anything not resolved in-session]

## Owners & Next Steps
| Owner | Action | By when |
|---|---|---|
| [Raj] | [ ] | [date] |
| [Lena] | [ ] | [date] |
| [PM] | [ ] | [date] |

## Next Checkpoint
[date/format]
```

---

## 4. Slack Message (Invite)

```
Hey Raj, Lena 👋

Ready to walk through the Engage v2 prototype with you both — put 30 min on the calendar for [day/time].

Quick context: we ran 3 rounds of persona testing against the weekly-summary prototype (Priya, Tom, Amara) and shipped a fix after each round. Landed on a reframed hypothesis I want to pressure-test with you before we take this to real users — TL;DR: retention seems to hinge on the app visibly acting on what it already knows about someone, not on which specific feature we ship.

What I'll bring:
• Live walkthrough of the prototype (prototype/index.html)
• The 3-round testing summary (deck attached, full transcripts in research/prototype-usability-testing.md if you want to go deeper beforehand)
• The updated hypothesis (docs/hypothesis.md)

What I need from you two:
• Raj — a gut check on feasibility for a couple of things (goal-state logic, and whether debt-awareness is even possible with data we have)
• Lena — a read on tone/voice and whether the current visual direction is worth carrying forward

Goal by the end: decide if we're ready for real user testing, and who owns what next. I'll send a short alignment doc right after.

Let me know if the time doesn't work — happy to move it.
```
