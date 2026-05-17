import { Building2, Home, Mailbox, PackageOpen, Store, Warehouse } from "lucide-react";

export type CategorySlug =
  | "freistehend"
  | "aufputz"
  | "unterputz"
  | "zaun"
  | "tuerelement"
  | "mauerdurchwurf"
  | "paketbox"
  | "paketanlage"
  | "abholstation";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  hero: string;
  icon: typeof Mailbox;
  group: "briefkasten" | "paket";
  startingPrice: number;
  features: string[];
};

export const categories: Category[] = [
  {
    slug: "freistehend",
    name: "Freistehende Briefkastenanlage",
    shortName: "Freistehend",
    description:
      "Die klassische Standlösung am Grundstückseingang. Robust, repräsentativ und individuell konfigurierbar — von einer einzelnen Wohneinheit bis zur 30-Familien-Anlage.",
    hero: "/img/categories/freistehend.jpg",
    icon: Mailbox,
    group: "briefkasten",
    startingPrice: 489,
    features: [
      "1 – 30 Fächer",
      "Einbetoniert oder aufgeschraubt",
      "Wahlweise mit Paketfach",
      "DIN EN 13724 zertifiziert",
    ],
  },
  {
    slug: "aufputz",
    name: "Aufputz-Briefkastenanlage",
    shortName: "Aufputz",
    description:
      "Wandmontage außen — die platzsparende Lösung für Hauswände, Carports und Eingangsbereiche. Tiefe ab 18 cm.",
    hero: "/img/categories/aufputz.jpg",
    icon: Building2,
    group: "briefkasten",
    startingPrice: 329,
    features: ["Hauswand-Montage", "Geringe Tiefe", "Wetterfest IP54", "Optional beleuchtet"],
  },
  {
    slug: "unterputz",
    name: "Unterputz-Briefkastenanlage",
    shortName: "Unterputz",
    description:
      "Bündig in der Mauerwerks-Ebene integriert. Premium-Optik für Neubau und Sanierung mit individueller Front-Auswahl.",
    hero: "/img/categories/unterputz.jpg",
    icon: Home,
    group: "briefkasten",
    startingPrice: 549,
    features: ["Wandbündige Optik", "Hinterlegtes Gehäuse", "Edelstahl V2A / V4A", "Maßanfertigung"],
  },
  {
    slug: "zaun",
    name: "Zaun-Briefkastenanlage",
    shortName: "Zaun",
    description:
      "Integration in Zäune, Tore und Gabionen. Postentnahme von hinten — der Postbote muss nicht das Grundstück betreten.",
    hero: "/img/categories/zaun.jpg",
    icon: Warehouse,
    group: "briefkasten",
    startingPrice: 419,
    features: [
      "Zaunintegration",
      "Entnahme vorne oder hinten",
      "Pulverbeschichtet RAL",
      "Mit Klingeltaster kombinierbar",
    ],
  },
  {
    slug: "tuerelement",
    name: "Türelement-Briefkasten",
    shortName: "Türelement",
    description:
      "Briefkasten als Bestandteil des Eingangstür-Seitenteils. Architektonisch nahtlos — ideal für Einfamilienhäuser.",
    hero: "/img/categories/tuerelement.jpg",
    icon: Home,
    group: "briefkasten",
    startingPrice: 389,
    features: [
      "Türseitenteil-Integration",
      "Edelstahl oder Aluminium",
      "Diskrete Postentnahme",
      "Maßanfertigung",
    ],
  },
  {
    slug: "mauerdurchwurf",
    name: "Mauerdurchwurf-Briefkasten",
    shortName: "Mauerdurchwurf",
    description:
      "Eingelassen in tragende Mauerwerk-Konstruktion. Briefeinwurf außen, Entnahme von der gegenüberliegenden Seite — ohne nasse Post.",
    hero: "/img/categories/mauerdurchwurf.jpg",
    icon: Warehouse,
    group: "briefkasten",
    startingPrice: 459,
    features: [
      "Komplett wandbündig",
      "Tiefe individuell",
      "Edelstahl Premium",
      "Entnahme innen — wetterunabhängig",
    ],
  },
  {
    slug: "paketbox",
    name: "Paketbox Einfamilienhaus",
    shortName: "Paketbox",
    description:
      "Sichere Paketannahme rund um die Uhr — ohne Wartezeit, ohne Nachbarn. Für Pakete bis L 50 × B 40 × H 35 cm.",
    hero: "/img/categories/paketbox.jpg",
    icon: PackageOpen,
    group: "paket",
    startingPrice: 599,
    features: [
      "DHL / Hermes / DPD / GLS",
      "Bis 30 kg Tragkraft",
      "Wetterfest IP54",
      "Optional mit Briefkasten",
    ],
  },
  {
    slug: "paketanlage",
    name: "Paketanlage Mehrfamilienhaus",
    shortName: "Paketanlage",
    description:
      "Modulares System für Mehrfamilienhäuser, Wohnanlagen und Bürohäuser. Kombinierbar mit Briefkastenanlage.",
    hero: "/img/categories/paketanlage.jpg",
    icon: Building2,
    group: "paket",
    startingPrice: 1899,
    features: [
      "2 – 24 Fächer modular",
      "Kombination Brief + Paket",
      "Pulverbeschichtet RAL",
      "Optional digital (App-Anbindung)",
    ],
  },
  {
    slug: "abholstation",
    name: "Abholstation Handel & Gewerbe",
    shortName: "Abholstation",
    description:
      "Click & Collect für Einzelhandel, Apotheken, Werkstätten — 24/7-Übergabe an Ihre Kunden ohne Personalbindung.",
    hero: "/img/categories/abholstation.jpg",
    icon: Store,
    group: "paket",
    startingPrice: 4499,
    features: [
      "PIN- oder QR-Zugriff",
      "Indoor & Outdoor",
      "API für Warenwirtschaft",
      "Edelstahl V4A",
    ],
  },
];

export const briefkastenCategories = categories.filter((c) => c.group === "briefkasten");
export const paketCategories = categories.filter((c) => c.group === "paket");

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
