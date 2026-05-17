"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-store";
import type { Product } from "@/data/products";

export function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCart((s) => s.add);

  function handle() {
    addToCart({
      id: `product-${product.slug}`,
      type: "product",
      name: product.name,
      subtitle: `${product.material} · ${product.color}`,
      image: product.images[0] ?? "",
      unitPrice: product.price,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-stretch gap-2">
      <div className="inline-flex items-center rounded-md border">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="inline-flex h-12 w-10 items-center justify-center hover:bg-secondary"
          aria-label="Menge reduzieren"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center font-semibold">{qty}</span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          className="inline-flex h-12 w-10 items-center justify-center hover:bg-secondary"
          aria-label="Menge erhöhen"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button onClick={handle} size="lg" variant="accent" className="flex-1">
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Hinzugefügt
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            In den Warenkorb
          </>
        )}
      </Button>
    </div>
  );
}
