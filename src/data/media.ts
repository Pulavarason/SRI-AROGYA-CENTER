/**
 * Photography slots. Every slot currently renders an original botanical
 * illustration. To use a real photograph, drop the file in /public/images and
 * set its path here (e.g. "/images/hero-leaves.jpg"). No other code changes.
 *
 * Only use images you own or are licensed for, with no third-party branding.
 */
export const media = {
  about: null as string | null,
  siddha: null as string | null,
  ayurveda: null as string | null,
  panchakarma: null as string | null,
  story1: null as string | null,
  story2: null as string | null,
  story3: null as string | null,
  journal: null as string | null,
  finalCta: null as string | null,
  doctor: null as string | null, // a real portrait of Dr. S. Rajesh, once supplied
} as const;
export type MediaKey = keyof typeof media;
