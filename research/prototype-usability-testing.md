# Prototype Usability Testing — Personas vs. prototype/index.html

*Note: fictional course scenario. In-character persona testing against the interactive prototype, 3 rounds, one fix shipped per round before moving to the next persona.*
*See [../prototype/README.md](../prototype/README.md) for the condensed iteration log and [../change_log.md](../change_log.md) for fix-level audit entries.*

## Method

Each persona was played in character against the current build of `prototype/index.html`, answering four fixed questions without PM-style feedback. After each round: step out of character, synthesize (what they struggled with, what was surprising, which answer would be most concerning from a real user), identify the single highest-priority fix, implement it, and verify it live before moving to the next persona. Each round tested the prototype as updated by the prior round's fix.

---

## Round 1: Priya

*28, software engineer, San Francisco. Earns well but spends without tracking. Connected Nudge after a big month of eating out. Has a Europe trip savings goal. Checks her bank app once a week, usually on alert. Motivated by progress, anxious about unexpected spending totals.*

**Prototype state tested:** original build (no-goal-set state only).

**1. What do you think this does?**
"Oh — okay, this is like a weekly recap? I spent $184 on dining, up from $96. Yeah, that tracks... It's telling me to redirect 10% of that into savings. Fine, I guess, but — wait, 'you don't have a goal set yet'? I *do* have a goal. I set up the Europe trip thing when I first connected this. Why is it acting like I never did that? That's kind of throwing me off."

**2. How would you arrive at this experience?**
"Probably from a push notification on a Sunday, that's usually when I check my bank stuff anyway... I wasn't expecting to see this specific screen though — I thought I'd land on my Europe fund progress, not a 'set a goal' prompt."

**3. Would you change your spending based on this?**
"Kind of? Seeing '$184, up from $96' does give me that little stomach-drop... But I'm side-eyeing this a little because it's treating me like a brand-new user when I'm not. If it doesn't know I already have a goal, can I actually trust the $184 number either?"

**4. If you had a magic wand?**
"I'd want it to just... know me. Show my actual Europe goal and how this week's dining splurge set it back... Like, 'this pushes your Europe trip back 4 days' — that would actually hit different than a generic percentage."

**Synthesis:**
- *Struggled with:* the screen contradicted what she believes to be true about her own account — she has a goal, the prototype assumed she didn't.
- *Surprised me:* she was receptive to the spending insight itself; the trust break came entirely from state-mismatch, not content quality.
- *Most worrying answer:* #3 — generalizing one visible error into distrust of the entire data pipeline ("can I trust the $184 number either?").

**Fix shipped:** Added a demo toggle and a full "has existing goal" state — nudge and goal-progress card now branch on actual goal state (Europe Trip, $340/$2,000, "Redirect $18 to Europe Trip" action) instead of assuming none exists.

---

## Round 2: Tom

*34, marketing manager, Chicago. Abandoned three budgeting apps in two years. Feels guilty about money, doesn't want to be lectured. Connected Nudge because a friend recommended it. Has not opened it since day one. Skeptical any app will change his behavior.*

**Prototype state tested:** no-goal-set state, post-Round-1 fix.

**1. What do you think this does?**
"Okay so it's telling me I spent $184 on dining. Cool, I already knew that — I was there. This is basically what every one of those apps I deleted did: show me a number, make me feel like crap about it, then tell me to fix it... I haven't even done anything in this app in two weeks and it's already got a pitch for me."

**2. How would you arrive at this experience?**
"Honestly? I probably wouldn't... If I somehow ended up back here it'd be because of some notification, and my thumb would already be halfway to swiping it away before I even read it."

**3. Would you change your spending based on this?**
"No. Not from this. It's the same move every app makes — 'here's a number, now go set a goal.' I've set like six goals across three different apps and none of them stuck... It doesn't know anything about me yet and it's already asking me to commit to something."

**4. If you had a magic wand?**
"I'd want it to not open with a guilt trip... Make the ask smaller. 'Redirect $18' I could maybe tap without thinking too hard. 'Set a savings goal' feels like signing up for a whole thing."

**Synthesis:**
- *Struggled with:* the framing, not the facts — being asked to commit to a goal on his first real re-engagement read as the opening move of a pattern he already associates with failure.
- *Surprised me:* without prompting, he independently gravitated toward the *smaller* ask (the has-goal variant's "redirect $18") as more plausible than the no-goal variant's "set a savings goal" — a strong signal that ask-size, not the goal concept itself, is the friction point.
- *Most worrying answer:* #3 — "it doesn't know anything about me yet and it's already asking me to commit to something." Front-loading a full goal-setup flow risks the exact bounce the feature is meant to prevent, for precisely the highest-risk (skeptical, churn-prone) users.

**Fix shipped:** Replaced the "Set a savings goal" full-commitment CTA with a one-tap "Try it: redirect $18" starter-fund action; full goal setup demoted to an optional secondary link ("or set up a full goal instead"); added a post-action upgrade path ("Turn this into a real goal").

---

## Round 3: Amara

*41, operations lead, Atlanta. Paying down credit card debt while saving for her kids' activities. Checks accounts regularly, already has a spreadsheet system. Connected Nudge to see if it could replace part of her manual process. High bar for trust — if a number looks wrong, she won't use the product.*

**Prototype state tested:** no-goal-set state, post-Round-2 fix.

**1. What do you think this does?**
"Alright, so it pulled my dining spend — $184, up from $96. That part's fine... But 'redirect $18 into a starter fund' — redirect it *where*, exactly? Is that a real sub-account, or is this app just going to show me a number that doesn't correspond to anything actually moving?"

**2. How would you arrive at this experience?**
"I'd get here deliberately — I'm not an impulse-opener, I check things on my schedule... so I'd be looking at this with a pretty critical eye from the start."

**3. Would you change your spending based on this?**
"Here's my actual issue: I'm paying down credit card debt right now. This is telling me to redirect $18 into savings — but if I've got a card sitting at 22% APR, putting $18 into a starter fund instead of extra principal is actively the wrong move mathematically. It doesn't know that about me, and it's giving me generic advice that could make my situation worse if I followed it blindly."

**4. If you had a magic wand?**
"I'd want it to actually reason about my full picture — debt, goals, all of it... And I'd want to see exactly where that $18 goes — a real account, a real transaction, not a vibes-based progress bar."

**Synthesis:**
- *Struggled with:* two distinct things — whether the "starter fund" redirect is a real, verifiable transaction, and whether the savings-first nudge is even correct financial advice for someone carrying high-interest debt.
- *Surprised me:* the debt-vs-savings math was a sharper objection than the data-accuracy skepticism her profile implied — she identified a scenario where following the nudge could make her financially worse off, not just a UX annoyance.
- *Most worrying answer:* #3 — a user identifying that the product's core recommendation could be objectively counterproductive for her situation is a credibility and potential liability issue, not a low-engagement issue.

**Fix shipped:** Softened the nudge from prescriptive ("try redirecting $18...") to framed-as-option ("if savings is a priority right now, one option is..."); added a fine-print disclosure that the starter fund is a real, verifiable sub-account and an explicit acknowledgment that the app doesn't yet know about debt or other priorities; made done-state copy explicit that it's a real transaction.

**Open item raised, not resolved by this fix:** whether Engage v2 should incorporate debt-awareness into the nudge logic is a strategic question beyond this prototype's scope — tracked in [strategy.md](../strategy.md#risk-surfaced-in-prototype-testing).

---

## Cross-Round Pattern

Every fix addressed the same root issue in a different form: the prototype was making an assumption about the user (no goal exists / ready to commit immediately / savings is the objectively correct move) that didn't hold for that persona. Each fix replaced an assumption with a state branch, a smaller ask, or an honest disclosure — not a deeper feature build. None of the three personas objected to the underlying insight/nudge/goal-progress structure itself; all three objections were about what the prototype assumed it knew about the user.
