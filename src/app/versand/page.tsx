import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versandkosten & Lieferzeiten",
  alternates: { canonical: "/versand" },
};

export default function VersandPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Versand
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Versand & Lieferung</h1>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Land</th>
                <th className="px-4 py-3 text-left">Lieferzeit</th>
                <th className="px-4 py-3 text-right">Kosten</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3">Deutschland</td>
                <td className="px-4 py-3 text-muted-foreground">5 Werktage</td>
                <td className="px-4 py-3 text-right font-semibold">
                  39 € · ab 999 € kostenlos
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Österreich</td>
                <td className="px-4 py-3 text-muted-foreground">6–8 Werktage</td>
                <td className="px-4 py-3 text-right font-semibold">79 €</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Schweiz / Liechtenstein</td>
                <td className="px-4 py-3 text-muted-foreground">8–10 Werktage</td>
                <td className="px-4 py-3 text-right font-semibold">129 € + Zoll</td>
              </tr>
              <tr>
                <td className="px-4 py-3">EU-Länder</td>
                <td className="px-4 py-3 text-muted-foreground">7–14 Werktage</td>
                <td className="px-4 py-3 text-right font-semibold">auf Anfrage</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Versand per Spedition bis zur Bordsteinkante. CO₂-neutral mit DHL GoGreen. Bei
          Schnelllieferer-Anlagen (grüner Hinweis) garantieren wir den Versand innerhalb von 5
          Werktagen.
        </p>
      </div>
    </section>
  );
}
