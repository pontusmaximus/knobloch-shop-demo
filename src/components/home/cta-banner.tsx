import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-anthracite-900 py-16 text-white lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="container relative grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Beratung gewünscht?
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl text-balance">
            Anlagen für Architekt:innen, Bauträger & Hausverwaltungen.
          </h2>
          <p className="mt-4 max-w-xl text-anthracite-300 text-pretty">
            Größere Projekte ab 8 Wohneinheiten oder Sonderanforderungen? Unser B2B-Team
            erstellt Ihnen ein verbindliches Angebot innerhalb von 24 Stunden.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Button asChild size="xl" variant="accent">
            <Link href="/kontakt" className="group">
              Beratung anfordern
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link href="tel:+4934316064242">+49 3431 6064-242</Link>
          </Button>
          <p className="text-xs text-anthracite-400">Mo–Fr 8:00–17:00 · Antwort in 24 h</p>
        </div>
      </div>
    </section>
  );
}
