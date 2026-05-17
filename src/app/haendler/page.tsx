import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, FileText, Handshake, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Für Profis · Architekten & Bauträger",
  description:
    "B2B-Portal für Architekten, Bauträger und Wohnungswirtschaft. BIM-Daten, Sonderkonditionen, Projekt-Beratung.",
  alternates: { canonical: "/haendler" },
};

const features = [
  {
    icon: FileText,
    title: "BIM-Daten",
    text: "Anlagen-Modelle im IFC- und Revit-Format für Ihre Planung. Sofortiger Download.",
  },
  {
    icon: Briefcase,
    title: "Projekt-Konditionen",
    text: "Staffelpreise ab 8 Wohneinheiten. Volumenrabatte für Großprojekte.",
  },
  {
    icon: Handshake,
    title: "Architekten-Beratung",
    text: "Persönliche Beratung durch unser Vertriebsteam — auf Wunsch auch vor Ort.",
  },
  {
    icon: Layers,
    title: "Musterservice",
    text: "Materialmuster und Farbfächer kostenfrei. Auf Wunsch auch Anschauungsexemplare.",
  },
];

export default function HaendlerPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="container relative">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            B2B-Portal
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-ink-900 md:text-7xl text-balance">
            Für Architekt:innen<br />und Bauträger.
          </h1>
          <p className="mt-6 max-w-2xl text-ink-600 text-pretty">
            BIM-Daten, projektspezifische Konditionen, persönliche Ansprechpartner. Für alle, die
            in Wohnungs- und Gewerbebau Anlagen planen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" variant="accent" className="shadow-lg shadow-brand-600/20">
              <Link href="/kontakt">Projektanfrage stellen</Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href="tel:+4934316064242">B2B-Hotline</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-5 rounded-2xl border bg-card p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{f.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 md:text-5xl text-balance">
            Sprechen Sie mit unserem B2B-Team.
          </h2>
          <p className="mt-4 text-ink-600">
            Wir betreuen Projekte von 8 bis 800 Wohneinheiten. Unser Vertriebsteam meldet sich
            innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6 shadow-lg shadow-brand-600/20">
            <Link href="/kontakt" className="group">
              Beratung anfragen
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
