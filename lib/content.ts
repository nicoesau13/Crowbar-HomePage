/**
 * Marketing copy, kept out of components so it can be edited (or moved to a CMS) in one place.
 */

export const hero = {
  eyebrow: "Research side panel · for students",
  headline: ["One question.", "Any page.", "Proof attached."],
  subhead:
    "Crowbar works on whatever you're looking at: open the panel on any article, video or PDF and ask, with every claim cited to the exact passage or timestamp. Need more? Deep mode searches across every source you add.",
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
      "No copying and pasting into a chatbot: it already sees the page you're on",
      "Go deeper by asking across every source you've added",
      "Get one answer that reconciles them, disagreements included",
      "Every claim cites the timestamp, page or paragraph",
      "Click a citation to jump straight there and verify",
    ],
  },
};

export const steps = [
  {
    n: "01",
    title: "Open any page",
    body: "Reading an article, watching a lecture, scrolling a PDF? Open the Crowbar panel next to it. It already sees the page, so there's nothing to upload or paste.",
    detail: "◉ reading: this page",
    optional: false,
  },
  {
    n: "02",
    title: "Ask Crowbar",
    body: "Ask the question you actually have. Every claim in the answer is cited to the exact passage or timestamp. Hover to preview the quote, click to jump there.",
    detail: "[This page · ¶3]",
    optional: false,
  },
  {
    n: "03",
    title: "Add sources to go deeper",
    body: "For bigger work, like comparing lectures or writing a research paper, add YouTube videos, articles and PDFs. Deep mode searches across all of them and still cites every claim.",
    detail: "+ youtube · article · pdf",
    optional: true,
  },
];

export const features = [
  {
    key: "page",
    title: "Knows what you're looking at",
    body: "Crowbar reads the page you're on, whether it's an article, a video or a PDF, so you can ask right away. Nothing to copy, paste or upload.",
  },
  {
    key: "multi",
    title: "Go deeper with more sources",
    body: "For research papers or comparing lectures, add videos, articles and PDFs. Deep mode answers across all of them and shows where they agree and where they don't.",
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
    q: "Do I need to upload anything?",
    a: "No. Open the panel on the page you're reading and ask; that's instant mode, with no setup. Adding sources (YouTube videos, articles, PDFs) is optional and meant for advanced work like comparing lectures or writing a research paper, where Crowbar searches across all of them.",
  },
  {
    q: "Does Crowbar read everything I browse?",
    a: "No. Crowbar is designed to read a page only when you ask a question about it in the panel, plus any sources you've chosen to add. It doesn't read or record your browsing in the background. Controls to turn Crowbar off on specific sites, and a full privacy policy, are coming soon.",
  },
  {
    q: "Which pages and sources does Crowbar support?",
    a: "Planned for launch: web articles, YouTube videos that have captions, and PDFs (text-based, not scanned images), both as the page you're on and as added sources. Lectures on other video platforms, uploaded recordings, Google Docs and scanned PDFs are coming soon.",
  },
  {
    q: "How accurate are the answers?",
    a: "Crowbar can make mistakes, like any AI tool. That's why every claim links to the exact spot it came from, so you can check it in a click. When your sources don't support an answer, Crowbar is designed to say so rather than fill the gap from elsewhere.",
  },
  {
    q: "What happens to the pages, sources and questions I use?",
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
