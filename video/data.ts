/**
 * Video-only sample content. Builds on the site's demo data (lib/demo-data.ts) so the
 * sources, quotes and citation labels match the interactive demo. Everything is original
 * placeholder content: no real courses, creators or publications.
 */
import {
  PAGE_SOURCE_ID,
  locators,
  questions,
  sources,
  type Locator,
  type Segment,
  type Source,
} from "@/lib/demo-data";
import { TYPED } from "./timeline";

export const lecture4: Source = {
  id: "lecture4",
  kind: "video",
  short: "Lecture 4",
  title: "Lecture 4: Oxidative Phosphorylation",
  meta: "YouTube · 41:05",
  address: "youtube.com/watch?v=lecture-4-oxphos",
  duration: "41:05",
};

export const allSources: Source[] = [...sources, lecture4];

export const allLocators: Record<string, Locator> = {
  ...locators,
  "lecture4-0810": {
    id: "lecture4-0810",
    sourceId: "lecture4",
    label: "08:10",
    position: 490 / 2465,
    excerpt:
      "Some protons leak back across the inner membrane without going through ATP synthase, so that energy is lost as heat.",
  },
};

export function sourceById(id: string): Source {
  const found = allSources.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown source ${id}`);
  return found;
}

export function chipLabel(locatorId: string): string {
  const loc = allLocators[locatorId];
  const name = loc.sourceId === PAGE_SOURCE_ID ? "This page" : sourceById(loc.sourceId).short;
  return `${name} · ${loc.label}`;
}

export const pageSource = sourceById(PAGE_SOURCE_ID);

/** Dragged in during scene 3: two videos and a PDF. */
export const addedSources: Source[] = [sourceById("lecture"), lecture4, sourceById("paper")];

export const instantAnswer: Segment[] = questions.find((q) => q.id === "page")!.segments;

export const deepQuestion = {
  question: TYPED.deep,
  segments: [
    {
      text: "Your lecture uses the classic textbook tally of 36–38.",
      cite: "lecture-1245",
    },
    {
      text: " The paper estimates about 30–32 once proton leak and transport costs are counted.",
      cite: "paper-p4",
    },
    {
      text: " Lecture 4 explains the leak: protons slip back without making ATP.",
      cite: "lecture4-0810",
    },
    {
      text: " This page adds that the old figure survives mostly through inertia.",
      cite: "article-p3",
    },
  ] satisfies Segment[],
};

/** Order of the chips the cursor visits in scene 4. */
export const deepHoverOrder = ["lecture-1245", "paper-p4", "lecture4-0810"] as const;

/** Scene 1 tab strip: generic study tabs, no real sites. */
export const painTabs = [
  "Lecture 3: Cellular Respiration",
  "Paper.pdf",
  "ATP yield explained",
  "Lecture 4: Oxidative Phosphorylation",
  "Krebs cycle review",
  "Study guide.pdf",
  "Mitochondria notes",
  "Lecture 2: Glycolysis",
  "ETC diagram",
  "Practice exam.pdf",
  "Proton gradient?",
  "Lecture 3 (1)",
  "notes_final_v2.pdf",
  "ATP synthase",
];

export function formatStamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function durationSeconds(source: Source): number {
  const [m, s] = (source.duration ?? "0:00").split(":").map(Number);
  return m * 60 + s;
}
