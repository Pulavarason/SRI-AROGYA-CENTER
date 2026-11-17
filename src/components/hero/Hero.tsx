"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { MaskLines } from "@/components/animations/Reveal";
import { Sprig } from "@/components/botanical/Botanical";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";
import { useBooking } from "@/components/appointment/BookingProvider";
import { usePrefersReducedMotion, useWebGLCapability } from "@/hooks/useMotionPrefs";
import { useTheme } from "@/lib/theme";
import { EASE } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Three/Drei generates SVG line coordinates from floating point calculations;
// rendering it on both server and client can produce different attributes.
const LeafScene = dynamic(() => import("./LeafScene"), { ssr: false });

/** Premium static fallback: layered illustrated sprigs with gentle sway. */
function StaticBotanical() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="sway absolute bottom-[-6%] right-[4%] h-[92%] w-[52%] opacity-90">
        <Sprig kind="tulsi" className="h-full w-full" />
      </div>
      <div className="sway absolute bottom-[-10%] right-[34%] h-[70%] w-[36%] opacity-60" style={{ animationDelay: "-4s" }}>
        <Sprig kind="neem" flip className="h-full w-full" />
      </div>
      <div className="sway absolute bottom-[-8%] right-[-6%] h-[60%] w-[30%] opacity-50" style={{ animationDelay: "-7s" }}>
        <Sprig kind="amla" className="h-full w-full" />
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const sceneWrap = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const reduced = usePrefersReducedMotion();
  const cap = useWebGLCapability();
  const { scrollTo } = useSmoothScroll();
  const booking = useBooking();

  const use3D = !reduced && (cap === "full" || cap === "lite");

  // Scroll-linked camera progress, copy drift and background parallax
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      if (!reduced) {
        gsap.to(copy.current, {
          yPercent: -14,
          opacity: 0.0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom 30%", scrub: true },
        });
        gsap.to(bg.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(sceneWrap.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  // Pause rendering when the hero is off-screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="home" className="relative min-h-[100svh] overflow-hidden" aria-label="Welcome">
      {/* Atmosphere */}
      <motion.div
        ref={bg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 72% 38%, color-mix(in srgb, var(--sage) 38%, transparent), transparent 70%), radial-gradient(45% 45% at 8% 92%, color-mix(in srgb, var(--gold) 20%, transparent), transparent 70%), linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)",
        }}
      >
        <div className="grain" />
        {!reduced && (
          <>
            <div className="ray" style={{ left: "52%", transform: "rotate(14deg)", animationDelay: "0s" }} />
            <div className="ray" style={{ left: "64%", transform: "rotate(20deg)", animationDelay: "-3s", width: "9vw" }} />
            <div className="ray" style={{ left: "76%", transform: "rotate(26deg)", animationDelay: "-6s", width: "7vw" }} />
          </>
        )}
      </motion.div>

      {/* Botanical composition */}
      <motion.div
        ref={sceneWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.5 }}
        className="absolute max-md:-right-[18%] max-md:bottom-[44%] max-md:left-[34%] max-md:top-[4%] md:inset-y-0 md:left-[38%] md:right-0"
      >
        <div className="absolute inset-0 max-md:opacity-80 max-md:[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_72%,transparent)]">
          {use3D ? (
            <LeafScene theme={theme} lite={cap === "lite"} progress={progress} active={visible} />
          ) : (
            <StaticBotanical />
          )}
        </div>
      </motion.div>

      {/* Copy */}
      <div
        ref={copy}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-center px-5 pb-20 pt-24 md:px-10 md:pb-16 md:pt-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="eyebrow mb-3 md:mb-4"
        >
          Siddha&nbsp;&nbsp;|&nbsp;&nbsp;Ayurveda&nbsp;&nbsp;|&nbsp;&nbsp;Panchakarma
        </motion.p>

        <MaskLines
          as="h1"
          immediate
          delay={1.0}
          className="display max-w-[11ch] text-[clamp(2.7rem,7.5vw,6.5rem)] leading-[0.96] text-ink md:max-w-[9.5ch]"
          lines={["Rediscover", "the Art of", <span key="n">Natural <em>Wellness.</em></span>]}
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.7 }}
          className="mt-4 max-w-[32rem] text-[0.92rem] leading-[1.55] text-ink2 md:mt-5 md:text-[0.98rem]"
        >
          Rooted in traditional Siddha and Ayurvedic practices, Sri Arogya Centre welcomes you to a thoughtful
          journey towards holistic wellness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.95 }}
          className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-6"
        >
          <button type="button" className="btn btn-solid" onClick={() => scrollTo("#approach", { offset: -60 })}>
            Discover Our Approach
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => booking.open()}>
            Book a Consultation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.4 }}
          className="absolute bottom-20 left-5 flex items-center gap-3 md:bottom-7 md:left-10"
        >
          <span className="h-px w-10" style={{ background: "var(--gold)" }} />
          <span className="eyebrow !tracking-[0.34em]">Adambakkam · Chennai</span>
          <ArrowDownRight size={16} className="text-goldink" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
