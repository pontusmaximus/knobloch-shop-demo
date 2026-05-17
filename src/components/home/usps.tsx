import { Award, Factory, ShieldCheck, Sparkles, Truck, Users } from "lucide-react";

const usps = [
  {
    icon: Factory,
    title: "156 Jahre Manufaktur",
    text: "Seit 1869 fertigen wir in Döbeln in Sachsen — keine Massenware, jede Anlage wird montiert und qualitätsgeprüft.",
  },
  {
    icon: ShieldCheck,
    title: "DIN EN 13724 zertifiziert",
    text: "Alle Anlagen erfüllen die europäische Norm für Hausbriefanlagen — Voraussetzung für öffentliche Postversorgung.",
  },
  {
    icon: Truck,
    title: "Lieferung in 5 Werktagen",
    text: "Schnellkonfigurationen werden binnen 5 Werktagen versandfertig. CO₂-neutral mit DHL GoGreen.",
  },
  {
    icon: Award,
    title: "10 Jahre Garantie",
    text: "Volle Garantie auf Funktion & Verarbeitung. Auf Edelstahl V2A/V4A geben wir 25 Jahre auf Korrosionsbeständigkeit.",
  },
  {
    icon: Sparkles,
    title: "3 Mio. Konfigurationen",
    text: "Jede Anlage ist individuell — Material, Farbe, Fächeranzahl, Extras. Auch Sonderanfertigungen möglich.",
  },
  {
    icon: Users,
    title: "Persönliche Beratung",
    text: "Unser Team mit ~200 Mitarbeiter:innen berät Sie telefonisch und vor Ort. Für Architekt:innen, Bauträger und Privatkund:innen.",
  },
];

export function USPs() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Warum KNOBLOCH
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl text-balance">
            Sechs Gründe, die für uns sprechen.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:grid-cols-3">
          {usps.map((u) => {
            const Icon = u.icon;
            return (
              <div key={u.title} className="bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-anthracite-900 text-white dark:bg-white dark:text-anthracite-900">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight">{u.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{u.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
