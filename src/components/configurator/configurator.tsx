"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfigurator, CONFIGURATOR_TOTAL_STEPS } from "@/store/configurator-store";
import { ConfiguratorPreview } from "./preview";
import { PriceSidebar } from "./price-sidebar";
import { ConfiguratorProgress, ConfiguratorProgressMobile } from "./progress";
import {
  StepMounting,
  StepMaterial,
  StepColor,
  StepOrientation,
  StepCompartments,
  StepRetrieval,
  StepExtras,
  StepReview,
} from "./steps";

const stepComponents = [
  StepMounting,
  StepMaterial,
  StepColor,
  StepOrientation,
  StepCompartments,
  StepRetrieval,
  StepExtras,
];

export function Configurator({ initialType }: { initialType?: string }) {
  const { step, nextStep, prevStep, reset, setMountingType } = useConfigurator();

  useEffect(() => {
    if (initialType) setMountingType(initialType);
  }, [initialType, setMountingType]);

  const isReview = step >= CONFIGURATOR_TOTAL_STEPS - 1;
  const StepComponent = isReview ? StepReview : stepComponents[step];

  return (
    <div className="border-b bg-background">
      <div className="container py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              KNOBLOCH Konfigurator
            </p>
            <h1 className="mt-2 font-display text-3xl tracking-tight lg:text-4xl">
              Ihre Anlage in 7 Schritten.
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RefreshCw className="h-3.5 w-3.5" />
            Zurücksetzen
          </Button>
        </div>

        <ConfiguratorProgress />
        <ConfiguratorProgressMobile />

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ConfiguratorPreview />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4">
            <div className="rounded-2xl border bg-card p-6 lg:p-8">
              <StepComponent />

              <div className="mt-8 flex items-center justify-between gap-2 border-t pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevStep}
                  disabled={step === 0}
                  className="group"
                >
                  <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                  Zurück
                </Button>
                <span className="text-xs text-muted-foreground">
                  Schritt {step + 1} von {CONFIGURATOR_TOTAL_STEPS}
                </span>
                <Button
                  size="lg"
                  variant={isReview ? "accent" : "default"}
                  onClick={nextStep}
                  disabled={step === CONFIGURATOR_TOTAL_STEPS - 1}
                  className="group"
                >
                  {isReview ? "Fertig" : "Weiter"}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="order-3 lg:col-span-3">
            <PriceSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
