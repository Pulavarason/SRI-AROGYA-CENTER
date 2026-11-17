"use client";

import { motion } from "framer-motion";
import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { clinic } from "@/data/clinic";

/** 8 AM → 8 PM mapped around the dial. */
const DIAL_START = 8 * 60;
const DIAL_SPAN = 12 * 60;
const R = 120;
const C = 2 * Math.PI * R;
// Keep SVG attributes as fixed values. Trigonometric calculations can serialize
// with tiny server/client floating point differences and trigger hydration errors.
const DIAL_TICKS = [
  [150, 18, 150, 8], [216, 36, 221, 27], [264, 84, 273, 79],
  [282, 150, 292, 150], [264, 216, 273, 221], [216, 264, 221, 273],
  [150, 282, 150, 292], [84, 264, 79, 273], [36, 216, 27, 221],
  [18, 150, 8, 150], [36, 84, 27, 79], [84, 36, 79, 27],
] as const;

function arc(startHHMM: string, endHHMM: string) {
  const m = (s: string) => Number(s.split(":")[0]) * 60 + Number(s.split(":")[1]);
  const a = (m(startHHMM) - DIAL_START) / DIAL_SPAN;
  const b = (m(endHHMM) - DIAL_START) / DIAL_SPAN;
  return { offset: a * C, len: (b - a) * C };
}

export function Timings() {
  const { sessions, weekly } = clinic.hours;
  return (
    <section id="timings" className="relative bg-bg2 py-28 md:py-40" aria-labelledby="timings-title">
      <div className="mx-auto grid max-w-[1500px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow mb-6"><span className="numeral mr-3 text-base tracking-normal">08</span>Clinic Timings</p></Reveal>
          <MaskLines className="display text-[clamp(2.8rem,6.5vw,5.8rem)] text-ink" lines={["We Welcome", <em key="y">You.</em>]} />
          <div className="mt-12 grid gap-px border border-line bg-[var(--line)] sm:grid-cols-2">
            {sessions.map((s, i) => (
              <Reveal key={s.id} delay={0.1 * i} className="bg-bg p-6 md:p-9">
                <p className="eyebrow">{s.label}</p>
                <p className="numeral mt-5 whitespace-nowrap text-[clamp(1.35rem,2.5vw,2.1rem)] leading-tight text-ink">{s.display}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-[0.97rem] leading-relaxed text-ink2">
            {weekly ? (
              <table className="w-full max-w-md">
                <caption className="sr-only">Weekly clinic hours</caption>
                <tbody>
                  {weekly.map((w) => (
                    <tr key={w.day} className="border-b border-line">
                      <th scope="row" className="py-2 text-left font-medium text-ink">{w.day}</th>
                      <td className="py-2 text-right">
                        {w.sessions.length ? w.sessions.map((id) => sessions.find((s) => s.id === id)?.display).join("  ·  ") : "Closed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Please call to confirm availability on your preferred day.</p>
            )}
          </div>
        </div>

        <div className="flex justify-center lg:col-span-5 lg:col-start-8">
          <svg viewBox="0 0 300 300" className="w-full max-w-[26rem]" role="img" aria-label="Dial showing morning and evening sessions">
            <circle cx="150" cy="150" r="142" fill="none" stroke="var(--line)" />
            <circle cx="150" cy="150" r={R} fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="1 7" />
            {DIAL_TICKS.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold)" />
            ))}
            {sessions.map((s, i) => {
              const { offset, len } = arc(s.start, s.end);
              return (
                <motion.circle
                  key={s.id}
                  cx="150" cy="150" r={R} fill="none" stroke={i ? "var(--gold)" : "var(--sage)"} strokeWidth="10" strokeLinecap="round"
                  transform="rotate(-90 150 150)"
                  strokeDasharray={`${len} ${C}`}
                  initial={{ strokeDashoffset: -offset + len }}
                  whileInView={{ strokeDashoffset: -offset }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.4 }}
                />
              );
            })}
            <g className="sway" style={{ transformOrigin: "150px 150px" }}>
              <line x1="150" y1="150" x2="150" y2="62" stroke="var(--ink)" strokeWidth="1.2" />
            </g>
            <circle cx="150" cy="150" r="4" fill="var(--gold)" />
            <text x="150" y="196" textAnchor="middle" fill="var(--ink-2)" fontSize="9" letterSpacing="3">8 AM — 8 PM</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
