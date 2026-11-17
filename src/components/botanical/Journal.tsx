"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { Sprig } from "@/components/botanical/Botanical";

/** CONFIRM: have the clinic approve these short, deliberately general descriptions. */
const plants = [
  { kind: "tulsi" as const, name: "Tulsi", latin: "Ocimum tenuiflorum", note: "Holy basil: a plant long held sacred in Indian homes and a familiar presence in traditional herbal practice." },
  { kind: "neem" as const, name: "Neem", latin: "Azadirachta indica", note: "A tree woven into everyday life across India, with leaves that feature widely in traditional herbal use." },
  { kind: "amla" as const, name: "Amla", latin: "Phyllanthus emblica", note: "The Indian gooseberry: a tart fruit with a prominent place in Ayurvedic tradition." },
];

export function Journal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 100]);
  return (
    <section ref={ref} id="journal" className="relative overflow-hidden bg-bg py-28 md:py-44" aria-labelledby="journal-title">
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute right-[6%] top-24 hidden h-96 w-44 opacity-[0.14] md:block"><Sprig kind="tulsi" className="h-full w-full" /></motion.div>
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute bottom-10 left-[3%] hidden h-80 w-40 opacity-[0.12] md:block"><Sprig kind="amla" flip className="h-full w-full" /></motion.div>

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal><p className="eyebrow mb-6"><span className="numeral mr-3 text-base tracking-normal">05</span>The Botanical Journal</p></Reveal>
        <MaskLines className="display max-w-4xl text-[clamp(2.8rem,7vw,6.2rem)] text-ink" lines={["Nature Holds", <em key="s">Stories of Wellness.</em>]} />

        <div className="mt-24 space-y-24 md:space-y-36">
          {plants.map((p, i) => (
            <Reveal key={p.name} className={`grid items-center gap-8 md:grid-cols-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className={`relative md:col-span-5 ${i % 2 ? "md:col-start-8" : ""}`}>
                <div className="relative mx-auto aspect-[3/4] w-full max-w-sm border border-line bg-bg2 p-8">
                  <Sprig kind={p.kind} flip={i % 2 === 1} className="h-full w-full" />
                  <span className="numeral absolute left-4 top-3 text-xl italic text-goldink">Plate {["I", "II", "III"][i]}</span>
                </div>
              </div>
              <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1" : "md:col-start-7"}`}>
                <p className="eyebrow mb-3 !normal-case !tracking-[0.12em] italic">{p.latin}</p>
                <h3 className="display text-[clamp(3.2rem,8vw,7rem)] text-ink">{p.name}</h3>
                <p className="mt-6 max-w-md text-[1.05rem] leading-[1.85] text-ink2">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
