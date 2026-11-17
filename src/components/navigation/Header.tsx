"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useSmoothScroll } from "@/components/animations/SmoothScroll";
import { useBooking } from "@/components/appointment/BookingProvider";
import { EASE } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { scrollTo, stop, start } = useSmoothScroll();
  const booking = useBooking();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock scroll + Escape to close while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      start();
    };
  }, [menuOpen, stop, start]);

  const go = (href: string) => {
    setMenuOpen(false);
    // let the menu unlock scrolling first
    window.setTimeout(() => scrollTo(href, { offset: href === "#home" ? 0 : -70 }), menuOpen ? 80 : 0);
  };

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="transition-[background-color,box-shadow,padding] duration-500"
          style={{
            background: solid ? "var(--header-solid)" : "transparent",
            backdropFilter: solid ? "blur(14px)" : undefined,
            boxShadow: solid ? "0 1px 0 var(--line)" : "none",
          }}
        >
          <div
            className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-[padding] duration-500 md:px-10 ${
              scrolled ? "py-3" : "py-5 md:py-7"
            }`}
          >
            <a
              href="#home"
              aria-label="Sri Arogya Centre – home"
              onClick={(e) => {
                e.preventDefault();
                go("#home");
              }}
            >
              <Logo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {navItems.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      aria-current={active === n.href ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        go(n.href);
                      }}
                      className="u-link text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => booking.open()}
                className="btn btn-solid hidden !px-6 !py-3.5 md:inline-flex"
              >
                Book Consultation
              </button>
              <button
                ref={toggleRef}
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg px-6 pb-32 pt-28 lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {navItems.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.href);
                    }}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="numeral w-8 text-sm text-goldink">0{i + 1}</span>
                    <span className="font-serif text-[2.4rem] leading-none text-ink">{n.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                setMenuOpen(false);
                window.setTimeout(() => booking.open(), 250);
              }}
              className="btn btn-solid mt-8 w-full"
            >
              Book Consultation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
