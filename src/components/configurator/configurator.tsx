"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Download,
  Info,
  RefreshCw,
  Share2,
  ShoppingBag,
  Truck,
  Building2,
  Home,
  Mailbox,
  Warehouse,
  Store,
  PackageOpen,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfigurator } from "@/store/configurator-store";
import { useCart } from "@/store/cart-store";
import { MailboxSVG } from "./mailbox-svg";
import { formatPrice, cn } from "@/lib/utils";
import {
  mountingTypes,
  materials,
  colors,
  extras,
  sizeOrientations,
  retrievalOptions,
} from "@/data/configurator-options";

const mountingIcons: Record<string, typeof Mailbox> = {
  freistehend: Mailbox,
  aufputz: Building2,
  unterputz: Home,
  zaun: Warehouse,
  tuerelement: Home,
  mauerdurchwurf: Warehouse,
};

export function Configurator({ initialType }: { initialType?: string }) {
  const cfg = useConfigurator();
  const addToCart = useCart((s) => s.add);
  const [showShareToast, setShowShareToast] = useState(false);
  const [activeColorCat, setActiveColorCat] = useState<string>("Standard");

  useEffect(() => {
    if (initialType) cfg.setMountingType(initialType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType]);

  const price = cfg.priceBreakdown();
  const colorOpt = colors.find((c) => c.id === cfg.color) ?? colors[0];
  const materialOpt = materials.find((m) => m.id === cfg.material) ?? materials[0];
  const mountingOpt = mountingTypes.find((m) => m.id === cfg.mountingType) ?? mountingTypes[0];

  const grouped = colors.reduce<Record<string, typeof colors>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  const totalCompartments = cfg.cols * cfg.rows;

  function handleAddToCart() {
    addToCart({
      id: `cfg-${Date.now()}`,
      type: "configuration",
      name: `Individuelle Anlage · ${mountingOpt.name}`,
      subtitle: `${materialOpt.name} · ${colorOpt.name} · ${totalCompartments} Fächer${cfg.hasPackage ? " + Paket" : ""}`,
      image: "",
      unitPrice: price.total,
      quantity: 1,
    });
  }

  function handleShare() {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams({
      m: cfg.mountingType,
      mat: cfg.material,
      c: cfg.color,
      cols: String(cfg.cols),
      rows: String(cfg.rows),
      pkg: cfg.hasPackage ? "1" : "0",
    });
    navigator.clipboard.writeText(`${window.location.origin}/konfigurator?${params.toString()}`);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  }

  return (
    <div className="bg-anthracite-50 dark:bg-anthracite-950">
      {/* Header bar */}
      <div className="sticky top-16 z-30 border-b bg-background/90 backdrop-blur lg:top-20">
        <div className="container flex items-center justify-between py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Live-Konfigurator
            </p>
            <h1 className="font-display text-xl tracking-tight md:text-2xl">
              {mountingOpt.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={cfg.reset} variant="ghost" size="sm">
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Zurücksetzen</span>
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Teilen</span>
            </Button>
          </div>
        </div>
      </div>

      {showShareToast && (
        <div className="fixed left-1/2 top-32 z-50 -translate-x-1/2 rounded-full bg-anthracite-900 px-4 py-2 text-xs font-medium text-white shadow-lg">
          <Check className="mr-1 inline h-3 w-3 text-emerald-400" />
          Link in Zwischenablage kopiert
        </div>
      )}

      <div className="container py-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LIVE PREVIEW — sticky on desktop, top on mobile */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-anthracite-900">
                <div className="aspect-square">
                  <MailboxSVG
                    color={colorOpt.hex}
                    material={cfg.material as "stahl" | "alu" | "v2a" | "v4a"}
                    cols={cfg.cols}
                    rows={cfg.rows}
                    hasPackage={cfg.hasPackage}
                    mountingType={cfg.mountingType}
                    orientation={cfg.orientation as "senkrecht" | "waagerecht" | "xl"}
                    className="h-full w-full"
                  />
                </div>

                {/* Spec overlay */}
                <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] backdrop-blur dark:bg-anthracite-900/95">
                    <span
                      className="h-3 w-3 rounded-full border border-border"
                      style={{ backgroundColor: colorOpt.hex }}
                    />
                    <span className="font-semibold">{colorOpt.name}</span>
                    {colorOpt.ral && (
                      <span className="text-muted-foreground">· {colorOpt.ral}</span>
                    )}
                  </div>
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] backdrop-blur dark:bg-anthracite-900/95">
                    <span className="font-semibold">{materialOpt.name}</span>
                  </div>
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-anthracite-900 px-3 py-1 text-[11px] font-semibold text-white">
                  {totalCompartments} {totalCompartments === 1 ? "Fach" : "Fächer"}
                  {cfg.hasPackage && " + Paket"}
                </div>

                {materialOpt.fastShip && (
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="success" className="px-2 py-1">
                      <Truck className="mr-1 h-3 w-3" />
                      Lieferung in 5 Werktagen
                    </Badge>
                  </div>
                )}
              </div>

              {/* Price card — desktop sticky */}
              <div className="mt-4 hidden rounded-2xl border bg-anthracite-900 p-5 text-white shadow-lg lg:block">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-anthracite-300">
                      Live-Preis · inkl. MwSt.
                    </p>
                    <p className="font-display text-4xl tracking-tight">
                      {formatPrice(price.total)}
                    </p>
                  </div>
                  <button
                    onClick={() => document.getElementById("price-breakdown")?.classList.toggle("hidden")}
                    className="text-anthracite-300 hover:text-white"
                    aria-label="Preis-Aufschlüsselung"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                <div id="price-breakdown" className="mt-3 hidden space-y-1 border-t border-white/10 pt-3 text-xs">
                  <BreakdownRow label="Grundpreis" value={price.base} />
                  {price.material > 0 && <BreakdownRow label="Material" value={price.material} />}
                  {price.color > 0 && <BreakdownRow label="Premium-Farbe" value={price.color} />}
                  {price.orientation > 0 && <BreakdownRow label="XL-Format" value={price.orientation} />}
                  {price.retrieval > 0 && <BreakdownRow label="Entnahme hinten" value={price.retrieval} />}
                  {price.compartments > 0 && <BreakdownRow label="Zusätzliche Fächer" value={price.compartments} />}
                  {price.pkg > 0 && <BreakdownRow label="Paketfach" value={price.pkg} />}
                  {price.extras > 0 && <BreakdownRow label="Extras" value={price.extras} />}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button onClick={handleAddToCart} variant="accent" size="lg" className="col-span-2">
                    <ShoppingBag className="h-4 w-4" />
                    In den Warenkorb
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-[10px] text-anthracite-400">
                  💡 2 % Express-Rabatt bei Bestätigung in 3 Tagen
                </p>
              </div>
            </div>
          </div>

          {/* OPTIONS PANEL */}
          <div className="order-2 space-y-6 lg:order-1 lg:col-span-7">
            {/* Section: Montagetyp */}
            <Section
              n={1}
              title="Montagetyp"
              sub="Wo soll Ihre Anlage stehen?"
              badge={mountingOpt.name}
            >
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {mountingTypes.map((m) => {
                  const Icon = mountingIcons[m.id] ?? Mailbox;
                  return (
                    <Tile
                      key={m.id}
                      selected={cfg.mountingType === m.id}
                      onClick={() => cfg.setMountingType(m.id)}
                      title={m.name}
                      sub={`ab ${formatPrice(m.basePrice)}`}
                      icon={<Icon className="h-5 w-5" />}
                    />
                  );
                })}
              </div>
            </Section>

            {/* Section: Material */}
            <Section
              n={2}
              title="Material"
              sub="Welche Qualität für welchen Standort?"
              badge={materialOpt.name}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => cfg.setMaterial(m.id)}
                    className={cn(
                      "group flex flex-col rounded-xl border-2 p-4 text-left transition-all",
                      cfg.material === m.id
                        ? "border-anthracite-900 bg-anthracite-50 shadow-sm dark:bg-anthracite-900/40"
                        : "border-border bg-card hover:border-anthracite-400"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold">{m.name}</p>
                      <div
                        className={cn(
                          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          cfg.material === m.id
                            ? "border-anthracite-900 bg-anthracite-900 text-white"
                            : "border-border"
                        )}
                      >
                        {cfg.material === m.id && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      {m.fastShip ? (
                        <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                          <Truck className="mr-1 h-2.5 w-2.5" />
                          5 Tage
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                          5–6 Wochen
                        </Badge>
                      )}
                      <span className="ml-auto text-xs font-medium">
                        {m.priceFactor === 1 ? "Basis" : `+${Math.round((m.priceFactor - 1) * 100)} %`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Section: Farbe */}
            <Section n={3} title="Farbe" sub="Standardfarben gratis · RAL ab 49 €" badge={colorOpt.name}>
              <div className="mb-3 flex flex-wrap gap-1">
                {Object.keys(grouped).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveColorCat(cat)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      activeColorCat === cat
                        ? "border-anthracite-900 bg-anthracite-900 text-white"
                        : "border-border bg-card hover:bg-secondary"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {(grouped[activeColorCat] ?? []).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => cfg.setColor(c.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border-2 p-2 text-left transition-all",
                      cfg.color === c.id
                        ? "border-anthracite-900 shadow-md ring-2 ring-anthracite-900/10 ring-offset-1"
                        : "border-border hover:border-anthracite-400"
                    )}
                    aria-label={c.name}
                  >
                    <div
                      className="aspect-square w-full rounded-sm shadow-inner"
                      style={{
                        backgroundColor: c.hex,
                        backgroundImage:
                          c.category === "Edelstahl"
                            ? "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(0,0,0,0.15))"
                            : undefined,
                      }}
                    />
                    {cfg.color === c.id && (
                      <div className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-anthracite-900 text-white shadow">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <p className="mt-1.5 truncate text-[10px] font-semibold leading-tight">{c.name}</p>
                    {c.ral && <p className="text-[9px] text-muted-foreground">{c.ral}</p>}
                    {c.surcharge > 0 && (
                      <p className="text-[9px] font-semibold text-accent-foreground/80">
                        +{c.surcharge} €
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </Section>

            {/* Section: Größe & Format */}
            <Section n={4} title="Größe & Format" sub="Anzahl Wohneinheiten · Orientierung">
              <div className="grid gap-5 md:grid-cols-2">
                {/* Compartments */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Spalten
                  </p>
                  <div className="inline-flex rounded-lg border bg-card p-1">
                    {([1, 2, 3, 4] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => cfg.setCols(n)}
                        className={cn(
                          "inline-flex h-9 w-10 items-center justify-center rounded text-sm font-semibold transition-colors",
                          cfg.cols === n ? "bg-anthracite-900 text-white" : "hover:bg-secondary"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Reihen · <strong className="font-bold text-foreground">{cfg.rows}</strong>
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={cfg.rows}
                    onChange={(e) => cfg.setRows(Number(e.target.value))}
                    className="w-full accent-anthracite-900"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>1</span>
                    <span>4</span>
                    <span>8</span>
                  </div>

                  <div className="mt-4 rounded-lg bg-secondary p-3 text-sm">
                    <p className="font-bold">
                      {totalCompartments} {totalCompartments === 1 ? "Wohneinheit" : "Wohneinheiten"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cfg.cols} × {cfg.rows}
                      {totalCompartments >= 8 && " · kostenfreie Beratung empfohlen"}
                    </p>
                  </div>
                </div>

                {/* Orientation */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Orientierung
                  </p>
                  <div className="space-y-2">
                    {sizeOrientations.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => cfg.setOrientation(s.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border-2 p-3 text-left transition-all",
                          cfg.orientation === s.id
                            ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                            : "border-border hover:border-anthracite-400"
                        )}
                      >
                        <div>
                          <p className="text-sm font-semibold">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground">{s.description}</p>
                        </div>
                        <span className="text-xs font-medium">
                          {s.surcharge === 0 ? "✓" : `+${s.surcharge} €`}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Entnahme
                  </p>
                  <div className="space-y-2">
                    {retrievalOptions.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => cfg.setRetrieval(r.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border-2 p-3 text-left transition-all",
                          cfg.retrieval === r.id
                            ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                            : "border-border hover:border-anthracite-400"
                        )}
                      >
                        <p className="text-sm font-medium">{r.name}</p>
                        <span className="text-xs font-medium">
                          {r.surcharge === 0 ? "✓" : `+${r.surcharge} €`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package add-on */}
              <button
                type="button"
                onClick={cfg.togglePackage}
                className={cn(
                  "mt-4 flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                  cfg.hasPackage
                    ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                    : "border-dashed border-border hover:border-anthracite-400"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    cfg.hasPackage ? "bg-anthracite-900 text-white" : "bg-secondary text-muted-foreground"
                  )}
                >
                  <PackageOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Zusätzliches Paketfach
                    <span className="ml-2 text-xs font-medium text-accent-foreground">+ 299 €</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tragkraft 30 kg · DHL / Hermes / DPD / GLS / UPS kompatibel
                  </p>
                </div>
                <div
                  className={cn(
                    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                    cfg.hasPackage
                      ? "border-anthracite-900 bg-anthracite-900 text-white"
                      : "border-border"
                  )}
                >
                  {cfg.hasPackage && <Check className="h-3 w-3" />}
                </div>
              </button>
            </Section>

            {/* Section: Extras */}
            <Section
              n={5}
              title="Extras"
              sub="Klingeltaster, Smart-Features, Sprechanlagen"
              badge={cfg.selectedExtras.length > 0 ? `${cfg.selectedExtras.length} gewählt` : undefined}
            >
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {extras.map((e) => {
                  const checked = cfg.selectedExtras.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => cfg.toggleExtra(e.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border-2 p-3 text-left transition-all",
                        checked
                          ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                          : "border-border bg-card hover:border-anthracite-400"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                          checked
                            ? "border-anthracite-900 bg-anthracite-900 text-white"
                            : "border-border"
                        )}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{e.name}</p>
                        <p className="line-clamp-2 text-[11px] text-muted-foreground">
                          {e.description}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <Badge variant="outline" className="px-1.5 py-0 text-[9px]">
                            {e.category}
                          </Badge>
                          <span className="text-xs font-semibold text-accent-foreground/80">
                            +{formatPrice(e.price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Section>
          </div>
        </div>

        {/* Mobile sticky price bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-anthracite-900 p-3 text-white shadow-2xl lg:hidden">
          <div className="container flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-anthracite-300">Live-Preis</p>
              <p className="font-display text-xl leading-none">{formatPrice(price.total)}</p>
            </div>
            <Button onClick={handleAddToCart} variant="accent" size="lg" className="flex-1">
              <ShoppingBag className="h-4 w-4" />
              In den Warenkorb
            </Button>
          </div>
        </div>
        {/* Spacer for mobile sticky bar */}
        <div className="h-20 lg:hidden" />
      </div>
    </div>
  );
}

function Section({
  n,
  title,
  sub,
  badge,
  children,
}: {
  n: number;
  title: string;
  sub: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-background p-5 lg:p-6">
      <header className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-anthracite-900 text-xs font-bold text-white">
            {n}
          </span>
          <div>
            <h2 className="font-display text-lg leading-tight">{title}</h2>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
        {badge && (
          <span className="hidden truncate rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground md:inline-flex">
            {badge}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}

function Tile({
  selected,
  onClick,
  title,
  sub,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all",
        selected
          ? "border-anthracite-900 bg-anthracite-50 shadow-sm dark:bg-anthracite-900/40"
          : "border-border bg-card hover:border-anthracite-400"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            selected ? "bg-anthracite-900 text-white" : "bg-secondary text-foreground"
          )}
        >
          {icon}
        </div>
        <div
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-anthracite-900 bg-anthracite-900 text-white" : "border-border"
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </button>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-anthracite-300">
      <span>{label}</span>
      <span>{formatPrice(value)}</span>
    </div>
  );
}
