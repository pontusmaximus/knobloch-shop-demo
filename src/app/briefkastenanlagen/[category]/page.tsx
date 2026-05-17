import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { briefkastenCategories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Briefkastenanlagen" };
  return {
    title: `${cat.name} kaufen`,
    description: cat.description,
    alternates: { canonical: `/briefkastenanlagen/${cat.slug}` },
  };
}

export function generateStaticParams() {
  return briefkastenCategories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const items = getProductsByCategory(category);
  const Icon = cat.icon;

  return (
    <>
      <section className="border-b bg-anthracite-50 py-12 dark:bg-anthracite-950 lg:py-16">
        <div className="container">
          <nav className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Start</Link> /{" "}
            <Link href="/briefkastenanlagen" className="hover:text-foreground">
              Briefkastenanlagen
            </Link>{" "}
            / <span className="text-foreground">{cat.shortName}</span>
          </nav>

          <div className="mt-6 grid items-end gap-8 md:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-anthracite-900 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl text-balance">
                {cat.name}
              </h1>
              <p className="mt-3 text-muted-foreground text-pretty">{cat.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {cat.features.map((f) => (
                  <Badge key={f} variant="outline" className="px-2 py-1 text-xs">
                    <Check className="mr-1 h-3 w-3 text-emerald-600" />
                    {f}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="accent">
                  <Link href={`/konfigurator/${cat.slug}`} className="group">
                    {cat.shortName} konfigurieren
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/kontakt">Beratung anfragen</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="aspect-[3/4] w-full max-w-sm rounded-2xl border bg-gradient-to-br from-anthracite-200 to-anthracite-400 shadow-xl dark:from-anthracite-800 dark:to-anthracite-900">
                <div className="flex h-full items-center justify-center">
                  <Icon className="h-20 w-20 text-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="border-b py-12 lg:py-16">
        <div className="container">
          {items.length === 0 ? (
            <div className="rounded-2xl border bg-card p-12 text-center">
              <p className="text-lg font-semibold">
                Für diese Kategorie liefern wir derzeit ausschließlich individuell.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Konfigurieren Sie Ihre {cat.shortName}-Anlage in unserem Konfigurator — mit Live-Preis.
              </p>
              <Button asChild size="lg" variant="accent" className="mt-6">
                <Link href={`/konfigurator/${cat.slug}`}>Konfigurator starten</Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl md:text-3xl">
                Vorkonfigurierte {cat.shortName}-Anlagen
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} categorySlug={cat.slug} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
