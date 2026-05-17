"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { items, remove, updateQuantity, subtotal } = useCart();
  const total = subtotal();
  const shipping = total > 0 ? (total >= 999 ? 0 : 39) : 0;
  const tax = (total + shipping) * (0.19 / 1.19);
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="mt-6 font-display text-3xl">Ihr Warenkorb ist leer</h1>
          <p className="mt-3 text-muted-foreground">
            Konfigurieren Sie Ihre individuelle Anlage oder stöbern Sie durch unsere
            Schnelllieferer-Modelle.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="accent">
              <Link href="/konfigurator">Konfigurator starten</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/briefkastenanlagen">Alle Anlagen</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="container">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Start</Link> /{" "}
          <span className="text-foreground">Warenkorb</span>
        </nav>
        <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Warenkorb</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ul className="divide-y rounded-2xl border bg-card">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 p-5">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
                    <ShoppingBag className="h-7 w-7 opacity-30" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-base font-semibold">{item.name}</p>
                        {item.subtitle && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>
                        )}
                        {item.type === "configuration" && (
                          <Badge variant="outline" className="mt-2 text-[10px]">
                            Individuelle Konfiguration
                          </Badge>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Artikel entfernen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-md border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="inline-flex h-9 w-9 items-center justify-center hover:bg-secondary"
                          aria-label="Menge reduzieren"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="inline-flex h-9 w-9 items-center justify-center hover:bg-secondary"
                          aria-label="Menge erhöhen"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-base font-semibold">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild variant="ghost" size="sm" className="mt-4">
              <Link href="/briefkastenanlagen">← Weiter einkaufen</Link>
            </Button>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border bg-card p-6">
              <h2 className="font-semibold">Bestellübersicht</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Zwischensumme" value={formatPrice(total)} />
                <Row
                  label={
                    <span className="inline-flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      Versand
                    </span>
                  }
                  value={shipping === 0 ? "Kostenlos" : formatPrice(shipping)}
                />
                <Row label="enthaltene MwSt. (19 %)" value={formatPrice(tax)} muted />
                <div className="my-2 h-px bg-border" />
                <Row label="Gesamt" value={formatPrice(grandTotal)} bold large />
              </dl>

              {total < 999 && (
                <p className="mt-3 rounded-md bg-secondary p-3 text-xs">
                  💡 Noch <strong>{formatPrice(999 - total)}</strong> bis kostenlosem Versand
                </p>
              )}

              <Button asChild size="lg" variant="accent" className="mt-5 w-full">
                <Link href="/checkout" className="group">
                  Zur Kasse
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground">
                <li>✓ Lieferung in 5 Werktagen</li>
                <li>✓ 14 Tage Rückgaberecht</li>
                <li>✓ Trusted Shops Käuferschutz</li>
                <li>✓ Sichere Zahlung (SSL-verschlüsselt)</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  large,
}: {
  label: React.ReactNode;
  value: string;
  bold?: boolean;
  muted?: boolean;
  large?: boolean;
}) {
  return (
    <div className={`flex justify-between ${muted ? "text-muted-foreground" : ""}`}>
      <dt className={bold ? "" : ""}>{label}</dt>
      <dd className={`${bold ? "font-bold" : ""} ${large ? "text-lg" : ""}`}>{value}</dd>
    </div>
  );
}
