"use client";

import { Check, Plus } from "lucide-react";
import { useConfigurator } from "@/store/configurator-store";
import {
  mountingTypes,
  materials,
  colors,
  extras,
  sizeOrientations,
  retrievalOptions,
} from "@/data/configurator-options";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function StepMounting() {
  const { mountingType, setMountingType } = useConfigurator();
  return (
    <StepWrapper
      title="Wo soll Ihre Briefkastenanlage stehen?"
      hint="Wählen Sie den Montagetyp. Jeder Typ hat seine architektonischen und praktischen Vorzüge."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {mountingTypes.map((m) => (
          <OptionCard
            key={m.id}
            selected={mountingType === m.id}
            onClick={() => setMountingType(m.id)}
            title={m.name}
            description={m.description}
            footer={`ab ${formatPrice(m.basePrice)}`}
          />
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepMaterial() {
  const { material, setMaterial } = useConfigurator();
  return (
    <StepWrapper
      title="Welches Material darf es sein?"
      hint="Pulverbeschichteter Stahl ist robust und günstig. Edelstahl V2A ist pflegeleicht und elegant. V4A ist erste Wahl für Küstennähe."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {materials.map((m) => (
          <OptionCard
            key={m.id}
            selected={material === m.id}
            onClick={() => setMaterial(m.id)}
            title={m.name}
            description={m.description}
            badge={m.fastShip ? "Schnelle Lieferung" : "5–6 Wochen"}
            footer={m.priceFactor === 1 ? "Basispreis" : `+${Math.round((m.priceFactor - 1) * 100)} %`}
          />
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepColor() {
  const { color, setColor } = useConfigurator();
  const grouped = colors.reduce<Record<string, typeof colors>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  return (
    <StepWrapper
      title="Welche Farbe passt zu Ihrer Architektur?"
      hint="Standardfarben sind aufpreisfrei. Über 100 RAL-Töne stehen zur Auswahl."
    >
      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cat}
            </p>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {list.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-lg border-2 p-3 text-left transition-all",
                    color === c.id
                      ? "border-anthracite-900 ring-2 ring-anthracite-900 ring-offset-2"
                      : "border-border hover:border-anthracite-400"
                  )}
                >
                  <div
                    className="aspect-square w-full rounded border border-border/50"
                    style={{ backgroundColor: c.hex }}
                  />
                  {color === c.id && (
                    <div className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-anthracite-900 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  <p className="mt-2 text-xs font-medium leading-tight">{c.name}</p>
                  {c.ral && <p className="text-[10px] text-muted-foreground">{c.ral}</p>}
                  {c.surcharge > 0 && (
                    <p className="text-[10px] font-medium text-accent-foreground/80">
                      +{formatPrice(c.surcharge)}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepOrientation() {
  const { orientation, setOrientation } = useConfigurator();
  return (
    <StepWrapper
      title="Welches Format wünschen Sie?"
      hint="DIN-A4 hochkant oder DIN-A4 quer. Für gepolsterte Versandtaschen wählen Sie XL."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {sizeOrientations.map((s) => (
          <OptionCard
            key={s.id}
            selected={orientation === s.id}
            onClick={() => setOrientation(s.id)}
            title={s.name}
            description={s.description}
            footer={s.surcharge === 0 ? "Standard" : `+${formatPrice(s.surcharge)}`}
          />
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepCompartments() {
  const { cols, rows, hasPackage, setCols, setRows, togglePackage } = useConfigurator();
  return (
    <StepWrapper
      title="Wie viele Wohneinheiten?"
      hint="Wählen Sie Spalten und Reihen. Anlagen ab 8 Wohneinheiten beraten wir gerne telefonisch."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Spalten
          </p>
          <div className="mt-2 inline-flex rounded-lg border bg-card p-1">
            {([1, 2, 3, 4] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCols(n)}
                className={cn(
                  "inline-flex h-10 w-12 items-center justify-center rounded text-sm font-semibold transition-colors",
                  cols === n ? "bg-anthracite-900 text-white" : "hover:bg-secondary"
                )}
              >
                {n}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Reihen ({rows})
          </p>
          <input
            type="range"
            min={1}
            max={8}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="mt-2 w-full accent-anthracite-900"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>1</span>
            <span>4</span>
            <span>8</span>
          </div>

          <button
            type="button"
            onClick={togglePackage}
            className={cn(
              "mt-6 flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-all",
              hasPackage
                ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                : "border-border hover:border-anthracite-400"
            )}
          >
            <div
              className={cn(
                "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                hasPackage ? "border-anthracite-900 bg-anthracite-900 text-white" : "border-border"
              )}
            >
              {hasPackage && <Check className="h-3 w-3" />}
            </div>
            <div>
              <p className="text-sm font-semibold">+ Zusätzliches Paketfach</p>
              <p className="text-xs text-muted-foreground">
                Tragkraft 30 kg · für DHL, Hermes, DPD, GLS · +{formatPrice(299)}
              </p>
            </div>
          </button>
        </div>

        <div className="rounded-lg border bg-secondary/30 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ihre Anlage
          </p>
          <p className="mt-1 text-2xl font-bold">
            {cols * rows} {cols * rows === 1 ? "Wohneinheit" : "Wohneinheiten"}
          </p>
          <p className="text-sm text-muted-foreground">
            {cols} {cols === 1 ? "Spalte" : "Spalten"} × {rows} {rows === 1 ? "Reihe" : "Reihen"}
          </p>
          {cols * rows >= 8 && (
            <p className="mt-3 rounded-md bg-accent/20 p-3 text-xs">
              💡 Bei Anlagen ab 8 Wohneinheiten bieten wir eine{" "}
              <strong>kostenlose Architektur-Beratung</strong> an.
            </p>
          )}
        </div>
      </div>
    </StepWrapper>
  );
}

export function StepRetrieval() {
  const { retrieval, setRetrieval } = useConfigurator();
  return (
    <StepWrapper
      title="Wie soll die Post entnommen werden?"
      hint="Standard ist Entnahme von vorne. Bei Zaun- oder Mauerdurchwurf-Anlagen können Sie hinten entnehmen."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {retrievalOptions.map((r) => (
          <OptionCard
            key={r.id}
            selected={retrieval === r.id}
            onClick={() => setRetrieval(r.id)}
            title={r.name}
            description={r.description}
            footer={r.surcharge === 0 ? "Standard" : `+${formatPrice(r.surcharge)}`}
          />
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepExtras() {
  const { selectedExtras, toggleExtra } = useConfigurator();
  const grouped = extras.reduce<Record<string, typeof extras>>((acc, e) => {
    (acc[e.category] ??= []).push(e);
    return acc;
  }, {});

  return (
    <StepWrapper
      title="Möchten Sie Extras hinzufügen?"
      hint="Klingeltaster, Sprechanlagen und Smart-Features — optional."
    >
      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cat}
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {list.map((e) => {
                const checked = selectedExtras.includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggleExtra(e.id)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all",
                      checked
                        ? "border-anthracite-900 bg-anthracite-50 dark:bg-anthracite-900/40"
                        : "border-border hover:border-anthracite-400"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                        checked ? "border-anthracite-900 bg-anthracite-900 text-white" : "border-border"
                      )}
                    >
                      {checked && <Check className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{e.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{e.description}</p>
                      <p className="mt-2 text-xs font-semibold text-accent-foreground/80">
                        +{formatPrice(e.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </StepWrapper>
  );
}

export function StepReview() {
  const cfg = useConfigurator();
  const price = cfg.priceBreakdown();
  const mounting = mountingTypes.find((m) => m.id === cfg.mountingType)?.name ?? "";
  const material = materials.find((m) => m.id === cfg.material)?.name ?? "";
  const color = colors.find((c) => c.id === cfg.color)?.name ?? "";

  return (
    <StepWrapper
      title="Ihre Konfiguration im Überblick"
      hint="Prüfen Sie Ihre Auswahl, dann legen Sie die Anlage in den Warenkorb oder fragen Sie ein Angebot an."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SummaryCard label="Montage" value={mounting} />
        <SummaryCard label="Material" value={material} />
        <SummaryCard label="Farbe" value={color} />
        <SummaryCard label="Format" value={cfg.orientation === "senkrecht" ? "Senkrecht" : cfg.orientation === "waagerecht" ? "Waagerecht" : "XL"} />
        <SummaryCard
          label="Fächer"
          value={`${cfg.cols * cfg.rows} (${cfg.cols} × ${cfg.rows})${cfg.hasPackage ? " + Paketfach" : ""}`}
        />
        <SummaryCard label="Entnahme" value={cfg.retrieval === "vorne" ? "Vorne" : "Hinten"} />
      </div>

      {cfg.selectedExtras.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Extras ({cfg.selectedExtras.length})
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {cfg.selectedExtras.map((id) => {
              const e = extras.find((x) => x.id === id);
              if (!e) return null;
              return (
                <li key={id} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {e.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-2xl border bg-anthracite-900 p-6 text-white">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-anthracite-300">Gesamt-Preis</p>
            <p className="font-display text-4xl">{formatPrice(price.total)}</p>
            <p className="mt-1 text-xs text-anthracite-300">inkl. 19 % MwSt., zzgl. Versand</p>
          </div>
          <Badge variant="accent" className="px-3 py-1">
            ✓ DIN EN 13724 zertifiziert
          </Badge>
        </div>
      </div>
    </StepWrapper>
  );
}

function StepWrapper({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl tracking-tight md:text-3xl text-balance">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{hint}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  title,
  description,
  footer,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  footer?: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col rounded-xl border-2 p-4 text-left transition-all",
        selected
          ? "border-anthracite-900 bg-anthracite-50 shadow-md dark:bg-anthracite-900/40"
          : "border-border hover:border-anthracite-400 hover:shadow-sm"
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <div
          className={cn(
            "inline-flex h-5 w-5 items-center justify-center rounded-full border-2",
            selected ? "border-anthracite-900 bg-anthracite-900 text-white" : "border-border bg-background"
          )}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>
      </div>
      <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">{description}</p>
      <div className="mt-3 flex items-center gap-2">
        {badge && (
          <Badge variant="success" className="px-1.5 py-0 text-[10px]">
            {badge}
          </Badge>
        )}
        {footer && <span className="ml-auto text-xs font-medium">{footer}</span>}
      </div>
    </button>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
