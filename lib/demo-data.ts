/**
 * Hardcoded data for the hero mock and the interactive demo.
 * Nothing here is fetched; swap these objects to change the scenario.
 */

export type SourceKind = "video" | "pdf" | "article";

export type Source = {
  id: string;
  kind: SourceKind;
  /** Short label used in citation chips, e.g. "Lecture 3". */
  short: string;
  title: string;
  /** Secondary line: origin, length, page count. */
  meta: string;
  /** Text shown in the fake address bar when this source is open. */
  address: string;
  /** Video length, shown in the player. */
  duration?: string;
};

export type Locator = {
  id: string;
  sourceId: string;
  /** Location label shown after the source name: "12:45", "p.4", "¶3". */
  label: string;
  /** The exact quoted span that supports the claim. */
  excerpt: string;
  /** Surrounding text for PDF/article views. */
  before?: string;
  after?: string;
  /** Video: playhead position 0–1. PDF: page number. */
  position?: number;
};

export type Segment = { text: string; cite?: string };

/**
 * "instant": answered from the page the user is on, no setup.
 * "deep": needs added sources and searches across all of them.
 */
export type QuestionMode = "instant" | "deep";

export type DemoQuestion = {
  id: string;
  mode: QuestionMode;
  question: string;
  segments: Segment[];
};

export const sources: Source[] = [
  {
    id: "lecture",
    kind: "video",
    short: "Lecture 3",
    title: "Lecture 3: Cellular Respiration & the ETC",
    meta: "YouTube · 48:12",
    address: "youtube.com/watch?v=lecture-3-respiration",
    duration: "48:12",
  },
  {
    id: "paper",
    kind: "pdf",
    short: "Paper.pdf",
    title: "Revisiting the P/O ratio in mammalian mitochondria",
    meta: "PDF · 14 pages",
    address: "file:///Downloads/Paper.pdf",
  },
  {
    id: "article",
    kind: "article",
    short: "Bio Notes",
    title: "Why your textbook's ATP number is probably wrong",
    meta: "Article · 6 min read",
    address: "bionotes.example/atp-yield",
  },
];

export const locators: Record<string, Locator> = {
  "lecture-1245": {
    id: "lecture-1245",
    sourceId: "lecture",
    label: "12:45",
    position: 765 / 2892,
    excerpt:
      "So the classic textbook tally is 36 to 38 ATP per glucose, and that's the number you'll see on most exams.",
  },
  "lecture-2730": {
    id: "lecture-2730",
    sourceId: "lecture",
    label: "27:30",
    position: 1650 / 2892,
    excerpt:
      "Complexes one, three and four pump protons. That gradient is what actually drives ATP synthase.",
  },
  "lecture-3108": {
    id: "lecture-3108",
    sourceId: "lecture",
    label: "31:08",
    position: 1868 / 2892,
    excerpt:
      "Oxygen is the final electron acceptor. Take it away and the whole chain backs up; NADH can't be oxidized.",
  },
  "paper-p4": {
    id: "paper-p4",
    sourceId: "paper",
    label: "p.4",
    position: 4,
    before: "Table 2 summarises the measured stoichiometries under physiological conditions.",
    excerpt:
      "Accounting for proton leak and the cost of transporting ADP and phosphate into the matrix, we estimate a yield of approximately 30–32 ATP per glucose.",
    after: "This is consistent with prior estimates derived from isolated preparations.",
  },
  "paper-p7": {
    id: "paper-p7",
    sourceId: "paper",
    label: "p.7",
    position: 7,
    before: "Historical accounts relied on idealised values.",
    excerpt:
      "Earlier calculations assumed whole-number P/O ratios of 3 and 2; measured ratios are closer to 2.5 and 1.5.",
    after: "The discrepancy accounts for most of the difference in reported yields.",
  },
  "article-p3": {
    id: "article-p3",
    sourceId: "article",
    label: "¶3",
    before: "If you've ever wondered why two textbooks give different answers, here's why.",
    excerpt:
      "The 36–38 figure dates from when P/O ratios were rounded to whole numbers, and it survives in textbooks mostly through inertia.",
    after: "Newer editions have started to correct it.",
  },
  "article-p4": {
    id: "article-p4",
    sourceId: "article",
    label: "¶4",
    before: "So what's the real number?",
    excerpt:
      "Current estimates, which account for proton leak and transport costs, put the yield closer to 30–32 ATP per glucose.",
    after: "That's still a lot of energy from one sugar.",
  },
  "article-p5": {
    id: "article-p5",
    sourceId: "article",
    label: "¶5",
    before: "So what happens when oxygen runs out, say, during a sprint?",
    excerpt: "Without oxygen, cells fall back on fermentation, which nets just 2 ATP per glucose.",
    after: "That's why the burn arrives so fast.",
  },
};

export const questions: DemoQuestion[] = [
  // Order matters: the hero mock shows questions[0].
  {
    id: "yield",
    mode: "deep",
    question: "How much ATP does one glucose actually make?",
    segments: [
      { text: "Most current estimates land at about 30–32 ATP per glucose.", cite: "paper-p4" },
      {
        text: " Your lecture uses the classic 36–38 tally, which is still what many exams expect.",
        cite: "lecture-1245",
      },
      {
        text: " The gap comes from older, rounded-up P/O ratios: measured values are closer to 2.5 and 1.5.",
        cite: "paper-p7",
      },
    ],
  },
  {
    id: "oxygen",
    mode: "deep",
    question: "What happens if there's no oxygen?",
    segments: [
      {
        text: "The electron transport chain stalls: oxygen is the final electron acceptor, so NADH can't be oxidized.",
        cite: "lecture-3108",
      },
      {
        text: " Proton pumping stops, so ATP synthase loses the gradient that drives it.",
        cite: "lecture-2730",
      },
      {
        text: " Cells fall back on fermentation, which nets only 2 ATP per glucose.",
        cite: "article-p5",
      },
    ],
  },
  {
    id: "page",
    mode: "instant",
    question: "Is the 36–38 ATP figure actually right?",
    segments: [
      {
        text: "Not quite, according to this article. The 36–38 figure comes from rounding P/O ratios to whole numbers, and it survives in textbooks mostly through inertia.",
        cite: "article-p3",
      },
      {
        text: " Current estimates that account for proton leak put the real yield closer to 30–32 ATP.",
        cite: "article-p4",
      },
      {
        text: " This page doesn't say which number your course expects, so add your lecture to check.",
      },
    ],
  },
];

/** The page the user is "on" in the demo. Instant mode reads only this. */
export const PAGE_SOURCE_ID = "article";

/** Article paragraphs rendered in the page view, in order. */
export const articleParagraphIds = ["article-p3", "article-p4", "article-p5"];

export function getSource(id: string): Source {
  const source = sources.find((s) => s.id === id);
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

export function citationLabel(locatorId: string): string {
  const loc = locators[locatorId];
  const name = loc.sourceId === PAGE_SOURCE_ID ? "This page" : getSource(loc.sourceId).short;
  return `${name} · ${loc.label}`;
}
