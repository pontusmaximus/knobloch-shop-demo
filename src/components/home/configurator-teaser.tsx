import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { n: 1, label: "Montagetyp", value: "Freistehend" },
  { n: 2, label: "Material", value: "Edelstahl V2A" },
  { n: 3, label: "Farbe", value: "RAL 7016 Anthrazit" },
  { n: 4, label: "Orientierung", value: "Senkrecht" },
  { n: 5, label: "Fächer", value: "3 Wohneinheiten" },
  { n: 6, label: "Entnahme", value: "Vorne" },
  { n: 7, label: "Extras", value: "Klingeltaster · LED" },
];

export function ConfiguratorTeaser() {
  return (
    <section className="relative overflow-hidden bg-anthracite-50 py-16 dark:bg-anthracite-950 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Der intelligente Konfigurator
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl text-balance">
            7 Schritte zu Ihrer Anlage —{" "}
            <span className="italic">mit Live-Preis.</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Anders als der alte Konfigurator zeigt unsere neue Lösung Preis und Vorschau in
            Echtzeit. Sie sehen sofort, was Sie kostet — und können Ihre Konfiguration teilen
            oder als PDF speichern.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Live-Preisberechnung in Echtzeit",
              "Visuelle Live-Vorschau Ihrer Anlage",
              "Über 100 RAL-Farben durchsuchbar",
              "Konfigurations-Link teilen + PDF-Export",
              "Lieferzeit-Vorhersage je Konfiguration",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="/konfigurator" className="group">
                Konfigurator starten
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/konfigurator/freistehend">Demo ansehen</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Live-Konfiguration
                </p>
                <p className="text-sm font-semibold">Freistehende Anlage · 3 Fach</p>
              </div>
              <div className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                Schnelle Lieferung
              </div>
            </div>

            <ol className="mt-4 space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="flex items-center gap-3 rounded-md border border-transparent bg-secondary/40 px-3 py-2 text-sm"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-anthracite-900 text-[11px] font-semibold text-white">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="text-sm font-medium">{s.value}</p>
                  </div>
                  <Check className="h-4 w-4 text-emerald-600" />
                </li>
              ))}
            </ol>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-anthracite-900 px-4 py-3 text-white">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-anthracite-300">
                  Live-Preis · inkl. MwSt.
                </p>
                <p className="font-display text-2xl">1.387,00 €</p>
              </div>
              <Button variant="accent" size="sm">
                In den Warenkorb
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
