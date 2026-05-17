import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Kontakt & Beratung",
  description:
    "Kostenlose Beratung für Privatkunden, Architekten und Bauträger. Telefonisch +49 3431 6064-242 oder per Anfrage-Formular. Antwort in 24 h.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Beratung & Kontakt
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl text-balance">
          Wir helfen Ihnen weiter.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Egal ob private Anlage, Großprojekt oder Wiederbestellung — unser Team in Döbeln berät
          Sie persönlich. Antwortzeit garantiert innerhalb von 24 Stunden.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form className="space-y-6 rounded-2xl border bg-card p-6 lg:p-8">
              <h2 className="font-display text-2xl">Anfrage senden</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="anrede">Anrede</Label>
                  <select
                    id="anrede"
                    className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option>Herr</option>
                    <option>Frau</option>
                    <option>Divers / Keine Angabe</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="typ">Anfragetyp</Label>
                  <select
                    id="typ"
                    className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option>Privatkunde</option>
                    <option>Architekt:in</option>
                    <option>Bauträger / Wohnungswirtschaft</option>
                    <option>Wiederverkäufer</option>
                  </select>
                </div>
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="telefon">Telefon (optional)</Label>
                  <Input id="telefon" type="tel" className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="nachricht">Ihre Nachricht</Label>
                <textarea
                  id="nachricht"
                  rows={5}
                  placeholder="Beschreiben Sie Ihr Projekt — Anzahl Wohneinheiten, Standort, gewünschter Montagetyp ..."
                  className="mt-1.5 w-full rounded-md border border-input bg-background p-3 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="upload" className="block">
                  Architekturzeichnung anhängen (optional)
                </Label>
                <input
                  id="upload"
                  type="file"
                  className="mt-1.5 block w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-medium"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" required className="mt-0.5" />
                <span>
                  Ich habe die <a href="/datenschutz" className="underline">Datenschutzerklärung</a>{" "}
                  zur Kenntnis genommen.
                </span>
              </label>

              <Button type="submit" size="lg" variant="accent" className="w-full">
                Anfrage absenden
              </Button>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-4">
              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                title="Telefon"
                line1="+49 3431 6064-242"
                line2="Mo–Fr 8:00–17:00 Uhr"
                href="tel:+4934316064242"
              />
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="E-Mail"
                line1="info@knobloch.de"
                line2="Antwort in 24 h garantiert"
                href="mailto:info@knobloch.de"
              />
              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                title="Manufaktur"
                line1="Bahnhofstraße 79"
                line2="04720 Döbeln, Deutschland"
              />
              <ContactCard
                icon={<Clock className="h-5 w-5" />}
                title="Werksführungen"
                line1="Auf Anfrage für Architekt:innen,"
                line2="Bauträger und Großkunden"
              />

              <div className="overflow-hidden rounded-2xl border">
                <div className="aspect-[4/3] bg-ink-100 dark:bg-ink-900">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    🗺️ Karte: Döbeln, Sachsen
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  line1,
  line2,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  line1: string;
  line2: string;
  href?: string;
}) {
  const Body = (
    <div className="flex gap-4 rounded-2xl border bg-card p-5 transition-colors hover:bg-secondary/30">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-semibold">{line1}</p>
        <p className="text-xs text-muted-foreground">{line2}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{Body}</a> : Body;
}
