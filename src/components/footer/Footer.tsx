"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { clinic } from "@/data/clinic";
import { enquiryMessage, whatsappUrl } from "@/lib/booking";
import { Logo } from "@/components/ui/Logo";
import { Sprig } from "@/components/botanical/Botanical";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";
import { Reveal } from "@/components/animations/Reveal";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="relative overflow-hidden bg-forest pb-24 pt-24 text-[color:var(--on-forest)] md:pb-12 md:pt-32" style={{ background: "var(--doc-bg-footer, #0f2a1e)" }}>
      <div className="pointer-events-none absolute -right-10 bottom-0 h-[28rem] w-60 opacity-[0.09]"><Sprig kind="tulsi" filled={false} className="sway h-full w-full [&_*]:!text-[#f3f0e8]" /></div>
      <div className="pointer-events-none absolute -left-8 bottom-0 h-80 w-44 opacity-[0.07]"><Sprig kind="neem" flip filled={false} className="sway h-full w-full [&_*]:!text-[#f3f0e8]" /></div>

      <Reveal className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <p className="font-serif text-[clamp(3.4rem,13vw,13rem)] leading-[0.9] tracking-[0.04em] text-[#f3f0e8]/95">SRI AROGYA</p>
        <p className="mt-2 flex items-center gap-4"><span className="h-px w-16 bg-[var(--gold)]" /><span className="text-xs font-semibold tracking-[0.55em]">CENTRE</span></p>
        <p className="eyebrow mt-6 !text-[#d6bd88]">Siddha | Ayurveda | Panchakarma</p>

        <div className="mt-20 grid gap-12 border-t border-white/15 pt-12 md:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <p className="eyebrow mb-5 !text-[#d6bd88]">Navigate</p>
            <ul className="space-y-3">
              {navItems.map((n) => (
                <li key={n.href}><a href={n.href} onClick={(e) => { e.preventDefault(); scrollTo(n.href, { offset: n.href === "#home" ? 0 : -60 }); }} className="u-link text-[0.97rem]">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-5 !text-[#d6bd88]">Contact</p>
            <ul className="space-y-3 text-[0.97rem]">
              <li><a href={`tel:${clinic.phone.tel}`} className="u-link inline-flex items-center gap-2"><Phone size={15} /> {clinic.phone.display}</a></li>
              <li><a href={`tel:${clinic.landline.tel}`} className="u-link inline-flex items-center gap-2"><Phone size={15} /> {clinic.landline.display}</a></li>
              <li><a href={whatsappUrl(enquiryMessage)} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-center gap-2"><MessageCircle size={15} /> WhatsApp</a></li>
              <li><a href={clinic.maps.searchUrl} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-center gap-2"><MapPin size={15} /> Google Maps</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5 !text-[#d6bd88]">Address</p>
            <address className="text-[0.97rem] not-italic leading-[1.8] text-[#d5ddd0]">
              {clinic.address.lines.slice(0, 4).map((l) => (<span key={l} className="block">{l}</span>))}
            </address>
          </div>
          <div>
            <p className="eyebrow mb-5 !text-[#d6bd88]">Opening hours</p>
            <ul className="space-y-3 text-[0.97rem] text-[#d5ddd0]">
              {clinic.hours.sessions.map((s) => (<li key={s.id}><span className="block text-[#f3f0e8]">{s.label}</span>{s.display}</li>))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 text-[0.8rem] text-[#b9c4b3] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <Link href="/privacy" className="u-link">Privacy policy</Link>
        </div>
      </Reveal>
      <span className="sr-only"><Logo /></span>
    </footer>
  );
}
