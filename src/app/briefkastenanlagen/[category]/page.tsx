import Link from "next/link";
import Image from "next/image";
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
  const heroImg = `/img/categories/${cat.slug === "tuerelement" ? "tuerseitenteil" : cat.slug}.jpg`;

  return (
    <>
      <section className="relative overflow-hidden border-b bg-anthracite-900 text-white">
        <Image
          src={heroImg}
          alt={cat.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/95 via-anthracite-900/80 to-transparent" />

        <div className="container relative py-16 lg:py-24">
          <nav className="text-xs text-anthracite-300">
            <Link href="/" className="hover:text-white">Start</Link> /{" "}
            <Link href="/briefkastenanlagen" className="hover:text-white">Briefkastenanlagen</Link> /{" "}
            <span className="text-white">{cat.shortName}</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-anthracite-900">
              <Icon className="h-5 w-5" />
            </div>
            <h1 className="mt-4 font-display text-4xl tracking-tight md:text-6xl text-balance">
              {cat.name}
            </h1>
            <p className="mt-4 text-anthracite-200 text-pretty">{cat.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {cat.features.map((f) => (
                <Badge key={f} variant="outline" className="border-white/30 bg-white/5 px-2 py-1 text-xs text-white">
                  <Check className="mr-1 h-3 w-3 text-accent" />
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/kontakt">Beratung anfragen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
