import Image from "next/image";
import {
  ELEMENT_COLORS,
  ELEMENT_EMOJI,
  type Pal,
  type PalElement,
} from "@/lib/breeding";
import { getPalImageSrc } from "@/lib/pal-images";
import { cn } from "@/lib/utils";

type PalAvatarProps = {
  pal: Pick<Pal, "name" | "element"> & { id?: string };
  className?: string;
  imageClassName?: string;
  emojiClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export default function PalAvatar({
  pal,
  className,
  imageClassName,
  emojiClassName,
  sizes = "64px",
  priority = false,
}: PalAvatarProps) {
  const src = pal.id ? getPalImageSrc(pal.id) : null;
  const elementColor = ELEMENT_COLORS[pal.element as PalElement];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image
          src={src}
          alt={`${pal.name} icon`}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-contain", imageClassName)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ color: elementColor }}
        >
          <span className={cn("text-base", emojiClassName)}>
            {ELEMENT_EMOJI[pal.element as PalElement]}
          </span>
        </div>
      )}
    </div>
  );
}
