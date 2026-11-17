"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export const THEME_KEY = "sac-theme";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** The no-flash inline script in <head> has already set data-theme before paint. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

export function applyTheme(next: Theme, persist = true) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 700);
  }
  root.dataset.theme = next;
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable – preference simply won't persist */
    }
  }
  listeners.forEach((l) => l());
}

export function toggleTheme() {
  applyTheme(readTheme() === "dark" ? "light" : "dark");
}

/** Follow OS changes only while the visitor hasn't chosen explicitly. */
export function watchSystemTheme() {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = (e: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_KEY)) return;
    } catch {
      /* ignore */
    }
    applyTheme(e.matches ? "dark" : "light", false);
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Inline, blocking script: runs before first paint so the theme never flashes. */
export const themeInitScript = `(function(){try{var k='${THEME_KEY}',s=localStorage.getItem(k),d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(s==='dark'||s==='light')?s:(d?'dark':'light');}catch(e){document.documentElement.dataset.theme='light';}})();`;
