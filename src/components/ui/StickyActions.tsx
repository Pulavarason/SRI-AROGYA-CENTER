"use client";

import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";
import { enquiryMessage, whatsappUrl } from "@/lib/booking";
import { useBooking } from "@/components/appointment/BookingProvider";

/** Always-reachable call / WhatsApp / book bar, mobile only. */
export function StickyActions() {
  const booking = useBooking();
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.16em]";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid border-t border-line md:hidden"
      style={{
        background: "var(--header-solid)",
        backdropFilter: "blur(14px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex divide-x divide-[var(--line)] text-ink">
        <a href={`tel:${clinic.phone.tel}`} className={item}>
          <Phone size={18} aria-hidden /> Call
        </a>
        <a
          href={whatsappUrl(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={item}
        >
          <MessageCircle size={18} aria-hidden /> WhatsApp
        </a>
        <button type="button" onClick={() => booking.open()} className={`${item} text-goldink`}>
          <CalendarCheck size={18} aria-hidden /> Book
        </button>
      </div>
    </div>
  );
}
