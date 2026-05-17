import type { CategorySlug } from "./categories";

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  deliveryDays: number;
  images: string[];
  material: "Edelstahl V2A" | "Edelstahl V4A" | "Aluminium" | "Stahl pulverbeschichtet";
  color: string;
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  compartments: number;
  hasPackage: boolean;
  badges: ("Bestseller" | "Neu" | "Schnelle Lieferung" | "Premium" | "Sparpaket")[];
  features: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "stele-edelstahl-3-fach",
    name: "STELE Edelstahl — 3 Fächer freistehend",
    category: "freistehend",
    shortDescription:
      "Schlanke Standanlage aus V2A-Edelstahl für 3 Wohneinheiten — inkl. Paketfach unten.",
    description:
      "Die STELE-Reihe vereint puristische Linienführung mit handwerklicher Verarbeitungsqualität aus über 156 Jahren Knobloch-Tradition. Gefertigt aus 2 mm V2A-Edelstahl, geschliffen, mit verdeckten Scharnieren und Hochsicherheitsschloss.",
    price: 1289,
    oldPrice: 1489,
    rating: 4.8,
    reviewCount: 142,
    deliveryDays: 5,
    images: [
      "/img/products/stele-1.jpg",
      "/img/products/stele-2.jpg",
      "/img/products/stele-3.jpg",
      "/img/products/stele-4.jpg",
    ],
    material: "Edelstahl V2A",
    color: "Edelstahl gebürstet",
    dimensions: { width: 38, height: 180, depth: 35 },
    weight: 32,
    compartments: 3,
    hasPackage: true,
    badges: ["Bestseller", "Schnelle Lieferung"],
    features: [
      "3 Briefkästen + 1 Paketfach",
      "V2A-Edelstahl 2 mm, geschliffen",
      "DIN EN 13724 zertifiziert",
      "Hochsicherheitsschloss",
      "Postentnahme von vorne",
      "Beton-Einlassung 25 cm",
    ],
    specs: [
      { label: "Material", value: "Edelstahl V2A, 2 mm" },
      { label: "Oberfläche", value: "Geschliffen K240" },
      { label: "Maße (B×H×T)", value: "38 × 180 × 35 cm" },
      { label: "Gewicht", value: "32 kg" },
      { label: "Briefkästen", value: "3" },
      { label: "Paketfach", value: "Ja, unten (38×38×35 cm)" },
      { label: "Schloss", value: "Sicherheitsschloss mit 2 Schlüsseln" },
      { label: "Norm", value: "DIN EN 13724" },
      { label: "Lieferzeit", value: "5 Werktage" },
    ],
  },
  {
    slug: "stele-edelstahl-6-fach",
    name: "STELE Edelstahl — 6 Fächer freistehend",
    category: "freistehend",
    shortDescription:
      "Doppelreihige Standanlage V2A für 6 Wohneinheiten — modular erweiterbar.",
    description:
      "Doppelt belegte STELE-Variante für mittlere Mehrfamilienhäuser. Mit Trennstegen, Klingeltaster-Vorbereitung und optionaler Gegensprechanlage.",
    price: 2389,
    rating: 4.9,
    reviewCount: 87,
    deliveryDays: 5,
    images: ["/img/products/stele-6-1.jpg", "/img/products/stele-6-2.jpg"],
    material: "Edelstahl V2A",
    color: "Edelstahl gebürstet",
    dimensions: { width: 76, height: 180, depth: 35 },
    weight: 58,
    compartments: 6,
    hasPackage: false,
    badges: ["Schnelle Lieferung"],
    features: [
      "6 Briefkästen 2-spaltig",
      "Vorbereitung Klingeltaster",
      "Optionale Gegensprechanlage",
      "DIN EN 13724 zertifiziert",
    ],
    specs: [
      { label: "Material", value: "Edelstahl V2A, 2 mm" },
      { label: "Maße (B×H×T)", value: "76 × 180 × 35 cm" },
      { label: "Gewicht", value: "58 kg" },
      { label: "Briefkästen", value: "6 (2 Spalten × 3 Reihen)" },
      { label: "Norm", value: "DIN EN 13724" },
    ],
  },
  {
    slug: "linea-aufputz-anthrazit",
    name: "LINEA Aufputz Anthrazit — 1 Fach",
    category: "aufputz",
    shortDescription:
      "Wandbriefkasten in mattem Anthrazit RAL 7016, ideal für Einfamilienhäuser.",
    description:
      "Reduziertes Design für architektonisch anspruchsvolle Fassaden. Pulverbeschichtetes Stahlblech, witterungsbeständig.",
    price: 329,
    rating: 4.7,
    reviewCount: 234,
    deliveryDays: 3,
    images: ["/img/products/linea-1.jpg", "/img/products/linea-2.jpg"],
    material: "Stahl pulverbeschichtet",
    color: "Anthrazit RAL 7016",
    dimensions: { width: 35, height: 38, depth: 18 },
    weight: 6.4,
    compartments: 1,
    hasPackage: false,
    badges: ["Bestseller", "Schnelle Lieferung"],
    features: [
      "Pulverbeschichtet RAL 7016",
      "Wandmontage, mit Schrauben",
      "Sichtfenster Zeitungsrolle",
      "Schloss inkl. 2 Schlüssel",
    ],
    specs: [
      { label: "Material", value: "Stahlblech 1,5 mm, pulverbeschichtet" },
      { label: "Farbe", value: "Anthrazit RAL 7016 matt" },
      { label: "Maße (B×H×T)", value: "35 × 38 × 18 cm" },
      { label: "Gewicht", value: "6,4 kg" },
      { label: "Norm", value: "DIN EN 13724" },
    ],
  },
  {
    slug: "linea-aufputz-weiss",
    name: "LINEA Aufputz Weiß — 1 Fach",
    category: "aufputz",
    shortDescription: "Klassischer Wandbriefkasten in Verkehrsweiß RAL 9016.",
    description: "Identisches Modell wie Anthrazit, in Reinweiß für klassische Fassaden.",
    price: 329,
    rating: 4.7,
    reviewCount: 198,
    deliveryDays: 3,
    images: ["/img/products/linea-weiss-1.jpg"],
    material: "Stahl pulverbeschichtet",
    color: "Verkehrsweiß RAL 9016",
    dimensions: { width: 35, height: 38, depth: 18 },
    weight: 6.4,
    compartments: 1,
    hasPackage: false,
    badges: ["Schnelle Lieferung"],
    features: ["Pulverbeschichtet RAL 9016", "Wandmontage"],
    specs: [
      { label: "Farbe", value: "Verkehrsweiß RAL 9016" },
      { label: "Maße (B×H×T)", value: "35 × 38 × 18 cm" },
    ],
  },
  {
    slug: "cubus-unterputz-v4a",
    name: "CUBUS Unterputz V4A — 1 Fach",
    category: "unterputz",
    shortDescription:
      "Salzwasser-resistenter V4A-Briefkasten für Küstennähe und Premium-Architektur.",
    description:
      "Höchste Korrosionsbeständigkeit durch V4A-Molybdän-Stahl. Wandbündige Front, hinterlegtes Gehäuse, präzise verschweißt.",
    price: 689,
    rating: 4.9,
    reviewCount: 56,
    deliveryDays: 10,
    images: ["/img/products/cubus-1.jpg", "/img/products/cubus-2.jpg"],
    material: "Edelstahl V4A",
    color: "Edelstahl V4A geschliffen",
    dimensions: { width: 32, height: 40, depth: 28 },
    weight: 9,
    compartments: 1,
    hasPackage: false,
    badges: ["Premium"],
    features: ["V4A-Edelstahl", "Wandbündig", "Maßanfertigung möglich"],
    specs: [
      { label: "Material", value: "Edelstahl V4A 2 mm" },
      { label: "Einbautiefe", value: "28 cm" },
    ],
  },
  {
    slug: "horizon-zaun-doppelreihig",
    name: "HORIZON Zaun-Anlage — 4 Fach",
    category: "zaun",
    shortDescription: "Horizontale Zaunintegration für 4 Wohneinheiten, Entnahme rückseitig.",
    description:
      "Speziell für Zaun- und Gabionenintegration. Rückseitige Entnahme — Postbote betritt das Grundstück nicht.",
    price: 1149,
    rating: 4.8,
    reviewCount: 41,
    deliveryDays: 7,
    images: ["/img/products/horizon-1.jpg"],
    material: "Stahl pulverbeschichtet",
    color: "Anthrazit RAL 7016",
    dimensions: { width: 132, height: 38, depth: 30 },
    weight: 22,
    compartments: 4,
    hasPackage: false,
    badges: ["Schnelle Lieferung"],
    features: ["Entnahme rückseitig", "Zaunintegration", "Pulverbeschichtet"],
    specs: [
      { label: "Maße (B×H×T)", value: "132 × 38 × 30 cm" },
      { label: "Fächer", value: "4" },
    ],
  },
  {
    slug: "paketbox-solo-anthrazit",
    name: "PAKET SOLO — Paketbox Anthrazit",
    category: "paketbox",
    shortDescription:
      "Standalone-Paketbox mit Kurier-Code für sichere Annahme rund um die Uhr.",
    description:
      "Knobloch PAKET SOLO nimmt Pakete von DHL, Hermes, DPD, GLS und UPS sicher entgegen. Code-System für Kuriere, Einwurf-Klappe, Hochsicherheitsschloss.",
    price: 749,
    oldPrice: 849,
    rating: 4.6,
    reviewCount: 312,
    deliveryDays: 4,
    images: ["/img/products/paket-solo-1.jpg", "/img/products/paket-solo-2.jpg"],
    material: "Stahl pulverbeschichtet",
    color: "Anthrazit RAL 7016",
    dimensions: { width: 55, height: 130, depth: 45 },
    weight: 38,
    compartments: 1,
    hasPackage: true,
    badges: ["Bestseller", "Schnelle Lieferung"],
    features: [
      "Pakete bis 50×40×35 cm",
      "Tragkraft 30 kg",
      "DHL / Hermes / DPD / GLS / UPS",
      "Code-System für Kuriere",
      "IP54 wetterfest",
    ],
    specs: [
      { label: "Material", value: "Stahl 2 mm, pulverbeschichtet" },
      { label: "Maße (B×H×T)", value: "55 × 130 × 45 cm" },
      { label: "Tragkraft", value: "30 kg" },
      { label: "Schutzart", value: "IP54" },
    ],
  },
  {
    slug: "paketbox-duo-kombi",
    name: "PAKET DUO — Paket + Briefkasten",
    category: "paketbox",
    shortDescription:
      "Kombilösung Paketbox + Briefkasten in einer Anlage — platzsparend für Einfamilienhäuser.",
    description: "All-in-one: Brief und Paket in einer Anlage. Trennung der Fächer mit zwei Schlössern.",
    price: 989,
    rating: 4.7,
    reviewCount: 178,
    deliveryDays: 4,
    images: ["/img/products/paket-duo-1.jpg"],
    material: "Stahl pulverbeschichtet",
    color: "Anthrazit RAL 7016",
    dimensions: { width: 45, height: 160, depth: 40 },
    weight: 42,
    compartments: 2,
    hasPackage: true,
    badges: ["Schnelle Lieferung"],
    features: ["Brief + Paket kombiniert", "Zwei separate Schlösser", "Wetterfest"],
    specs: [
      { label: "Maße (B×H×T)", value: "45 × 160 × 40 cm" },
      { label: "Fächer", value: "1 Brief + 1 Paket" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export const featuredProducts = products.filter((p) => p.badges.includes("Bestseller"));
