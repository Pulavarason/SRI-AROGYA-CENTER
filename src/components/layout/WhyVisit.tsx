"use client";

import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { IconAttention, IconAyurveda, IconConsult, IconGuidance, IconPanchakarma, IconSiddha } from "@/components/ui/LineIcons";

/** Items mirror the clinic brief only; CONFIRM wording with the clinic. */
const items = [
  { Icon: IconSiddha, t: "Siddha-based care", d: "A South Indian healing tradition at the heart of our practice." },
  { Icon: IconAyurveda, t: "Ayurveda", d: "Classical Ayurvedic principles, thoughtfully applied." },
  { Icon: IconPanchakarma, t: "Panchakarma", d: "Traditional cleansing therapies, discussed with the doctor." },
  { Icon: IconConsult, t: "Doctor consultation", d: "Every visit begins with time to talk with Dr. S. Rajesh MD(s)." },
  { Icon: IconAttention, t: "Individual attention", d: "Care that is personal rather than hurried." },
  { Icon: IconGuidance, t: "Wellness guidance", d: "Practical, grounded advice for everyday wellbeing." },
];

export function WhyVisit() {
  return (
    <section id="why" className="relative bg-bg2 py-28 md:py-40" aria-labelledby="why-title">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><p className="eyebrow mb-6"><span className="numeral mr-3 text-base tracking-normal">06</span>Why Visit</p></Reveal>
            <MaskLines className="display text-[clamp(2.6rem,5.5vw,5rem)] text-ink" lines={["Why visit", <em key="s">Sri Arogya Centre.</em>]} />
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7">
            {items.map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={(i % 2) * 0.1} className="group border-t border-line py-9">
                <li className="list-none">
                  <Icon className="why-icon h-14 w-14 text-goldink transition-transform duration-700 group-hover:-translate-y-1" />
                  <h3 className="mt-6 font-serif text-[1.9rem] leading-tight text-ink">{t}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-ink2">{d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
