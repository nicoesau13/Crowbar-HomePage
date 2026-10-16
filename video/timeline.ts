/**
 * Single source of truth for scene lengths and on-screen copy.
 * Scenes, the caption overlay and the generated .vtt all read from here.
 */

export const FPS = 30;

export const SCENES = [
  { id: "pain", frames: 150 }, //      0–5s
  { id: "instant", frames: 270 }, //   5–14s
  { id: "addSources", frames: 180 }, // 14–20s
  { id: "deep", frames: 420 }, //     20–34s
  { id: "contrast", frames: 240 }, // 34–42s
  { id: "close", frames: 210 }, //    42–49s
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + s.frames, 0);

export function sceneStart(id: SceneId): number {
  let start = 0;
  for (const s of SCENES) {
    if (s.id === id) return start;
    start += s.frames;
  }
  throw new Error(`Unknown scene ${id}`);
}

export function sceneFrames(id: SceneId): number {
  return SCENES.find((s) => s.id === id)!.frames;
}

/** "Concept demo" label: visible for the opening seconds. */
export const CONCEPT_LABEL = { from: 0, to: 210, text: "Concept demo · sample content" };

export type Cue = {
  /** Absolute frames. */
  from: number;
  to: number;
  text: string;
  /** Part of `text` rendered in the accent color. */
  accent?: string;
  /** Rendered as the big caption overlay (scenes 5–6 draw their own text). */
  overlay: boolean;
};

const s = sceneStart;

/** Typed questions (shown inside the panel). Also used by the scenes. */
export const TYPED = {
  instant: "Is the 36–38 ATP figure actually right?",
  deep: "Why does my lecture say 36–38 ATP when the paper says 30–32?",
};

export const CONTRAST = {
  left: { label: "Without Crowbar", title: "10 videos, 4 hours." },
  right: { label: "With Crowbar", title: "1 question, 12 seconds." },
  note: "Illustrative example, not a measured result.",
};

export const CLOSE = {
  tagline: ["Find it.", "Prove it."],
  cta: "Get early access",
  footnote: "Concept demo · in development",
};

export const cues: Cue[] = [
  {
    from: s("pain") + 14,
    to: s("instant"),
    text: "Somewhere in here is your answer.",
    accent: "your answer.",
    overlay: true,
  },
  {
    from: s("instant") + 8,
    to: s("addSources"),
    text: "No setup. Just ask.",
    accent: "Just ask.",
    overlay: true,
  },
  {
    from: s("addSources") + 8,
    to: s("deep"),
    text: "Need more? Add sources.",
    accent: "Add sources.",
    overlay: true,
  },
  {
    from: s("deep") + 8,
    to: s("deep") + 160,
    text: "Every claim, cited.",
    accent: "cited.",
    overlay: true,
  },
  {
    from: s("deep") + 160,
    to: s("contrast"),
    text: "Check it in one click.",
    accent: "one click.",
    overlay: true,
  },
];

/** Extra caption lines for the .vtt: text that appears on screen outside the overlay. */
export const vttOnly: Omit<Cue, "overlay">[] = [
  { from: s("instant") + 40, to: s("instant") + 200, text: `Question: ${TYPED.instant}` },
  { from: s("deep") + 0, to: s("deep") + 150, text: `Question: ${TYPED.deep}` },
  {
    from: s("contrast") + 10,
    to: s("contrast") + 240,
    text: `${CONTRAST.left.title} ${CONTRAST.right.title} (${CONTRAST.note})`,
  },
  {
    from: s("close") + 10,
    to: s("close") + 210,
    text: `Crowbar. ${CLOSE.tagline.join(" ")} ${CLOSE.cta}.`,
  },
];
