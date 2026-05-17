import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star, Truck } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getProductImage } from "@/lib/product-images";

export function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="border-b py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Direkt lieferbar
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl text-balance">
              Bestseller in 5 Werktagen.
            </h2>
          </div>
          <Link href="/briefkastenanlagen" className="text-sm font-semibold hover:underline">
            Alle Bestseller →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => {
            const cat = categories.find((c) => c.slug === p.category);
            const img = getProductImage(p);
            return (
              <Link
                key={p.slug}
                href={`/briefkastenanlagen/${p.category}/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ink-100">
                  <Image
                    src={img}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {p.badges.includes("Bestseller") && (
                      <Badge variant="accent" className="px-2 shadow">Bestseller</Badge>
                    )}
                    {p.badges.includes("Schnelle Lieferung") && (
                      <Badge variant="success" className="px-2 shadow">
                        <Truck className="mr-1 h-3 w-3" />
                        {p.deliveryDays} Tage
                      </Badge>
                    )}
                    {p.oldPrice && (
                      <Badge variant="destructive" className="px-2 shadow">
                        − {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)} %
                      </Badge>
                    )}
                  </div>
                  <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-ink-900 opacity-0 transition-all group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {cat?.shortName}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight">{p.name}</h3>

                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{p.rating.toFixed(1)}</span>
                    <span>· {p.reviewCount}</span>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      {p.oldPrice && (
                        <p className="text-[11px] text-muted-foreground line-through">
                          {formatPrice(p.oldPrice)}
                        </p>
                      )}
                      <p className="font-display text-xl leading-tight">{formatPrice(p.price)}</p>
                      <p className="text-[10px] text-muted-foreground">inkl. MwSt.</p>
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
