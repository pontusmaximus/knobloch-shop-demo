import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getProductImage } from "@/lib/product-images";
import type { Product } from "@/data/products";

export function ProductCard({ product, categorySlug }: { product: Product; categorySlug?: string }) {
  const href = `/briefkastenanlagen/${categorySlug ?? product.category}/${product.slug}`;
  const img = getProductImage(product);
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-anthracite-100">
        <Image
          src={img}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.badges.includes("Bestseller") && (
            <Badge variant="accent" className="px-2 shadow">Bestseller</Badge>
          )}
          {product.badges.includes("Schnelle Lieferung") && (
            <Badge variant="success" className="px-2 shadow">
              <Truck className="mr-1 h-3 w-3" />
              {product.deliveryDays} Tage
            </Badge>
          )}
          {product.badges.includes("Premium") && (
            <Badge variant="default" className="px-2 shadow">Premium</Badge>
          )}
          {product.oldPrice && (
            <Badge variant="destructive" className="px-2 shadow">
              − {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} %
            </Badge>
          )}
        </div>
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-anthracite-900 opacity-0 transition-all group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {product.material}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight">{product.name}</h3>
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
            <p className="font-display text-xl leading-tight">{formatPrice(product.price)}</p>
            <p className="text-[10px] text-muted-foreground">inkl. MwSt.</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
