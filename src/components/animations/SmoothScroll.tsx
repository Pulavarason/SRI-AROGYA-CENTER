"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollApi {
  scrollTo: (target: string | number, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const Ctx = createContext<ScrollApi | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return ctx;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // native scrolling for visitors who ask for less motion

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts?.offset ?? 0, immediate: opts?.immediate, duration: 1.4 });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);
  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  return <Ctx.Provider value={{ scrollTo, stop, start }}>{children}</Ctx.Provider>;
}
