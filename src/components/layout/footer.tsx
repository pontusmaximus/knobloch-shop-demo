import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const productLinks = [
  { label: "Freistehende Anlagen", href: "/briefkastenanlagen/freistehend" },
  { label: "Aufputz", href: "/briefkastenanlagen/aufputz" },
  { label: "Unterputz", href: "/briefkastenanlagen/unterputz" },
  { label: "Zaunanlagen", href: "/briefkastenanlagen/zaun" },
  { label: "Türelement", href: "/briefkastenanlagen/tuerelement" },
  { label: "Paketboxen", href: "/paketboxen" },
];

const serviceLinks = [
  { label: "Konfigurator", href: "/konfigurator" },
  { label: "Beratung", href: "/kontakt" },
  { label: "Montage", href: "/service/montage" },
  { label: "DIN EN 13724", href: "/service/din-en-13724" },
  { label: "Ersatzteile", href: "/service/ersatzteile" },
  { label: "FAQ", href: "/service#faq" },
];

const companyLinks = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Geschichte seit 1869", href: "/ueber-uns#geschichte" },
  { label: "Karriere", href: "/karriere" },
  { label: "Presse", href: "/presse" },
  { label: "Nachhaltigkeit", href: "/nachhaltigkeit" },
  { label: "Für Profis (B2B)", href: "/haendler" },
];

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Widerrufsrecht", href: "/widerruf" },
  { label: "Versandkosten", href: "/versand" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="border-t bg-anthracite-900 text-anthracite-200">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container py-12 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl text-white">Architektur-Newsletter</h2>
              <p className="mt-2 max-w-md text-sm text-anthracite-300">
                Neue Anlagen, Inspirationen für Architekt:innen und Sonderaktionen für Bauträger.
                Monatlich, kurz und ohne Verkaufsdruck.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container grid gap-10 py-12 lg:grid-cols-5 lg:py-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-anthracite-900">
              <span className="font-display text-lg font-bold leading-none">K</span>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">KNOBLOCH</p>
              <p className="text-[10px] uppercase tracking-widest text-anthracite-400">seit 1869 · Made in Germany</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm text-anthracite-300">
            Max Knobloch Nachf. GmbH — Deutschlands ältester Briefkastenhersteller. 156 Jahre
            Handwerkstradition, rund 200 Mitarbeiter:innen, gefertigt in Döbeln/Sachsen.
          </p>
          <address className="mt-6 space-y-2 text-sm not-italic">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-anthracite-400" />
              <span>
                Max Knobloch Nachf. GmbH
                <br />
                Bahnhofstraße 79
                <br />
                04720 Döbeln, Deutschland
              </span>
            </p>
            <a href="tel:+4934316064242" className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-anthracite-400" />
              +49 3431 6064-242
            </a>
            <a href="mailto:info@knobloch.de" className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4 text-anthracite-400" />
              info@knobloch.de
            </a>
          </address>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href="https://facebook.com" label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://instagram.com" label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://youtube.com" label="YouTube">
              <Youtube className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <FooterCol title="Produkte" links={productLinks} />
        <FooterCol title="Service" links={serviceLinks} />
        <FooterCol title="Unternehmen" links={companyLinks} />
      </div>

      {/* Trust row */}
      <div className="border-t border-white/10">
        <div className="container grid gap-4 py-6 text-xs text-anthracite-400 md:grid-cols-4">
          <TrustItem title="DIN EN 13724" sub="Zertifizierte Sicherheit" />
          <TrustItem title="10 Jahre Garantie" sub="Funktion & Verarbeitung" />
          <TrustItem title="Trusted Shops" sub="Käuferschutz inklusive" />
          <TrustItem title="CO₂-neutraler Versand" sub="DHL GoGreen" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-4 text-xs text-anthracite-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Max Knobloch Nachf. GmbH · Deutschlands ältester Briefkastenhersteller</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-anthracite-300 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-anthracite-200 transition-colors hover:bg-white hover:text-anthracite-900"
    >
      {children}
    </a>
  );
}

function TrustItem({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/20 text-accent" aria-hidden>
        ✓
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p>{sub}</p>
      </div>
    </div>
  );
}
