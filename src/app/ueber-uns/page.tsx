import type { Metadata } from "next";
import Link from "next/link";
import { Award, Building2, Factory, Globe, Hammer, Heart, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heritage } from "@/components/home/heritage";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Über uns — 156 Jahre Knobloch",
  description:
    "Max Knobloch Nachf. GmbH — Deutschlands ältester Briefkastenhersteller seit 1869. Manufaktur in Döbeln, Sachsen, mit rund 200 Mitarbeiter:innen.",
  alternates: { canonical: "/ueber-uns" },
};

const facts = [
  { icon: Factory, label: "Standort", value: "Döbeln, Sachsen" },
  { icon: Users, label: "Mitarbeiter:innen", value: "~200" },
  { icon: Building2, label: "Gegründet", value: "1869" },
  { icon: Globe, label: "Märkte", value: "DE · AT · CH · EU" },
  { icon: Award, label: "Auszeichnungen", value: "Made in Germany" },
  { icon: Hammer, label: "Manufakturen", value: "1 Standort" },
];

const values = [
  {
    icon: Hammer,
    title: "Handwerk",
    text: "Jede Anlage wird in Döbeln gefertigt, montiert und qualitätsgeprüft. Kein Outsourcing, kein OEM.",
  },
  {
    icon: Heart,
    title: "Tradition",
    text: "Seit 1869 in Familienhand. Sechs Generationen Erfahrung im Briefkastenbau.",
  },
  {
    icon: Truck,
    title: "Geschwindigkeit",
    text: "Schnellkonfigurationen verlassen das Werk in 5 Werktagen — schneller als jeder Industrie-Mitbewerber.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <section className="border-b bg-anthracite-900 py-16 text-white lg:py-24">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Seit 1869
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl text-balance">
            Die älteste Briefkasten-<br />manufaktur Deutschlands.
          </h1>
          <p className="mt-6 max-w-2xl text-anthracite-200 text-pretty">
            Was 1869 als kleine Werkstatt in Döbeln begann, ist heute eine der traditionsreichsten
            Manufakturen Sachsens. Wir fertigen Briefkastenanlagen, Paketboxen und Abholstationen
            für Privatkunden, Bauträger und Architekt:innen weltweit.
          </p>
        </div>
      </section>

      <section className="border-b py-12 lg:py-16">
        <div className="container">
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-2xl border bg-card p-5">
                  <Icon className="h-5 w-5 text-anthracite-400" />
                  <dt className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="border-b py-16 lg:py-24" id="werte">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Werte
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-balance">
              Drei Prinzipien, ein Versprechen.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-card p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-anthracite-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div id="geschichte">
        <Heritage />
      </div>

      <section className="border-b py-16 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Manufaktur Döbeln
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-balance">
              Eine Anlage, ein Team, ein Standort.
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              In unserer Manufaktur in Döbeln vereinen wir hauseigene Lasertechnik, CNC-Stanzen,
              Schweißroboter, Pulverbeschichtung und manuelle Endmontage. Jede Anlage durchläuft
              eine 12-Punkte-Qualitätskontrolle — und verlässt nur dann das Werk.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/kontakt">Werksführung anfragen</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/karriere">Karriere bei Knobloch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
