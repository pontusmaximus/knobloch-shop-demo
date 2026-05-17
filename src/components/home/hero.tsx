import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-ink-100/60 blur-3xl" />

      <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <Badge variant="accent" className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Seit 1869 · Made in Döbeln
          </Badge>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink-900 text-balance md:text-6xl lg:text-7xl">
            Briefkastenanlagen,<br />
            die <span className="text-brand-600">156 Jahre</span> halten.
          </h1>

          <p className="mt-6 max-w-xl text-base text-ink-600 md:text-lg text-pretty">
            Konfigurieren Sie Ihre Anlage in Echtzeit — mit Live-Preis, Live-Vorschau und
            Lieferung in 5 Werktagen. Direkt vom ältesten Briefkastenhersteller Deutschlands.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl" className="group shadow-lg shadow-brand-600/20">
              <Link href="/konfigurator">
                Anlage konfigurieren
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/briefkastenanlagen">Anlagen ansehen</Link>
            </Button>
          </div>

          {/* Trust mini-row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-500">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-brand-600 text-brand-600" />
              ))}
              <span className="ml-1 font-semibold text-ink-900">4,8</span>
              <span>· 2.140 Bewertungen</span>
            </div>
            <span className="hidden text-ink-300 sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
              <span>DIN EN 13724</span>
            </div>
            <span className="hidden text-ink-300 sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-brand-600" />
              <span>5 Werktage</span>
            </div>
            <span className="hidden text-ink-300 sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-brand-600" />
              <span>10 Jahre Garantie</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-100 to-ink-100 blur-2xl opacity-60" />

            {/* Product image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border bg-ink-50 shadow-xl">
              <Image
                src="/img/hero/hero-main.jpg"
                alt="Knobloch Briefkastenanlage"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />

              {/* Floating config card */}
              <div className="absolute inset-x-4 bottom-4 overflow-hidden rounded-xl border border-white/40 bg-white/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-start justify-between border-b border-ink-100 pb-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-ink-500">
                      Live-Konfiguration
                    </p>
                    <p className="text-sm font-semibold text-ink-900">
                      Freistehend · V2A · 3 Fach
                    </p>
                  </div>
                  <Badge variant="success" className="px-2 py-0.5">5 Tage</Badge>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-ink-500">Live-Preis</p>
                    <p className="font-display text-2xl font-bold text-ink-900">1.387 €</p>
                  </div>
                  <Link
                    href="/konfigurator"
                    className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-brand-700"
                  >
                    Anpassen
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
