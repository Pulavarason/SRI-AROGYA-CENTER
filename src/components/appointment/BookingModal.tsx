"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, MessageCircle, Phone, X } from "lucide-react";
import { clinic } from "@/data/clinic";
import { serviceOptions } from "@/data/services";
import {
  bookingSchema,
  buildWhatsAppMessage,
  timeSlots,
  todayISO,
  whatsappUrl,
  type BookingData,
  type BookingInput,
} from "@/lib/booking";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";
import { EASE } from "@/lib/utils";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink2/60 focus:border-gold aria-[invalid=true]:border-[#b4472f]";
const label = "eyebrow !text-ink2 mb-1 block";

export function BookingModal({ open, service, onClose }: { open: boolean; service?: string; onClose: () => void }) {
  const [sent, setSent] = useState<null | { url: string; blocked: boolean }>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();
  const slots = useMemo(() => timeSlots(), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput, unknown, BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", mobile: "", date: "", time: "", service: service ?? "", message: "" },
  });

  // Preselect service whenever the modal opens from a card
  useEffect(() => {
    if (open) {
      reset({ name: "", mobile: "", date: "", time: "", service: service ?? "", message: "" });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSent(null);
    }
  }, [open, service, reset]);

  // Scroll lock, Escape, and a simple focus trap
  useEffect(() => {
    if (!open) return;
    stop();
    const prev = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => dialog.current?.querySelector<HTMLElement>("input,select,button")?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialog.current) return;
      const f = dialog.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      start();
      prev?.focus?.();
    };
  }, [open, onClose, stop, start]);

  const onSubmit = (data: BookingData) => {
    const url = whatsappUrl(buildWhatsAppMessage(data));
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setSent({ url, blocked: !w });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-end overflow-y-auto bg-[#07110c]/70 backdrop-blur-sm md:place-items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
          data-lenis-prevent
        >
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-title"
            initial={{ y: 60, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative max-h-[100svh] w-full overflow-y-auto bg-bg px-6 pb-10 pt-8 md:max-w-xl md:px-12 md:pb-12 md:pt-12"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-gold">
              <X size={18} />
            </button>

            {sent ? (
              <div role="status" aria-live="polite" className="py-4">
                <CheckCircle2 className="text-goldink" size={40} strokeWidth={1.2} />
                <h2 id="book-title" className="display mt-6 text-5xl text-ink">One more step.</h2>
                <p className="mt-5 leading-[1.8] text-ink2">
                  {sent.blocked
                    ? "Your browser blocked the WhatsApp window. Use the button below to open it."
                    : "WhatsApp should now be open with your request ready to send."}{" "}
                  <strong className="text-ink">Please press Send in WhatsApp.</strong> Your appointment is
                  <strong className="text-ink"> not confirmed </strong>until Sri Arogya Centre replies to confirm the slot.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={sent.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid"><MessageCircle size={16} /> Open WhatsApp</a>
                  <a href={`tel:${clinic.phone.tel}`} className="btn btn-ghost"><Phone size={16} /> Call clinic</a>
                </div>
                <button type="button" onClick={onClose} className="u-link mt-8 text-sm text-ink2">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <p className="eyebrow mb-4">Appointment request</p>
                <h2 id="book-title" className="display text-[clamp(2.4rem,6vw,3.6rem)] text-ink">Begin Your <em>Wellness Journey.</em></h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink2">
                  Send us your preferred slot on WhatsApp. The clinic will reply to confirm availability.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="b-name" className={label}>Full name</label>
                    <input id="b-name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} {...register("name")} />
                    {errors.name && <Err id="e-name">{errors.name.message}</Err>}
                  </div>
                  <div>
                    <label htmlFor="b-mobile" className={label}>Mobile number</label>
                    <input id="b-mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={field} aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? "e-mobile" : undefined} {...register("mobile")} />
                    {errors.mobile && <Err id="e-mobile">{errors.mobile.message}</Err>}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="b-date" className={label}>Preferred date</label>
                      <input id="b-date" type="date" min={todayISO()} max={todayISO(120)} className={field} aria-invalid={!!errors.date} aria-describedby={errors.date ? "e-date" : undefined} {...register("date")} />
                      {errors.date && <Err id="e-date">{errors.date.message}</Err>}
                    </div>
                    <div>
                      <label htmlFor="b-time" className={label}>Preferred time</label>
                      <select id="b-time" className={`${field} bg-bg`} aria-invalid={!!errors.time} aria-describedby={errors.time ? "e-time" : undefined} {...register("time")}>
                        <option value="">Select a time</option>
                        {clinic.hours.sessions.map((s) => (
                          <optgroup key={s.id} label={`${s.label} · ${s.display}`}>
                            {slots.filter((x) => x.group === s.label).map((x) => (
                              <option key={x.value} value={x.value}>{x.label}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.time && <Err id="e-time">{errors.time.message}</Err>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="b-service" className={label}>Service interest</label>
                    <select id="b-service" className={`${field} bg-bg`} aria-invalid={!!errors.service} aria-describedby={errors.service ? "e-service" : undefined} {...register("service")}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.service && <Err id="e-service">{errors.service.message}</Err>}
                  </div>
                  <div>
                    <label htmlFor="b-msg" className={label}>Message <span className="normal-case tracking-normal opacity-70">(optional)</span></label>
                    <textarea id="b-msg" rows={2} maxLength={300} placeholder="Please don't share detailed medical information here." className={`${field} resize-none`} aria-invalid={!!errors.message} {...register("message")} />
                    {errors.message && <Err id="e-msg">{errors.message.message}</Err>}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-solid mt-10 w-full">
                  <MessageCircle size={16} /> Send request on WhatsApp
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-ink2">
                  This opens WhatsApp with your details filled in. Nothing is stored on this website.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Err({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-[#b4472f] dark:text-[#e58c75]">
      <AlertCircle size={14} aria-hidden /> {children}
    </p>
  );
}
