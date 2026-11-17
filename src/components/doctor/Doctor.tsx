"use client";

import Image from "next/image";
import { MaskLines, Reveal, ClipReveal } from "@/components/animations/Reveal";
import { Sprig } from "@/components/botanical/Botanical";
import { LogoMark } from "@/components/ui/Logo";
import { clinic } from "@/data/clinic";
import { useBooking } from "@/components/appointment/BookingProvider";

export function Doctor() {
  const booking = useBooking();
  const d = clinic.doctor;
  return (
    <section
      id="doctor"
      className="relative overflow-hidden py-28 md:py-44"
      style={{ background: "var(--doc-bg)", color: "var(--doc-ink)" }}
    >
      <div className="pointer-events-none absolute -right-16 top-10 h-[40rem] w-64 opacity-[0.12]" style={{ "--sprig": "var(--doc-ink)" } as React.CSSProperties}>
        <Sprig kind="tulsi" className="h-full w-full" />
      </div>
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ClipReveal from="left">
            <div className="relative aspect-[4/5] overflow-hidden" style={{ boxShadow: "0 0 0 1px color-mix(in srgb, var(--doc-accent) 50%, transparent)", outlineOffset: "-14px" }}>
              {d.portrait ? (
                <Image src={d.portrait} alt={`Portrait of ${clinic.doctor.name} ${d.credentials}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                /* Clearly replaceable placeholder – NOT a photograph of the doctor */
                <div className="absolute inset-0 grid place-items-center" style={{ background: "color-mix(in srgb, var(--doc-ink) 8%, var(--doc-bg))" }}>
                  <div className="flex flex-col items-center px-8 text-center">
                    <LogoMark className="h-24 w-24 opacity-90" />
                    <p className="mt-8 font-serif text-3xl">{clinic.doctor.name}</p>
                    <p className="eyebrow mt-3 !text-[var(--doc-accent)]">Portrait to be added</p>
                  </div>
                </div>
              )}
            </div>
          </ClipReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><p className="eyebrow mb-6 !text-[var(--doc-accent)]"><span className="numeral mr-3 text-base tracking-normal">04</span>Meet the Doctor</p></Reveal>
          <MaskLines
            className="display text-[clamp(2.6rem,5.6vw,5rem)]"
            lines={["Guided by Experience.", <span key="r" className="italic" style={{ color: "var(--doc-accent)" }}>Rooted in Tradition.</span>]}
          />
          <Reveal delay={0.2} className="mt-12 border-t pt-8" style={{ borderColor: "color-mix(in srgb, var(--doc-ink) 22%, transparent)" }}>
            <p className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-none">
              {clinic.doctor.name} <span className="text-[0.6em]" style={{ color: "var(--doc-accent)" }}>{d.credentials}</span>
            </p>
            <p className="eyebrow mt-4 !text-[var(--doc-accent)]">Siddha · Ayurveda · Panchakarma</p>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.85]" style={{ color: "var(--doc-ink-2)" }}>
              Dr. S. Rajesh leads consultations at Sri Arogya Centre, offering Siddha, Ayurveda and Panchakarma care
              in Adambakkam, Chennai. Every consultation begins by listening.
            </p>
            <button type="button" onClick={() => booking.open()} className="btn btn-light mt-10" style={{ background: "var(--doc-ink)", color: "var(--doc-bg)", borderColor: "var(--doc-ink)" }}>
              Book a consultation
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
