import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rechtliches
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Impressum</h1>

        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground">
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
          </p>

          <h2 className="mt-8 font-display text-xl">Anbieter</h2>
          <address className="not-italic">
            <strong>Max Knobloch Nachf. GmbH</strong>
            <br />
            Bahnhofstraße 79
            <br />
            04720 Döbeln
            <br />
            Deutschland
          </address>

          <h2 className="mt-8 font-display text-xl">Kontakt</h2>
          <p>
            Telefon: <a href="tel:+4934316064242">+49 3431 6064-242</a>
            <br />
            Telefax: +49 3431 6064-100
            <br />
            E-Mail: <a href="mailto:info@knobloch.de">info@knobloch.de</a>
            <br />
            Web: <a href="https://www.knobloch.de">www.knobloch.de</a>
          </p>

          <h2 className="mt-8 font-display text-xl">Vertretungsberechtigte Geschäftsführung</h2>
          <p>Geschäftsführer: [Name]</p>

          <h2 className="mt-8 font-display text-xl">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister
            <br />
            Registergericht: Amtsgericht Chemnitz
            <br />
            Registernummer: HRB [...]
          </p>

          <h2 className="mt-8 font-display text-xl">Umsatzsteuer</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer nach § 27 a UStG:
            <br />
            DE [...]
          </p>

          <h2 className="mt-8 font-display text-xl">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            [Name]
            <br />
            Bahnhofstraße 79
            <br />
            04720 Döbeln
          </p>

          <h2 className="mt-8 font-display text-xl">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 className="mt-8 font-display text-xl">Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <hr className="my-8" />
          <p className="text-xs text-muted-foreground">
            <em>
              Hinweis: Diese Seite ist eine Demo-Implementierung. In der finalen Version werden die
              Platzhalter [...] durch die echten Daten der Max Knobloch Nachf. GmbH ersetzt.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}
