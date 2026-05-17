export type Faq = { question: string; answer: string };

export const generalFaqs: Faq[] = [
  {
    question: "Wie lange ist die Lieferzeit meiner Briefkastenanlage?",
    answer:
      'Vorkonfigurierte Anlagen (mit grünem "Schnelle Lieferung"-Hinweis) liefern wir innerhalb von 5 Werktagen ab Bestellung. Individuelle Konfigurationen produzieren wir auf Auftrag — Lieferzeit je nach Umfang 3–6 Wochen. Im Konfigurator wird die voraussichtliche Lieferzeit live mit angezeigt.',
  },
  {
    question: "Sind Ihre Briefkästen nach DIN EN 13724 zertifiziert?",
    answer:
      "Ja, alle KNOBLOCH-Briefkästen erfüllen die Anforderungen der DIN EN 13724 (Mindestmaße für Einwurföffnungen, Schutz vor Witterungseinflüssen, Sicherheit). Die Norm ist Voraussetzung für die Aufstellung an öffentlichen Postversorgungspunkten.",
  },
  {
    question: "Welche Materialien sind für meinen Standort geeignet?",
    answer:
      "Für normale Wohnlagen empfehlen wir pulverbeschichteten Stahl oder Edelstahl V2A. In Küstennähe (bis ca. 50 km zum Meer), in Schwimmbädern oder in Industriegebieten mit aggressiver Luft sollten Sie Edelstahl V4A wählen — er ist Molybdän-legiert und damit salzwasserbeständig.",
  },
  {
    question: "Kann ich meine Konfiguration speichern und später bestellen?",
    answer:
      "Ja. Sie erhalten eine eindeutige Konfigurations-URL, die Sie speichern, teilen oder als PDF exportieren können — etwa für Ihren Architekten oder Hausverwalter. Bei Anlagen für Mehrfamilienhäuser unterstützen wir Sie zusätzlich mit einer kostenlosen telefonischen Beratung.",
  },
  {
    question: "Wer übernimmt die Montage?",
    answer:
      "Wir liefern montagefertig inkl. Montageanleitung und Befestigungsmaterial. Für die handwerkliche Aufstellung empfehlen wir Ihren Tischler, Schlosser oder Garten-/Landschaftsbauer. Auf Wunsch vermitteln wir Ihnen einen unserer zertifizierten KNOBLOCH-Montagepartner in Ihrer Region.",
  },
  {
    question: "Gibt es eine Garantie auf die Anlage?",
    answer:
      "Ja. Auf alle KNOBLOCH-Briefkastenanlagen geben wir 10 Jahre Garantie auf Funktion und Verarbeitung sowie 25 Jahre auf die Korrosionsbeständigkeit bei Edelstahlmodellen. Pulverbeschichtungen sind 10 Jahre farbecht.",
  },
  {
    question: "Wie funktioniert die Paketannahme bei der PAKET-Reihe?",
    answer:
      "Die Paketboxen sind mit einem Kurier-Codesystem ausgestattet, das DHL, Hermes, DPD, GLS und UPS akzeptieren. Sie hinterlegen den Code einmal in der App des jeweiligen Anbieters — die Pakete werden dann ohne Ihre Anwesenheit eingeworfen. Optional bieten wir eine App-basierte Lösung mit Push-Benachrichtigung an.",
  },
  {
    question: "Was bedeutet das 2 %-Express-Rabatt-Angebot?",
    answer:
      "Wenn Sie Ihre Auftragsbestätigung innerhalb von 3 Werktagen unterschrieben zurücksenden, gewähren wir 2 % Rabatt auf den Nettoauftragswert. Das spart uns Bearbeitungszeit — und gibt Ihnen einen Preisvorteil.",
  },
];

export const technicalFaqs: Faq[] = [
  {
    question: "Welche Wandstärken sind für Unterputz-Anlagen erforderlich?",
    answer:
      "Bei Unterputz-Montage benötigen Sie eine Wandstärke von mindestens 36 cm. Wir liefern Einbaurahmen passend zu Ihrer tatsächlichen Wandstärke — diese geben Sie bei der Bestellung an.",
  },
  {
    question: "Wie tief muss eine freistehende Anlage einbetoniert werden?",
    answer:
      "Wir empfehlen ein Betonfundament von mindestens 60 × 60 × 80 cm (Höhe × Breite × Tiefe), in das der Sockel der Anlage 25 cm tief eingelassen wird. Detaillierte Fundament-Pläne erhalten Sie mit der Lieferung.",
  },
  {
    question: "Ist die Anlage barrierefrei nach DIN 18040?",
    answer:
      "Auf Wunsch fertigen wir alle Anlagen auf eine Entnahmehöhe zwischen 85 und 105 cm an — das entspricht den Anforderungen der DIN 18040-2 für barrierefreies Bauen.",
  },
  {
    question: "Können Stanzungen, Logos oder Gravuren individuell angebracht werden?",
    answer:
      "Ja. Wir bieten Lasergravur (auch farbig hinterlegt), CNC-Stanzungen und Tampondruck. Senden Sie uns Ihr Logo als Vektorgrafik (.svg / .ai / .pdf) — wir erstellen Ihnen ein verbindliches Angebot.",
  },
];
