import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="container max-w-md text-center">
        <p className="font-display text-6xl text-anthracite-300">404</p>
        <h1 className="mt-4 font-display text-3xl">Diese Anlage existiert nicht.</h1>
        <p className="mt-3 text-muted-foreground">
          Die gewünschte Seite wurde nicht gefunden. Vielleicht haben Sie sich vertippt — oder die
          Seite wurde umbenannt. Schauen Sie auf der Startseite oder im Konfigurator vorbei.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Zur Startseite</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/konfigurator">Konfigurator</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
