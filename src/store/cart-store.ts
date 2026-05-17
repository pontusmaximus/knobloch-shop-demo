"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  type: "product" | "configuration";
  name: string;
  subtitle?: string;
  image: string;
  unitPrice: number;
  quantity: number;
  meta?: Record<string, string | number | boolean>;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  subtotal: () => number;
  totalItems: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      subtotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "knobloch-cart",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as unknown as Storage))),
    }
  )
);
