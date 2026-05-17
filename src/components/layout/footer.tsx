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
    <footer className="border-t bg-ink-50">
      {/* Newsletter */}
      <div className="border-b border-ink-200">
        <div className="container py-12 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900">
                Architektur-Newsletter
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-600">
                Neue Anlagen, Inspirationen für Architekt:innen und Sonderaktionen für Bauträger.
                Monatlich, kurz und ohne Verkaufsdruck.
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container grid gap-10 py-12 lg:grid-cols-5 lg:py-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-900 text-white">
              <span className="font-display text-lg font-bold leading-none">K</span>
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-ink-900">KNOBLOCH</p>
              <p className="text-[10px] uppercase tracking-widest text-ink-500">
                seit 1869 · Made in Germany
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm text-ink-600">
            Max Knobloch Nachf. GmbH — Deutschlands ältester Briefkastenhersteller. 156 Jahre
            Handwerkstradition, rund 200 Mitarbeiter:innen, gefertigt in Döbeln/Sachsen.
          </p>
          <address className="mt-6 space-y-2 text-sm not-italic text-ink-700">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
              <span>
                Max Knobloch Nachf. GmbH
                <br />
                Bahnhofstraße 79
                <br />
                04720 Döbeln, Deutschland
              </span>
            </p>
            <a href="tel:+4934316064242" className="flex items-center gap-2 hover:text-brand-600">
              <Phone className="h-4 w-4 text-ink-400" />
              +49 3431 6064-242
            </a>
            <a href="mailto:info@knobloch.de" className="flex items-center gap-2 hover:text-brand-600">
              <Mail className="h-4 w-4 text-ink-400" />
              info@knobloch.de
            </a>
          </address>
          <div className="mt-6 flex items-center gap-2">
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
      <div className="border-t border-ink-200 bg-white">
        <div className="container grid gap-3 py-6 text-xs text-ink-600 md:grid-cols-4">
          <TrustItem title="DIN EN 13724" sub="Zertifizierte Sicherheit" />
          <TrustItem title="10 Jahre Garantie" sub="Funktion & Verarbeitung" />
          <TrustItem title="Trusted Shops" sub="Käuferschutz inklusive" />
          <TrustItem title="CO₂-neutraler Versand" sub="DHL GoGreen" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-200 bg-white">
        <div className="container flex flex-col gap-3 py-4 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Max Knobloch Nachf. GmbH · Deutschlands ältester
            Briefkastenhersteller
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-600">
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
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink-900">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-600 transition-colors hover:text-brand-600">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
    >
      {children}
    </a>
  );
}

function TrustItem({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white p-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600"
        aria-hidden
      >
        ✓
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p>{sub}</p>
      </div>
    </div>
  );
}
