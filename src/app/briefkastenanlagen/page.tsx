import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { briefkastenCategories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Briefkastenanlagen — alle Montagetypen",
  description:
    "Alle KNOBLOCH-Briefkastenanlagen im Überblick: freistehend, Aufputz, Unterputz, Zaun, Türelement und Mauerdurchwurf. Direkt vom Hersteller. Lieferung in 5 Werktagen.",
  alternates: { canonical: "/briefkastenanlagen" },
};

export default function BriefkastenanlagenPage() {
  const briefkastenProducts = products.filter((p) =>
    briefkastenCategories.some((c) => c.slug === p.category)
  );

  return (
    <>
      <section className="border-b bg-ink-50 py-12 dark:bg-ink-950 lg:py-16">
        <div className="container">
          <nav className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Start
            </Link>{" "}
            / <span className="text-foreground">Briefkastenanlagen</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Briefkastenanlagen.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            6 Montagetypen. Pulverbeschichteter Stahl, Aluminium oder Edelstahl V2A/V4A. Von 1
            Wohneinheit bis zur 30-Familien-Anlage. Konfigurieren Sie Ihre individuelle Lösung —
            oder wählen Sie aus unseren vorkonfigurierten Schnelllieferer-Anlagen.
          </p>
        </div>
      </section>

      {/* Montagetypen */}
      <section className="border-b py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl">Montagetypen</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {briefkastenCategories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.slug}
                  href={`/briefkastenanlagen/${c.slug}`}
                  className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{c.shortName}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-4 flex items-end justify-between border-t pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ab</p>
                      <p className="font-display text-lg">{formatPrice(c.startingPrice)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schnelllieferer */}
      <section className="border-b py-12 lg:py-16">
        <div className="container">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl md:text-3xl">Schnelllieferer · in 5 Tagen</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/konfigurator">Eigene konfigurieren</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {briefkastenProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
