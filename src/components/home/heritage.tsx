import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const milestones = [
  { year: "1869", title: "Gründung", text: "Max Knobloch gründet die Manufaktur in Döbeln, Sachsen." },
  { year: "1921", title: "Erste Patente", text: "Patentierte Briefkastenkonstruktionen mit Sicherheitsschloss." },
  { year: "1972", title: "Edelstahl-Ära", text: "Einführung von V2A-Edelstahl-Anlagen für gewerbliche Großprojekte." },
  { year: "2008", title: "Konfigurator 1.0", text: "Erster Online-Konfigurator für individuelle Briefkastenanlagen." },
  { year: "2024", title: "Smart Mailboxes", text: "Integration von App-Anbindung, Smart Locks und Video-Sprechanlagen." },
  { year: "2026", title: "Digital Reborn", text: "Komplette Neuauflage des Online-Shops und Konfigurators." },
];

export function Heritage() {
  return (
    <section className="border-b bg-anthracite-50 py-16 dark:bg-anthracite-950 lg:py-24">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Seit 1869
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl text-balance">
              156 Jahre Handwerk.<br />
              Eine Manufaktur.<br />
              Ein Standort.
            </h2>
            <p className="mt-5 text-muted-foreground text-pretty">
              In sechster Generation fertigen wir Briefkastenanlagen in Döbeln, Sachsen — mit rund
              200 Mitarbeiter:innen, eigener Lasertechnik, hauseigener Pulverbeschichtung und
              einem unermüdlichen Anspruch an Detailqualität.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-6 group">
              <Link href="/ueber-uns">
                Unsere Geschichte
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <ol className="relative lg:col-span-7">
            <div className="absolute left-[15px] top-0 h-full w-px bg-border" />
            {milestones.map((m) => (
              <li key={m.year} className="relative pb-10 pl-12 last:pb-0">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-anthracite-900 bg-background text-[10px] font-bold">
                  {m.year.slice(-2)}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/80">
                  {m.year}
                </p>
                <h3 className="mt-1 font-display text-xl">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
