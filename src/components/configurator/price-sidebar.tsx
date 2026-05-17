"use client";

import { useState } from "react";
import { Download, Share2, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfigurator } from "@/store/configurator-store";
import { useCart } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { mountingTypes, materials, colors } from "@/data/configurator-options";

export function PriceSidebar() {
  const cfg = useConfigurator();
  const price = cfg.priceBreakdown();
  const addToCart = useCart((s) => s.add);
  const [copied, setCopied] = useState(false);

  const mounting = mountingTypes.find((m) => m.id === cfg.mountingType)?.name ?? "—";
  const material = materials.find((m) => m.id === cfg.material)?.name ?? "—";
  const color = colors.find((c) => c.id === cfg.color)?.name ?? "—";
  const total = cfg.cols * cfg.rows;

  function handleAddToCart() {
    addToCart({
      id: `cfg-${Date.now()}`,
      type: "configuration",
      name: `Individuelle Anlage · ${mounting}`,
      subtitle: `${material} · ${color} · ${total} Fächer${cfg.hasPackage ? " + Paket" : ""}`,
      image: "/img/configurator-preview.jpg",
      unitPrice: price.total,
      quantity: 1,
      meta: {
        mountingType: cfg.mountingType,
        material: cfg.material,
        color: cfg.color,
        cols: cfg.cols,
        rows: cfg.rows,
        hasPackage: cfg.hasPackage,
      },
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
    const url = `${window.location.origin}/konfigurator?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <aside className="sticky top-24 self-start">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="border-b bg-anthracite-900 p-5 text-white">
          <p className="text-[10px] uppercase tracking-widest text-anthracite-300">Live-Preis</p>
          <p className="font-display text-4xl">{formatPrice(price.total)}</p>
          <p className="mt-1 text-xs text-anthracite-300">inkl. 19 % MwSt., zzgl. Versand</p>

          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <Badge variant="success" className="px-2">
              <Truck className="mr-1 h-3 w-3" />
              5 Werktage
            </Badge>
            <Badge variant="accent" className="px-2">Made in Döbeln</Badge>
          </div>
        </div>

        <div className="space-y-2 p-5 text-sm">
          <Row label="Grundpreis" value={price.base} />
          {price.material > 0 && <Row label="Material-Upgrade" value={price.material} />}
          {price.color > 0 && <Row label="Premium-Farbe" value={price.color} />}
          {price.orientation > 0 && <Row label="XL-Orientierung" value={price.orientation} />}
          {price.retrieval > 0 && <Row label="Entnahme hinten" value={price.retrieval} />}
          {price.compartments > 0 && <Row label="Zusätzliche Fächer" value={price.compartments} />}
          {price.pkg > 0 && <Row label="Paketfach" value={price.pkg} />}
          {price.extras > 0 && <Row label="Extras" value={price.extras} />}

          <div className="border-t pt-2 text-base font-semibold">
            <Row label="Gesamt" value={price.total} bold />
          </div>
        </div>

        <div className="space-y-2 border-t bg-secondary/30 p-5">
          <Button onClick={handleAddToCart} size="lg" className="w-full">
            <ShoppingBag className="h-4 w-4" />
            In den Warenkorb
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-3.5 w-3.5" />
              {copied ? "Kopiert!" : "Teilen"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
          </div>
        </div>

        <div className="border-t bg-card p-5 text-xs">
          <p className="font-semibold">Konfigurations-Zusammenfassung</p>
          <dl className="mt-2 space-y-1 text-muted-foreground">
            <SummaryRow label="Montage" value={mounting} />
            <SummaryRow label="Material" value={material} />
            <SummaryRow label="Farbe" value={color} />
            <SummaryRow label="Fächer" value={`${total} (${cfg.cols} × ${cfg.rows})${cfg.hasPackage ? " + Paket" : ""}`} />
            {cfg.selectedExtras.length > 0 && (
              <SummaryRow label="Extras" value={`${cfg.selectedExtras.length} ausgewählt`} />
            )}
          </dl>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        💡 <strong>2 % Express-Rabatt</strong> bei Bestätigung in 3 Tagen
      </p>
    </aside>
  );
}

function Row({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "font-bold" : ""}>{formatPrice(value)}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <dt>{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
