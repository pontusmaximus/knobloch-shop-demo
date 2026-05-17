import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-anthracite-900 text-white">
      <BackgroundOrnament />

      <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
          <Badge variant="accent" className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-anthracite-900" /> Seit 1869 · Made in Döbeln
          </Badge>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
            Briefkastenanlagen,<br />
            die <span className="italic text-accent">156 Jahre</span> halten.
          </h1>
          <p className="mt-6 max-w-xl text-base text-anthracite-200 md:text-lg text-pretty">
            Konfigurieren Sie Ihre Anlage in 7 Schritten — mit Live-Preis, Live-Vorschau und
            Lieferung in 5 Werktagen. Direkt vom ältesten Briefkastenhersteller Deutschlands.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl" className="group">
              <Link href="/konfigurator">
                Anlage konfigurieren
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/briefkastenanlagen">Anlagen ansehen</Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 md:max-w-xl">
            <Stat number="156" label="Jahre Tradition" />
            <Stat number="100K+" label="Anlagen weltweit" />
            <Stat number="5" label="Tage Lieferzeit" />
          </dl>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10 bg-anthracite-950/40 backdrop-blur">
        <div className="container grid gap-2 py-4 text-xs text-anthracite-300 md:grid-cols-4 md:gap-6 md:py-3">
          <TrustItem icon={<ShieldCheck className="h-4 w-4" />} text="DIN EN 13724 zertifiziert" />
          <TrustItem icon={<Truck className="h-4 w-4" />} text="Lieferung in 5 Werktagen" />
          <TrustItem icon={<Award className="h-4 w-4" />} text="10 Jahre Garantie" />
          <TrustItem icon={<span className="text-sm">⭐</span>} text="4,8 / 5 · 2.140 Bewertungen" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl text-white md:text-3xl">{number}</dd>
      <p className="mt-1 text-xs text-anthracite-300 md:text-sm">{label}</p>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function BackgroundOrnament() {
  return (
    <>
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-brass-600/10 blur-3xl" />
    </>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
      {/* Floating product card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[88%] w-[60%] rounded-2xl border border-white/15 bg-gradient-to-b from-anthracite-700 to-anthracite-900 shadow-2xl">
          {/* Mailbox slits */}
          <div className="absolute inset-x-6 top-12 space-y-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-1 w-full rounded-full bg-anthracite-500/60" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-anthracite-400">
                    Wohneinheit {i + 1}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
          {/* Package slot */}
          <div className="absolute inset-x-6 bottom-14 rounded-lg border border-anthracite-500/40 bg-anthracite-800/60 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-anthracite-400">Paketfach</p>
                <p className="text-xs font-semibold text-white">38 × 38 × 35 cm</p>
              </div>
              <div className="h-6 w-6 rounded-full border-2 border-anthracite-500/60" />
            </div>
          </div>
          {/* Logo plate */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-anthracite-400">Knobloch</span>
          </div>
        </div>
      </div>

      {/* Annotations */}
      <Annotation
        className="left-0 top-12"
        title="Edelstahl V2A"
        sub="2 mm, geschliffen"
      />
      <Annotation
        className="right-0 top-1/3"
        title="DIN EN 13724"
        sub="Zertifiziert"
        right
      />
      <Annotation
        className="bottom-12 left-2"
        title="3 + Paket"
        sub="Wohneinheiten"
      />
      <Annotation
        className="bottom-24 right-2"
        title="ab 1.289 €"
        sub="Schnelle Lieferung"
        right
        accent
      />
    </div>
  );
}

function Annotation({
  className,
  title,
  sub,
  right,
  accent,
}: {
  className?: string;
  title: string;
  sub: string;
  right?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`absolute ${className} animate-fade-in`}>
      <div
        className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] backdrop-blur ${
          accent ? "border-accent/40 bg-accent/15" : ""
        }`}
      >
        {!right && <span className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-accent" : "bg-white"}`} />}
        <div>
          <p className={`text-xs font-semibold ${accent ? "text-accent" : "text-white"}`}>{title}</p>
          <p className="text-[9px] uppercase tracking-wider text-anthracite-300">{sub}</p>
        </div>
        {right && <span className={`h-1.5 w-1.5 rounded-full ${accent ? "bg-accent" : "bg-white"}`} />}
      </div>
    </div>
  );
}
