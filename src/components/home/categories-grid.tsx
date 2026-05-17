import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { briefkastenCategories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

const categoryImages: Record<string, string> = {
  freistehend: "/img/categories/freistehend.jpg",
  aufputz: "/img/categories/aufputz.jpg",
  unterputz: "/img/categories/unterputz.jpg",
  zaun: "/img/categories/zaun.jpg",
  tuerelement: "/img/categories/tuerseitenteil.jpg",
  mauerdurchwurf: "/img/categories/mauerdurchwurf.jpg",
};

export function CategoriesGrid() {
  return (
    <section className="border-b py-20 lg:py-28">
      <div className="container">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              6 Montagetypen · eine Anlage für jedes Grundstück
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl text-balance">
              Wählen Sie Ihre Montageart.
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Vom freistehenden Klassiker bis zur wandbündigen Premium-Lösung. Alle Typen sind
              individuell konfigurierbar — Material, Farbe, Fächeranzahl, Extras.
            </p>
          </div>
          <Link
            href="/briefkastenanlagen"
            className="group inline-flex items-center gap-1 text-sm font-semibold hover:text-accent-foreground"
          >
            Alle ansehen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {briefkastenCategories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/briefkastenanlagen/${cat.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-anthracite-100">
                <Image
                  src={categoryImages[cat.slug] ?? categoryImages.freistehend}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/85 via-anthracite-900/20 to-transparent" />

                {/* Top right tag */}
                <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-anthracite-900 backdrop-blur">
                  {String(i + 1).padStart(2, "0")} · {cat.shortName}
                </span>

                {/* Bottom content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-xl tracking-tight">{cat.name}</h3>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/70">ab</p>
                      <p className="font-display text-2xl text-accent">{formatPrice(cat.startingPrice)}</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-anthracite-900 opacity-0 transition-all group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-5">
                <p className="line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1">
                  {cat.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
