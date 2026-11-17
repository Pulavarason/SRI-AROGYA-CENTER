# Sri Arogya Centre – website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis · React Three Fiber + drei · Zod + React Hook Form.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain before deploying
(it drives canonical URLs, sitemap, Open Graph and structured data).

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp, address, map URLs, opening hours, doctor | `src/data/clinic.ts` |
| Siddha / Ayurveda / Panchakarma copy, booking service list | `src/data/services.ts` |
| Navigation items | `src/data/navigation.ts` |
| Photographs (hero art, about, cards, doctor portrait…) | `src/data/media.ts` + files in `public/images/` |
| Patient testimonials (section stays hidden while empty) | `src/data/testimonials.ts` |
| Botanical journal plant notes | `src/components/botanical/Journal.tsx` |
| Colours / themes / buttons | `src/app/globals.css` (CSS variables) |

## Needs the clinic's confirmation before launch

Nothing below was invented. Each item is marked `CONFIRM` in the code.

1. **Weekly opening hours.** Only the two daily sessions were supplied. Until `hours.weekly` in `clinic.ts` is filled in, the site tells visitors to call to confirm their day.
2. **Doctor details and portrait.** Only the name and "MD(s)" are shown. The portrait is a clearly labelled placeholder. Add `public/images/doctor.jpg` and set `media.doctor` / `clinic.doctor.portrait`.
3. **Service and plant descriptions.** Deliberately general, no medical or outcome claims. Have the clinic review or replace them.
4. **Photography.** Every image slot currently shows an original botanical illustration. Replace with licensed or commissioned photos via `src/data/media.ts`.
5. **Google Map.** Uses a search-based embed (no API key). For an exact pin, paste the "Embed a map" URL from the clinic's own Google Maps listing into `clinic.maps.embedUrl`.
6. **Testimonials.** Add only real, permission-approved feedback.
7. **Logo.** The supplied logo is rebuilt as an SVG (`src/components/ui/Logo.tsx`) so it follows the light and dark themes. The original PNGs are in `public/brand/`.

## Behaviour notes

- Booking form validates with Zod, then opens WhatsApp (`wa.me/919498075811`) with a pre-filled message. Nothing is stored. The success state says the appointment is **not confirmed** until the clinic replies.
- Theme: respects the system setting, persists the choice, and an inline script prevents any flash.
- 3D hero is dynamically imported, pauses when off-screen, uses a lighter scene on small or low-core devices, and falls back to illustrated botanicals with reduced-motion, data-saver, low-memory or no-WebGL.
- Treatments is a pinned horizontal story on desktop and a plain vertical stack on mobile and with reduced motion.
