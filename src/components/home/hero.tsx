import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-anthracite-900 text-white">
      {/* Background image — high-quality Knobloch hero */}
      <div className="absolute inset-0">
        <Image
          src="/img/hero/hero-main.jpg"
          alt="Knobloch Briefkastenanlage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/95 via-anthracite-900/80 to-anthracite-900/40" />
        <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      </div>

      <div className="container relative grid items-center gap-10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-7">
          <Badge variant="accent" className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-anthracite-900" />
            Seit 1869 · Made in Döbeln
          </Badge>

          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl lg:text-[5.5rem]">
            Briefkastenanlagen,<br />
            die <span className="italic text-accent">156 Jahre</span> halten.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-anthracite-100 md:text-xl text-pretty">
            Konfigurieren Sie Ihre Anlage in einem Schritt — mit Live-Preis, Live-Vorschau
            und Lieferung in 5 Werktagen. Direkt vom ältesten Briefkastenhersteller
            Deutschlands.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl" className="group shadow-lg">
              <Link href="/konfigurator">
                Anlage konfigurieren
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              <Link href="/briefkastenanlagen">Anlagen ansehen</Link>
            </Button>
          </div>

          {/* Trust mini-row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-anthracite-200">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
              <span className="ml-1 font-medium text-white">4,8 / 5</span>
              <span>· 2.140 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              DIN EN 13724
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-accent" />
              Versand in 5 Tagen
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-accent" />
              10 Jahre Garantie
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* Floating live-config preview card */}
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-anthracite-800/70 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-anthracite-300">
                    Live-Konfiguration
                  </p>
                  <p className="text-sm font-semibold">Freistehende Anlage · 3 Fach</p>
                </div>
                <Badge variant="success" className="px-2 py-0.5">5 Tage</Badge>
              </div>

              <ul className="mt-3 space-y-1.5 text-xs">
                {[
                  ["Material", "Edelstahl V2A geschliffen"],
                  ["Farbe", "RAL 7016 Anthrazit"],
                  ["Fächer", "3 Wohneinheiten + Paket"],
                  ["Extras", "Klingeltaster · LED"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                    <span className="text-anthracite-300">{k}</span>
                    <span className="font-medium text-white">{v}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-end justify-between rounded-lg bg-accent/15 px-3 py-2.5">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-accent">Live-Preis</p>
                  <p className="font-display text-2xl text-white">1.387 €</p>
                </div>
                <Link
                  href="/konfigurator"
                  className="rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-anthracite-900 hover:bg-accent/90"
                >
                  Anpassen →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
