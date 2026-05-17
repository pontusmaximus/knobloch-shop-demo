import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Check, PackageOpen, ShieldCheck, Wifi } from "lucide-react";
import { paketCategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Paketboxen & Paketanlagen",
  description:
    "Sichere Paketannahme rund um die Uhr — für Einfamilienhäuser, Mehrfamilienhäuser und Gewerbe. DHL, Hermes, DPD, GLS und UPS kompatibel.",
  alternates: { canonical: "/paketboxen" },
};

const carriers = ["DHL", "Hermes", "DPD", "GLS", "UPS"];

const paketImages: Record<string, string> = {
  paketbox: "/img/paket/paketbox-einfamilienhaus.jpg",
  paketanlage: "/img/paket/paketanlage-mehrfamilienhaus.jpg",
  abholstation: "/img/paket/abholstation-gewerbe.jpg",
};

export default function PaketboxenPage() {
  const paketProducts = getProductsByCategory("paketbox");

  return (
    <>
      <section className="relative overflow-hidden border-b bg-anthracite-900 text-white">
        <Image
          src="/img/paket/paketbox-einfamilienhaus.jpg"
          alt="Knobloch Paketbox"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/95 to-anthracite-900/40" />

        <div className="container relative py-16 lg:py-24">
          <nav className="text-xs text-anthracite-300">
            <Link href="/" className="hover:text-white">Start</Link> /{" "}
            <span className="text-white">Paketboxen</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl tracking-tight md:text-6xl text-balance">
            Paketboxen & Paketanlagen.
          </h1>
          <p className="mt-4 max-w-2xl text-anthracite-200 text-pretty">
            Pakete sicher empfangen — auch wenn niemand zuhause ist. Unsere Boxen sind kompatibel
            mit allen großen Paketdiensten und bieten Tragkraft bis 30 kg pro Fach.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-medium text-anthracite-200">Kompatibel mit:</span>
            {carriers.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-bold text-white backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b py-16 lg:py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl">Welche Lösung passt zu Ihnen?</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {paketCategories.map((c) => {
              const Icon = c.icon;
              const img = paketImages[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/briefkastenanlagen/${c.slug}`}
                  className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {img && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={img}
                        alt={c.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/40 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-anthracite-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{c.shortName}</h3>
                    <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
                    <ul className="mt-4 space-y-1.5 text-xs">
                      {c.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3 w-3 text-emerald-600" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-end justify-between border-t pt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ab</p>
                        <p className="font-display text-lg">
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                            maximumFractionDigits: 0,
                          }).format(c.startingPrice)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b py-16 lg:py-20">
        <div className="container">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Verfügbare Paketboxen</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/konfigurator/freistehend">Konfigurator</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {paketProducts.map((p) => (
              <ProductCard key={p.slug} product={p} categorySlug={p.category} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Warum eine Paketbox?
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-balance">
              Nie mehr verpasste Pakete.
            </h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
            <Feature
              icon={<PackageOpen className="h-5 w-5" />}
              title="24/7 Annahme"
              text="Egal wann der Kurier klingelt — Ihre Pakete sind sicher in der Box."
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Diebstahlsicher"
              text="Hochsicherheitsschloss VdS-zertifiziert, optional mit Smart Lock."
            />
            <Feature
              icon={<Wifi className="h-5 w-5" />}
              title="Optional smart"
              text="Push-Benachrichtigung bei Eingang, App-Anbindung iOS/Android."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-card p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-anthracite-900 text-white">
        {icon}
      </div>
      <h3 className="mt-5 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
