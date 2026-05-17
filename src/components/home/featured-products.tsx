import Link from "next/link";
import { ArrowUpRight, Star, Truck } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Direkt lieferbar
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              Bestseller — in 5 Werktagen bei Ihnen.
            </h2>
          </div>
          <Link href="/briefkastenanlagen" className="text-sm font-medium hover:underline">
            Alle Bestseller →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => {
            const cat = categories.find((c) => c.slug === p.category);
            return (
              <Link
                key={p.slug}
                href={`/briefkastenanlagen/${p.category}/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-800 dark:to-anthracite-900">
                  <ProductSilhouette compartments={p.compartments} hasPackage={p.hasPackage} />
                  <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {p.badges.includes("Bestseller") && (
                      <Badge variant="accent" className="px-2">
                        Bestseller
                      </Badge>
                    )}
                    {p.badges.includes("Schnelle Lieferung") && (
                      <Badge variant="success" className="px-2">
                        <Truck className="mr-1 h-3 w-3" />5 Tage
                      </Badge>
                    )}
                    {p.oldPrice && (
                      <Badge variant="destructive" className="px-2">
                        − {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)} %
                      </Badge>
                    )}
                  </div>
                  <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 -translate-x-1 translate-y-1 text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {cat?.shortName}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-tight">{p.name}</h3>

                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{p.rating.toFixed(1)}</span>
                    <span>· {p.reviewCount} Bewertungen</span>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      {p.oldPrice && (
                        <p className="text-[11px] text-muted-foreground line-through">
                          {formatPrice(p.oldPrice)}
                        </p>
                      )}
                      <p className="font-display text-lg leading-tight">{formatPrice(p.price)}</p>
                      <p className="text-[10px] text-muted-foreground">inkl. MwSt., zzgl. Versand</p>
                    </div>
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

function ProductSilhouette({ compartments, hasPackage }: { compartments: number; hasPackage: boolean }) {
  const rows = Math.min(compartments, 4);
  return (
    <div className="absolute inset-0 bg-grid opacity-30">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[78%] w-[42%] rounded-md border-2 border-anthracite-700/50 bg-gradient-to-b from-anthracite-300/60 to-anthracite-500/60 shadow-md backdrop-blur">
          <div className="absolute inset-x-2 top-3 space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-1 flex-1 rounded-full bg-anthracite-900/40" />
                <div className="ml-1 h-1 w-1 rounded-full bg-anthracite-900/60" />
              </div>
            ))}
          </div>
          {hasPackage && (
            <div className="absolute inset-x-2 bottom-2 h-8 rounded border border-anthracite-900/40 bg-anthracite-900/10" />
          )}
        </div>
      </div>
    </div>
  );
}
