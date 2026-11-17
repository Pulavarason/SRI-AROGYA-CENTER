/**
 * Add ONLY real, permission-approved feedback. While this array is empty the
 * whole section is hidden. Never add invented testimonials or ratings.
 */
export interface Testimonial {
  quote: string;
  initials: string; // e.g. "R.K."
  context?: string; // optional, e.g. "Patient, Adambakkam"
}
export const testimonials: Testimonial[] = [];
