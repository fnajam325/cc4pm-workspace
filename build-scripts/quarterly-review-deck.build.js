const pptxgen = require("pptxgenjs");

// Dark / neon theme
const BG = "0A0E17";
const BG_SOFT = "121A2C";
const PANEL = "141B2E";
const PANEL_STRONG = "1C2740";
const NEON = "39FF88";
const TEXT_WHITE = "FFFFFF";
const TEXT_GREY = "AEB8CC";
const TEXT_DIM = "7C87A0";
const RED_NEON = "FF5C6C";
const LINE_DARK = "2A3450";
const CHART_MUTED = "4A5468";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

function dotLabel(slide, x, y, text, opts = {}) {
  slide.addShape("ellipse", { x, y: y + 0.09, w: 0.09, h: 0.09, fill: { color: NEON }, line: { type: "none" } });
  slide.addText(text.toUpperCase(), {
    x: x + 0.2, y, w: opts.w || 8, h: 0.3, fontFace: FONT_BODY, fontSize: 12, bold: true,
    color: NEON, charSpacing: 1, margin: 0, valign: "middle",
  });
}

function footer(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 7.12, w: 12.3, h: 0.3, fontFace: FONT_BODY, fontSize: 10, color: TEXT_DIM,
    align: "left", margin: 0,
  });
}

function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: 0.55, y: 0.85, w: opts.w || 9.5, h: 0.85, fontFace: FONT_HEAD, fontSize: 32, bold: true, color: NEON, margin: 0,
  });
}

function iconCircle(slide, x, y, size, emoji) {
  slide.addShape("ellipse", { x, y, w: size, h: size, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  slide.addText(emoji, { x, y, w: size, h: size, align: "center", valign: "middle", fontSize: size * 22, margin: 0 });
}

function bg(slide) {
  slide.background = { color: BG };
}

// ---------- Slide 0: Title ----------
{
  const s = pres.addSlide();
  bg(s);
  s.addShape("ellipse", { x: 10.6, y: -2.2, w: 6, h: 6, fill: { color: BG_SOFT }, line: { type: "none" } });
  s.addShape("ellipse", { x: -2.4, y: 5.2, w: 5, h: 5, fill: { color: BG_SOFT }, line: { type: "none" } });

  dotLabel(s, 0.9, 2.05, "Nudge · Engage v2 · Quarterly Review", { w: 8 });
  s.addText("Recovering 30-Day Retention", {
    x: 0.85, y: 2.45, w: 11.6, h: 1.1, fontFace: FONT_HEAD, fontSize: 42, bold: true, color: NEON, margin: 0,
  });
  s.addText("The Personalized Weekly Summary: what we found, what we built, what we're asking for.", {
    x: 0.9, y: 3.6, w: 9.5, h: 0.6, fontFace: FONT_BODY, fontSize: 16, color: TEXT_GREY, margin: 0,
  });
  footer(s, "Fictional course scenario · Prepared for Marcus, Head of Product");
}

// ---------- Slide 1: The Problem ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.55, "The Problem");
  title(s, "Retention is sliding, and it's not self-correcting");

  s.addShape("roundRect", { x: 0.6, y: 2.0, w: 4.6, h: 3.2, rectRadius: 0.14, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  s.addText("44%", { x: 0.6, y: 2.35, w: 4.6, h: 1.1, align: "center", fontFace: FONT_HEAD, fontSize: 52, bold: true, color: TEXT_GREY, margin: 0 });
  s.addText("→", { x: 0.6, y: 3.35, w: 4.6, h: 0.5, align: "center", fontFace: FONT_BODY, fontSize: 22, color: NEON, margin: 0 });
  s.addText("37%", { x: 0.6, y: 3.75, w: 4.6, h: 1.1, align: "center", fontFace: FONT_HEAD, fontSize: 52, bold: true, color: NEON, margin: 0 });
  s.addText("30-day retention, last two quarters", { x: 0.85, y: 4.85, w: 4.1, h: 0.3, align: "center", fontFace: FONT_BODY, fontSize: 12, color: TEXT_GREY, margin: 0 });

  s.addText("Where it actually breaks", { x: 5.6, y: 2.1, w: 6.9, h: 0.4, fontFace: FONT_BODY, fontSize: 14, bold: true, color: NEON, margin: 0 });
  s.addText("The drop isn't at onboarding. Users get a strong first moment — the initial spending breakdown consistently lands well — and then the app gives them nothing that pulls them back.", {
    x: 5.6, y: 2.6, w: 6.9, h: 1.1, fontFace: FONT_BODY, fontSize: 16, color: TEXT_WHITE, margin: 0,
  });
  s.addShape("roundRect", { x: 5.6, y: 3.85, w: 6.9, h: 1.15, rectRadius: 0.1, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("The problem isn't acquisition or first impressions — it's what happens right after.", {
    x: 5.85, y: 3.85, w: 6.4, h: 1.15, fontFace: FONT_BODY, italic: true, fontSize: 15, color: TEXT_WHITE, valign: "middle", margin: 0,
  });
  footer(s, "Slide 1 of 7 · Source: docs/decision-brief.md");
}

// ---------- Slide 2: Why Now ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.55, "Why Now");
  title(s, "Three independent sources, one conclusion");

  const items = [
    { icon: "🗣️", h: "User interviews", d: "Real users describe the same static, unrewarding experience after week 1" },
    { icon: "📊", h: "NPS feedback", d: "Independently confirms it — precision matters more than volume" },
    { icon: "🔍", h: "Competitive scan", d: "No competitor (YNAB, Copilot, Rocket Money, Monarch) owns this gap" },
  ];
  let cx = 0.6;
  items.forEach((it) => {
    iconCircle(s, cx, 2.1, 0.65, it.icon);
    s.addText(it.h, { x: cx, y: 2.9, w: 3.75, h: 0.4, fontFace: FONT_BODY, fontSize: 15, bold: true, color: NEON, margin: 0 });
    s.addText(it.d, { x: cx, y: 3.3, w: 3.75, h: 1.0, fontFace: FONT_BODY, fontSize: 12.5, color: TEXT_GREY, margin: 0 });
    cx += 4.1;
  });

  s.addShape("roundRect", { x: 0.6, y: 4.65, w: 11.9, h: 1.35, rectRadius: 0.12, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  s.addText("COST OF WAITING", { x: 0.9, y: 4.82, w: 5, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: NEON, charSpacing: 1, margin: 0 });
  s.addText("The retention slide is already 7 points deep with no sign of leveling off — every quarter we don't act compounds both the metric loss and the market opportunity we're leaving open.", {
    x: 0.9, y: 5.13, w: 11.3, h: 0.8, fontFace: FONT_BODY, fontSize: 14.5, color: TEXT_WHITE, margin: 0,
  });
  footer(s, "Slide 2 of 7 · Source: docs/decision-brief.md");
}

// ---------- Slide 3: The Proposal ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.55, "The Proposal");
  title(s, "A personalized weekly summary, precisely scoped");

  s.addShape("roundRect", { x: 0.6, y: 1.95, w: 5.75, h: 4.15, rectRadius: 0.12, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("✅  WHAT IT IS", { x: 0.9, y: 2.15, w: 5, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: NEON, charSpacing: 1, margin: 0 });
  const isItems = [
    "One spending insight, genuinely derivable from ≤2 weeks of data",
    "One nudge that IS the goal-setting action — not a separate ask",
    "Visible goal progress that updates in place",
    "Built to pay off in week 1-2, not months",
  ];
  let iy = 2.65;
  isItems.forEach((t) => {
    s.addShape("ellipse", { x: 0.95, y: iy + 0.09, w: 0.08, h: 0.08, fill: { color: NEON }, line: { type: "none" } });
    s.addText(t, { x: 1.2, y: iy, w: 5.0, h: 0.5, fontFace: FONT_BODY, fontSize: 13, color: TEXT_WHITE, margin: 0 });
    iy += 0.82;
  });

  s.addShape("roundRect", { x: 6.55, y: 1.95, w: 5.75, h: 4.15, rectRadius: 0.12, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("⛔  WHAT IT ISN'T", { x: 6.85, y: 2.15, w: 5, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: RED_NEON, charSpacing: 1, margin: 0 });
  const isntItems = [
    "Not a debt-aware financial coach — explicitly out of scope",
    "Not a channel-only fix — email parity alone was considered and rejected",
    "Not a finished, guaranteed solution — a tested experiment",
  ];
  let ny = 2.65;
  isntItems.forEach((t) => {
    s.addShape("ellipse", { x: 6.9, y: ny + 0.09, w: 0.08, h: 0.08, fill: { color: RED_NEON }, line: { type: "none" } });
    s.addText(t, { x: 7.15, y: ny, w: 5.0, h: 0.6, fontFace: FONT_BODY, fontSize: 13, color: TEXT_WHITE, margin: 0 });
    ny += 0.95;
  });
  footer(s, "Slide 3 of 7 · Source: docs/decision-brief.md, docs/pm-brief.md");
}

// ---------- Slide 4: What Users Told Us ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.5, "Evidence — Real Interviews");
  title(s, "The same pattern, from three different users", { w: 11 });

  const quotes = [
    { init: "A", name: "Amara", role: "new user, day 10", q: "The spending breakdown was shocking in a useful way." },
    { init: "T", name: "Tom", role: "churned, week 5", q: "I switched to YNAB because at least that feels like it is asking something of me." },
    { init: "P", name: "Priya", role: "power user, 18mo", q: "It took about three months to get there — and I think most people give up before that." },
  ];
  let qx = 0.6;
  quotes.forEach((qt) => {
    s.addShape("roundRect", { x: qx, y: 1.85, w: 3.83, h: 2.85, rectRadius: 0.12, fill: { color: PANEL }, line: { type: "none" } });
    s.addShape("ellipse", { x: qx + 0.25, y: 2.1, w: 0.55, h: 0.55, fill: { color: NEON }, line: { type: "none" } });
    s.addText(qt.init, { x: qx + 0.25, y: 2.1, w: 0.55, h: 0.55, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 18, bold: true, color: BG, margin: 0 });
    s.addText(qt.name, { x: qx + 0.95, y: 2.13, w: 2.7, h: 0.3, fontFace: FONT_BODY, fontSize: 13, bold: true, color: TEXT_WHITE, margin: 0 });
    s.addText(qt.role, { x: qx + 0.95, y: 2.42, w: 2.7, h: 0.25, fontFace: FONT_BODY, fontSize: 10, color: TEXT_GREY, margin: 0 });
    s.addText(`“${qt.q}”`, { x: qx + 0.25, y: 2.9, w: 3.35, h: 1.65, fontFace: FONT_BODY, italic: true, fontSize: 15.5, color: TEXT_WHITE, valign: "top", margin: 0 });
    qx += 4.08;
  });

  s.addText("NPS CONFIRMS THE SAME GAPS", { x: 0.6, y: 4.95, w: 8, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: NEON, charSpacing: 1, margin: 0 });
  const nps = [
    "“I set a savings goal but Nudge has never once mentioned it since. It is like it forgot.”",
    "“The weekly email is the only thing keeping me engaged. The app itself has not given me a reason to open it.”",
  ];
  let nx = 0.6;
  nps.forEach((n) => {
    s.addShape("roundRect", { x: nx, y: 5.3, w: 5.85, h: 1.35, rectRadius: 0.1, fill: { color: PANEL_STRONG }, line: { type: "none" } });
    s.addText(n, { x: nx + 0.25, y: 5.3, w: 5.35, h: 1.35, fontFace: FONT_BODY, italic: true, fontSize: 12, color: TEXT_WHITE, valign: "middle", margin: 0 });
    nx += 6.1;
  });
  footer(s, "Slide 4 of 7 · Source: research/interview-synthesis.md, research/nps-analysis.md");
}

// ---------- Slide 5: What the Data Shows ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.5, "Evidence — Week-5 Live Experiment");
  title(s, "Early signal is real; later signal is promising", { w: 11 });

  // Stat callouts
  s.addShape("roundRect", { x: 0.6, y: 1.85, w: 3.83, h: 1.75, rectRadius: 0.1, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  s.addText("DAY-7 RETENTION", { x: 0.85, y: 2.02, w: 3.3, h: 0.3, fontFace: FONT_BODY, fontSize: 10.5, bold: true, color: NEON, charSpacing: 1, margin: 0 });
  s.addText("76% vs 46%", { x: 0.85, y: 2.32, w: 3.3, h: 0.6, fontFace: FONT_HEAD, fontSize: 27, bold: true, color: TEXT_WHITE, margin: 0 });
  s.addText("Statistically significant (p<0.01)", { x: 0.85, y: 3.0, w: 3.3, h: 0.5, fontFace: FONT_BODY, fontSize: 11, color: NEON, margin: 0 });

  s.addShape("roundRect", { x: 4.58, y: 1.85, w: 3.83, h: 1.75, rectRadius: 0.1, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("DAY-30 RETENTION", { x: 4.83, y: 2.02, w: 3.3, h: 0.3, fontFace: FONT_BODY, fontSize: 10.5, bold: true, color: TEXT_GREY, charSpacing: 1, margin: 0 });
  s.addText("36% vs 22%", { x: 4.83, y: 2.32, w: 3.3, h: 0.6, fontFace: FONT_HEAD, fontSize: 27, bold: true, color: TEXT_WHITE, margin: 0 });
  s.addText("Right size, not yet significant (p≈0.12)", { x: 4.83, y: 3.0, w: 3.3, h: 0.5, fontFace: FONT_BODY, fontSize: 11, color: RED_NEON, margin: 0 });

  s.addShape("roundRect", { x: 8.56, y: 1.85, w: 3.94, h: 1.75, rectRadius: 0.1, fill: { color: PANEL }, line: { type: "none" } });
  s.addText("GOAL-SETTERS RETAIN", { x: 8.81, y: 2.02, w: 3.5, h: 0.3, fontFace: FONT_BODY, fontSize: 10.5, bold: true, color: TEXT_GREY, charSpacing: 1, margin: 0 });
  s.addText("34.8% vs 21.6%", { x: 8.81, y: 2.32, w: 3.5, h: 0.6, fontFace: FONT_HEAD, fontSize: 24, bold: true, color: TEXT_WHITE, margin: 0 });
  s.addText("Independent of this experiment", { x: 8.81, y: 3.0, w: 3.5, h: 0.5, fontFace: FONT_BODY, fontSize: 11, color: TEXT_GREY, margin: 0 });

  // Chart: open rate across 4 sends
  s.addText("Open rate across 4 weekly sends — growing, not decaying", { x: 0.6, y: 3.95, w: 8, h: 0.35, fontFace: FONT_BODY, fontSize: 13, bold: true, color: NEON, margin: 0 });
  s.addChart(
    pres.ChartType.line,
    [
      { name: "Weekly Summary (treatment)", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"], values: [28, 52, 52, 56] },
      { name: "Control", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"], values: [4, 4, 4, 6] },
    ],
    {
      x: 0.6, y: 4.35, w: 7.85, h: 2.45,
      showTitle: false,
      showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: TEXT_GREY,
      showValue: true, dataLabelFontSize: 9, dataLabelColor: TEXT_WHITE, dataLabelPosition: "t",
      chartColors: [NEON, CHART_MUTED],
      lineSize: 3,
      catAxisLabelColor: TEXT_GREY, catAxisLabelFontSize: 10,
      valAxisLabelColor: TEXT_GREY, valAxisLabelFontSize: 10, valAxisTitle: "% opened", valAxisTitleColor: TEXT_GREY,
      valGridLine: { color: LINE_DARK, size: 1 },
      catGridLine: { style: "none" },
      plotArea: { fill: { color: BG } },
      chartArea: { fill: { color: BG } },
    }
  );

  s.addShape("roundRect", { x: 8.7, y: 4.35, w: 3.8, h: 2.45, rectRadius: 0.1, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  s.addText("PROTOTYPE", { x: 8.95, y: 4.55, w: 3.3, h: 0.3, fontFace: FONT_BODY, fontSize: 10.5, bold: true, color: NEON, charSpacing: 1, margin: 0 });
  s.addText("Built and tested through multiple rounds before this ever touched real users.", {
    x: 8.95, y: 4.9, w: 3.3, h: 1.7, fontFace: FONT_BODY, fontSize: 13, color: TEXT_WHITE, margin: 0,
  });
  footer(s, "Slide 5 of 7 · Source: data/metric-findings.md");
}

// ---------- Slide 6: The Plan ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.55, "The Plan");
  title(s, "One clear milestone, one named risk");

  // Timeline
  const steps = [
    { n: "NOW", t: "Experiment continues", d: "More weeks of data" },
    { n: "NEXT", t: "Day-30 significance", d: "The number that matters" },
    { n: "THEN", t: "Rollout recommendation", d: "With a real timeline" },
  ];
  let tx = 0.6;
  steps.forEach((st, i) => {
    s.addShape("roundRect", { x: tx, y: 1.95, w: 3.7, h: 1.7, rectRadius: 0.1, fill: { color: i === 2 ? NEON : PANEL }, line: { type: "none" } });
    s.addText(st.n, { x: tx + 0.25, y: 2.1, w: 3.2, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: i === 2 ? BG : NEON, charSpacing: 1, margin: 0 });
    s.addText(st.t, { x: tx + 0.25, y: 2.42, w: 3.2, h: 0.5, fontFace: FONT_HEAD, fontSize: 16, bold: true, color: i === 2 ? BG : TEXT_WHITE, margin: 0 });
    s.addText(st.d, { x: tx + 0.25, y: 2.95, w: 3.2, h: 0.5, fontFace: FONT_BODY, fontSize: 11.5, color: i === 2 ? "0B3D1F" : TEXT_GREY, margin: 0 });
    if (i < 2) {
      s.addText("→", { x: tx + 3.72, y: 2.5, w: 0.5, h: 0.6, align: "center", fontFace: FONT_BODY, fontSize: 22, color: NEON, margin: 0 });
    }
    tx += 4.1;
  });

  s.addShape("roundRect", { x: 0.6, y: 4.05, w: 11.9, h: 2.15, rectRadius: 0.12, fill: { color: PANEL_STRONG }, line: { type: "none" } });
  s.addText("NAMED RISK — NOT HIDDEN", { x: 0.9, y: 4.25, w: 6, h: 0.3, fontFace: FONT_BODY, fontSize: 11, bold: true, color: RED_NEON, charSpacing: 1, margin: 0 });
  s.addText("The feature moves week-1 survival. It does not yet move whether people who already survived week 1 stick around through day 30 — a real segment of churners isn't helped yet.", {
    x: 0.9, y: 4.6, w: 11.3, h: 0.85, fontFace: FONT_BODY, fontSize: 14, color: TEXT_WHITE, margin: 0,
  });
  s.addText("Mitigation planned: a week-2+ continuation loop — designed, not yet built or tested.", {
    x: 0.9, y: 5.5, w: 11.3, h: 0.5, fontFace: FONT_BODY, italic: true, fontSize: 12.5, color: NEON, margin: 0,
  });
  footer(s, "Slide 6 of 7 · Source: docs/design-review.md, docs/objection-log.md");
}

// ---------- Slide 7: The Ask ----------
{
  const s = pres.addSlide();
  bg(s);
  s.addShape("ellipse", { x: -2, y: 5.0, w: 6, h: 6, fill: { color: BG_SOFT }, line: { type: "none" } });

  dotLabel(s, 0.9, 0.75, "The Ask");
  s.addText("Not asking for a rollout today.", {
    x: 0.85, y: 1.15, w: 11.6, h: 0.9, fontFace: FONT_HEAD, fontSize: 30, bold: true, color: NEON, margin: 0,
  });
  s.addText("Asking for two things to get there.", {
    x: 0.85, y: 1.85, w: 11.6, h: 0.6, fontFace: FONT_HEAD, fontSize: 20, color: TEXT_GREY, margin: 0,
  });

  const asks = [
    { n: "1", t: "Continue the experiment", d: "Until day-30 retention reaches statistical significance." },
    { n: "2", t: "Scope the week-2+ loop", d: "In parallel — including real-user validation before we build." },
  ];
  let ay = 2.85;
  asks.forEach((a) => {
    s.addShape("roundRect", { x: 0.9, y: ay, w: 11.2, h: 1.15, rectRadius: 0.1, fill: { color: PANEL_STRONG }, line: { type: "none" } });
    s.addText(a.n, { x: 1.1, y: ay, w: 0.8, h: 1.15, align: "center", valign: "middle", fontFace: FONT_HEAD, fontSize: 30, bold: true, color: NEON, margin: 0 });
    s.addText(a.t, { x: 2.0, y: ay + 0.15, w: 9.8, h: 0.45, fontFace: FONT_BODY, fontSize: 17, bold: true, color: TEXT_WHITE, margin: 0 });
    s.addText(a.d, { x: 2.0, y: ay + 0.6, w: 9.8, h: 0.5, fontFace: FONT_BODY, fontSize: 13, color: TEXT_GREY, margin: 0 });
    ay += 1.35;
  });

  s.addText("In return: a full rollout recommendation and a real timeline — once day-30 significance is reached, not before.", {
    x: 0.9, y: 5.75, w: 11.2, h: 0.6, fontFace: FONT_BODY, italic: true, fontSize: 13.5, color: NEON, margin: 0,
  });
  footer(s, "Slide 7 of 7 · Source: docs/decision-brief.md, data/metric-findings.md");
}

// ---------- Appendix: One-Slide Summary (if short on time) ----------
{
  const s = pres.addSlide();
  bg(s);
  dotLabel(s, 0.6, 0.5, "Appendix — Use This Slide If Short on Time");
  title(s, "Engage v2, in one slide", { w: 10 });

  const rows = [
    { icon: "📉", h: "Problem", d: "30-day retention: 44% → 37%. The drop happens after week 1, not at onboarding." },
    { icon: "⏱️", h: "Why now", d: "3 independent sources agree; no competitor owns this gap; the slide isn't self-correcting." },
    { icon: "🧩", h: "Proposal", d: "Personalized weekly summary — insight + nudge-as-goal-setting + goal progress. Debt-aware coaching explicitly out of scope." },
    { icon: "📈", h: "Evidence", d: "Day-7 lift is significant (76% vs 46%). Day-30 is directional (36% vs 22%), not yet significant. Open rate climbs 28%→56% vs flat control." },
    { icon: "🗺️", h: "Plan", d: "Continue the experiment to day-30 significance. Named risk: doesn't yet help users who churn after week 1 — mitigation designed, not built." },
    { icon: "🤝", h: "The ask", d: "Approve continuing the experiment + scoping the week-2+ loop in parallel. Rollout recommendation comes once day-30 is significant." },
  ];
  let ry = 1.95;
  rows.forEach((r) => {
    s.addShape("roundRect", { x: 0.6, y: ry, w: 11.9, h: 0.78, rectRadius: 0.08, fill: { color: PANEL }, line: { type: "none" } });
    s.addText(r.icon, { x: 0.75, y: ry, w: 0.6, h: 0.78, valign: "middle", align: "center", fontSize: 18, margin: 0 });
    s.addText(r.h, { x: 1.45, y: ry, w: 1.6, h: 0.78, valign: "middle", fontFace: FONT_BODY, fontSize: 12.5, bold: true, color: NEON, margin: 0 });
    s.addText(r.d, { x: 3.1, y: ry, w: 9.25, h: 0.78, valign: "middle", fontFace: FONT_BODY, fontSize: 11, color: TEXT_WHITE, margin: 0 });
    ry += 0.86;
  });
  footer(s, "Backup slide · Full deck: slides 1-7 · Full source: docs/presentation.md");
}

pres.writeFile({ fileName: "/Users/faran/cc4pm_workspace_august/docs/quarterly-review-deck.pptx" }).then(() => {
  console.log("done");
});
