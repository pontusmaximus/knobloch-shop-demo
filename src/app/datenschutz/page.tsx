import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rechtliches
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Datenschutzerklärung</h1>

        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground">
            Stand: 17. Mai 2026 · gemäß DSGVO Art. 13
          </p>

          <h2 className="mt-8 font-display text-xl">1. Verantwortlicher</h2>
          <p>
            Max Knobloch Nachf. GmbH<br />
            Bahnhofstraße 79, 04720 Döbeln<br />
            <a href="mailto:datenschutz@knobloch.de">datenschutz@knobloch.de</a>
          </p>

          <h2 className="mt-8 font-display text-xl">2. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>
            Bei einem Besuch unserer Website werden automatisch IP-Adresse, Datum und Uhrzeit des
            Zugriffs, Referrer und User-Agent gespeichert. Diese Daten werden nach 7 Tagen
            anonymisiert.
          </p>

          <h2 className="mt-8 font-display text-xl">3. Cookies</h2>
          <p>
            Wir verwenden technisch notwendige Cookies (Warenkorb, Sprachpräferenz) und —{" "}
            <strong>nur mit Ihrer Einwilligung</strong> — anonymisierte Analyse-Cookies via{" "}
            Plausible Analytics (DSGVO-konform, keine Personenbezogenheit).
          </p>

          <h2 className="mt-8 font-display text-xl">4. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf:
          </p>
          <ul>
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
            <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>

          <h2 className="mt-8 font-display text-xl">5. Auftragsverarbeitung</h2>
          <p>
            Wir setzen folgende Auftragsverarbeiter ein:
          </p>
          <ul>
            <li>Vercel Inc. (Hosting, USA, EU-Datenschutzklauseln)</li>
            <li>Plausible Analytics (DE-Server)</li>
            <li>Stripe Payments Europe (Zahlungsabwicklung)</li>
            <li>DHL Paket GmbH (Versand)</li>
          </ul>

          <h2 className="mt-8 font-display text-xl">6. Speicherdauer</h2>
          <p>
            Bestelldaten werden gemäß § 147 AO und § 257 HGB für 10 Jahre gespeichert. Anfragen
            werden nach 24 Monaten gelöscht.
          </p>

          <hr className="my-8" />
          <p className="text-xs text-muted-foreground">
            <em>
              Hinweis: Diese Datenschutzerklärung ist eine Demo-Vorlage. Für den Produktivbetrieb
              ist eine individuelle Anpassung durch einen Datenschutzbeauftragten erforderlich.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}
