import { z } from "zod";
import { clinic } from "@/data/clinic";
import { serviceOptions } from "@/data/services";

/** Today's date (YYYY-MM-DD) in the visitor's local time. */
export function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function to12h(h: number, m: number) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Half-hourly start times generated from the clinic's session hours. */
export function timeSlots() {
  const slots: { value: string; label: string; group: string }[] = [];
  for (const s of clinic.hours.sessions) {
    const [sh, sm] = s.start.split(":").map(Number);
    const [eh, em] = s.end.split(":").map(Number);
    let mins = sh * 60 + sm;
    const end = eh * 60 + em - 30; // last start is 30 minutes before closing
    while (mins <= end) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      slots.push({
        value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        label: to12h(h, m),
        group: s.label,
      });
      mins += 30;
    }
  }
  return slots;
}

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+?91|0)/, ""))
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number."),
  date: z
    .string()
    .min(1, "Please choose a preferred date.")
    .refine((v) => v >= todayISO(), "Please choose today or a future date.")
    .refine((v) => v <= todayISO(120), "Please choose a date within the next four months."),
  time: z.string().min(1, "Please choose a preferred time."),
  service: z
    .string()
    .refine((v) => serviceOptions.some((o) => o.value === v), "Please choose a service."),
  message: z.string().trim().max(300, "Please keep this under 300 characters.").optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;

export function formatLongDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildWhatsAppMessage(data: BookingData) {
  const service = serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;
  const slot = timeSlots().find((s) => s.value === data.time)?.label ?? data.time;
  const lines = [
    `Hello ${clinic.name}, I would like to request an appointment.`,
    "",
    `Name: ${data.name}`,
    `Mobile: +91 ${data.mobile}`,
    `Preferred date: ${formatLongDate(data.date)}`,
    `Preferred time: ${slot}`,
    `Service of interest: ${service}`,
  ];
  if (data.message) lines.push(`Note: ${data.message}`);
  lines.push("", "Please let me know if this slot is available. Thank you.");
  return lines.join("\n");
}

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${clinic.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const enquiryMessage = `Hello ${clinic.name}, I would like to make an enquiry.`;
