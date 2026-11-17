"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Photo } from "@/components/ui/Photo";
import { Sprig } from "@/components/botanical/Botanical";
import { services } from "@/data/services";
import { useBooking } from "@/components/appointment/BookingProvider";
import type { MediaKey } from "@/data/media";

gsap.registerPlugin(ScrollTrigger);

const slideStyle = {
  siddha: { tone: "forest" as const, slot: "story1" as MediaKey, kind: "neem" as const },
  ayurveda: { tone: "gold" as const, slot: "story2" as MediaKey, kind: "tulsi" as const },
  panchakarma: { tone: "forest" as const, slot: "story3" as MediaKey, kind: "amla" as const },
};

/**
 * Desktop: pinned horizontal "magazine" driven by ScrollTrigger.
 * Mobile / reduced-motion: plain vertical stack (no pinning), fully accessible.
 */
export function Treatments() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const booking = useBooking();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      gsap.utils.toArray<HTMLElement>(".story-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      return () => {
        gsap.set(t, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="treatments" className="relative overflow-hidden bg-forest text-[color:var(--on-forest)]" aria-labelledby="treatments-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden items-center justify-between px-10 pt-8 lg:flex">
        <p className="eyebrow !text-[var(--doc-accent)]"><span className="numeral mr-3 text-base tracking-normal">03</span>Treatments</p>
        <div className="h-px w-56 bg-white/20"><div ref={bar} className="h-full origin-left bg-[var(--gold)]" style={{ transform: "scaleX(0)" }} /></div>
      </div>

      <div ref={track} className="flex flex-col lg:h-[100svh] lg:w-max lg:flex-row">
        {/* intro panel */}
        <div className="flex flex-col justify-center px-5 py-24 lg:h-full lg:w-[70vw] lg:px-20 lg:py-0">
          <h2 id="treatments-title" className="display text-[clamp(3rem,8vw,8.5rem)]">
            Care, told
            <br />
            <em className="!text-[var(--doc-accent)]">in three chapters.</em>
          </h2>
          <p className="mt-8 max-w-md text-[1.02rem] leading-[1.85] text-[color:var(--on-forest-2)]">
            Scroll to move through the traditions practised at Sri Arogya Centre. Specific therapies and their suitability
            are discussed during your consultation.
          </p>
        </div>

        {services.map((s) => {
          const st = slideStyle[s.id];
          return (
            <article key={s.id} className="relative grid items-center border-t border-white/10 px-5 py-16 lg:h-full lg:w-[100vw] lg:grid-cols-12 lg:gap-10 lg:border-l lg:border-t-0 lg:px-20 lg:py-0">
              <div className="relative lg:col-span-6">
                <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[68vh]">
                  <div className="story-parallax absolute -inset-x-[10%] inset-y-0">
                    <Photo slot={st.slot} tone={st.tone} alt={`${s.title} – botanical illustration`} className="h-full w-full" />
                  </div>
                </div>
                <div className="absolute -right-3 bottom-6 h-44 w-24 text-[#f3f0e8] opacity-80 lg:-right-10 lg:h-72 lg:w-36" style={{ "--sprig": "#f3f0e8" } as React.CSSProperties}>
                  <Sprig kind={st.kind} filled={false} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-10 lg:col-span-6 lg:mt-0 lg:pl-8">
                <p className="numeral text-[clamp(5rem,12vw,11rem)] leading-[0.8] text-white/10">{s.number}</p>
                <p className="eyebrow mt-4 !text-[var(--doc-accent)]">{s.kicker}</p>
                <h3 className="display mt-3 text-[clamp(3rem,6vw,6rem)]">{s.title}</h3>
                <p className="mt-6 max-w-lg text-[1.02rem] leading-[1.85] text-[color:var(--on-forest-2)]">{s.detail}</p>
                <button type="button" onClick={() => booking.open(s.id)} className="btn btn-outline-light mt-9">
                  Enquire about {s.title}
                </button>
              </div>
            </article>
          );
        })}
        <div className="hidden lg:block lg:w-[10vw]" aria-hidden />
      </div>
    </section>
  );
}
