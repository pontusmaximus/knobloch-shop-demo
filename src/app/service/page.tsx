import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/common/faq-section";
import { generalFaqs, technicalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Service & Beratung",
  description:
    "Montage-Service, DIN EN 13724 Beratung, Ersatzteile und kostenlose Architektur-Beratung. Alle Service-Leistungen von KNOBLOCH.",
  alternates: { canonical: "/service" },
};

const services = [
  {
    icon: Wrench,
    title: "Montage-Service",
    text: "Zertifizierte Partner in Ihrer Region — vom Tischler bis zum GalaBau. Wir vermitteln auf Anfrage.",
    href: "/service/montage",
  },
  {
    icon: ShieldCheck,
    title: "DIN EN 13724",
    text: "Alle Anlagen erfüllen die europäische Norm für Hausbriefanlagen — Voraussetzung für Postversorgung.",
    href: "/service/din-en-13724",
  },
  {
    icon: Truck,
    title: "Ersatzteile & Schlüsselservice",
    text: "Klappen, Schlösser, Schilder — auch für Anlagen, die wir vor 30 Jahren geliefert haben.",
    href: "/service/ersatzteile",
  },
  {
    icon: BookOpen,
    title: "Architekten-Beratung",
    text: "Kostenfreie Beratung für Bauträger und Architekt:innen. BIM-Daten auf Anfrage.",
    href: "/kontakt",
  },
];

export default function ServicePage() {
  const allFaqs = [...generalFaqs, ...technicalFaqs];
  return (
    <>
      <section className="border-b bg-anthracite-50 py-12 dark:bg-anthracite-950 lg:py-16">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Service
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl text-balance">
            Service, der Bestand hat.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Wir sind nicht nur Hersteller — wir begleiten Sie über die gesamte Lebensdauer Ihrer
            Anlage. Auch wenn die Bestellung Jahrzehnte zurückliegt.
          </p>
        </div>
      </section>

      <section className="border-b py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group flex gap-5 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{s.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium">
                      Mehr erfahren
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection faqs={allFaqs} title="Alle häufigen Fragen" id="faq" />

      <section className="bg-anthracite-900 py-16 text-white lg:py-24">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-balance">
            Ihre Frage nicht dabei?
          </h2>
          <p className="mt-3 text-anthracite-300">
            Sprechen Sie direkt mit unserem Team in Döbeln. Antwort in 24 Stunden garantiert.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="tel:+4934316064242">+49 3431 6064-242</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
