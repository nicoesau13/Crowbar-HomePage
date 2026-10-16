/**
 * Marketing copy, kept out of components so it can be edited (or moved to a CMS) in one place.
 */

export const hero = {
  eyebrow: "Research side panel · for students",
  headline: ["One question.", "Every source.", "Proof attached."],
  subhead:
    "Crowbar reads your videos, articles and PDFs together and answers with citations to the exact timestamp or passage.",
  secondaryCta: { label: "Try the demo", href: "#demo" },
  note: "Free during early access. Chrome first.",
};

export const problem = {
  eyebrow: "The problem",
  title: "Ten tabs open, and the answer is in three of them",
  intro:
    "Research means piecing one answer together from a lot of material. Most of that time goes to hunting, not thinking.",
  before: {
    label: "Without Crowbar",
    items: [
      "Scrub through 45-minute lectures for one sentence",
      "Ctrl+F across PDFs that use different wording",
      "Lose track of which tab a claim came from",
      "Paste an AI answer you can't actually check",
    ],
  },
  after: {
    label: "With Crowbar",
    items: [
      "Ask once, across every source you've added",
      "Get one answer that reconciles them, disagreements included",
      "Every claim cites the timestamp, page or paragraph",
      "Click a citation to jump straight there and verify",
    ],
  },
};

export const steps = [
  {
    n: "01",
    title: "Add sources",
    body: "Open the panel next to any page and add what you're studying: a YouTube lecture, an article, a PDF. Mix as many as you need.",
    detail: "+ youtube · article · pdf",
  },
  {
    n: "02",
    title: "Ask",
    body: "Type the question you actually have. Crowbar answers from your sources, not the open web, and says so when they don't cover it.",
    detail: "> why do my sources disagree?",
  },
  {
    n: "03",
    title: "Verify",
    body: "Each claim carries a citation chip. Hover to preview the quote, click to jump to the moment in the video or the highlighted passage.",
    detail: "[Lecture 3 · 12:45]",
  },
];

export const features = [
  {
    key: "multi",
    title: "Multi-source by default",
    body: "Answers are synthesized across every source you add, so you see where they agree and where they don't.",
  },
  {
    key: "cite",
    title: "Exact citations",
    body: "Timestamps for video, page and highlighted passage for PDFs, paragraph for articles. Specific enough to quote.",
  },
  {
    key: "panel",
    title: "A side panel, not a new app",
    body: "Crowbar lives next to whatever you're already reading. No exporting, no switching windows, no new workspace to organize.",
  },
  {
    key: "students",
    title: "Built for students",
    body: "Designed around coursework: lectures, readings and papers, and answers you can cite in an essay without guessing.",
  },
] as const;

export const faqs = [
  {
    q: "Which sources does Crowbar support?",
    a: "Planned for launch: YouTube videos that have captions, web articles, and PDFs (text-based, not scanned images). Uploaded lecture recordings, Google Docs and scanned PDFs are coming soon.",
  },
  {
    q: "How accurate are the answers?",
    a: "Crowbar can make mistakes, like any AI tool. That's why every claim links to the exact spot it came from, so you can check it in a click. When your sources don't support an answer, Crowbar is designed to say so rather than fill the gap from elsewhere.",
  },
  {
    q: "What happens to my sources and questions?",
    a: "They're used to answer your questions, and that's it. We don't sell your data. A full privacy policy, including retention and deletion controls, will be published before the public launch.",
  },
  {
    q: "How much does it cost?",
    a: "It's free during early access. Pricing after that isn't set yet; we'll tell early-access users well before anything changes, and we're planning student-friendly pricing.",
  },
  {
    q: "Which browsers will it work in?",
    a: "Chrome first, then other Chromium browsers like Edge and Brave. Firefox and Safari are coming soon.",
  },
];

export const finalCta = {
  title: "Stop hunting. Start citing.",
  body: "Crowbar is in development. Join the early-access list and we'll email you when there's a build to try. No spam, one email per milestone at most.",
};
