import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-b bg-ink-50">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container relative grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Beratung gewünscht?
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 md:text-5xl text-balance">
            Anlagen für Architekt:innen,<br />
            Bauträger & Hausverwaltungen.
          </h2>
          <p className="mt-4 max-w-xl text-ink-600 text-pretty">
            Größere Projekte ab 8 Wohneinheiten oder Sonderanforderungen? Unser B2B-Team
            erstellt Ihnen ein verbindliches Angebot innerhalb von 24 Stunden.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Button asChild size="xl" variant="accent" className="shadow-lg shadow-brand-600/20">
            <Link href="/kontakt" className="group">
              Beratung anfordern
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="tel:+4934316064242">
              <Phone className="h-4 w-4" />
              +49 3431 6064-242
            </Link>
          </Button>
          <p className="text-xs text-ink-500">Mo–Fr 8:00–17:00 · Antwort in 24 h</p>
        </div>
      </div>
    </section>
  );
}
