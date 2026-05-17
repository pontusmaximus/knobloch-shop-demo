"use client";

import { useConfigurator } from "@/store/configurator-store";
import { colors, materials } from "@/data/configurator-options";
import { cn } from "@/lib/utils";

export function ConfiguratorPreview() {
  const { material, color, cols, rows, hasPackage, orientation, mountingType } = useConfigurator();

  const colorOpt = colors.find((c) => c.id === color) ?? colors[0];
  const materialOpt = materials.find((m) => m.id === material) ?? materials[0];

  const isHorizontal = orientation === "waagerecht";
  const totalCompartments = cols * rows;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-anthracite-100 to-anthracite-200 dark:from-anthracite-900 dark:to-anthracite-950">
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Floor */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-anthracite-300/50 dark:to-anthracite-950" />

      {/* Mounting type indicator */}
      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-anthracite-900/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {mountingType}
      </div>

      {/* Color & material indicator */}
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-[11px] backdrop-blur">
        <span
          className="h-3 w-3 rounded-full border border-border"
          style={{ backgroundColor: colorOpt.hex }}
        />
        <span className="font-medium">{materialOpt.name.split(" ")[0]}</span>
      </div>

      {/* Compartments count */}
      <div className="absolute bottom-4 left-4 rounded-md bg-background/90 px-3 py-1.5 text-xs backdrop-blur">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Konfiguration</p>
        <p className="font-semibold">
          {totalCompartments} {totalCompartments === 1 ? "Fach" : "Fächer"}
          {hasPackage && " + Paket"}
        </p>
      </div>

      {/* Mailbox 3D-style render */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <div
          className={cn(
            "relative shadow-2xl transition-all duration-500",
            "border-2 border-anthracite-700/40",
            isHorizontal ? "" : ""
          )}
          style={{
            backgroundColor: colorOpt.hex,
            width: `${Math.min(cols * 60 + 20, 280)}px`,
            height: `${Math.min(rows * 50 + (hasPackage ? 70 : 20), 380)}px`,
            borderRadius: "4px",
          }}
        >
          {/* Subtle gradient overlay for 3D effect */}
          <div className="absolute inset-0 rounded bg-gradient-to-br from-white/20 via-transparent to-black/30" />
          <div className="absolute inset-x-0 top-0 h-2 rounded-t bg-gradient-to-b from-white/30 to-transparent" />

          {/* Grid of compartments */}
          <div className="relative h-full p-3">
            <div
              className="grid h-full gap-1"
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr) ${hasPackage ? "1.4fr" : ""}`.trim(),
              }}
            >
              {Array.from({ length: totalCompartments }).map((_, i) => (
                <Compartment key={i} color={colorOpt.hex} />
              ))}
              {hasPackage && (
                <div
                  className="relative rounded-sm border border-black/40 bg-black/15"
                  style={{ gridColumn: `span ${cols}` }}
                >
                  <div className="absolute inset-x-2 top-1.5 h-px bg-black/30" />
                  <div className="absolute right-2 top-3 h-1.5 w-1.5 rounded-full bg-black/40" />
                </div>
              )}
            </div>
          </div>

          {/* KNOBLOCH logo plate */}
          <div className="absolute inset-x-0 -bottom-5 flex justify-center">
            <div className="rounded-sm bg-anthracite-900 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.25em] text-white">
              Knobloch
            </div>
          </div>
        </div>
      </div>

      {/* Floating annotation */}
      <div className="absolute bottom-4 right-4 max-w-[180px] rounded-lg border bg-background/95 p-3 text-xs shadow-md backdrop-blur">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Live-Vorschau</p>
        <p className="mt-0.5 font-medium leading-snug">
          {cols} {cols === 1 ? "Spalte" : "Spalten"} · {rows} {rows === 1 ? "Reihe" : "Reihen"}
          {hasPackage && " + Paketfach"}
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">{colorOpt.name}</p>
      </div>
    </div>
  );
}

function Compartment({ color }: { color: string }) {
  return (
    <div
      className="relative rounded-sm border border-black/30 transition-colors"
      style={{ backgroundColor: color, filter: "brightness(0.92)" }}
    >
      <div className="absolute inset-x-1.5 top-1.5 h-px bg-black/40" />
      <div className="absolute right-1.5 top-2.5 h-0.5 w-0.5 rounded-full bg-black/50" />
    </div>
  );
}
