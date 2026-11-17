import { cn } from "@/lib/utils";

/** Sri Arogya Centre mark: leaf, lotus and gold bindu inside a broken double ring. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      <g style={{ color: "var(--logo)" }}>
        <path d="M582 57A455 455 0 1 1 418 57" stroke="currentColor" strokeWidth="15" strokeLinecap="round" />
        <path d="M600 95A418 418 0 1 1 400 95" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path
          fill="currentColor"
          d="M490 25C430 100 405 190 405 285C405 400 440 500 490 550Z M510 25C570 100 595 190 595 285C595 400 560 500 510 550Z"
        />
        <path
          fill="currentColor"
          d="M500 630C522 652 536 676 538 694C560 678 578 670 592 668C598 692 596 722 590 745L628 746C622 800 570 840 520 840L500 838L480 840C430 840 378 800 372 746L410 745C404 722 402 692 408 668C422 670 440 678 462 694C464 676 478 652 500 630Z"
        />
      </g>
      <circle cx="500" cy="590" r="15" style={{ fill: "var(--gold)" }} />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  className,
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
}) {
  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center text-center", className)} style={{ color: "var(--logo)" }}>
        <LogoMark className="h-28 w-28" />
        <span className="mt-5 font-serif text-4xl font-medium tracking-[0.22em]">SRI AROGYA</span>
        <span className="mt-3 flex items-center gap-4">
          <span className="h-px w-10" style={{ background: "var(--gold)" }} />
          <span className="text-xs font-semibold tracking-[0.5em]">CENTRE</span>
          <span className="h-px w-10" style={{ background: "var(--gold)" }} />
        </span>
      </div>
    );
  }
  return (
    <span className={cn("flex items-center gap-3", className)} style={{ color: "var(--logo)" }}>
      <LogoMark className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-serif text-[1.2rem] font-medium tracking-[0.2em] sm:text-[1.45rem]">SRI AROGYA</span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px w-5" style={{ background: "var(--gold)" }} />
          <span className="text-[0.6rem] font-semibold tracking-[0.5em]">CENTRE</span>
        </span>
      </span>
    </span>
  );
}
