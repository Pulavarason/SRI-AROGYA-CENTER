const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
type P = { className?: string };
const Wrap = ({ children, className }: P & { children: React.ReactNode }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" {...base}>{children}</svg>
);
export const IconSiddha = (p: P) => (
  <Wrap {...p}><circle cx="32" cy="32" r="26" /><path className="draw" d="M32 50C20 40 20 24 32 12c12 12 12 28 0 38Z" /><path d="M32 16v32M32 30l-7-5M32 38l8-6" /></Wrap>
);
export const IconAyurveda = (p: P) => (
  <Wrap {...p}><path className="draw" d="M32 52V28M32 34C22 34 14 28 14 18c10 0 18 6 18 16ZM32 28c0-10 8-16 18-16 0 10-8 16-18 16Z" /><path d="M20 52h24" /></Wrap>
);
export const IconPanchakarma = (p: P) => (
  <Wrap {...p}><path className="draw" d="M32 8C22 22 18 30 18 38a14 14 0 0 0 28 0c0-8-4-16-14-30Z" /><path d="M26 40a6 6 0 0 0 6 6" /></Wrap>
);
export const IconConsult = (p: P) => (
  <Wrap {...p}><path className="draw" d="M10 14h44v28H30L18 52V42h-8Z" /><path d="M20 24h24M20 32h14" /></Wrap>
);
export const IconAttention = (p: P) => (
  <Wrap {...p}><circle cx="32" cy="32" r="6" /><circle className="draw" cx="32" cy="32" r="14" /><circle cx="32" cy="32" r="24" strokeDasharray="2 5" /></Wrap>
);
export const IconGuidance = (p: P) => (
  <Wrap {...p}><path className="draw" d="M8 44c8-10 14-10 24 0s16 10 24 0" /><path d="M8 32c8-10 14-10 24 0s16 10 24 0" /><path d="M8 20c8-10 14-10 24 0s16 10 24 0" /></Wrap>
);
