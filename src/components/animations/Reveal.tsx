"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/utils";

/** Fade + rise on scroll. Content stays visible without JS thanks to SSR opacity fallback. */
export function Reveal({
  delay = 0,
  y = 28,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.0, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked headline reveal. The in-view trigger lives on the clipping
 *  parent: an observer on the translated child would never fire (it is fully clipped). */
export function MaskLines({
  lines,
  className,
  delay = 0,
  immediate = false,
  as: Tag = "h2",
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
          initial="hidden"
          {...(immediate
            ? { animate: "show" }
            : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.11 }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/** Clip-path image reveal wrapper. */
export function ClipReveal({
  className,
  children,
  from = "bottom",
}: {
  className?: string;
  children: React.ReactNode;
  from?: "bottom" | "left" | "right";
}) {
  const start =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
  return (
    <motion.div
      className={className}
      initial={{ clipPath: start }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
