"use client";

import { create } from "zustand";
import {
  mountingTypes,
  materials,
  colors,
  extras,
  calculateCompartmentPrice,
  sizeOrientations,
  retrievalOptions,
} from "@/data/configurator-options";

export type ConfiguratorState = {
  mountingType: string;
  material: string;
  color: string;
  orientation: string;
  retrieval: string;
  cols: 1 | 2 | 3 | 4;
  rows: number;
  hasPackage: boolean;
  selectedExtras: string[];
  step: number;
  setMountingType: (id: string) => void;
  setMaterial: (id: string) => void;
  setColor: (id: string) => void;
  setOrientation: (id: string) => void;
  setRetrieval: (id: string) => void;
  setCols: (n: 1 | 2 | 3 | 4) => void;
  setRows: (n: number) => void;
  togglePackage: () => void;
  toggleExtra: (id: string) => void;
  setStep: (n: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  priceBreakdown: () => {
    base: number;
    material: number;
    color: number;
    orientation: number;
    retrieval: number;
    compartments: number;
    pkg: number;
    extras: number;
    total: number;
  };
};

const TOTAL_STEPS = 7;

const initialState = {
  mountingType: "freistehend",
  material: "v2a",
  color: "edelstahl-geschliffen",
  orientation: "senkrecht",
  retrieval: "vorne",
  cols: 1 as const,
  rows: 3,
  hasPackage: false,
  selectedExtras: [] as string[],
  step: 0,
};

export const useConfigurator = create<ConfiguratorState>((set, get) => ({
  ...initialState,
  setMountingType: (id) => set({ mountingType: id }),
  setMaterial: (id) => set({ material: id }),
  setColor: (id) => set({ color: id }),
  setOrientation: (id) => set({ orientation: id }),
  setRetrieval: (id) => set({ retrieval: id }),
  setCols: (n) => set({ cols: n }),
  setRows: (n) => set({ rows: Math.max(1, Math.min(8, n)) }),
  togglePackage: () => set((s) => ({ hasPackage: !s.hasPackage })),
  toggleExtra: (id) =>
    set((s) => ({
      selectedExtras: s.selectedExtras.includes(id)
        ? s.selectedExtras.filter((e) => e !== id)
        : [...s.selectedExtras, id],
    })),
  setStep: (n) => set({ step: Math.max(0, Math.min(TOTAL_STEPS - 1, n)) }),
  nextStep: () => set((s) => ({ step: Math.min(TOTAL_STEPS - 1, s.step + 1) })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  reset: () => set(initialState),
  priceBreakdown: () => {
    const s = get();
    const mounting = mountingTypes.find((m) => m.id === s.mountingType) ?? mountingTypes[0];
    const material = materials.find((m) => m.id === s.material) ?? materials[0];
    const color = colors.find((c) => c.id === s.color) ?? colors[0];
    const orientation = sizeOrientations.find((o) => o.id === s.orientation) ?? sizeOrientations[0];
    const retrieval = retrievalOptions.find((r) => r.id === s.retrieval) ?? retrievalOptions[0];

    const base = Math.round(mounting.basePrice);
    const materialUpcharge = Math.round(base * (material.priceFactor - 1));
    const compartmentSurcharge = calculateCompartmentPrice(s.cols, s.rows);
    const pkg = s.hasPackage ? 299 : 0;
    const extraSum = s.selectedExtras.reduce(
      (sum, id) => sum + (extras.find((e) => e.id === id)?.price ?? 0),
      0
    );

    const total =
      base + materialUpcharge + color.surcharge + orientation.surcharge + retrieval.surcharge + compartmentSurcharge + pkg + extraSum;

    return {
      base,
      material: materialUpcharge,
      color: color.surcharge,
      orientation: orientation.surcharge,
      retrieval: retrieval.surcharge,
      compartments: compartmentSurcharge,
      pkg,
      extras: extraSum,
      total,
    };
  },
}));

export const CONFIGURATOR_TOTAL_STEPS = TOTAL_STEPS;
