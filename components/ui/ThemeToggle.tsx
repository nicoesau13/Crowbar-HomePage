"use client";

import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Flips the `dark` class on <html> and persists the choice.
 * Icons swap via CSS (dark: variants), so server and client markup match.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-ink"
    >
      <span className="sr-only">
        <span className="dark:hidden">Switch to dark theme</span>
        <span className="hidden dark:inline">Switch to light theme</span>
      </span>
      {/* Sun: shown in dark mode */}
      <svg
        viewBox="0 0 20 20"
        className="hidden h-5 w-5 dark:block"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6L16 16M4 16l1.4-1.4M14.6 5.4L16 4" />
      </svg>
      {/* Moon: shown in light mode */}
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5 dark:hidden"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9z" />
      </svg>
    </button>
  );
}
