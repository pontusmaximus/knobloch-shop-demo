# Modernisierungs-Plan: KNOBLOCH Briefkasten Onlineshop

**Ziel:** Vollständige Modernisierung des Onlineshops und Konfigurators der Max Knobloch Nachf. GmbH (Deutschlands ältester Briefkastenhersteller, seit 1869, Sitz Döbeln).

**Auftraggeber-Pitch:** Demo-Frontend in Git Repo + Vercel Deploy, das Knobloch als Angebot präsentiert werden kann.

---

## 1. Ist-Analyse der bestehenden Systeme

### 1.1 Aktuelle Domains
| Domain | Zweck | Technologie | Zustand |
|--------|-------|-------------|---------|
| `knobloch-konfigurator.com` | Marketing + Konfigurator-Einstieg | Klassisches PHP, kein modernes Framework | Veraltet |
| `knobloch-shop.de` | E-Commerce Shop | Vermutlich Shopware/OXID (alt) | Veraltet |
| `briefkastenanlagen.net` | Zweite Konfigurator-Domain | Unklar | Redundant |
| `max-knobloch.com` | Corporate / weitere Konfigurator-Eingänge | Unklar | Fragmentiert |

**Problem:** Domain-Fragmentierung — Kunden müssen zwischen mindestens 4 Domains wechseln. Markenwahrnehmung leidet, SEO-Power wird verteilt.

### 1.2 Frontend-Schwächen
- **Keine erkennbare Mobile-Optimierung** (kritisch — Mobile-Traffic im DIY/Bauherren-Segment > 60%)
- **Hero-Image unoptimiert** (kein WebP/AVIF, keine responsive Images)
- **Kein Lazy-Loading**, keine Code-Splitting → schlechte LCP/FID-Werte
- **Layout-Shifts** durch fehlende Image-Dimensionen
- **Inkonsistente Navigation** zwischen Konfigurator-Domain und Shop
- **6-spaltiges Montagetyp-Grid** auf Mobile unbenutzbar

### 1.3 Konfigurator-Schwächen
- **7–9 Schritte ohne Live-Preisberechnung** — Kunden konfigurieren "blind"
- **Keine visuelle Live-Vorschau** — nur statische Produktfotos pro Variante
- **Keine 3D-Darstellung** — bei einem Konfigurator-getriebenen Produkt das größte Manko
- **100+ RAL-Farben ohne Filterung** (kein Such-Input, keine Kategorisierung warm/kalt/etc.)
- **Keine Zusammenfassung** vor finaler Anfrage
- **Kein PDF-Export** der Konfiguration für den Kunden / Architekten
- **Hybrid-Flow** "Schnellkonfiguration → Shop" vs. "Custom → Anfrage" verwirrt Kunden

### 1.4 Backend / Geschäftsprozess
- **"Beratung anfordern" ist manueller Prozess** (24–48h Angebotserstellung)
- **Keine erkennbare CRM-Anbindung** sichtbar (Salesforce/HubSpot/eigenes System unbekannt)
- **Keine API-Schnittstellen** für B2B-Partner (Architekten, Planer, BIM)
- **Konfigurations-Daten nicht persistent** für Kunden ("Wunschliste speichern" fehlt)
- **Kein Account-Bereich** mit Bestellhistorie / Wiederbestellung

### 1.5 SEO / Marketing
- **Schwache Meta-Descriptions** (Stichprobe)
- **Kein Schema.org Markup** (Product, Organization, Breadcrumb, FAQ)
- **Keine strukturierten Produktdaten** für Google Shopping / Google Merchant
- **Keine Reviews-Aggregation** sichtbar (Trustpilot, Google Reviews, Trusted Shops)
- **Newsletter-Opt-in fehlt** → keine E-Mail-Marketing-Pipeline

### 1.6 Tech-Stack (vermutet)
- PHP-basiert, evtl. Shopware 5 oder OXID
- Eigene Konfigurator-Software (custom built)
- Keine erkennbaren modernen Build-Tools, kein TypeScript, kein React/Vue
- Vermutlich keine Headless-Architektur

---

## 2. Soll-Konzept: Was wir bauen

### 2.1 Architektur-Empfehlung (Mid-Term Vision)
**Headless Commerce Stack** mit Trennung von Frontend, CMS und Commerce-Backend:

```
┌─────────────────────────────────────────────────┐
│  Frontend (Next.js 15 App Router, Vercel Edge) │
│  • Marketing + Shop + Konfigurator vereint     │
│  • SSR + ISR für SEO                           │
│  • React Server Components                     │
└──────────────┬──────────────────────────────────┘
               │
       ┌───────┴────────┬──────────────┬─────────────────┐
       ▼                ▼              ▼                 ▼
┌─────────────┐  ┌────────────┐  ┌──────────┐   ┌────────────┐
│   CMS       │  │ Commerce   │  │ Search   │   │ Konfig.    │
│ (Sanity /   │  │ (Medusa /  │  │ (Algolia │   │ Engine     │
│  Storyblok) │  │  Shopify / │  │  / Meili)│   │ (Custom    │
│             │  │  Shopware  │  │          │   │  /BIM API) │
│             │  │  Frontends)│  │          │   │            │
└─────────────┘  └────────────┘  └──────────┘   └────────────┘
       │                │              │                 │
       └────────────────┴──────────────┴─────────────────┘
                                │
                ┌───────────────┴────────────────┐
                ▼                                ▼
        ┌──────────────┐                  ┌─────────────┐
        │ Stripe/Mollie│                  │ ERP/CRM     │
        │  Klarna      │                  │ (HubSpot /  │
        │  PayPal      │                  │  SAP/etc.)  │
        └──────────────┘                  └─────────────┘
```

### 2.2 Empfohlener Tech-Stack
| Layer | Technologie | Begründung |
|-------|-------------|------------|
| **Framework** | Next.js 15 (App Router) | Industry-Standard, SSR/ISR/SSG, Edge-fähig |
| **Sprache** | TypeScript | Typsicherheit für komplexen Konfigurator-State |
| **Styling** | Tailwind CSS v4 | Design-System-fähig, kleine Bundles |
| **UI-Komponenten** | shadcn/ui + Radix | Zugänglich, anpassbar, A11y-konform |
| **Animationen** | Framer Motion | Smooth UX-Transitions im Konfigurator |
| **3D-Konfigurator** | React Three Fiber + Three.js | Interaktive Briefkasten-Vorschau |
| **State** | Zustand + URL-State (nuqs) | Konfigurations-Sharing via URL |
| **Forms** | React Hook Form + Zod | Type-safe Validation |
| **Hosting** | Vercel | Optimal für Next.js, Edge-Network |
| **CMS** | Sanity (Phase 2) | Live-Preview, Strukturierte Inhalte |
| **Commerce** | Medusa.js (Phase 2) | Open-Source, headless, Self-Hosted möglich |
| **Search** | Meilisearch (Phase 2) | Schnell, deutsche Sprachunterstützung |
| **Analytics** | Vercel Analytics + Plausible | DSGVO-konform |
| **Payments** | Stripe + Klarna + PayPal | Deutscher Markt: SOFORT/SEPA + Rechnung |
| **E-Mail** | Resend / Postmark | Transaktionale Mails (Bestätigung, Versand) |

### 2.3 Design-Sprache
- **Farbpalette:** Anthrazit (#1A1D21), Edelstahl (#C8CCD1), Akzent-Gelb (#FFB800 — wie Post-Gelb, Branding-Anlehnung), Weiß
- **Typografie:** Inter (UI), Playfair Display (Akzente für Premium-Feel)
- **Bildsprache:** Architektur-Kontext-Fotos (Briefkasten am Haus), High-Quality Produkt-Renderings
- **Tonalität:** Premium-Handwerk + 156 Jahre Tradition + Moderne Technologie
- **Layout-Prinzip:** Mobile-First, großzügige Whitespace, klare CTAs, max. 1280px Content-Width

---

## 3. Lieferumfang Phase 1 (dieser Sprint — Demo-Frontend)

### 3.1 Seiten
1. **Homepage** — Hero, USPs, Produktkategorien, Konfigurator-Teaser, Trust-Elemente, Newsletter
2. **Produktkategorie: Briefkastenanlagen** — Filterbare Übersicht der 6 Montagetypen
3. **Produktkategorie: Paketboxen** — Übersicht
4. **Produktdetail-Seite** — Galerie, Specs, Konfigurator-Einstieg, Bewertungen
5. **Multi-Step-Konfigurator** mit Live-Preis und Vorschau (Mock-Visualisierung)
6. **Warenkorb / Mini-Cart**
7. **Checkout** (Mock — Adresse, Versand, Zahlung, Bestätigung)
8. **Über uns** — 156 Jahre Geschichte, Made in Germany, Team
9. **Service** — Montage, DIN EN 13724, Ersatzteile, FAQ
10. **Kontakt** — Formular + Karte + Beratungs-Slot-Buchung
11. **Rechtliches** — Impressum, AGB, Datenschutz, Widerruf, Versand

### 3.2 Komponenten
- Header mit Sticky-Nav, Mega-Menu, Mobile-Drawer
- Footer mit Newsletter, Links, Social, Trust-Badges
- Konfigurator-Steps mit Progress-Indicator
- Live-Preis-Sidebar mit Aufschlüsselung
- Vorschau-Component (interaktiv, Material/Farbe live)
- Cart-Drawer
- Trust-Section (Trusted Shops, Made in Germany, Garantie)
- Product-Card mit Quick-View
- FAQ-Accordion mit Schema.org
- Cookie-Banner (DSGVO-konform)

### 3.3 Technische Features
- **Mobile-First Responsive** (320px bis 4K)
- **Dark/Light-Mode** vorbereitet
- **Performance:** Lighthouse 95+ Ziel (LCP < 2.5s, CLS < 0.1)
- **A11y:** WCAG 2.1 AA-konform, Keyboard-Navigation, ARIA-Labels
- **SEO:** Meta-Tags, OpenGraph, Twitter-Cards, Sitemap, robots.txt, Schema.org
- **I18n vorbereitet** (DE primär, EN als Option für B2B-Export)
- **Konfigurations-Sharing** via URL-Parameter
- **PDF-Export** der Konfiguration

### 3.4 Was bewusst NICHT in Phase 1
- Echte Payment-Integration (Mock im Checkout)
- Echtes CMS (statische Mock-Daten in Code/JSON)
- Echte 3D-Modelle (interaktive 2D-Vorschau ist im Mock — reicht für Sales-Pitch)
- Backend-Anbindung an Knobloch's ERP (Phase 3)
- Account-System mit Login (Skizziert, nicht implementiert)

---

## 4. Phasen-Roadmap (für das Knobloch-Angebot)

### Phase 1 — Demo-Frontend (jetzt, Aufwand: kostenfrei als Pitch)
✅ Modernes Frontend als Vercel-Deploy zeigbar
✅ Live-Konfigurator mit Live-Preis
✅ Mobile-optimiert
✅ SEO-fundament gelegt

### Phase 2 — MVP-Launch (8–12 Wochen)
- CMS-Anbindung (Sanity) für Produktdaten, Content-Pflege durch Knobloch-Team
- Headless Commerce (Medusa.js) für Warenkorb, Checkout, Bestellungen
- Echte Payment-Integration (Stripe, Klarna, PayPal, Rechnung, SEPA)
- E-Mail-Pipeline (Bestellbestätigung, Versandinfo, Newsletter)
- Trusted Shops Zertifizierung
- DSGVO-Audit + Cookie-Consent-Tool
- Performance-Optimierung + Lighthouse-Audit
- Analytics-Setup (Plausible / GA4)
- Migration der Bestandsprodukte aus altem Shop
- Redirect-Map alte → neue URLs für SEO

### Phase 3 — Konfigurator 2.0 (12–16 Wochen)
- Echte 3D-Visualisierung mit React Three Fiber
- WebGL-basierte Hausfassaden-AR-Vorschau (Smartphone)
- BIM-Datenexport (IFC/Revit) für Architekten
- Konfigurator-API für B2B-Partner
- KI-Chatbot für Konfigurations-Beratung
- ERP-Anbindung (automatische Angebotserstellung)

### Phase 4 — Marketing & B2B (laufend)
- Performance-Marketing Setup (Google Ads, Meta Ads)
- B2B-Portal (Architekten, Bauträger, Wohnungswirtschaft)
- API-Marketplace für Reseller
- Affiliate-Programm

---

## 5. Geschätzter Aufwand & Budget-Indikation

| Phase | Aufwand | Indikatives Budget (netto) |
|-------|---------|----------------------------|
| Phase 1 (Demo) | bereits geliefert | — (Pitch-Investment) |
| Phase 2 (MVP) | 320–480h | 32.000–60.000 € |
| Phase 3 (Konfigurator 2.0) | 480–640h | 48.000–80.000 € |
| Phase 4 (laufend) | 40–80h/Monat | ab 5.000 €/Monat |
| Hosting + SaaS | — | ~250–450 €/Monat |

*(Budgets sind grobe Indikationen für Sales-Gespräch — final abhängig von Anforderungs-Workshop.)*

---

## 6. Deploy & Übergabe

1. **Git Repository:** GitHub-Repo `knobloch-shop-demo` mit sauberer Commit-Historie
2. **Vercel Deploy:** Auto-Deploy bei Push, Preview-Branches pro Feature
3. **Knobloch-Pitch-Dokument:** `ANGEBOT.md` mit Executive Summary
4. **Domain-Vorschlag:** Demo-URL `knobloch-demo.vercel.app` (oder eigene Subdomain)
5. **Übergabe-Optionen:**
   - **Option A:** Auftrag → wir setzen Phase 2+3 um
   - **Option B:** Repo wird übergeben, Knobloch übernimmt
   - **Option C:** Lizenz-Modell für laufende Wartung

---

*Dokument-Stand: 2026-05-17 — autogeneriert mit Claude Code*
