import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Star, Truck } from "lucide-react";
import { getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart";
import { getProductImage } from "@/lib/product-images";
import { ProductGallery } from "@/components/product/product-gallery";

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

  const heroImg = getProductImage(product);
  const galleryImages = [
    heroImg,
    getProductImage(product, 1),
    getProductImage(product, 2),
    `/img/categories/${product.category}.jpg`,
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "KNOBLOCH" },
    image: galleryImages,
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
    },
  };

  return (
    <>
      <section className="border-b py-8 lg:py-12">
        <div className="container">
          <nav className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Start</Link> /{" "}
            <Link href="/briefkastenanlagen" className="hover:text-foreground">Briefkastenanlagen</Link> /{" "}
            <Link href={`/briefkastenanlagen/${category}`} className="hover:text-foreground">{cat.shortName}</Link> /{" "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="mt-6 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductGallery images={galleryImages} alt={product.name} />
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                {product.badges.map((b) => (
                  <Badge
                    key={b}
                    variant={b === "Bestseller" ? "accent" : b === "Schnelle Lieferung" ? "success" : "outline"}
                  >
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

              <div className="mt-6 rounded-2xl border bg-card p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">inkl. 19 % MwSt., zzgl. Versand</p>

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

      <section className="border-b bg-ink-50 py-12 dark:bg-ink-950">
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
