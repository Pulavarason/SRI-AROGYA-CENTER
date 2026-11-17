import { cn } from "@/lib/utils";

type Kind = "tulsi" | "neem" | "amla" | "generic";

/** Original line-and-fill botanical sprig. Colours follow theme tokens. */
export function Sprig({
  kind = "generic",
  className,
  filled = true,
  flip = false,
}: {
  kind?: Kind;
  className?: string;
  filled?: boolean;
  flip?: boolean;
}) {
  const leaves = {
    tulsi: { n: 6, len: 62, wid: 30, spread: 52 },
    neem: { n: 9, len: 54, wid: 11, spread: 42 },
    amla: { n: 14, len: 30, wid: 8, spread: 70 },
    generic: { n: 7, len: 58, wid: 20, spread: 48 },
  }[kind];

  const items = Array.from({ length: leaves.n }, (_, i) => {
    const t = i / (leaves.n - 1);
    const y = 380 - t * 300;
    const side = i % 2 === 0 ? -1 : 1;
    const x = 100 + Math.sin(t * 2.2) * 8;
    const a = side * (leaves.spread - t * 12);
    const s = 1 - t * 0.35;
    return { x, y, a, s, i };
  });

  return (
    <svg
      viewBox="0 0 200 420"
      className={cn(flip && "-scale-x-100", className)}
      fill="none"
      aria-hidden="true"
      style={{ color: "var(--sprig, var(--forest))" }}
    >
      <path d="M100 410C102 330 96 230 104 70" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {items.map(({ x, y, a, s, i }) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
          <path
            d={`M0 0C${leaves.wid} ${-leaves.len * 0.35} ${leaves.wid} ${-leaves.len * 0.8} 0 ${-leaves.len}C${-leaves.wid} ${-leaves.len * 0.8} ${-leaves.wid} ${-leaves.len * 0.35} 0 0Z`}
            fill={filled ? "currentColor" : "none"}
            fillOpacity={filled ? 0.1 + (i % 3) * 0.05 : 0}
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d={`M0 -2L0 ${-leaves.len + 6}`} stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
        </g>
      ))}
      {kind === "amla" &&
        items
          .filter((_, i) => i % 3 === 0)
          .map(({ x, y, i }) => <circle key={i} cx={x} cy={y} r="6" fill="var(--gold)" opacity="0.85" />)}
      {kind === "tulsi" && <ellipse cx="104" cy="66" rx="5" ry="12" fill="var(--gold)" opacity="0.8" />}
    </svg>
  );
}

/** Large background scene used wherever a photograph slot is not yet filled. */
export function BotanicalScene({
  className,
  tone = "forest",
}: {
  className?: string;
  tone?: "forest" | "ivory" | "gold";
}) {
  const bg = {
    forest: "linear-gradient(160deg, #1d4a35 0%, #173d2c 55%, #0f2a1e 100%)",
    ivory: "linear-gradient(160deg, var(--bg-2) 0%, var(--bg) 100%)",
    gold: "linear-gradient(160deg, #cdb98c 0%, #b99a64 55%, #8d7447 100%)",
  }[tone];
  const ink = tone === "ivory" ? "var(--forest)" : "#f3f0e8";
  const sprigVar = { "--sprig": ink } as React.CSSProperties;
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ background: bg }}>
      <div
        className="absolute -right-[12%] bottom-[-8%] h-[115%] w-[62%] opacity-[0.34]"
        style={sprigVar}
      >
        <Sprig kind="tulsi" className="h-full w-full [&_*]:!stroke-current" />
      </div>
      <div className="absolute -left-[6%] bottom-[-12%] h-[88%] w-[48%] opacity-[0.24]" style={sprigVar}>
        <Sprig kind="neem" flip className="h-full w-full" />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 30% 20%, rgb(255 244 214 / 0.18), transparent 70%)" }}
      />
    </div>
  );
}
