/** Site-wide config. Swap `url` for the production domain before launch. */
export const site = {
  name: "Crowbar",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "Crowbar: cited answers about whatever you're reading",
  description:
    "Crowbar is a browser side panel for students that answers questions about the page you're on, whether it's an article, video or PDF, with every claim cited to the exact passage or timestamp. Add more sources for deep, multi-source research.",
  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Demo", href: "/demo" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaHref: "#early-access",
  ctaLabel: "Get early access",
} as const;
