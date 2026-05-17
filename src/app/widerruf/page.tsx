import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsrecht & Muster-Widerrufsformular",
  alternates: { canonical: "/widerruf" },
};

export default function WiderrufPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rechtliches
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Widerrufsrecht</h1>

        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert">
          <h2 className="font-display text-xl">Widerrufsbelehrung</h2>
          <p>
            Sie haben das Recht, binnen <strong>14 Tagen</strong> ohne Angabe von Gründen diesen
            Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder
            ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Ware in Besitz
            genommen haben bzw. hat.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          </p>
          <p>
            Max Knobloch Nachf. GmbH<br />
            Bahnhofstraße 79<br />
            04720 Döbeln<br />
            E-Mail: <a href="mailto:widerruf@knobloch.de">widerruf@knobloch.de</a>
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
            E-Mail) über Ihren Entschluss informieren.
          </p>

          <h2 className="mt-8 font-display text-xl">Ausschluss des Widerrufsrechts</h2>
          <p>
            Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht
            vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung
            durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen
            Bedürfnisse des Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB).
          </p>
          <p>
            Dies betrifft insbesondere alle individuellen Konfigurationen (Konfigurator),
            Sonderfarben und Maßanfertigungen.
          </p>

          <h2 className="mt-8 font-display text-xl">Folgen des Widerrufs</h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen
            Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von
            uns angebotene Standardlieferung gewählt haben), unverzüglich und spätestens binnen
            14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns
            eingegangen ist.
          </p>
        </div>
      </div>
    </section>
  );
}
