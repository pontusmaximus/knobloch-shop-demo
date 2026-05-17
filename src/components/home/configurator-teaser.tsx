import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { n: 1, label: "Montagetyp", value: "Freistehend" },
  { n: 2, label: "Verkleidung", value: "RI241 mit Regenkante" },
  { n: 3, label: "Material", value: "Edelstahl V2A" },
  { n: 4, label: "Farbe", value: "RAL 7016 Anthrazit" },
  { n: 5, label: "Befestigung", value: "Einbetonieren" },
  { n: 6, label: "Fächer", value: "3 Wohneinheiten" },
  { n: 7, label: "Funktionskasten", value: "Video-Sprechanlage" },
];

export function ConfiguratorTeaser() {
  return (
    <section className="relative overflow-hidden border-b bg-white py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />

      <div className="container relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Der intelligente Konfigurator
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-900 md:text-5xl text-balance">
            Konfigurieren in Echtzeit <span className="text-brand-600">— mit Live-Preis.</span>
          </h2>
          <p className="mt-4 max-w-lg text-ink-600 text-pretty">
            Anders als der alte Konfigurator zeigt unsere neue Lösung Preis und Vorschau in
            Echtzeit. Sie sehen sofort, was Sie kostet — und können Ihre Konfiguration teilen
            oder als PDF speichern.
          </p>

          <ul className="mt-6 space-y-2.5">
            {[
              "Live-Preisberechnung in Echtzeit",
              "Visuelle SVG-Vorschau Ihrer Anlage",
              "Über 100 RAL-Farben durchsuchbar",
              "Konfigurations-Link teilen + PDF-Export",
              "Lieferzeit-Vorhersage je Konfiguration",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent" className="shadow-lg shadow-brand-600/20">
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
          <div className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-ink-100 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-500">
                  Live-Konfiguration
                </p>
                <p className="text-sm font-semibold text-ink-900">
                  Freistehende Anlage · 3 Fach
                </p>
              </div>
              <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                Schnelle Lieferung
              </div>
            </div>

            <ol className="mt-4 space-y-1.5">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="flex items-center gap-3 rounded-md bg-ink-50 px-3 py-2 text-sm"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-[11px] font-bold text-white">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-ink-500">{s.label}</p>
                    <p className="text-sm font-medium text-ink-900">{s.value}</p>
                  </div>
                  <Check className="h-4 w-4 text-emerald-600" />
                </li>
              ))}
            </ol>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-50 border border-brand-100 px-4 py-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-600">
                  Live-Preis · inkl. MwSt.
                </p>
                <p className="font-display text-2xl font-bold text-ink-900">1.387,00 €</p>
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
