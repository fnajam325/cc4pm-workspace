const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG = (f) => path.join("/Users/faran/cc4pm_workspace_august/research/prototype-versions", f);

const NAVY = "0B1F3A";
const NAVY_SOFT = "16294A";
const GREEN = "17C964";
const GREEN_DARK = "0FA653";
const INK = "0B1220";
const MUTED = "6B7688";
const LINE = "ECEFF2";
const WHITE = "FFFFFF";
const OFFWHITE = "F4F6F5";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

function addAvatar(slide, x, y, size, initial) {
  slide.addShape("ellipse", { x, y, w: size, h: size, fill: { color: NAVY }, line: { type: "none" } });
  slide.addText(initial, {
    x, y, w: size, h: size, align: "center", valign: "middle",
    fontFace: FONT_HEAD, fontSize: size * 34, bold: true, color: WHITE, margin: 0,
  });
}

function dotLabel(slide, x, y, text, opts = {}) {
  slide.addShape("ellipse", { x, y: y + 0.09, w: 0.09, h: 0.09, fill: { color: GREEN }, line: { type: "none" } });
  slide.addText(text.toUpperCase(), {
    x: x + 0.2, y, w: opts.w || 5, h: 0.3, fontFace: FONT_BODY, fontSize: 12, bold: true,
    color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });
}

function footer(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 7.12, w: 12.3, h: 0.3, fontFace: FONT_BODY, fontSize: 10, color: "AEB6C2",
    align: "left", margin: 0,
  });
}

// ---------- Slide 0: Title ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape("ellipse", { x: 10.6, y: -2.2, w: 6, h: 6, fill: { color: NAVY_SOFT }, line: { type: "none" } });
  s.addShape("ellipse", { x: -2.4, y: 5.2, w: 5, h: 5, fill: { color: NAVY_SOFT }, line: { type: "none" } });

  dotLabel(s, 0.9, 2.15, "Nudge · Engage v2 · Prototype Testing", { w: 8 });
  s.addText("Three Rounds of\nPersona Usability Testing", {
    x: 0.85, y: 2.55, w: 11.6, h: 2.0, fontFace: FONT_HEAD, fontSize: 40, bold: true,
    color: WHITE, margin: 0, lineSpacing: 44,
  });
  s.addText("Interactive prototype vs. Priya, Tom, and Amara — one fix shipped and verified after each interview.", {
    x: 0.9, y: 4.55, w: 9.5, h: 0.6, fontFace: FONT_BODY, fontSize: 15, color: "C9D3E2", margin: 0,
  });
  footer(s, "Fictional course scenario · Nudge Engage v2 discovery cycle");
}

// ---------- Slide 1: Prototype v1 ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "Round 0 — Initial Build");
  s.addText("Prototype v1", {
    x: 0.55, y: 0.85, w: 7.2, h: 0.8, fontFace: FONT_HEAD, fontSize: 34, bold: true, color: INK, margin: 0,
  });
  s.addText("Personalized weekly summary: top spending insight, one contextual nudge, savings goal progress.", {
    x: 0.6, y: 1.65, w: 6.6, h: 0.7, fontFace: FONT_BODY, fontSize: 14, color: MUTED, margin: 0,
  });

  const bullets = [
    { icon: "👤", t: "User: Alex — connected Chase 2 weeks ago, hasn't reopened the app since" },
    { icon: "🎯", t: "State: no savings goal set — highest-churn cohort in the research" },
    { icon: "⚙️", t: "Nudge doubles as the goal-setting action, tied to the week's spending insight" },
  ];
  let by = 2.7;
  bullets.forEach((b) => {
    s.addShape("roundRect", { x: 0.6, y: by, w: 6.6, h: 0.85, rectRadius: 0.1, fill: { color: OFFWHITE }, line: { type: "none" } });
    s.addText(b.icon, { x: 0.75, y: by, w: 0.5, h: 0.85, fontSize: 18, valign: "middle", align: "center", margin: 0 });
    s.addText(b.t, { x: 1.3, y: by, w: 5.75, h: 0.85, fontFace: FONT_BODY, fontSize: 13, color: INK, valign: "middle", margin: 0 });
    by += 1.0;
  });

  s.addImage({ path: IMG("v1_crop.png"), x: 8.15, y: 0.3, w: 4.35, h: 4.35 * (955 / 600) });
  footer(s, "Slide 1 of 8 · Baseline before any persona feedback");
}

// ---------- Slide 2: Feedback — Priya ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "Round 1 — Priya");
  addAvatar(s, 0.6, 0.95, 0.85, "P");
  s.addText([{ text: "Priya", options: { bold: true, fontSize: 20, color: INK } }, { text: "  ·  28, software engineer, SF — already has a Europe trip goal", options: { fontSize: 13, color: MUTED } }], {
    x: 1.65, y: 0.98, w: 6.2, h: 0.8, fontFace: FONT_BODY, valign: "middle", margin: 0,
  });

  const quotes = [
    "“Why is it acting like I never set up my goal?”",
    "“If it doesn’t know I have a goal, can I trust the $184 number either?”",
  ];
  let qy = 2.1;
  quotes.forEach((q) => {
    s.addShape("roundRect", { x: 0.6, y: qy, w: 6.7, h: 0.95, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { type: "none" } });
    s.addText(q, { x: 0.85, y: qy, w: 6.2, h: 0.95, fontFace: FONT_BODY, italic: true, fontSize: 13.5, color: INK, valign: "middle", margin: 0 });
    qy += 1.15;
  });

  s.addText("MOST CONCERNING", { x: 0.6, y: qy + 0.1, w: 4, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "C0392B", charSpacing: 1, margin: 0 });
  s.addText("Distrust generalized from one visible error to the entire data pipeline — not just a UX nitpick.", {
    x: 0.6, y: qy + 0.4, w: 6.7, h: 0.55, fontFace: FONT_BODY, fontSize: 12.5, color: MUTED, margin: 0,
  });

  s.addShape("roundRect", { x: 0.6, y: qy + 1.05, w: 6.7, h: 1.35, rectRadius: 0.1, fill: { color: NAVY }, line: { type: "none" } });
  s.addText("RECOMMENDED CHANGE", { x: 0.85, y: qy + 1.2, w: 5, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "9FD9B8", charSpacing: 1, margin: 0 });
  s.addText("Add a real “has existing goal” state — branch the nudge and goal-progress card on actual goal state instead of assuming none exists.", {
    x: 0.85, y: qy + 1.5, w: 6.2, h: 0.85, fontFace: FONT_BODY, fontSize: 13, color: WHITE, margin: 0,
  });

  footer(s, "Slide 2 of 8 · Round 1 interview + shipped fix");
}

// ---------- Slide 3: Screenshot v2 ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "After Round 1");
  s.addText("Prototype v2", {
    x: 0.55, y: 0.85, w: 7, h: 0.8, fontFace: FONT_HEAD, fontSize: 34, bold: true, color: INK, margin: 0,
  });
  s.addText("What changed:", { x: 0.6, y: 1.75, w: 6, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: INK, margin: 0 });
  const changes = [
    "Added a demo toggle + full “has a goal” state (Europe Trip)",
    "Nudge and goal-progress card now branch on real goal state",
    "New action: “Redirect $18 to Europe Trip” for existing-goal users",
  ];
  let cy = 2.2;
  changes.forEach((c) => {
    s.addShape("ellipse", { x: 0.65, y: cy + 0.09, w: 0.08, h: 0.08, fill: { color: GREEN }, line: { type: "none" } });
    s.addText(c, { x: 0.9, y: cy, w: 6.1, h: 0.5, fontFace: FONT_BODY, fontSize: 13, color: INK, margin: 0 });
    cy += 0.62;
  });

  s.addImage({ path: IMG("v2_crop.png"), x: 8.15, y: 0.3, w: 4.35, h: 4.35 * (955 / 600) });
  footer(s, "Slide 3 of 8 · Verified live in browser before moving to Round 2");
}

// ---------- Slide 4: Feedback — Tom ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "Round 2 — Tom");
  addAvatar(s, 0.6, 0.95, 0.85, "T");
  s.addText([{ text: "Tom", options: { bold: true, fontSize: 20, color: INK } }, { text: "  ·  34, marketing manager, Chicago — abandoned 3 budgeting apps", options: { fontSize: 13, color: MUTED } }], {
    x: 1.65, y: 0.98, w: 6.3, h: 0.8, fontFace: FONT_BODY, valign: "middle", margin: 0,
  });

  const quotes = [
    "“It doesn’t know anything about me yet and it’s already asking me to commit to something.”",
    "“‘Redirect $18’ I could tap without thinking. ‘Set a savings goal’ feels like signing up for a whole thing.”",
  ];
  let qy = 2.1;
  quotes.forEach((q) => {
    s.addShape("roundRect", { x: 0.6, y: qy, w: 6.7, h: 0.95, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { type: "none" } });
    s.addText(q, { x: 0.85, y: qy, w: 6.2, h: 0.95, fontFace: FONT_BODY, italic: true, fontSize: 13, color: INK, valign: "middle", margin: 0 });
    qy += 1.15;
  });

  s.addText("MOST CONCERNING", { x: 0.6, y: qy + 0.1, w: 4, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "C0392B", charSpacing: 1, margin: 0 });
  s.addText("A full-commitment ask on first touch reads as the same failure pattern from apps he already abandoned.", {
    x: 0.6, y: qy + 0.4, w: 6.7, h: 0.55, fontFace: FONT_BODY, fontSize: 12.5, color: MUTED, margin: 0,
  });

  s.addShape("roundRect", { x: 0.6, y: qy + 1.05, w: 6.7, h: 1.35, rectRadius: 0.1, fill: { color: NAVY }, line: { type: "none" } });
  s.addText("RECOMMENDED CHANGE", { x: 0.85, y: qy + 1.2, w: 5, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "9FD9B8", charSpacing: 1, margin: 0 });
  s.addText("Replace the full-commitment CTA with a one-tap starter action; demote full goal setup to an optional secondary link.", {
    x: 0.85, y: qy + 1.5, w: 6.2, h: 0.85, fontFace: FONT_BODY, fontSize: 13, color: WHITE, margin: 0,
  });

  footer(s, "Slide 4 of 8 · Round 2 interview + shipped fix");
}

// ---------- Slide 5: Screenshot v3 ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "After Round 2");
  s.addText("Prototype v3", {
    x: 0.55, y: 0.85, w: 7, h: 0.8, fontFace: FONT_HEAD, fontSize: 34, bold: true, color: INK, margin: 0,
  });
  s.addText("What changed:", { x: 0.6, y: 1.75, w: 6, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: INK, margin: 0 });
  const changes = [
    "“Set a savings goal” replaced by one-tap “Try it: redirect $18”",
    "Full goal setup demoted to “or set up a full goal instead →”",
    "Post-action upgrade path: “Turn this into a real goal →”",
  ];
  let cy = 2.2;
  changes.forEach((c) => {
    s.addShape("ellipse", { x: 0.65, y: cy + 0.09, w: 0.08, h: 0.08, fill: { color: GREEN }, line: { type: "none" } });
    s.addText(c, { x: 0.9, y: cy, w: 6.1, h: 0.5, fontFace: FONT_BODY, fontSize: 13, color: INK, margin: 0 });
    cy += 0.62;
  });

  s.addImage({ path: IMG("v3_crop.png"), x: 8.15, y: 0.3, w: 4.35, h: 4.35 * (955 / 600) });
  footer(s, "Slide 5 of 8 · Verified live in browser before moving to Round 3");
}

// ---------- Slide 6: Feedback — Amara ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "Round 3 — Amara");
  addAvatar(s, 0.6, 0.95, 0.85, "A");
  s.addText([{ text: "Amara", options: { bold: true, fontSize: 20, color: INK } }, { text: "  ·  41, operations lead, Atlanta — paying down credit card debt", options: { fontSize: 13, color: MUTED } }], {
    x: 1.65, y: 0.98, w: 6.4, h: 0.8, fontFace: FONT_BODY, valign: "middle", margin: 0,
  });

  const quotes = [
    "“If I’ve got a card at 22% APR, putting $18 into savings instead of principal is the wrong move.”",
    "“Is that a real sub-account, or just a number that doesn’t correspond to anything?”",
  ];
  let qy = 2.1;
  quotes.forEach((q) => {
    s.addShape("roundRect", { x: 0.6, y: qy, w: 6.7, h: 0.95, rectRadius: 0.08, fill: { color: OFFWHITE }, line: { type: "none" } });
    s.addText(q, { x: 0.85, y: qy, w: 6.2, h: 0.95, fontFace: FONT_BODY, italic: true, fontSize: 13, color: INK, valign: "middle", margin: 0 });
    qy += 1.15;
  });

  s.addText("MOST CONCERNING", { x: 0.6, y: qy + 0.1, w: 4, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "C0392B", charSpacing: 1, margin: 0 });
  s.addText("The core recommendation could be objectively counterproductive for her situation — a credibility risk, not just low engagement.", {
    x: 0.6, y: qy + 0.4, w: 6.7, h: 0.55, fontFace: FONT_BODY, fontSize: 12.5, color: MUTED, margin: 0,
  });

  s.addShape("roundRect", { x: 0.6, y: qy + 1.05, w: 6.7, h: 1.55, rectRadius: 0.1, fill: { color: NAVY }, line: { type: "none" } });
  s.addText("RECOMMENDED CHANGE", { x: 0.85, y: qy + 1.2, w: 5, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "9FD9B8", charSpacing: 1, margin: 0 });
  s.addText("Soften the nudge to a framed option, disclose it’s a real transaction, and acknowledge what the app doesn’t know (debt, other priorities).", {
    x: 0.85, y: qy + 1.5, w: 6.2, h: 1.0, fontFace: FONT_BODY, fontSize: 12, color: WHITE, margin: 0,
  });

  footer(s, "Slide 6 of 8 · Round 3 interview + shipped fix");
}

// ---------- Slide 7: Final prototype v4 ----------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  dotLabel(s, 0.6, 0.55, "After Round 3 — Current Build");
  s.addText("Prototype v4 (Final)", {
    x: 0.55, y: 0.85, w: 7.2, h: 0.8, fontFace: FONT_HEAD, fontSize: 34, bold: true, color: INK, margin: 0,
  });
  s.addText("What changed:", { x: 0.6, y: 1.75, w: 6, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: INK, margin: 0 });
  const changes = [
    "Nudge reframed as an option, not a prescription",
    "Fine-print discloses it’s a real, verifiable sub-account",
    "Explicit acknowledgment of what the app doesn’t know yet",
  ];
  let cy = 2.2;
  changes.forEach((c) => {
    s.addShape("ellipse", { x: 0.65, y: cy + 0.09, w: 0.08, h: 0.08, fill: { color: GREEN }, line: { type: "none" } });
    s.addText(c, { x: 0.9, y: cy, w: 6.1, h: 0.5, fontFace: FONT_BODY, fontSize: 13, color: INK, margin: 0 });
    cy += 0.62;
  });

  s.addShape("roundRect", { x: 0.6, y: 4.3, w: 6.7, h: 1.55, rectRadius: 0.1, fill: { color: OFFWHITE }, line: { type: "none" } });
  s.addText("OPEN ITEM — NOT YET RESOLVED", { x: 0.85, y: 4.45, w: 6, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: "C0392B", charSpacing: 1, margin: 0 });
  s.addText("Whether Engage v2 should incorporate debt-awareness into the nudge logic is a strategic question beyond this prototype's scope — flagged in strategy.md and the decision brief for Marcus.", {
    x: 0.85, y: 4.75, w: 6.2, h: 1.0, fontFace: FONT_BODY, fontSize: 12.5, color: INK, margin: 0,
  });

  s.addImage({ path: IMG("v4_crop.png"), x: 8.15, y: 0.3, w: 4.35, h: 4.35 * (955 / 600) });
  footer(s, "Slide 7 of 8 · Current state of prototype/index.html");
}

// ---------- Slide 8: Closing pattern ----------
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape("ellipse", { x: -2, y: -2.5, w: 6, h: 6, fill: { color: NAVY_SOFT }, line: { type: "none" } });

  dotLabel(s, 0.9, 0.75, "Cross-Round Pattern");
  s.addText("Every fix addressed the same\nroot issue in a different form", {
    x: 0.85, y: 1.15, w: 11.6, h: 1.3, fontFace: FONT_HEAD, fontSize: 32, bold: true, color: WHITE, margin: 0, lineSpacing: 36,
  });
  s.addText("The prototype kept assuming something about the user — no goal exists, ready to commit immediately, savings is the objectively correct move — that didn’t hold for that persona.", {
    x: 0.9, y: 3.0, w: 9.8, h: 0.9, fontFace: FONT_BODY, fontSize: 15, color: "C9D3E2", margin: 0,
  });

  const cards = [
    { n: "01", t: "State branch", d: "Priya — don’t assume the goal doesn’t exist" },
    { n: "02", t: "Smaller ask", d: "Tom — don’t assume readiness to commit" },
    { n: "03", t: "Honest disclosure", d: "Amara — don’t assume savings is always correct" },
  ];
  let cx = 0.9;
  cards.forEach((c) => {
    s.addShape("roundRect", { x: cx, y: 4.1, w: 3.75, h: 2.4, rectRadius: 0.12, fill: { color: NAVY_SOFT }, line: { type: "none" } });
    s.addText(c.n, { x: cx + 0.3, y: 4.3, w: 1.5, h: 0.6, fontFace: FONT_HEAD, fontSize: 26, bold: true, color: GREEN, margin: 0 });
    s.addText(c.t, { x: cx + 0.3, y: 5.0, w: 3.2, h: 0.4, fontFace: FONT_BODY, fontSize: 15, bold: true, color: WHITE, margin: 0 });
    s.addText(c.d, { x: cx + 0.3, y: 5.4, w: 3.2, h: 0.9, fontFace: FONT_BODY, fontSize: 12, color: "C9D3E2", margin: 0 });
    cx += 4.05;
  });

  footer(s, "Slide 8 of 8 · Full transcripts: research/prototype-usability-testing.md");
}

pres.writeFile({ fileName: "/Users/faran/cc4pm_workspace_august/docs/prototype-testing-deck.pptx" }).then(() => {
  console.log("done");
});
