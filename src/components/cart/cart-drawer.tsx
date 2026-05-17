"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, remove, updateQuantity, subtotal } = useCart();
  const total = subtotal();
  const shipping = total > 0 ? (total >= 999 ? 0 : 39) : 0;
  const grandTotal = total + shipping;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <aside
        aria-label="Warenkorb"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-background shadow-2xl transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Warenkorb</h2>
            <span className="text-sm text-muted-foreground">({items.length})</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
            aria-label="Warenkorb schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="mt-4 font-semibold">Ihr Warenkorb ist leer</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Starten Sie den Konfigurator oder stöbern Sie in unseren vorkonfigurierten Anlagen.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild onClick={close}>
                <Link href="/konfigurator">Konfigurator starten</Link>
              </Button>
              <Button asChild variant="outline" onClick={close}>
                <Link href="/briefkastenanlagen">Anlagen ansehen</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li key={item.id} className="border-b py-4 last:border-b-0">
                  <div className="flex gap-3">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary text-muted-foreground">
                      <ShoppingBag className="h-6 w-6 opacity-30" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold">{item.name}</p>
                      {item.subtitle && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</p>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="inline-flex h-7 w-7 items-center justify-center hover:bg-secondary"
                            aria-label="Menge reduzieren"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="inline-flex h-7 w-7 items-center justify-center hover:bg-secondary"
                            aria-label="Menge erhöhen"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold">{formatPrice(item.unitPrice * item.quantity)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="ml-2 inline-flex h-7 w-7 items-center justify-center self-start rounded-md text-muted-foreground hover:bg-secondary hover:text-destructive"
                      aria-label="Entfernen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t bg-secondary/30 px-5 py-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Zwischensumme</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Versand</dt>
                  <dd>{shipping === 0 ? "Kostenlos" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t pt-1 text-base font-semibold">
                  <dt>Gesamt (inkl. MwSt.)</dt>
                  <dd>{formatPrice(grandTotal)}</dd>
                </div>
              </dl>
              {total < 999 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Noch <strong>{formatPrice(999 - total)}</strong> bis kostenlosem Versand
                </p>
              )}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" onClick={close}>
                  <Link href="/warenkorb">Warenkorb</Link>
                </Button>
                <Button asChild onClick={close}>
                  <Link href="/checkout">Zur Kasse</Link>
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
