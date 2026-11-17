"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { BookingProvider } from "@/components/appointment/BookingProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <BookingProvider>{children}</BookingProvider>
    </SmoothScroll>
  );
}
