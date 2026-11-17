"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMQ(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    subscribeMQ(query),
    () => window.matchMedia(query).matches,
    () => server,
  );
}

export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useIsDesktop = () => useMedia("(min-width: 1024px)");
export const useIsMobile = () => useMedia("(max-width: 767px)", true);

/** Detects devices where a full WebGL scene would hurt more than help. */
export function useWebGLCapability() {
  const [state, setState] = useState<"checking" | "full" | "lite" | "none">("checking");

  useEffect(() => {
    let level: "full" | "lite" | "none" = "full";
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) level = "none";
    } catch {
      level = "none";
    }
    if (level !== "none") {
      const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
      const lowMem = (nav.deviceMemory ?? 8) <= 2;
      const saveData = !!nav.connection?.saveData;
      if (lowMem || saveData) level = "none";
      else if (window.innerWidth < 768 || (nav.hardwareConcurrency ?? 8) <= 4) level = "lite"; // fewer leaves, lower DPR
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(level);
  }, []);

  return state;
}
