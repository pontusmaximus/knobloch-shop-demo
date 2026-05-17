"use client";

import { Check } from "lucide-react";
import { useConfigurator } from "@/store/configurator-store";
import { cn } from "@/lib/utils";

const labels = [
  "Montage",
  "Material",
  "Farbe",
  "Format",
  "Fächer",
  "Entnahme",
  "Zusammenfassung",
];

export function ConfiguratorProgress() {
  const { step, setStep } = useConfigurator();

  return (
    <ol className="hidden items-center gap-1 lg:flex">
      {labels.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <li key={label} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => i <= step + 1 && setStep(i)}
              disabled={i > step + 1}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                current && "border-anthracite-900 bg-anthracite-900 text-white",
                done && "border-emerald-200 bg-emerald-50 text-emerald-800",
                !current && !done && "border-border text-muted-foreground hover:bg-secondary"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  current && "bg-white text-anthracite-900",
                  done && "bg-emerald-600 text-white",
                  !current && !done && "bg-secondary text-foreground"
                )}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              {label}
            </button>
            {i < labels.length - 1 && <span className="h-px w-2 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}

export function ConfiguratorProgressMobile() {
  const { step } = useConfigurator();
  const pct = ((step + 1) / labels.length) * 100;
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">
          Schritt {step + 1} / {labels.length}
        </span>
        <span className="text-muted-foreground">{labels[step]}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-anthracite-900 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
