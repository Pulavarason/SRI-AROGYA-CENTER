import Image from "next/image";
import { media, type MediaKey } from "@/data/media";
import { BotanicalScene } from "@/components/botanical/Botanical";
import { cn } from "@/lib/utils";

/** Renders a real photograph when one is configured in data/media.ts, else original botanical art. */
export function Photo({
  slot,
  alt,
  className,
  tone = "forest",
  priority = false,
  sizes = "(min-width:1024px) 50vw, 100vw",
}: {
  slot: MediaKey;
  alt: string;
  className?: string;
  tone?: "forest" | "ivory" | "gold";
  priority?: boolean;
  sizes?: string;
}) {
  const src = media[slot];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0">
          <BotanicalScene tone={tone} />
        </div>
      )}
    </div>
  );
}
