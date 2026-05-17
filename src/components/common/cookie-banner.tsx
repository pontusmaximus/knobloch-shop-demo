"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("knobloch-cookies");
    if (!seen) setShow(true);
  }, []);

  if (!show) return null;

  function decide(consent: "all" | "essential") {
    window.localStorage.setItem("knobloch-cookies", consent);
    setShow(false);
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-xl border bg-background/95 p-5 shadow-2xl backdrop-blur md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex-1">
          <p className="text-sm font-semibold">Datenschutz hat bei uns Vorrang.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Wir verwenden technisch notwendige Cookies, damit Ihr Warenkorb funktioniert.
            Zusätzlich helfen uns anonymisierte Analyse-Cookies, unseren Konfigurator zu
            verbessern. Sie können selbst entscheiden.{" "}
            <a href="/datenschutz" className="underline">
              Datenschutzerklärung
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-stretch">
          <Button onClick={() => decide("all")} size="sm">
            Alle akzeptieren
          </Button>
          <Button onClick={() => decide("essential")} variant="outline" size="sm">
            Nur notwendige
          </Button>
        </div>
      </div>
    </div>
  );
}
