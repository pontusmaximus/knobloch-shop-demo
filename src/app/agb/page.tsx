import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rechtliches
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">
          Allgemeine Geschäftsbedingungen
        </h1>

        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground">Stand: 17. Mai 2026</p>

          <h2 className="mt-6 font-display text-xl">§ 1 Geltungsbereich</h2>
          <p>
            Diese AGB gelten für alle Verträge zwischen der Max Knobloch Nachf. GmbH (nachfolgend
            "Anbieter") und Kunden über die Lieferung von Briefkastenanlagen, Paketboxen und
            Zubehör.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 2 Vertragsschluss</h2>
          <p>
            Die Präsentation der Produkte auf der Website stellt kein bindendes Angebot dar. Mit
            Klick auf "Kostenpflichtig bestellen" geben Sie ein verbindliches Angebot ab. Der
            Vertrag kommt durch unsere Auftragsbestätigung zustande.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 3 Preise und Versandkosten</h2>
          <p>
            Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer. Die
            Versandkosten werden im Checkout transparent ausgewiesen. Ab einem Warenwert von
            999 € liefern wir innerhalb Deutschlands versandkostenfrei.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 4 Lieferung</h2>
          <p>
            Schnellkonfigurationen werden innerhalb von 5 Werktagen nach Bestellung versendet.
            Individuelle Konfigurationen 3–6 Wochen nach Auftragsbestätigung. Die Lieferung
            erfolgt per Spedition bis zur Bordsteinkante.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 5 Zahlungsbedingungen</h2>
          <p>
            Es stehen zur Verfügung: Klarna (Rechnung/Raten), PayPal, Kreditkarte, SOFORT
            Überweisung, SEPA-Lastschrift, Vorkasse. Bei Vorkasse gewähren wir 2 % Skonto bei
            Zahlung innerhalb 3 Werktagen.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 6 Eigentumsvorbehalt</h2>
          <p>
            Die gelieferte Ware bleibt bis zur vollständigen Zahlung Eigentum des Anbieters.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 7 Gewährleistung</h2>
          <p>
            Es gilt die gesetzliche Gewährleistungsfrist von 2 Jahren ab Ablieferung. Zusätzlich
            gewähren wir 10 Jahre Garantie auf Funktion und Verarbeitung sowie 25 Jahre auf die
            Korrosionsbeständigkeit von Edelstahlmodellen.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 8 Widerrufsrecht</h2>
          <p>
            Verbraucher haben ein Widerrufsrecht. Details siehe{" "}
            <a href="/widerruf">Widerrufsbelehrung</a>. Sonderanfertigungen sind vom Widerrufsrecht
            ausgeschlossen.
          </p>

          <h2 className="mt-6 font-display text-xl">§ 9 Gerichtsstand</h2>
          <p>
            Bei Kaufleuten ist Gerichtsstand Döbeln. Es gilt deutsches Recht unter Ausschluss des
            UN-Kaufrechts.
          </p>
        </div>
      </div>
    </section>
  );
}
