/** Site-wide config. Swap `url` for the production domain before launch. */
export const site = {
  name: "Crowbar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Crowbar: cited answers across all your sources",
  description:
    "Crowbar is a browser side panel for students. Add videos, articles and PDFs, ask one question, and get an answer where every claim links to the exact timestamp or passage.",
  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaHref: "#early-access",
  ctaLabel: "Get early access",
} as const;
