"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("./BookingModal").then((m) => m.BookingModal), {
  ssr: false,
});

interface BookingApi {
  open: (service?: string) => void;
}
const Ctx = createContext<BookingApi | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [service, setService] = useState<string | undefined>();

  const open = useCallback((s?: string) => {
    setService(s);
    setMounted(true); // load the modal chunk only when first needed
    setOpen(true);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {mounted && <BookingModal open={isOpen} service={service} onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}
