"use client";

import { useState, type FormEvent } from "react";
import { Copy, Mail, MapPin, MessageCircle, Navigation, Phone, Send } from "lucide-react";
import { MaskLines, Reveal } from "@/components/animations/Reveal";
import { clinic } from "@/data/clinic";
import { enquiryMessage, whatsappUrl } from "@/lib/booking";

const field = "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink2/55 focus:border-gold";
const label = "eyebrow mb-1 block !text-ink2";

export function Location() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const fullAddress = `${clinic.name}, ${clinic.address.lines.join(", ")}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullAddress;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const lines = [enquiryMessage, "", `Name: ${name}`, `Phone: ${mobile}`, `Message: ${message}`];
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative bg-bg py-20 md:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal><p className="eyebrow mb-5"><span className="numeral mr-3 text-base tracking-normal">07</span>Contact</p></Reveal>
        <MaskLines as="h2" className="display text-[clamp(2.8rem,6.5vw,5.8rem)] text-ink" lines={["Visit Us.", <em key="f">Find Your Way.</em>]} />

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <address className="not-italic">
              <div className="divide-y divide-line border-y border-line">
                <ContactRow icon={<Phone size={17} />} label="Phone">
                  <a href={`tel:${clinic.phone.tel}`} className="u-link">{clinic.phone.display}</a>
                  <span className="px-2 text-ink2/50">·</span>
                  <a href={`tel:${clinic.landline.tel}`} className="u-link">{clinic.landline.display}</a>
                </ContactRow>
                <ContactRow icon={<MessageCircle size={17} />} label="WhatsApp">
                  <a href={whatsappUrl(enquiryMessage)} target="_blank" rel="noopener noreferrer" className="u-link">+91 94980 75811</a>
                </ContactRow>
                <ContactRow icon={<Mail size={17} />} label="Email">
                  <a href={`mailto:${clinic.email.href}`} className="u-link">{clinic.email.display}</a>
                </ContactRow>
                <ContactRow icon={<MapPin size={17} />} label="Address">
                  <span className="max-w-sm text-sm leading-6 text-ink2">{clinic.address.lines.join(", ")}</span>
                  <button type="button" onClick={copy} className="ml-auto shrink-0 text-ink2 transition-colors hover:text-ink" aria-label="Copy address" title={copied ? "Address copied" : "Copy address"}>
                    {copied ? <span className="text-xs">Copied</span> : <Copy size={15} />}
                  </button>
                </ContactRow>
              </div>
              <a href={clinic.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-ink2 transition-colors hover:text-ink"><Navigation size={15} /> Get directions</a>
            </address>

            <div className="relative mt-6 aspect-[16/9] w-full max-w-[420px] overflow-hidden border border-line">
              <iframe title="Sri Arogya Centre map" src={clinic.maps.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.8)] dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-t border-line pt-6 lg:border-t-0 lg:pt-0">
              <p className="eyebrow mb-3">Send an enquiry</p>
              <h3 className="font-serif text-3xl text-ink">We’re here to help.</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink2">Leave a message and it will open in WhatsApp, ready for you to send to our team.</p>
              <form onSubmit={submitEnquiry} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="contact-name" className={label}>Your name</label>
                  <input id="contact-name" name="name" autoComplete="name" required maxLength={80} className={field} placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="contact-mobile" className={label}>Phone number</label>
                  <input id="contact-mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} className={field} placeholder="Your phone number" />
                </div>
                <div>
                  <label htmlFor="contact-message" className={label}>How can we help?</label>
                  <textarea id="contact-message" name="message" required maxLength={500} rows={3} className={`${field} resize-y`} placeholder="Write your message" />
                </div>
                <button type="submit" className="btn btn-solid mt-2"><Send size={15} /> Send enquiry on WhatsApp</button>
                {sent && <p role="status" className="text-sm text-ink2">WhatsApp opened with your enquiry. Press Send there to contact the clinic.</p>}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label: rowLabel, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2rem_5.5rem_1fr] items-center gap-2 py-4 sm:grid-cols-[2.5rem_6rem_1fr] sm:gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-bg2 text-goldink" aria-hidden="true">{icon}</span>
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink2">{rowLabel}</span>
      <div className="flex min-w-0 flex-wrap items-center text-sm font-medium text-ink">{children}</div>
    </div>
  );
}
