import Link from "next/link";
import { ArrowUpRight, Star, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

export function ProductCard({ product, categorySlug }: { product: Product; categorySlug?: string }) {
  const href = `/briefkastenanlagen/${categorySlug ?? product.category}/${product.slug}`;
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-800 dark:to-anthracite-900">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[78%] w-[42%] rounded-md border-2 border-anthracite-700/50 bg-gradient-to-b from-anthracite-300/60 to-anthracite-500/60 shadow-md backdrop-blur">
            <div className="absolute inset-x-2 top-3 space-y-3">
              {Array.from({ length: Math.min(product.compartments, 4) }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-1 flex-1 rounded-full bg-anthracite-900/40" />
                  <div className="ml-1 h-1 w-1 rounded-full bg-anthracite-900/60" />
                </div>
              ))}
            </div>
            {product.hasPackage && (
              <div className="absolute inset-x-2 bottom-2 h-8 rounded border border-anthracite-900/40 bg-anthracite-900/10" />
            )}
          </div>
        </div>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.badges.includes("Bestseller") && (
            <Badge variant="accent" className="px-2">
              Bestseller
            </Badge>
          )}
          {product.badges.includes("Schnelle Lieferung") && (
            <Badge variant="success" className="px-2">
              <Truck className="mr-1 h-3 w-3" />
              {product.deliveryDays} Tage
            </Badge>
          )}
          {product.badges.includes("Premium") && (
            <Badge variant="default" className="px-2">Premium</Badge>
          )}
          {product.oldPrice && (
            <Badge variant="destructive" className="px-2">
              − {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} %
            </Badge>
          )}
        </div>
        <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 -translate-x-1 translate-y-1 text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {product.material}
        </p>
        <h3 className="mt-1 text-sm font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {product.oldPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <p className="font-display text-lg leading-tight">{formatPrice(product.price)}</p>
            <p className="text-[10px] text-muted-foreground">inkl. MwSt.</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
