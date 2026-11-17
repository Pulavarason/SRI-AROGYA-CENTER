"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Sprig } from "@/components/botanical/Botanical";
import { useBooking } from "@/components/appointment/BookingProvider";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const sprig = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const booking = useBooking();
  const { scrollTo } = useSmoothScroll();
  return (
    <section ref={ref} className="relative isolate overflow-hidden py-36 text-center text-[#f3f0e8] md:py-56" aria-labelledby="cta-title">
      <motion.div style={{ y }} className="absolute -inset-y-[18%] inset-x-0 -z-10"><Photo slot="finalCta" alt="Botanical backdrop" className="h-full w-full" sizes="100vw" /></motion.div>
      <div className="absolute inset-0 -z-10 bg-[#0c2418]/55" />
      <motion.div style={{ y: sprig }} className="pointer-events-none absolute left-[4%] top-10 -z-0 hidden h-80 w-40 opacity-30 md:block"><Sprig kind="neem" filled={false} className="h-full w-full [&_*]:!text-[#f3f0e8]" /></motion.div>
      <div className="mx-auto max-w-5xl px-5">
        <MaskLines className="display text-[clamp(2.8rem,8vw,7.4rem)]" lines={["Your Journey Towards", <span key="w" className="italic text-[#d6bd88]">Wellness Begins Here.</span>]} />
        <Reveal delay={0.2}><p className="mx-auto mt-8 max-w-xl text-[1.08rem] leading-[1.8] text-[#d5ddd0]">Connect with Sri Arogya Centre to learn more about our Siddha and Ayurvedic approach.</p></Reveal>
        <Reveal delay={0.3} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => booking.open()} className="btn btn-light">Book a Consultation</button>
          <button type="button" onClick={() => scrollTo("#contact", { offset: -60 })} className="btn btn-outline-light">Contact Our Centre</button>
        </Reveal>
      </div>
    </section>
  );
}
