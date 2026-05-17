# Angebot · Modernisierung Online-Präsenz Max Knobloch Nachf. GmbH

**An:** Geschäftsleitung der Max Knobloch Nachf. GmbH, Döbeln
**Datum:** 17. Mai 2026
**Gegenstand:** Komplette Neuauflage Online-Shop und Briefkasten-Konfigurator

---

## Executive Summary

Die heutigen KNOBLOCH-Online-Präsenzen (`knobloch-konfigurator.com`, `knobloch-shop.de`,
`briefkastenanlagen.net`, `max-knobloch.com`) sind technisch in die Jahre gekommen:
- keine erkennbare Mobile-Optimierung (Mobile-Traffic > 60 % im DIY-/Bauherren-Segment)
- der zentrale Konfigurator zeigt **keine Live-Preise** und **keine Visualisierung**
- 4 fragmentierte Domains zerstreuen Markenwahrnehmung und SEO-Power
- keine modernen Trust- und Conversion-Elemente (Reviews, Trusted Shops, …)
- keine Headless-Architektur — Anpassungen sind teuer und langsam

**Ich habe ein voll funktionsfähiges Demo-Frontend gebaut**, das diese Probleme löst — als
**konkrete Diskussions- und Vergabegrundlage**. Sie können es heute live öffnen, anklicken
und mit Ihrer aktuellen Lösung vergleichen.

**🔗 Live-Demo:** [knobloch-shop-demo.vercel.app](https://knobloch-shop-demo.vercel.app)
**📦 Quellcode:** [github.com/pontusmaximus/knobloch-shop-demo](https://github.com/pontusmaximus/knobloch-shop-demo)

---

## Was ist bereits gebaut

Ein production-ready Next.js-Frontend mit:

| Bereich | Status |
|---------|--------|
| Mobile-first responsive Design | ✅ |
| Homepage mit Hero, Kategorien, USPs, Heritage, Testimonials, FAQ | ✅ |
| 7-Step-Konfigurator mit **Live-Preisberechnung** und Live-Vorschau | ✅ |
| 9 Produktkategorien (6 Briefkastenanlagen + 3 Paket-Lösungen) | ✅ |
| Produktdetail-Seiten mit Galerie, Specs, Schema.org-Markup | ✅ |
| Persistenter Warenkorb (localStorage) + Mini-Cart | ✅ |
| 4-Step-Checkout mit allen relevanten Zahlungsarten | ✅ |
| Service-Bereich: Über uns, Geschichte, Kontakt, B2B-Portal | ✅ |
| Rechtsseiten: Impressum, AGB, Datenschutz, Widerruf, Versand | ✅ |
| SEO-Foundation: Sitemap, robots.txt, Schema.org, Meta-Tags | ✅ |
| DSGVO-Cookie-Banner mit granularer Einwilligung | ✅ |
| 42 prerendered statische Seiten · ~105 KB Shared-JS | ✅ |

---

## Was es bringt — Mehrwert gegenüber dem Status quo

| Ihr aktueller Stand | Mein Vorschlag |
|---------------------|----------------|
| Konfigurator ohne Live-Preis | Live-Preisberechnung in Echtzeit |
| Statische Produktbilder | Interaktive Live-Vorschau im Konfigurator |
| Keine Konfigurations-Persistenz | URL-Sharing + (Phase 2) PDF-Export |
| 4 fragmentierte Domains | Eine Marken-Domain mit allen Pfaden |
| Klassisches CMS, schwere Pflege | Headless-Architektur · CMS-Edits in Sekunden live |
| Vermutlich keine SEO-Strukturen | Schema.org Product/Organization/FAQ überall |
| Manuelle Angebotserstellung | (Phase 2) Automatisierte Workflow + ERP-Anbindung |
| Keine Architekten-/B2B-Self-Service | B2B-Portal · (Phase 3) BIM-Daten-Export |

---

## Phasen-Roadmap

### Phase 1 — Demo-Frontend ✅ ABGESCHLOSSEN
- Lieferung: dieses Repository · Vercel-Deploy
- Aufwand bei mir: vollständig vor-investiert
- Ihre Investition: **0 €** — als Pitch

### Phase 2 — MVP-Launch (8–12 Wochen)
- Sanity CMS-Anbindung — Content-Pflege durch Ihr Team
- Headless Commerce (Medusa.js) — Warenkorb, Checkout, Bestellungen, ERP-Bridge
- Echte Payment-Integration (Stripe + Klarna + PayPal + SEPA + Vorkasse)
- Trusted Shops Zertifizierung + Käuferschutz
- Migration der Bestandsprodukte und SEO-Redirect-Map
- E-Mail-Pipeline (Bestellbestätigung, Versandstatus, Newsletter)
- Performance-Audit + Lighthouse 95+
- **Indikativ:** 32.000 – 60.000 € netto

### Phase 3 — Konfigurator 2.0 (12–16 Wochen)
- 3D-Visualisierung via React Three Fiber — echte Live-Renderings
- WebXR-AR — Briefkasten an der eigenen Hausfassade vorschauen
- BIM-Datenexport (IFC, Revit) für Architekten
- KI-Chatbot-Beratung mit Konfigurations-Empfehlung
- ERP-Anbindung — automatisierte Angebotserstellung
- **Indikativ:** 48.000 – 80.000 € netto

### Phase 4 — Laufender Betrieb
- Performance-Marketing-Setup (Google Ads, Meta Ads, SEO-Begleitung)
- B2B-Portal (Architekten, Bauträger, Wohnungswirtschaft)
- Affiliate-/Reseller-Programm
- Hosting + SaaS + Wartung
- **Indikativ:** ab 5.000 € / Monat + ~300 € Hosting

---

## Zusammenarbeit — Modelle

### Modell A: **Full-Service-Vergabe**
Ich übernehme Phase 2 + 3 + 4 als Generalunternehmer. Sie haben einen Ansprechpartner,
fixe Meilensteine und eine garantierte Lieferqualität.

### Modell B: **Repo-Übergabe + Knowledge-Transfer**
Sie übernehmen den Code, ich übergebe Repository, Dokumentation und 5 Tage
Knowledge-Transfer für Ihr internes IT-Team oder Ihren bisherigen Dienstleister.

### Modell C: **Hybrid**
Phase 2 setze ich um (Launch-Risiko), Phase 3+4 übernimmt Ihr Team mit
On-Demand-Beratung von mir (Tagessatz vereinbart).

---

## Nächste Schritte

1. **Demo-Walkthrough** (60 min) — wir gehen gemeinsam durch die Vercel-Deploy-URL
2. **Anforderungs-Workshop** (½ Tag in Döbeln oder remote) — Feinabstimmung Phase 2
3. **Festpreis-Angebot** auf Basis Workshop-Erkenntnisse (binnen 5 Werktagen)
4. **Vertragsabschluss** — Start Phase 2 innerhalb 2 Wochen nach Auftragserteilung

---

## Falls Sie nicht zusagen

Auch das ist OK. In diesem Fall werde ich:

- die Demo unter eigenem Namen weiterentwickeln und als **freies Beispiel-Projekt** für
  modernen E-Commerce auf GitHub/Vercel öffentlich machen
- die spezifischen KNOBLOCH-Inhalte (Produkte, Texte, Markennennung) **vollständig entfernen**
- die Demo nicht als kommerzielles Produkt an Wettbewerber verkaufen

Es entstehen Ihnen **keine Kosten und keine Verpflichtungen** durch die Demo-Erstellung.

---

## Kontakt

*Hier Ihre Kontaktdaten eintragen, bevor Sie die Datei an Knobloch senden:*

- **Name:**
- **E-Mail:**
- **Telefon:**
- **GitHub-Profil:**
- **Portfolio:**

---

*Mit freundlichen Grüßen — und Vorfreude auf 156 weitere Jahre Knobloch im digitalen Zeitalter.*
