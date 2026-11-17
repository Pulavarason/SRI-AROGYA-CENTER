"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Sprig } from "@/components/botanical/Botanical";
import { services, type Service } from "@/data/services";
import { useBooking } from "@/components/appointment/BookingProvider";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";
import type { MediaKey } from "@/data/media";

const layouts: Record<string, { wrap: string; img: string; tone: "forest" | "ivory" | "gold"; kind: "tulsi" | "neem" | "amla"; flip?: boolean }> = {
  siddha: { wrap: "lg:col-span-7", img: "aspect-[5/4] lg:aspect-[16/11]", tone: "forest", kind: "neem" },
  ayurveda: { wrap: "lg:col-span-5 lg:mt-32", img: "aspect-[4/5]", tone: "gold", kind: "tulsi", flip: true },
  panchakarma: { wrap: "lg:col-span-8 lg:col-start-3", img: "aspect-[5/4] lg:aspect-[21/10]", tone: "ivory", kind: "amla" },
};

function Card({ s, i }: { s: Service; i: number }) {
  const L = layouts[s.id];
  const { scrollTo } = useSmoothScroll();
  const booking = useBooking();
  return (
    <Reveal delay={0.05} className={`group ${L.wrap}`}>
      <article>
        <div className={`relative overflow-hidden ${L.img}`}>
          <motion.div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
            <Photo slot={s.id as MediaKey} tone={L.tone} alt={`${s.title} – botanical illustration`} className="h-full w-full" />
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 right-4 w-24 opacity-60 transition-transform duration-1000 group-hover:-translate-y-3 md:right-8 md:w-32" style={{ "--sprig": L.tone === "ivory" ? "var(--forest)" : "#f3f0e8" } as React.CSSProperties}>
            <Sprig kind={L.kind} flip={L.flip} filled={false} className="h-full w-full" />
          </div>
          <span className="numeral absolute left-5 top-4 text-5xl text-white/90 [text-shadow:0_1px_14px_rgb(0_0_0/0.35)] md:left-8 md:text-6xl">{s.number}</span>
        </div>
        <div className="mt-7 flex items-start justify-between gap-6">
          <div className="max-w-md">
            <p className="eyebrow mb-3">{s.kicker}</p>
            <h3 className="display text-[clamp(2.4rem,4.5vw,3.8rem)] text-ink">{s.title}</h3>
            <p className="mt-4 text-[1rem] leading-[1.8] text-ink2">{s.summary}</p>
          </div>
          <button
            type="button"
            aria-label={`Learn more about ${s.title}`}
            onClick={() => scrollTo("#treatments", { offset: -40 })}
            className="mt-2 hidden shrink-0 items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink md:flex"
          >
            <span className="u-link">Learn more</span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-[#10231a]">
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>
        <button type="button" onClick={() => booking.open(s.id)} className="u-link mt-5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-goldink md:hidden">
          Enquire about {s.title}
        </button>
        <span className="sr-only">{i}</span>
      </article>
    </Reveal>
  );
}

export function Approach() {
  return (
    <section id="approach" className="relative bg-bg2 py-28 md:py-44">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal><p className="eyebrow mb-6"><span className="numeral mr-3 text-base tracking-normal">02</span>Our Approach</p></Reveal>
        <MaskLines
          className="display max-w-5xl text-[clamp(2.8rem,7vw,6.4rem)] text-ink"
          lines={["Rooted in Tradition.", <em key="f">Focused on Wellness.</em>]}
        />
        <div className="mt-20 grid gap-x-10 gap-y-24 lg:grid-cols-12">
          {services.map((s, i) => (
            <Card key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
