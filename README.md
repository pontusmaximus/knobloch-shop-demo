# KNOBLOCH Shop — Demo-Frontend

Modernisierter Onlineshop und Konfigurator für die **Max Knobloch Nachf. GmbH** —
Deutschlands ältester Briefkastenhersteller seit 1869.

> 🔗 **Live-Demo:** [knobloch-shop-demo.vercel.app](https://knobloch-shop-demo.vercel.app)
> 📦 **Repository:** [github.com/pontusmaximus/knobloch-shop-demo](https://github.com/pontusmaximus/knobloch-shop-demo)
>
> **Status:** Phase-1-Demo · Pitch-Frontend zur Angebotsabgabe an Knobloch.
> Backend, echte Payments und CMS folgen in Phase 2.

---

## 🚀 Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build        # Production build (statisch, 42 Seiten)
pnpm typecheck    # TypeScript strict
pnpm start        # Production server lokal
```

Node ≥ 20 und pnpm ≥ 9 empfohlen.

---

## 📦 Tech-Stack

| Layer | Technologie |
|-------|-------------|
| Framework | Next.js 15.1 (App Router · React 19) |
| Sprache | TypeScript 5.7 strict |
| Styling | Tailwind CSS 3.4 + shadcn/ui (Radix) |
| Animation | Framer Motion 11 |
| State | Zustand 5 (Cart, Configurator) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Fonts | Inter (UI) · Playfair Display (Display) |
| Hosting | Vercel (Edge-Network) |

---

## 📁 Projektstruktur

```
src/
├── app/                          # Next.js App Router
│   ├── (root)                    # Homepage
│   ├── briefkastenanlagen/       # Kategorie + Detail-Seiten
│   ├── paketboxen/
│   ├── konfigurator/             # 7-Step-Konfigurator mit Live-Preis
│   ├── warenkorb/
│   ├── checkout/                 # Multi-Step Checkout (Mock)
│   ├── ueber-uns, service, kontakt, haendler
│   ├── impressum, agb, datenschutz, widerruf, ...
│   ├── sitemap.ts, robots.ts
│   └── layout.tsx, page.tsx, globals.css
│
├── components/
│   ├── ui/                       # shadcn-style Primitives
│   ├── layout/                   # Header, Footer, Navigation
│   ├── home/                     # Hero, USPs, Heritage, Testimonials, …
│   ├── product/                  # ProductCard, AddToCart
│   ├── configurator/             # Multi-Step + Live-Preview + Price-Sidebar
│   ├── cart/                     # Cart-Drawer + Provider
│   └── common/                   # FAQ, CookieBanner
│
├── data/                         # Mock-Daten (in Phase 2 → Sanity-CMS)
│   ├── categories.ts             # 9 Produktkategorien
│   ├── products.ts               # 8 Demo-Produkte
│   ├── configurator-options.ts   # Material, Farbe, Extras, RAL
│   └── faqs.ts
│
├── store/
│   ├── cart-store.ts             # localStorage-persistierter Cart
│   └── configurator-store.ts     # Konfigurator-State + Preis-Berechnung
│
└── lib/
    ├── utils.ts                  # cn, formatPrice, slugify
    └── fonts.ts
```

---

## ✨ Features

### Frontend (Phase 1 — ✅ geliefert)
- ⚡ **Statisch generiert** — alle 42 Routes prerendert, lighthouse-optimiert
- 📱 **Mobile-first responsive** (320 px – 4K)
- 🎨 **Modernes Design-System** mit Knobloch-Branding (Anthrazit + Edelstahl + Akzent-Gelb)
- 🛒 **Persistenter Warenkorb** mit Drawer + dediziertem Cart-Page
- 🧮 **Multi-Step-Konfigurator** mit Live-Preis-Berechnung und interaktiver Vorschau
- 🎯 **Konfigurations-Sharing** via URL-Parameter
- 🔍 **SEO-fundament** — Meta-Tags, OpenGraph, Schema.org (Organization, Product, FAQPage)
- 🗺️ **Sitemap + robots.txt** dynamisch generiert
- ♿ **A11y-Foundation** — Keyboard-Navigation, ARIA-Labels, semantisches HTML
- 🍪 **Cookie-Banner** DSGVO-konform mit granularer Auswahl
- 🌙 **Dark-Mode** vorbereitet (Tailwind `dark:` Klassen überall)

### Phase 2 — ⏳ ausstehend (Auftragsabhängig)
- 🗃️ **CMS-Anbindung** (Sanity) für Produktpflege durch Knobloch-Team
- 💳 **Echte Payments** (Stripe, Klarna, PayPal, SEPA, SOFORT)
- 📧 **Transaktionale E-Mails** (Resend / Postmark)
- 🔐 **Account-System** mit Bestellhistorie
- 🛡️ **Trusted Shops Zertifizierung**
- 📊 **Analytics** (Plausible — DSGVO-konform, DE-Server)
- 🌍 **i18n** (DE primär, EN für B2B-Export)
- 🚚 **Speditions-Tracking** (Versandstatus-Webhooks)

### Phase 3 — ⏳ Konfigurator 2.0
- 🎲 **Echte 3D-Visualisierung** (React Three Fiber)
- 📸 **AR-Hausfassaden-Preview** (WebXR)
- 🏗️ **BIM-Datenexport** (IFC/Revit) für Architekt:innen
- 🤖 **KI-Chatbot** für Konfigurations-Beratung
- 🔌 **ERP-Anbindung** für automatische Angebotserstellung

---

## 🚢 Deployment auf Vercel

### 1. Repository auf GitHub pushen

```bash
gh repo create knobloch-shop --public --source=. --remote=origin --push
# oder manuell:
git remote add origin https://github.com/<user>/knobloch-shop.git
git push -u origin main
```

### 2. Vercel-Projekt verbinden

1. [vercel.com/new](https://vercel.com/new) öffnen
2. GitHub-Repo importieren
3. **Framework:** Next.js (auto-detected)
4. **Build Command:** `pnpm build`
5. **Install Command:** `pnpm install`
6. **Output Directory:** `.next` (auto)
7. Deploy klicken — fertig in ~90 s.

Standard-URL: `knobloch-shop.vercel.app`
Custom Domain: über Vercel-Dashboard → Settings → Domains

### 3. Optional: Preview-Deployments

Vercel deployt automatisch jeden Push und jeden PR als Preview-URL — ideal für
Kunden-Reviews.

---

## 🧭 Wichtige Routen

| Pfad | Beschreibung |
|------|--------------|
| `/` | Homepage mit Hero, Kategorien, Konfigurator-Teaser, USPs, FAQ |
| `/konfigurator` | 7-Step-Konfigurator mit Live-Preis |
| `/konfigurator/[type]` | Direkter Einstieg pro Montagetyp (z. B. `/konfigurator/freistehend`) |
| `/briefkastenanlagen` | Kategorie-Übersicht + Schnelllieferer |
| `/briefkastenanlagen/[category]` | Kategorie-Seite (z. B. freistehend) |
| `/briefkastenanlagen/[category]/[slug]` | Produktdetail mit Specs |
| `/paketboxen` | Paketbox-Produktwelt |
| `/warenkorb`, `/checkout`, `/checkout/erfolg` | Bestellprozess (Mock) |
| `/ueber-uns`, `/service`, `/kontakt`, `/haendler` | Marketing-Seiten |
| `/impressum`, `/agb`, `/datenschutz`, `/widerruf` | Rechtsseiten |

---

## 🎯 Demo-Daten (was später aus dem CMS kommt)

Alle Inhalte sind aktuell in `src/data/*.ts` als typsicheres TypeScript abgelegt.
In Phase 2 werden diese durch Sanity-CMS-Queries ersetzt — die TypeScript-Typen
bleiben kompatibel, das Frontend muss nicht angefasst werden.

---

## 📜 Lizenz

Dieses Repository ist eine **Pitch-Demo** für Max Knobloch Nachf. GmbH. Bei
Auftragsvergabe gehen alle Nutzungsrechte exklusiv auf Knobloch über. Bis dahin
liegen die Rechte beim Ersteller (siehe `ANGEBOT.md`).

---

## 🤝 Kontakt zur Demo

Diese Demo wurde als Sales-Pitch für die Modernisierung der KNOBLOCH-Online-
Präsenz erstellt. Für Rückfragen siehe [`ANGEBOT.md`](./ANGEBOT.md) und
[`PLAN.md`](./PLAN.md).
