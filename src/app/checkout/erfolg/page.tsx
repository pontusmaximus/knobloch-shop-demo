import Link from "next/link";
import { Check, Mail, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Bestellung erfolgreich",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  const orderNumber = `KN-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")}`;

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-center font-display text-4xl tracking-tight">
          Vielen Dank für Ihre Bestellung!
        </h1>
        <p className="mt-3 text-center text-muted-foreground">
          Ihre Bestellung wurde erfolgreich übermittelt. Wir senden Ihnen in Kürze eine
          Bestätigungs-E-Mail mit allen Details.
        </p>

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Bestellnummer
          </p>
          <p className="font-display text-2xl">{orderNumber}</p>

          <div className="mt-6 space-y-4">
            <Step
              icon={<Mail className="h-4 w-4" />}
              title="E-Mail-Bestätigung"
              text="Sie erhalten in den nächsten Minuten eine Bestätigungs-E-Mail mit allen Bestelldetails und Ihrer Auftragsbestätigung als PDF."
            />
            <Step
              icon={<Package className="h-4 w-4" />}
              title="Fertigung in Döbeln"
              text="Ihre Anlage wird in unserer Manufaktur in Sachsen montiert. Bei Schnellkonfigurationen passiert das innerhalb von 5 Werktagen."
            />
            <Step
              icon={<Truck className="h-4 w-4" />}
              title="Versand via Spedition"
              text="Vor dem Versand kontaktieren wir Sie für einen Wunschtermin. CO₂-neutral mit DHL GoGreen."
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild variant="accent" size="lg">
            <Link href="/">Zurück zur Startseite</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontakt">Frage zur Bestellung</Link>
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Bei Fragen erreichen Sie uns Mo–Fr 8:00–17:00 unter{" "}
          <a href="tel:+4934316064242" className="font-medium underline">
            +49 3431 6064-242
          </a>
        </p>
      </div>
    </section>
  );
}

function Step({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
