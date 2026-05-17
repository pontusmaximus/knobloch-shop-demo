import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie-Einstellungen",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cookies
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Cookie-Einstellungen</h1>
        <p className="mt-3 text-muted-foreground">
          Wir verwenden Cookies, um unsere Website zu betreiben und zu verbessern. Sie können hier
          jederzeit Ihre Einwilligung anpassen.
        </p>

        <div className="mt-8 space-y-4">
          <CookieGroup
            title="Technisch notwendig (immer aktiv)"
            text="Diese Cookies sind erforderlich, damit unsere Website funktioniert — z. B. der Warenkorb."
            disabled
            checked
          />
          <CookieGroup
            title="Statistik (Plausible Analytics)"
            text="Anonymisierte Reichweiten- und Nutzungsdaten, ohne personenbezogene Auswertung. DE-Server."
          />
          <CookieGroup
            title="Marketing"
            text="Wir verwenden derzeit keine Marketing-Cookies."
            disabled
          />
        </div>
      </div>
    </section>
  );
}

function CookieGroup({
  title,
  text,
  disabled,
  checked,
}: {
  title: string;
  text: string;
  disabled?: boolean;
  checked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-card p-5">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{text}</p>
      </div>
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={checked} disabled={disabled} className="peer sr-only" />
        <span className="relative h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-anthracite-900 peer-disabled:opacity-50">
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>
    </div>
  );
}
