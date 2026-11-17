/**
 * SINGLE SOURCE OF TRUTH for every clinic detail shown on the site.
 * Edit here; nothing else in the codebase hard-codes contact details.
 *
 * Items marked `// CONFIRM` were not supplied as verified facts and must be
 * confirmed by the clinic before the site goes live.
 */

export const clinic = {
  name: "Sri Arogya Centre",
  shortName: "Sri Arogya",
  tagline: "Siddha | Ayurveda | Panchakarma",
  philosophy: "Ancient wisdom. Natural harmony. Thoughtful care.",
  doctor: {
    name: "Dr. S. Rajesh",
    credentials: "MD(s)",
    // CONFIRM: add verified qualifications / experience here only once confirmed.
    // Leave `portrait` null until a real photograph is supplied (public/images/doctor.jpg).
    portrait: null as string | null,
  },
  phone: { display: "+91 94980 75811", tel: "+919498075811" },
  landline: { display: "044-42128847", tel: "+914442128847" },
  whatsapp: { number: "919498075811" },
  // Temporary placeholder; replace with the clinic's verified email address.
  email: { display: "hello@example.com", href: "hello@example.com" },
  address: {
    lines: [
      "48A, Medavakkam Main Road",
      "Union Bank Complex",
      "Adambakkam",
      "Chennai – 600088",
      "Tamil Nadu, India",
    ],
    street: "48A, Medavakkam Main Road, Union Bank Complex",
    locality: "Adambakkam",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600088",
    country: "IN",
  },
  maps: {
    searchUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Arogya+Centre+Adambakkam+Chennai",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Sri+Arogya+Centre+Adambakkam+Chennai",
    // CONFIRM: this search-based embed needs no API key. For a pinned, exact
    // marker replace with the "Embed a map" URL copied from the clinic's own
    // Google Maps listing (Share → Embed a map).
    embedUrl:
      "https://www.google.com/maps?q=Sri+Arogya+Centre+Adambakkam+Chennai&output=embed",
  },
  hours: {
    sessions: [
      { id: "morning", label: "Morning", start: "09:30", end: "14:00", display: "9:30 AM – 2:00 PM" },
      { id: "evening", label: "Evening", start: "16:00", end: "19:30", display: "4:00 PM – 7:30 PM" },
    ],
    /**
     * CONFIRM: the weekly pattern was not supplied. While `weekly` is null the
     * site shows the two sessions and asks visitors to call to confirm the day.
     * To publish a weekly table, fill this with seven entries, e.g.
     *   { day: "Monday", sessions: ["morning", "evening"] }
     *   { day: "Sunday", sessions: [] }   // closed
     */
    weekly: null as null | { day: string; sessions: ("morning" | "evening")[] }[],
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type ClinicSession = (typeof clinic.hours.sessions)[number];

export const doctorFullName = `${clinic.doctor.name} ${clinic.doctor.credentials}`;
