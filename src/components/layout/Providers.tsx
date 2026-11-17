"use client";

import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { BookingProvider } from "@/components/appointment/BookingProvider";
import { InitialLoader } from "@/components/layout/InitialLoader";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <BookingProvider>
        {children}
        <InitialLoader />
      </BookingProvider>
    </SmoothScroll>
  );
}
