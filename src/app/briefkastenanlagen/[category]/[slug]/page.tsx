import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Star, Truck } from "lucide-react";
import { getCategory, briefkastenCategories } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Produkt" };
  return {
    title: p.name,
    description: p.shortDescription,
    alternates: { canonical: `/briefkastenanlagen/${category}/${slug}` },
    openGraph: {
      title: p.name,
      description: p.shortDescription,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const cat = getCategory(category);
  if (!cat) notFound();
  const Icon = cat.icon;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "KNOBLOCH" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      shippingDetails: { deliveryTime: { businessDays: { minValue: 3, maxValue: 5 } } },
    },
  };

  return (
    <>
      <section className="border-b py-8 lg:py-12">
        <div className="container">
          <nav className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Start</Link> /{" "}
            <Link href="/briefkastenanlagen" className="hover:text-foreground">Briefkastenanlagen</Link>{" "}
            / <Link href={`/briefkastenanlagen/${category}`} className="hover:text-foreground">{cat.shortName}</Link> /{" "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-12 lg:grid-cols-12">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-800 dark:to-anthracite-900">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <ProductHero compartments={product.compartments} hasPackage={product.hasPackage} />
                  </div>
                  <Icon className="absolute right-6 top-6 h-6 w-6 text-anthracite-700/40" />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="aspect-square overflow-hidden rounded-lg border bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-800 dark:to-anthracite-900"
                  >
                    <div className="flex h-full items-center justify-center">
                      <Icon className="h-6 w-6 text-anthracite-700/40" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                {product.badges.map((b) => (
                  <Badge key={b} variant={b === "Bestseller" ? "accent" : b === "Schnelle Lieferung" ? "success" : "outline"}>
                    {b}
                  </Badge>
                ))}
              </div>

              <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl text-balance">
                {product.name}
              </h1>
              <p className="mt-3 text-muted-foreground">{product.description}</p>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">· {product.reviewCount} Bewertungen</span>
              </div>

              {/* Price */}
              <div className="mt-6 rounded-xl border bg-card p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  inkl. 19 % MwSt., zzgl. Versand
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs">
                  <Badge variant="success">
                    <Truck className="mr-1 h-3 w-3" />
                    {product.deliveryDays} Werktage
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    DIN EN 13724
                  </Badge>
                </div>

                <div className="mt-5 grid gap-2">
                  <AddToCartButton product={product} />
                  <Button asChild variant="outline" size="lg">
                    <Link href={`/konfigurator/${product.category}`}>
                      Individuell anpassen im Konfigurator
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider">Highlights</h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-b bg-anthracite-50 py-12 dark:bg-anthracite-950">
        <div className="container">
          <h2 className="font-display text-2xl">Technische Daten</h2>
          <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="flex gap-3 bg-card p-4 text-sm">
                <dt className="w-1/3 text-muted-foreground">{s.label}</dt>
                <dd className="flex-1 font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

function ProductHero({ compartments, hasPackage }: { compartments: number; hasPackage: boolean }) {
  const rows = Math.min(compartments, 6);
  return (
    <div className="relative h-full w-full max-w-[280px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[88%] w-[60%] rounded-md border-2 border-anthracite-700/60 bg-gradient-to-b from-anthracite-300/80 to-anthracite-500/80 shadow-2xl">
          <div className="absolute inset-x-3 top-4 space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="h-1 flex-1 rounded-full bg-anthracite-900/60" />
                <div className="h-1 w-1 rounded-full bg-anthracite-900" />
              </div>
            ))}
          </div>
          {hasPackage && (
            <div className="absolute inset-x-3 bottom-4 h-12 rounded border border-anthracite-900/60 bg-anthracite-900/10" />
          )}
          <div className="absolute inset-x-0 bottom-1 text-center text-[8px] font-bold uppercase tracking-[0.3em] text-anthracite-900/60">
            Knobloch
          </div>
        </div>
      </div>
    </div>
  );
}
