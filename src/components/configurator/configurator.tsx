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
  PackageOpen,
  Anchor,
  Wrench,
  Frame,
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
  verkleidungen,
  befestigungen,
  funktionskaesten,
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
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    if (initialType) cfg.setMountingType(initialType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType]);

  const price = cfg.priceBreakdown();
  const colorOpt = colors.find((c) => c.id === cfg.color) ?? colors[0];
  const materialOpt = materials.find((m) => m.id === cfg.material) ?? materials[0];
  const mountingOpt = mountingTypes.find((m) => m.id === cfg.mountingType) ?? mountingTypes[0];
  const verkleidungOpt = verkleidungen.find((v) => v.id === cfg.verkleidung) ?? verkleidungen[0];
  const befestigungOpt = befestigungen.find((b) => b.id === cfg.befestigung) ?? befestigungen[0];
  const funktionsOpt =
    funktionskaesten.find((f) => f.id === cfg.funktionskasten) ?? funktionskaesten[0];

  const grouped = colors.reduce<Record<string, typeof colors>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  const totalCompartments = cfg.cols * cfg.rows;
  const hasLedHausnummer = cfg.selectedExtras.includes("led-hausnummer");

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
      v: cfg.verkleidung,
      mat: cfg.material,
      c: cfg.color,
      b: cfg.befestigung,
      f: cfg.funktionskasten,
      cols: String(cfg.cols),
      rows: String(cfg.rows),
      pkg: cfg.hasPackage ? "1" : "0",
    });
    navigator.clipboard.writeText(`${window.location.origin}/konfigurator?${params.toString()}`);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  }

  return (
    <div className="bg-white">
      {/* Header bar */}
      <div className="sticky top-16 z-30 border-b border-ink-200 bg-white/95 backdrop-blur lg:top-20">
        <div className="container flex items-center justify-between py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
              Live-Konfigurator
            </p>
            <h1 className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
              {mountingOpt.name} · {verkleidungOpt.code}
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
        <div className="fixed left-1/2 top-32 z-50 -translate-x-1/2 rounded-full bg-ink-900 px-4 py-2 text-xs font-medium text-white shadow-lg">
          <Check className="mr-1 inline h-3 w-3 text-emerald-400" />
          Link in Zwischenablage kopiert
        </div>
      )}

      <div className="container py-6 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LIVE PREVIEW */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
                <div className="aspect-square">
                  <MailboxSVG
                    color={colorOpt.hex}
                    material={cfg.material as "stahl" | "alu" | "v2a" | "v4a"}
                    cols={cfg.cols}
                    rows={cfg.rows}
                    hasPackage={cfg.hasPackage}
                    mountingType={cfg.mountingType}
                    orientation={cfg.orientation as "senkrecht" | "waagerecht" | "xl"}
                    verkleidung={cfg.verkleidung as "ri244" | "ri241" | "ri234"}
                    funktionskasten={cfg.funktionskasten as "bb0" | "bb1" | "bb2" | "bb3" | "bb4"}
                    ledHausnummer={hasLedHausnummer}
                    className="h-full w-full"
                  />
                </div>

                <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 rounded-full border border-ink-200 bg-white/95 px-3 py-1 text-[11px] backdrop-blur">
                    <span
                      className="h-3 w-3 rounded-full border border-ink-200"
                      style={{ backgroundColor: colorOpt.hex }}
                    />
                    <span className="font-semibold text-ink-900">{colorOpt.name}</span>
                    {colorOpt.ral && <span className="text-ink-500">· {colorOpt.ral}</span>}
                  </div>
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink-200 bg-white/95 px-3 py-1 text-[11px] backdrop-blur">
                    <span className="font-semibold text-ink-900">{materialOpt.name}</span>
                  </div>
                  {cfg.funktionskasten !== "bb0" && (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px]">
                      <span className="font-bold text-brand-600">
                        {funktionsOpt.code.toUpperCase()}
                      </span>
                      <span className="text-brand-700">{funktionsOpt.name}</span>
                    </div>
                  )}
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-white">
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

              {/* Price card */}
              <div className="mt-4 hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-sm lg:block">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-brand-600 font-bold">
                      Live-Preis · inkl. MwSt.
                    </p>
                    <p className="font-display text-4xl font-bold tracking-tight text-ink-900">
                      {formatPrice(price.total)}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBreakdown((x) => !x)}
                    className="text-ink-500 hover:text-ink-900"
                    aria-label="Preis-Aufschlüsselung"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                {showBreakdown && (
                  <div className="mt-3 space-y-1 border-t border-ink-100 pt-3 text-xs">
                    <BreakdownRow label="Grundpreis" value={price.base} />
                    {price.verkleidung !== 0 && (
                      <BreakdownRow label="Verkleidung" value={price.verkleidung} />
                    )}
                    {price.material > 0 && <BreakdownRow label="Material" value={price.material} />}
                    {price.color > 0 && <BreakdownRow label="Premium-Farbe" value={price.color} />}
                    {price.orientation > 0 && (
                      <BreakdownRow label="XL-Format" value={price.orientation} />
                    )}
                    {price.retrieval > 0 && (
                      <BreakdownRow label="Entnahme hinten" value={price.retrieval} />
                    )}
                    {price.befestigung > 0 && (
                      <BreakdownRow label="Befestigung" value={price.befestigung} />
                    )}
                    {price.compartments > 0 && (
                      <BreakdownRow label="Zusätzliche Fächer" value={price.compartments} />
                    )}
                    {price.pkg > 0 && <BreakdownRow label="Paketfach" value={price.pkg} />}
                    {price.funktionskasten > 0 && (
                      <BreakdownRow label="Funktionskasten" value={price.funktionskasten} />
                    )}
                    {price.extras > 0 && <BreakdownRow label="Extras" value={price.extras} />}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button onClick={handleAddToCart} variant="accent" size="lg" className="col-span-2 shadow-lg shadow-brand-600/20">
                    <ShoppingBag className="h-4 w-4" />
                    In den Warenkorb
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-[10px] text-ink-500">
                  💡 2 % Express-Rabatt bei Bestätigung in 3 Tagen
                </p>
              </div>
            </div>
          </div>

          {/* OPTIONS PANEL */}
          <div className="order-2 space-y-6 lg:order-1 lg:col-span-7">
            {/* 1 Montagetyp */}
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

            {/* 2 Verkleidung */}
            <Section
              n={2}
              title="Verkleidung"
              sub="Form und Konstruktion des Außengehäuses"
              badge={`${verkleidungOpt.code} · ${verkleidungOpt.name}`}
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {verkleidungen.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => cfg.setVerkleidung(v.id)}
                    className={cn(
                      "group flex flex-col rounded-xl border-2 p-4 text-left transition-all",
                      cfg.verkleidung === v.id
                        ? "border-brand-600 bg-brand-50 shadow-sm"
                        : "border-ink-200 bg-white hover:border-ink-400"
                    )}
                  >
                    {/* Verkleidung Mini-Diagramm */}
                    <div className="mb-3 flex h-14 items-end justify-center rounded-md bg-ink-50">
                      <VerkleidungIcon type={v.id} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                        {v.code}
                      </span>
                      <div
                        className={cn(
                          "inline-flex h-4 w-4 items-center justify-center rounded-full border-2",
                          cfg.verkleidung === v.id
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-200"
                        )}
                      >
                        {cfg.verkleidung === v.id && <Check className="h-2.5 w-2.5" />}
                      </div>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-ink-900">{v.name}</p>
                    <p className="mt-1 line-clamp-2 text-[11px] text-ink-500">{v.description}</p>
                    {v.surcharge !== 0 && (
                      <p className="mt-2 text-xs font-semibold text-ink-700">
                        {v.surcharge > 0 ? `+${formatPrice(v.surcharge)}` : formatPrice(v.surcharge)}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </Section>

            {/* 3 Material */}
            <Section
              n={3}
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
                        ? "border-brand-600 bg-brand-50 shadow-sm"
                        : "border-ink-200 bg-white hover:border-ink-400"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold text-ink-900">{m.name}</p>
                      <div
                        className={cn(
                          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          cfg.material === m.id
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-200"
                        )}
                      >
                        {cfg.material === m.id && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-500">{m.description}</p>
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
                      <span className="ml-auto text-xs font-medium text-ink-700">
                        {m.priceFactor === 1
                          ? "Basis"
                          : `+${Math.round((m.priceFactor - 1) * 100)} %`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            {/* 4 Farbe */}
            <Section
              n={4}
              title="Farbe"
              sub="Standardfarben gratis · RAL ab 49 €"
              badge={colorOpt.name}
            >
              <div className="mb-3 flex flex-wrap gap-1">
                {Object.keys(grouped).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveColorCat(cat)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      activeColorCat === cat
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-200 bg-white hover:bg-ink-50"
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
                        ? "border-brand-600 shadow-md ring-2 ring-brand-100 ring-offset-1"
                        : "border-ink-200 hover:border-ink-400"
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
                      <div className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white shadow">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <p className="mt-1.5 truncate text-[10px] font-semibold leading-tight text-ink-900">
                      {c.name}
                    </p>
                    {c.ral && <p className="text-[9px] text-ink-500">{c.ral}</p>}
                    {c.surcharge > 0 && (
                      <p className="text-[9px] font-bold text-brand-600">+{c.surcharge} €</p>
                    )}
                  </button>
                ))}
              </div>
            </Section>

            {/* 5 Befestigung (nur bei freistehend relevant) */}
            {cfg.mountingType === "freistehend" && (
              <Section
                n={5}
                title="Befestigung"
                sub="Wie wird die Anlage im Boden verankert?"
                badge={befestigungOpt.name}
              >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {befestigungen.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => cfg.setBefestigung(b.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                        cfg.befestigung === b.id
                          ? "border-brand-600 bg-brand-50 shadow-sm"
                          : "border-ink-200 bg-white hover:border-ink-400"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          cfg.befestigung === b.id
                            ? "bg-brand-600 text-white"
                            : "bg-ink-100 text-ink-700"
                        )}
                      >
                        {b.id === "einbetonieren" ? (
                          <Anchor className="h-5 w-5" />
                        ) : (
                          <Wrench className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-semibold text-ink-900">{b.name}</p>
                          <div
                            className={cn(
                              "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                              cfg.befestigung === b.id
                                ? "border-brand-600 bg-brand-600 text-white"
                                : "border-ink-200"
                            )}
                          >
                            {cfg.befestigung === b.id && <Check className="h-3 w-3" />}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-ink-500">{b.description}</p>
                        {b.surcharge > 0 && (
                          <p className="mt-1.5 text-xs font-semibold text-brand-600">
                            +{formatPrice(b.surcharge)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Section>
            )}

            {/* 6 Größe & Format */}
            <Section
              n={cfg.mountingType === "freistehend" ? 6 : 5}
              title="Größe & Format"
              sub="Anzahl Wohneinheiten · Orientierung · Entnahme"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-500">
                    Spalten
                  </p>
                  <div className="inline-flex rounded-lg border border-ink-200 bg-white p-1">
                    {([1, 2, 3, 4] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => cfg.setCols(n)}
                        className={cn(
                          "inline-flex h-9 w-10 items-center justify-center rounded text-sm font-semibold transition-colors",
                          cfg.cols === n ? "bg-brand-600 text-white" : "text-ink-700 hover:bg-ink-50"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-widest text-ink-500">
                    Reihen · <strong className="font-bold text-ink-900">{cfg.rows}</strong>
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={cfg.rows}
                    onChange={(e) => cfg.setRows(Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-ink-500">
                    <span>1</span>
                    <span>4</span>
                    <span>8</span>
                  </div>

                  <div className="mt-4 rounded-lg bg-ink-50 p-3 text-sm">
                    <p className="font-bold text-ink-900">
                      {totalCompartments}{" "}
                      {totalCompartments === 1 ? "Wohneinheit" : "Wohneinheiten"}
                    </p>
                    <p className="text-xs text-ink-500">
                      {cfg.cols} × {cfg.rows}
                      {totalCompartments >= 8 && " · kostenfreie Beratung empfohlen"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-500">
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
                            ? "border-brand-600 bg-brand-50"
                            : "border-ink-200 bg-white hover:border-ink-400"
                        )}
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                          <p className="text-[11px] text-ink-500">{s.description}</p>
                        </div>
                        <span className="text-xs font-medium text-ink-700">
                          {s.surcharge === 0 ? "✓" : `+${s.surcharge} €`}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-widest text-ink-500">
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
                            ? "border-brand-600 bg-brand-50"
                            : "border-ink-200 bg-white hover:border-ink-400"
                        )}
                      >
                        <p className="text-sm font-medium text-ink-900">{r.name}</p>
                        <span className="text-xs font-medium text-ink-700">
                          {r.surcharge === 0 ? "✓" : `+${r.surcharge} €`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paketfach Toggle */}
              <button
                type="button"
                onClick={cfg.togglePackage}
                className={cn(
                  "mt-4 flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                  cfg.hasPackage
                    ? "border-brand-600 bg-brand-50"
                    : "border-dashed border-ink-300 bg-white hover:border-ink-400"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    cfg.hasPackage ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"
                  )}
                >
                  <PackageOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-900">
                    Zusätzliches Paketfach
                    <span className="ml-2 text-xs font-bold text-brand-600">+ 299 €</span>
                  </p>
                  <p className="text-xs text-ink-500">
                    Tragkraft 30 kg · DHL / Hermes / DPD / GLS / UPS kompatibel
                  </p>
                </div>
                <div
                  className={cn(
                    "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                    cfg.hasPackage ? "border-brand-600 bg-brand-600 text-white" : "border-ink-200"
                  )}
                >
                  {cfg.hasPackage && <Check className="h-3 w-3" />}
                </div>
              </button>
            </Section>

            {/* 7 Funktionskasten (bb0-bb4) */}
            <Section
              n={cfg.mountingType === "freistehend" ? 7 : 6}
              title="Funktionskasten"
              sub="Sprechanlage, Klingeltaster, Stanzungen"
              badge={`${funktionsOpt.code.toUpperCase()} · ${funktionsOpt.name}`}
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {funktionskaesten.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => cfg.setFunktionskasten(f.id)}
                    className={cn(
                      "flex flex-col rounded-xl border-2 p-4 text-left transition-all",
                      cfg.funktionskasten === f.id
                        ? "border-brand-600 bg-brand-50 shadow-sm"
                        : "border-ink-200 bg-white hover:border-ink-400"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                          {f.code}
                        </span>
                        <p className="text-sm font-semibold text-ink-900">{f.name}</p>
                      </div>
                      <div
                        className={cn(
                          "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                          cfg.funktionskasten === f.id
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-200"
                        )}
                      >
                        {cfg.funktionskasten === f.id && <Check className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">{f.description}</p>
                    <ul className="mt-2 space-y-0.5">
                      {f.includes.slice(0, 3).map((inc) => (
                        <li key={inc} className="flex items-start gap-1 text-[11px] text-ink-600">
                          <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-emerald-600" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs font-bold text-brand-600">
                      {f.price === 0 ? "Kostenlos" : `+ ${formatPrice(f.price)}`}
                    </p>
                  </button>
                ))}
              </div>
            </Section>

            {/* 8 Extras */}
            <Section
              n={cfg.mountingType === "freistehend" ? 8 : 7}
              title="Extras"
              sub="Optionale Zusätze und Personalisierung"
              badge={
                cfg.selectedExtras.length > 0 ? `${cfg.selectedExtras.length} gewählt` : undefined
              }
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
                          ? "border-brand-600 bg-brand-50"
                          : "border-ink-200 bg-white hover:border-ink-400"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                          checked
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-ink-200"
                        )}
                      >
                        {checked && <Check className="h-3 w-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink-900">{e.name}</p>
                        <p className="line-clamp-2 text-[11px] text-ink-500">{e.description}</p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <Badge variant="outline" className="px-1.5 py-0 text-[9px]">
                            {e.category}
                          </Badge>
                          <span className="text-xs font-bold text-brand-600">
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
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white p-3 shadow-2xl lg:hidden">
          <div className="container flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-600">
                Live-Preis
              </p>
              <p className="font-display text-xl font-bold leading-none text-ink-900">
                {formatPrice(price.total)}
              </p>
            </div>
            <Button
              onClick={handleAddToCart}
              variant="accent"
              size="lg"
              className="flex-1 shadow-lg shadow-brand-600/20"
            >
              <ShoppingBag className="h-4 w-4" />
              In den Warenkorb
            </Button>
          </div>
        </div>
        <div className="h-20 lg:hidden" />
      </div>
    </div>
  );
}

// Mini-Diagramme für die 3 Verkleidungstypen
function VerkleidungIcon({ type }: { type: string }) {
  if (type === "ri244") {
    // dreiteilig mit Dach
    return (
      <svg viewBox="0 0 36 40" className="h-10 w-9">
        <rect x="2" y="14" width="32" height="2" fill="#374151" rx="0.5" />
        <rect x="6" y="16" width="24" height="20" fill="none" stroke="#374151" strokeWidth="1.5" rx="1" />
        <line x1="10" y1="22" x2="26" y2="22" stroke="#374151" strokeWidth="0.5" />
        <line x1="10" y1="28" x2="26" y2="28" stroke="#374151" strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === "ri241") {
    // integrierte Regenkante (kleine Lippe oben)
    return (
      <svg viewBox="0 0 36 40" className="h-10 w-9">
        <rect x="4" y="14" width="28" height="22" fill="none" stroke="#374151" strokeWidth="1.5" rx="1.5" />
        <rect x="3" y="13" width="30" height="3" fill="#374151" rx="0.5" />
        <line x1="8" y1="20" x2="28" y2="20" stroke="#374151" strokeWidth="0.5" />
        <line x1="8" y1="26" x2="28" y2="26" stroke="#374151" strokeWidth="0.5" />
      </svg>
    );
  }
  // ri234 — kompakt
  return (
    <svg viewBox="0 0 36 40" className="h-10 w-9">
      <rect x="6" y="14" width="24" height="22" fill="none" stroke="#374151" strokeWidth="1.5" rx="0.5" />
      <line x1="10" y1="20" x2="26" y2="20" stroke="#374151" strokeWidth="0.5" />
      <line x1="10" y1="26" x2="26" y2="26" stroke="#374151" strokeWidth="0.5" />
    </svg>
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
    <section className="rounded-2xl border border-ink-200 bg-white p-5 lg:p-6">
      <header className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {n}
          </span>
          <div>
            <h2 className="font-display text-lg font-bold leading-tight text-ink-900">{title}</h2>
            <p className="text-xs text-ink-500">{sub}</p>
          </div>
        </div>
        {badge && (
          <span className="hidden truncate rounded-full bg-ink-50 px-3 py-1 text-[11px] font-medium text-ink-700 md:inline-flex">
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
          ? "border-brand-600 bg-brand-50 shadow-sm"
          : "border-ink-200 bg-white hover:border-ink-400"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            selected ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-700"
          )}
        >
          {icon}
        </div>
        <div
          className={cn(
            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
            selected ? "border-brand-600 bg-brand-600 text-white" : "border-ink-200"
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight text-ink-900">{title}</p>
        <p className="text-[11px] text-ink-500">{sub}</p>
      </div>
    </button>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-ink-600">
      <span>{label}</span>
      <span>{formatPrice(value)}</span>
    </div>
  );
}
