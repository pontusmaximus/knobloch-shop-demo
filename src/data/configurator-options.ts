export type ConfiguratorStep =
  | "type"
  | "verkleidung"
  | "material"
  | "color"
  | "befestigung"
  | "compartments"
  | "funktionskasten"
  | "extras"
  | "review";

export type MountingTypeOption = {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
};

export type VerkleidungOption = {
  id: string;
  code: string;
  name: string;
  description: string;
  surcharge: number;
};

export type MaterialOption = {
  id: "stahl" | "alu" | "v2a" | "v4a";
  name: string;
  description: string;
  priceFactor: number;
  fastShip: boolean;
};

export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  ral?: string;
  category: "Standard" | "RAL Klassik" | "RAL Premium" | "Edelstahl";
  surcharge: number;
};

export type BefestigungOption = {
  id: "einbetonieren" | "aufschrauben";
  name: string;
  description: string;
  surcharge: number;
};

export type FunktionskastenOption = {
  id: "bb0" | "bb1" | "bb2" | "bb3" | "bb4";
  code: string;
  name: string;
  description: string;
  includes: string[];
  price: number;
};

export type ExtraOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Komfort" | "Sicherheit" | "Smart";
};

export const mountingTypes: MountingTypeOption[] = [
  {
    id: "freistehend",
    name: "Freistehend",
    description: "Standanlage am Grundstückseingang, einbetoniert oder verschraubt.",
    image: "/img/categories/freistehend.jpg",
    basePrice: 489,
  },
  {
    id: "aufputz",
    name: "Aufputz",
    description: "Wandmontage außen — direkt auf Putz oder Fassade.",
    image: "/img/categories/aufputz.jpg",
    basePrice: 329,
  },
  {
    id: "unterputz",
    name: "Unterputz",
    description: "Bündig in der Wand integriert — Premium-Optik.",
    image: "/img/categories/unterputz.jpg",
    basePrice: 549,
  },
  {
    id: "zaun",
    name: "Zaun",
    description: "Integration in Zaun, Tor oder Gabione — Entnahme rückseitig.",
    image: "/img/categories/zaun.jpg",
    basePrice: 419,
  },
  {
    id: "tuerelement",
    name: "Türelement",
    description: "Teil der Eingangstür — architektonisch nahtlos.",
    image: "/img/categories/tuerseitenteil.jpg",
    basePrice: 389,
  },
  {
    id: "mauerdurchwurf",
    name: "Mauerdurchwurf",
    description: "Eingewurf außen — Entnahme innen, wetterunabhängig.",
    image: "/img/categories/mauerdurchwurf.jpg",
    basePrice: 459,
  },
];

// Verkleidungen — wie im Original-Konfigurator (RI244 / RI241 / RI234)
export const verkleidungen: VerkleidungOption[] = [
  {
    id: "ri244",
    code: "RI244",
    name: "Dreiteilig mit Regenkante",
    description: "Enganliegende Verkleidung — Seitenpanele + Dach getrennt. Sichtbare Konstruktion, maximale Stabilität.",
    surcharge: 0,
  },
  {
    id: "ri241",
    code: "RI241",
    name: "Enganliegend, integrierte Regenkante",
    description: "Kompakter Aufbau — Regenkante ist Teil der Hauptverkleidung. Klassische Optik.",
    surcharge: 0,
  },
  {
    id: "ri234",
    code: "RI234",
    name: "Kompaktverkleidung",
    description: "Schlankste Variante — minimaler Materialbedarf, schlichter Look. Ideal für kleine Anlagen.",
    surcharge: -29,
  },
];

export const materials: MaterialOption[] = [
  {
    id: "stahl",
    name: "Stahl pulverbeschichtet",
    description:
      "Robust, witterungsbeständig, individuelle RAL-Farben — bestes Preis-Leistungs-Verhältnis.",
    priceFactor: 1.0,
    fastShip: true,
  },
  {
    id: "alu",
    name: "Aluminium eloxiert",
    description: "Leicht, korrosionsfrei, edle Optik. Eloxalfarben Silber, Bronze, Schwarz.",
    priceFactor: 1.25,
    fastShip: true,
  },
  {
    id: "v2a",
    name: "Edelstahl V2A",
    description: "Hochwertige Standardlösung — geschliffen oder gebürstet. Wartungsarm.",
    priceFactor: 1.55,
    fastShip: true,
  },
  {
    id: "v4a",
    name: "Edelstahl V4A",
    description:
      "Marine-Qualität — für Küstennähe, Schwimmbäder und Industriegebiete. Salzwasserbeständig.",
    priceFactor: 1.95,
    fastShip: false,
  },
];

export const colors: ColorOption[] = [
  { id: "edelstahl-geschliffen", name: "Edelstahl geschliffen", hex: "#C8CCD1", category: "Edelstahl", surcharge: 0 },
  { id: "edelstahl-gebuerstet", name: "Edelstahl gebürstet", hex: "#B4BAC2", category: "Edelstahl", surcharge: 0 },
  { id: "ral-9016", name: "Verkehrsweiß", hex: "#F1F1F1", ral: "RAL 9016", category: "Standard", surcharge: 0 },
  { id: "ral-7016", name: "Anthrazit", hex: "#383E42", ral: "RAL 7016", category: "Standard", surcharge: 0 },
  { id: "ral-9005", name: "Tiefschwarz", hex: "#0A0A0D", ral: "RAL 9005", category: "Standard", surcharge: 0 },
  { id: "ral-8017", name: "Schokoladenbraun", hex: "#3E2B23", ral: "RAL 8017", category: "RAL Klassik", surcharge: 49 },
  { id: "ral-7035", name: "Lichtgrau", hex: "#D7D7D7", ral: "RAL 7035", category: "RAL Klassik", surcharge: 49 },
  { id: "ral-5010", name: "Enzianblau", hex: "#15406B", ral: "RAL 5010", category: "RAL Klassik", surcharge: 49 },
  { id: "ral-3003", name: "Rubinrot", hex: "#8C1A1F", ral: "RAL 3003", category: "RAL Klassik", surcharge: 49 },
  { id: "ral-6005", name: "Moosgrün", hex: "#1F3324", ral: "RAL 6005", category: "RAL Klassik", surcharge: 49 },
  { id: "ral-1023", name: "Verkehrsgelb", hex: "#F0CA00", ral: "RAL 1023", category: "RAL Premium", surcharge: 89 },
  { id: "ral-2004", name: "Reinorange", hex: "#E55322", ral: "RAL 2004", category: "RAL Premium", surcharge: 89 },
];

export const befestigungen: BefestigungOption[] = [
  {
    id: "einbetonieren",
    name: "Einbetonieren",
    description: "Standfuß wird im Beton-Fundament verankert — dauerhaft, robust, vibrationssicher.",
    surcharge: 0,
  },
  {
    id: "aufschrauben",
    name: "Aufschrauben",
    description: "Bodenplatte zum Verschrauben — flexibel, bei späterem Umzug demontierbar.",
    surcharge: 29,
  },
];

export const funktionskaesten: FunktionskastenOption[] = [
  {
    id: "bb0",
    code: "bb0",
    name: "Ohne Funktionskasten",
    description: "Reine Briefkastenanlage, keine elektronischen Komponenten.",
    includes: ["Briefkasten-Anlage"],
    price: 0,
  },
  {
    id: "bb1",
    code: "bb1",
    name: "Funktionskasten Basic",
    description: "Universalhalterung mit Sprechsieblochung und Edelstahl-Klingeltaster vorbereitet.",
    includes: ["Sprechsieblochung", "Klingeltaster (Edelstahl)", "Namensschild", "Universalhalterung"],
    price: 189,
  },
  {
    id: "bb2",
    code: "bb2",
    name: "Audio-Sprechanlage",
    description: "Komplettes Audio-Set — Außensprechstelle plus Innentürstationen.",
    includes: [
      "Außensprechstelle (Audio)",
      "Innentürstation(en)",
      "Klingeltaster pro Wohneinheit",
      "Namensschilder",
    ],
    price: 449,
  },
  {
    id: "bb3",
    code: "bb3",
    name: "Video-Sprechanlage",
    description: "Premium-Set — Außensprechstelle mit HD-Kamera plus Innentürstation mit Display.",
    includes: [
      "Außensprechstelle mit HD-Videokamera",
      "Innentürstation mit Touchscreen",
      "App-Anbindung iOS / Android",
      "Klingeltaster pro Wohneinheit",
    ],
    price: 849,
  },
  {
    id: "bb4",
    code: "bb4",
    name: "Individuelle Stanzungen",
    description: "Kasten mit Custom-Aussparungen — für Scanner, Transponder oder digitale Displays.",
    includes: [
      "Individuelle CNC-Stanzungen",
      "Vorbereitung für Drittanbieter-Module",
      "Maßanfertigung nach Plan",
    ],
    price: 599,
  },
];

export const extras: ExtraOption[] = [
  {
    id: "zweites-namensschild",
    name: "Zweites Namensschild",
    description: "Zusätzliches graviertes Namensschild — z. B. für Firma + Privat.",
    price: 19,
    category: "Komfort",
  },
  {
    id: "werbeablehnung",
    name: "Werbung-Nein-Plakette",
    description: "Eingravierte Plakette nach Wahl — schließt Werbung aus.",
    price: 9,
    category: "Komfort",
  },
  {
    id: "led-hausnummer",
    name: "LED-Hausnummer",
    description: "Beleuchtete Hausnummer mit Dämmerungssensor — energieeffizient.",
    price: 89,
    category: "Komfort",
  },
  {
    id: "schliessfach-sicherheit",
    name: "Hochsicherheitsschloss VdS",
    description: "VdS-zertifiziertes Schloss, aufbohrhemmend, mit Sicherungskarte.",
    price: 79,
    category: "Sicherheit",
  },
  {
    id: "smart-lock",
    name: "Smart Lock (Bluetooth + App)",
    description: "Schlüssellos öffnen per App — auch Gastzugang möglich.",
    price: 229,
    category: "Smart",
  },
  {
    id: "lichttaster",
    name: "Zusätzlicher Lichttaster",
    description: "Klingeltaster mit integriertem Lichttaster für Außenbeleuchtung.",
    price: 39,
    category: "Komfort",
  },
];

export type CompartmentLayout = {
  cols: 1 | 2 | 3 | 4;
  rows: number;
  total: number;
  pricePerCompartment: number;
};

export function calculateCompartmentPrice(cols: number, rows: number): number {
  const total = cols * rows;
  if (total === 1) return 0;
  return (total - 1) * 149;
}

export const sizeOrientations = [
  {
    id: "senkrecht",
    name: "Senkrecht",
    description: "Klassische Hochformat-Briefkästen — DIN A4 hochkant.",
    surcharge: 0,
  },
  {
    id: "waagerecht",
    name: "Waagerecht",
    description: "Querformat — DIN A4 quer einwerfen.",
    surcharge: 0,
  },
  {
    id: "xl",
    name: "XL (DIN C4 Plus)",
    description: "Großformat — auch für gepolsterte Versandtaschen.",
    surcharge: 89,
  },
];

export const retrievalOptions = [
  {
    id: "vorne",
    name: "Entnahme von vorne",
    description: "Sie öffnen die Frontklappe — Standardlösung.",
    surcharge: 0,
  },
  {
    id: "hinten",
    name: "Entnahme von hinten",
    description: "Briefkasten in Mauer/Zaun — Entnahme rückseitig.",
    surcharge: 39,
  },
];
