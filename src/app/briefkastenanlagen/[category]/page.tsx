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
      <section className="relative overflow-hidden border-b bg-white">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />

        <div className="container relative grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <nav className="text-xs text-ink-500">
              <Link href="/" className="hover:text-brand-600">Start</Link> /{" "}
              <Link href="/briefkastenanlagen" className="hover:text-brand-600">Briefkastenanlagen</Link> /{" "}
              <span className="text-ink-900">{cat.shortName}</span>
            </nav>

            <div className="mt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-ink-900 md:text-6xl text-balance">
                {cat.name}
              </h1>
              <p className="mt-4 text-ink-600 text-pretty">{cat.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {cat.features.map((f) => (
                  <Badge key={f} variant="outline" className="px-2 py-1 text-xs">
                    <Check className="mr-1 h-3 w-3 text-brand-600" />
                    {f}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="accent" className="shadow-lg shadow-brand-600/20">
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
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-brand-100/40 blur-2xl" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink-200 bg-ink-50 shadow-xl">
                <Image
                  src={heroImg}
                  alt={cat.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                />
              </div>
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
