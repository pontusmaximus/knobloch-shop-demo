export type ConfiguratorStep =
  | "type"
  | "material"
  | "color"
  | "size"
  | "mounting"
  | "compartments"
  | "extras"
  | "review";

export type MountingTypeOption = {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
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
    image: "/img/configurator/mounting-freistehend.png",
    basePrice: 489,
  },
  {
    id: "aufputz",
    name: "Aufputz",
    description: "Wandmontage außen — direkt auf Putz oder Fassade.",
    image: "/img/configurator/mounting-aufputz.png",
    basePrice: 329,
  },
  {
    id: "unterputz",
    name: "Unterputz",
    description: "Bündig in der Wand integriert — Premium-Optik.",
    image: "/img/configurator/mounting-unterputz.png",
    basePrice: 549,
  },
  {
    id: "zaun",
    name: "Zaun",
    description: "Integration in Zaun, Tor oder Gabione — Entnahme rückseitig.",
    image: "/img/configurator/mounting-zaun.png",
    basePrice: 419,
  },
  {
    id: "tuerelement",
    name: "Türelement",
    description: "Teil der Eingangstür — architektonisch nahtlos.",
    image: "/img/configurator/mounting-tuerelement.png",
    basePrice: 389,
  },
  {
    id: "mauerdurchwurf",
    name: "Mauerdurchwurf",
    description: "Eingewurf außen — Entnahme innen, wetterunabhängig.",
    image: "/img/configurator/mounting-mauerdurchwurf.png",
    basePrice: 459,
  },
];

export const materials: MaterialOption[] = [
  {
    id: "stahl",
    name: "Stahl pulverbeschichtet",
    description: "Robust, witterungsbeständig, individuelle RAL-Farben — bestes Preis-Leistungs-Verhältnis.",
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
    description: "Marine-Qualität — für Küstennähe, Schwimmbäder und Industriegebiete. Salzwasserbeständig.",
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

export const extras: ExtraOption[] = [
  {
    id: "klingeltaster",
    name: "Klingeltaster (LED-beleuchtet)",
    description: "Pro Wohneinheit ein beleuchteter Klingeltaster, Edelstahl-Optik.",
    price: 39,
    category: "Komfort",
  },
  {
    id: "gegensprechanlage",
    name: "Gegensprechanlage 2-Draht",
    description: "Klassische Audio-Gegensprechanlage, 2-Draht-System.",
    price: 189,
    category: "Komfort",
  },
  {
    id: "video-intercom",
    name: "Video-Gegensprechanlage (HD, App)",
    description: "Full-HD-Kamera, App-Anbindung iOS/Android, Cloud-Speicher 7 Tage.",
    price: 449,
    category: "Smart",
  },
  {
    id: "paketfach",
    name: "Zusätzliches Paketfach (40 cm)",
    description: "Großes Paketfach mit Kurier-Code, Tragkraft 30 kg.",
    price: 299,
    category: "Komfort",
  },
  {
    id: "namensschild-zweit",
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
  { id: "senkrecht", name: "Senkrecht", description: "Klassische Hochformat-Briefkästen — DIN A4 hochkant.", surcharge: 0 },
  { id: "waagerecht", name: "Waagerecht", description: "Querformat — DIN A4 quer einwerfen.", surcharge: 0 },
  { id: "xl", name: "XL (DIN C4 Plus)", description: "Großformat — auch für gepolsterte Versandtaschen.", surcharge: 89 },
];

export const retrievalOptions = [
  { id: "vorne", name: "Entnahme von vorne", description: "Sie öffnen die Frontklappe — Standardlösung.", surcharge: 0 },
  { id: "hinten", name: "Entnahme von hinten", description: "Briefkasten in Mauer/Zaun — Entnahme rückseitig.", surcharge: 39 },
];
