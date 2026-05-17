"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, Mail, MapPin, Package, ShoppingBag, Truck } from "lucide-react";
import { useCart, type CartItem } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

type Step = "address" | "shipping" | "payment" | "review";

const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: "address", label: "Adresse", icon: <MapPin className="h-3.5 w-3.5" /> },
  { id: "shipping", label: "Versand", icon: <Truck className="h-3.5 w-3.5" /> },
  { id: "payment", label: "Zahlung", icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: "review", label: "Prüfen", icon: <Check className="h-3.5 w-3.5" /> },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("klarna");

  const stepIndex = steps.findIndex((s) => s.id === step);
  const total = subtotal();
  const shippingCost = total >= 999 ? 0 : shipping === "express" ? 79 : 39;
  const grandTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <section className="py-20">
        <div className="container max-w-md text-center">
          <p className="font-display text-2xl">Ihr Warenkorb ist leer.</p>
          <Button asChild className="mt-6">
            <Link href="/briefkastenanlagen">Zurück zum Shop</Link>
          </Button>
        </div>
      </section>
    );
  }

  function next() {
    if (step === "address") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("review");
    else {
      clear();
      router.push("/checkout/erfolg");
    }
  }
  function back() {
    if (step === "shipping") setStep("address");
    else if (step === "payment") setStep("shipping");
    else if (step === "review") setStep("payment");
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="container">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Start</Link> /{" "}
          <Link href="/warenkorb" className="hover:text-foreground">Warenkorb</Link> /{" "}
          <span className="text-foreground">Kasse</span>
        </nav>
        <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">Kasse</h1>

        {/* Steps */}
        <ol className="mt-8 flex flex-wrap items-center gap-1.5 text-xs">
          {steps.map((s, i) => {
            const active = step === s.id;
            const done = i < stepIndex;
            return (
              <li key={s.id} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
                    active && "border-ink-900 bg-ink-900 text-white",
                    done && "border-emerald-200 bg-emerald-50 text-emerald-800",
                    !active && !done && "border-border text-muted-foreground"
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : s.icon}
                  {s.label}
                </span>
                {i < steps.length - 1 && <span className="h-px w-3 bg-border" />}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl border bg-card p-6 lg:p-8">
              {step === "address" && <AddressStep />}
              {step === "shipping" && (
                <ShippingStep shipping={shipping} setShipping={setShipping} total={total} />
              )}
              {step === "payment" && <PaymentStep payment={payment} setPayment={setPayment} />}
              {step === "review" && (
                <ReviewStep
                  items={items}
                  total={total}
                  shippingCost={shippingCost}
                  grandTotal={grandTotal}
                  shipping={shipping}
                  payment={payment}
                />
              )}

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button variant="outline" size="lg" onClick={back} disabled={step === "address"}>
                  <ArrowLeft />
                  Zurück
                </Button>
                <Button onClick={next} size="lg" variant={step === "review" ? "accent" : "default"}>
                  {step === "review" ? "Kostenpflichtig bestellen" : "Weiter"}
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-3">
              <div className="rounded-2xl border bg-card p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider">Ihre Bestellung</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {items.map((it) => (
                    <li key={it.id} className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-1 font-medium">{it.name}</p>
                        <p className="text-xs text-muted-foreground">{it.quantity} × {formatPrice(it.unitPrice)}</p>
                      </div>
                      <span className="shrink-0 font-semibold">
                        {formatPrice(it.unitPrice * it.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 space-y-1 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Zwischensumme</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Versand</dt>
                    <dd>{shippingCost === 0 ? "Kostenlos" : formatPrice(shippingCost)}</dd>
                  </div>
                  <div className="mt-2 flex justify-between border-t pt-2 text-base font-bold">
                    <dt>Gesamt</dt>
                    <dd>{formatPrice(grandTotal)}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border bg-secondary/50 p-4 text-xs">
                <p className="font-semibold">Versprochen:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>✓ SSL-verschlüsselte Bestellung</li>
                  <li>✓ Trusted Shops Käuferschutz</li>
                  <li>✓ 14 Tage Widerrufsrecht</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function AddressStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Lieferadresse</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Wir liefern in ganz Deutschland, Österreich, Schweiz und Liechtenstein.
        </p>
      </div>

      <div>
        <Label htmlFor="email">E-Mail-Adresse</Label>
        <Input id="email" type="email" placeholder="ihre@email.de" className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="vorname">Vorname</Label>
          <Input id="vorname" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="nachname">Nachname</Label>
          <Input id="nachname" className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="firma">Firma (optional)</Label>
        <Input id="firma" className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="strasse">Straße & Hausnummer</Label>
        <Input id="strasse" className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="plz">PLZ</Label>
          <Input id="plz" className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="ort">Ort</Label>
          <Input id="ort" className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label htmlFor="telefon">Telefon (für Spedition)</Label>
        <Input id="telefon" type="tel" className="mt-1.5" />
      </div>
    </div>
  );
}

function ShippingStep({
  shipping,
  setShipping,
  total,
}: {
  shipping: string;
  setShipping: (v: string) => void;
  total: number;
}) {
  const freeShipping = total >= 999;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Versandart</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Schnellkonfigurationen liefern wir per Spedition direkt vor Ihre Tür.
        </p>
      </div>

      <RadioGroup value={shipping} onValueChange={setShipping} className="gap-3">
        <ShippingOption
          value="standard"
          checked={shipping === "standard"}
          title="Standard-Versand"
          subtitle="Spedition · 5 Werktage · CO₂-neutral (DHL GoGreen)"
          price={freeShipping ? "Kostenlos" : "39,00 €"}
          badge={freeShipping ? "Inklusive" : undefined}
        />
        <ShippingOption
          value="express"
          checked={shipping === "express"}
          title="Express-Versand"
          subtitle="Spedition · 3 Werktage · Wunschtermin möglich"
          price="79,00 €"
        />
        <ShippingOption
          value="pickup"
          checked={shipping === "pickup"}
          title="Selbstabholung Döbeln"
          subtitle="Kostenlos · Werksführung optional auf Anfrage"
          price="Kostenlos"
        />
      </RadioGroup>
    </div>
  );
}

function ShippingOption({
  value,
  checked,
  title,
  subtitle,
  price,
  badge,
}: {
  value: string;
  checked: boolean;
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
}) {
  return (
    <Label
      htmlFor={`ship-${value}`}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all",
        checked ? "border-ink-900 bg-ink-50 dark:bg-ink-900/40" : "border-border hover:border-ink-400"
      )}
    >
      <RadioGroupItem value={value} id={`ship-${value}`} className="mt-0.5" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold">{title}</p>
          {badge && <Badge variant="success">{badge}</Badge>}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <span className="text-sm font-semibold">{price}</span>
    </Label>
  );
}

function PaymentStep({ payment, setPayment }: { payment: string; setPayment: (v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Zahlungsart</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Alle Zahlungen sind SSL-verschlüsselt und PCI-DSS-zertifiziert.
        </p>
      </div>

      <RadioGroup value={payment} onValueChange={setPayment} className="gap-3">
        <PaymentOption value="klarna" checked={payment === "klarna"} title="Klarna" subtitle="Rechnung oder Ratenzahlung — keine zusätzlichen Kosten" />
        <PaymentOption value="paypal" checked={payment === "paypal"} title="PayPal" subtitle="Bezahlen Sie schnell und sicher mit PayPal" />
        <PaymentOption value="creditcard" checked={payment === "creditcard"} title="Kreditkarte" subtitle="Visa, Mastercard, American Express" />
        <PaymentOption value="sofort" checked={payment === "sofort"} title="SOFORT Überweisung" subtitle="Direkt aus Ihrem Online-Banking" />
        <PaymentOption value="sepa" checked={payment === "sepa"} title="SEPA-Lastschrift" subtitle="Bequem per Bankeinzug" />
        <PaymentOption value="vorkasse" checked={payment === "vorkasse"} title="Vorkasse" subtitle="Per Überweisung — 2 % Skonto bei Zahlung in 3 Tagen" />
      </RadioGroup>
    </div>
  );
}

function PaymentOption({
  value,
  checked,
  title,
  subtitle,
}: {
  value: string;
  checked: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <Label
      htmlFor={`pay-${value}`}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-all",
        checked ? "border-ink-900 bg-ink-50 dark:bg-ink-900/40" : "border-border hover:border-ink-400"
      )}
    >
      <RadioGroupItem value={value} id={`pay-${value}`} className="mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </Label>
  );
}

function ReviewStep({
  items,
  total,
  shippingCost,
  grandTotal,
  shipping,
  payment,
}: {
  items: CartItem[];
  total: number;
  shippingCost: number;
  grandTotal: number;
  shipping: string;
  payment: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Bestellung prüfen</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bitte überprüfen Sie Ihre Angaben vor der Bestellung.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Package className="mr-1 inline h-3.5 w-3.5" />
          Artikel ({items.length})
        </p>
        <ul className="mt-3 divide-y text-sm">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{it.name}</p>
                {it.subtitle && <p className="text-xs text-muted-foreground">{it.subtitle}</p>}
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(it.unitPrice * it.quantity)}</p>
                <p className="text-xs text-muted-foreground">× {it.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Truck className="mr-1 inline h-3.5 w-3.5" />
            Versand
          </p>
          <p className="mt-2 text-sm font-medium">{shipping === "express" ? "Express" : shipping === "pickup" ? "Selbstabholung" : "Standard"}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CreditCard className="mr-1 inline h-3.5 w-3.5" />
            Zahlung
          </p>
          <p className="mt-2 text-sm font-medium capitalize">{payment}</p>
        </div>
      </div>

      <div className="rounded-lg border-2 border-ink-900 bg-ink-900 p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-300">Gesamtbetrag</p>
            <p className="font-display text-3xl">{formatPrice(grandTotal)}</p>
          </div>
          <p className="text-xs text-ink-300">inkl. MwSt.</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Mit Klick auf „Kostenpflichtig bestellen" akzeptieren Sie unsere{" "}
        <Link href="/agb" className="underline">AGB</Link> und nehmen die{" "}
        <Link href="/widerruf" className="underline">Widerrufsbelehrung</Link> zur Kenntnis.
      </p>
    </div>
  );
}
