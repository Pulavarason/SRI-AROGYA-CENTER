export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const EASE = [0.22, 1, 0.36, 1] as const;
