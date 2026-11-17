"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { EASE } from "@/lib/utils";

/** Renders nothing until real, permission-approved testimonials are added to data/testimonials.ts */
export function Testimonials() {
  const [i, setI] = useState(0);
  if (testimonials.length === 0) return null;
  const t = testimonials[i];
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

  return (
    <section id="feedback" className="bg-bg py-28 md:py-40" aria-label="Patient feedback">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-10">
        <p className="eyebrow mb-6">Patient Feedback</p>
        <h2 className="display text-[clamp(2.6rem,6vw,5rem)] text-ink">Experiences That <em>Matter.</em></h2>
        <div className="relative mt-16 min-h-[14rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1); }}
            >
              <blockquote className="font-serif text-[clamp(1.7rem,3.6vw,2.9rem)] italic leading-[1.3] text-ink">“{t.quote}”</blockquote>
              <figcaption className="eyebrow mt-8">{t.initials}{t.context ? ` · ${t.context}` : ""}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {testimonials.length > 1 && (
          <div className="mt-12 flex justify-center gap-4">
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink hover:border-gold"><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink hover:border-gold"><ArrowRight size={18} /></button>
          </div>
        )}
      </div>
    </section>
  );
}
