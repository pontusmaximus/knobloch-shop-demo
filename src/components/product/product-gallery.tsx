"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const main = images[activeIdx];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-anthracite-100">
        <Image
          src={main}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
              activeIdx === i
                ? "border-anthracite-900"
                : "border-transparent hover:border-anthracite-400"
            )}
          >
            <Image
              src={src}
              alt={`${alt} – Bild ${i + 1}`}
              fill
              sizes="100px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
