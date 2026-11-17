import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-28 md:py-40">
      <p className="eyebrow mb-4">Sri Arogya Centre</p>
      <h1 className="display text-5xl text-ink md:text-6xl">Privacy Policy</h1>
      <div className="mt-10 space-y-5 leading-[1.85] text-ink2">
        <p>This website does not store personal information on its own servers.</p>
        <p>
          When you use the appointment form, the details you enter (name, mobile number, preferred date and time, service
          and optional message) are used only to prepare a WhatsApp message to {clinic.name}. That message is sent only if
          you press Send in WhatsApp, and is then handled under WhatsApp&apos;s own terms and privacy policy.
        </p>
        <p>Please do not share detailed medical information through the form. Discuss it directly with the clinic.</p>
        <p>
          The page embeds a Google Map and stores one preference (light or dark theme) in your browser. Google may set its
          own cookies when the map loads.
        </p>
        <p>
          Questions: call <a className="u-link text-ink" href={`tel:${clinic.phone.tel}`}>{clinic.phone.display}</a>.
        </p>
      </div>
      <Link href="/" className="btn btn-ghost mt-12">Back to home</Link>
    </main>
  );
}
