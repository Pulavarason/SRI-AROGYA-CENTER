"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipReveal, MaskLines, Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Sprig } from "@/components/botanical/Botanical";

const pillars = [
  { n: "i", t: "Traditional healing", d: "Siddha and Ayurvedic practice, carried forward with respect for its roots." },
  { n: "ii", t: "Thoughtful consultation", d: "Time to be heard, and guidance from Dr. S. Rajesh MD(s)." },
  { n: "iii", t: "Holistic wellness", d: "Care that looks at the whole person rather than a single complaint." },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sprigY = useTransform(scrollYProgress, [0, 1], [60, -90]);
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-bg py-28 md:py-44">
      <motion.div style={{ y: sprigY }} className="pointer-events-none absolute -left-10 top-20 hidden h-[34rem] w-60 opacity-[0.16] lg:block">
        <Sprig kind="neem" className="h-full w-full" />
      </motion.div>

      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <ClipReveal className="relative aspect-[4/5] w-full lg:w-[88%]">
            <motion.div style={{ y: imgY }} className="absolute inset-x-0 -inset-y-8">
              <Photo slot="about" alt="Botanical illustration of tulsi and neem sprigs" className="h-full w-full" />
            </motion.div>
          </ClipReveal>
          <Reveal delay={0.3} className="absolute -bottom-8 right-0 hidden w-60 border border-line bg-bg2 p-6 md:block lg:right-[4%]">
            <p className="eyebrow mb-3">Adambakkam · Chennai</p>
            <p className="font-serif text-2xl leading-tight text-ink">Siddha, Ayurveda and Panchakarma under one roof.</p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
          <Reveal><p className="eyebrow mb-6"><span className="numeral mr-3 text-base tracking-normal">01</span>About Sri Arogya Centre</p></Reveal>
          <MaskLines
            className="display text-[clamp(2.6rem,6vw,5.2rem)] text-ink"
            lines={["Tradition Meets", <em key="t">Thoughtful Care.</em>]}
          />
          <Reveal delay={0.15} className="mt-8 space-y-5 text-[1.05rem] leading-[1.85] text-ink2">
            <p>
              Sri Arogya Centre is a Siddha, Ayurveda and Panchakarma centre in Adambakkam, Chennai, led by
              Dr. S. Rajesh MD(s).
            </p>
            <p>
              We draw on long-established traditions of healing and pair them with an unhurried, attentive
              approach, so that every visit begins with a conversation.
            </p>
          </Reveal>

          <ul className="mt-12 divide-y divide-[var(--line)] border-y border-line">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={0.1 * i}>
                <li className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="numeral pt-1 text-2xl italic text-goldink">{p.n}.</span>
                  <div>
                    <h3 className="font-serif text-2xl text-ink">{p.t}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink2">{p.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
