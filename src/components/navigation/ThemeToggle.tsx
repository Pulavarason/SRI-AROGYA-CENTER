"use client";

import { useEffect } from "react";
import { toggleTheme, useTheme, watchSystemTheme } from "@/lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();

  useEffect(() => watchSystemTheme(), []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "dark"}
      suppressHydrationWarning
      className={`group relative grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-gold ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" className="theme-icon" aria-hidden="true">
        <defs>
          <mask id="moon-cut">
            <rect width="24" height="24" fill="white" />
            <circle className="moon-mask" cx="19" cy="7" r="6" fill="black" />
          </mask>
        </defs>
        <g className="sun-rays" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        </g>
        <circle className="sun-core" cx="12" cy="12" r="4.4" fill="currentColor" mask="url(#moon-cut)" />
      </svg>
    </button>
  );
}
