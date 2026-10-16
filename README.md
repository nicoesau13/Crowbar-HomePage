# Crowbar — marketing site

Single-page marketing site for Crowbar, a browser side-panel research tool for students.

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Framer Motion. No UI kit.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script              | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run build`     | Production build                       |
| `npm start`         | Serve the production build             |
| `npm run lint`      | ESLint (next/core-web-vitals)          |
| `npm run typecheck` | `tsc --noEmit`                         |
| `npm run format`    | Prettier (with Tailwind class sorting) |

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical and Open Graph URLs are absolute.

## Structure

```
app/
  layout.tsx            fonts (next/font), metadata/OG, theme init script, skip link
  page.tsx              composes the sections in order
  globals.css           color tokens (CSS variables) for dark + light, base styles, .btn/.card
  icon.svg              favicon (the Crowbar mark)
  opengraph-image.tsx   generated 1200×630 OG card (twitter-image re-exports it)
components/
  Nav.tsx  Hero.tsx  HeroMock.tsx  Problem.tsx  HowItWorks.tsx
  Demo.tsx  Features.tsx  FAQ.tsx  FinalCTA.tsx  EarlyAccessForm.tsx  Footer.tsx
  ui/                   shared primitives: Logo, CitationChip, SectionHeader, SourceIcon,
                        Reveal, ThemeToggle, MotionProvider
lib/
  content.ts            all marketing copy (hero, problem, steps, features, FAQ, final CTA)
  demo-data.ts          sources, citation locations and Q&A used by the hero mock + demo
  site.ts               name, URL, title/description, nav links, CTA
  theme.ts              theme storage key + pre-paint init script
  validate-email.ts     client-side email check
tailwind.config.ts      design tokens: semantic colors, fonts, fluid type, spacing, radii, shadows
```

## Where to swap in real content

- **Copy:** `lib/content.ts`. Every section reads from here.
- **Title, description, domain, nav:** `lib/site.ts`.
- **Demo scenario:** `lib/demo-data.ts`. Add sources, `locators` (timestamp/page/paragraph plus the quoted excerpt), and questions made of `segments` that reference a locator via `cite`. `PAGE_SOURCE_ID` is the page the visitor is "on" (cited as "This page"). Each question has a `mode`: `instant` questions answer from that page alone; `deep` questions stay locked until the visitor clicks **Add sources**. The hero mock shows `questions[0]`.
- **Early-access backend:** `components/EarlyAccessForm.tsx`. Search for `TODO(backend)`. Right now nothing is stored or sent.
- **Brand colors:** the CSS variables at the top of `app/globals.css` (light on `:root`, dark on `.dark`).
- **Fonts:** `app/layout.tsx` (`Bricolage_Grotesque`, `Inter`, `JetBrains_Mono`).
- **Logo:** `components/ui/Logo.tsx`, `app/icon.svg` and `app/opengraph-image.tsx` (same paths in each).

## Notes

- The theme is dark by default. The toggle stores `crowbar-theme` in `localStorage`, and an inline script applies it before first paint, so the page doesn't flash the wrong theme.
- Motion: `MotionConfig reducedMotion="user"` plus a CSS reduced-motion override. The demo answer appears instantly when reduced motion is set. `Reveal` keeps server-rendered content visible and only animates elements that start below the fold.
- Accessibility: semantic landmarks, a skip link, visible focus rings, and a WAI-ARIA accordion (Up/Down/Home/End). In the demo, keyboard focus on a citation does the same as hover, and the answer is a polite live region.
- The page has no testimonials, user counts, stats or logos on purpose. Add them only when they're real.
