import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { briefkastenCategories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

export function CategoriesGrid() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              6 Montagetypen — eine Anlage für jedes Grundstück
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl text-balance">
              Wählen Sie Ihre Montageart.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Vom freistehenden Klassiker bis zur wandbündigen Premium-Lösung. Alle Typen sind
              individuell konfigurierbar — Material, Farbe, Fächeranzahl, Extras.
            </p>
          </div>
          <Link
            href="/briefkastenanlagen"
            className="group inline-flex items-center gap-1 text-sm font-medium hover:text-accent-foreground"
          >
            Alle ansehen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {briefkastenCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/briefkastenanlagen/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-800 dark:to-anthracite-900">
                  <CategoryVisual variant={i} icon={<Icon className="h-12 w-12 text-anthracite-700/30" />} />
                  <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-anthracite-900/90 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                    {String(i + 1).padStart(2, "0")} · {cat.shortName}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold tracking-tight">{cat.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {cat.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ab</p>
                      <p className="font-display text-xl">{formatPrice(cat.startingPrice)}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                      Konfigurieren
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryVisual({ variant, icon }: { variant: number; icon: React.ReactNode }) {
  const patterns = [
    "linear-gradient(135deg, #1A1D21 0%, #34383E 100%)",
    "linear-gradient(135deg, #C8CCD1 0%, #E8EAEC 100%)",
    "linear-gradient(135deg, #383E42 0%, #6B7280 100%)",
    "linear-gradient(135deg, #F1F1F1 0%, #C8CCD1 100%)",
    "linear-gradient(135deg, #1A1D21 0%, #4B5159 100%)",
    "linear-gradient(135deg, #6B7280 0%, #A1A7AF 100%)",
  ];

  return (
    <div className="absolute inset-0" style={{ background: patterns[variant % patterns.length] }}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Stylized mailbox silhouette */}
        <div className="relative h-32 w-20 rounded-md border-2 border-white/30 bg-white/10 shadow-lg">
          <div className="absolute inset-x-3 top-4 h-0.5 rounded-full bg-white/60" />
          <div className="absolute inset-x-3 top-10 h-0.5 rounded-full bg-white/60" />
          <div className="absolute inset-x-3 top-16 h-0.5 rounded-full bg-white/60" />
          <div className="absolute inset-x-3 bottom-3 h-6 rounded border border-white/30 bg-white/5" />
        </div>
      </div>
      <div className="absolute right-3 bottom-3 opacity-40">{icon}</div>
    </div>
  );
}
