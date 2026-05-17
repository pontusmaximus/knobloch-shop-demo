"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, ShoppingBag, X, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/cart-store";
import { briefkastenCategories, paketCategories } from "@/data/categories";

const mainNav = [
  { label: "Konfigurator", href: "/konfigurator", featured: true },
  { label: "Briefkastenanlagen", href: "/briefkastenanlagen" },
  { label: "Paketboxen", href: "/paketboxen" },
  { label: "Service", href: "/service" },
  { label: "Über uns", href: "/ueber-uns" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const cartItems = useCart((s) => s.totalItems());
  const openCart = useCart((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-anthracite-900 text-anthracite-200 lg:block">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="font-medium">Deutschlands ältester Briefkastenhersteller seit 1869</span>
            <span className="text-anthracite-300">·</span>
            <span>Versand in 5 Werktagen</span>
            <span className="text-anthracite-300">·</span>
            <span>10 Jahre Garantie</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+4934316064242" className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3 w-3" />
              +49 3431 6064-242
            </a>
            <a href="mailto:info@knobloch.de" className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3 w-3" />
              info@knobloch.de
            </a>
            <Link href="/haendler" className="hover:text-white">
              Für Profis
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="container flex h-16 items-center gap-4 lg:h-20">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary lg:hidden"
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2" aria-label="KNOBLOCH Startseite">
            <Logo />
          </Link>

          <nav className="ml-8 hidden flex-1 items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(null)}>
            {mainNav.map((item) => {
              const hasMega = item.label === "Briefkastenanlagen" || item.label === "Paketboxen";
              return (
                <div key={item.href} className="relative" onMouseEnter={() => setMegaOpen(hasMega ? item.label : null)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                      item.featured && "text-accent-foreground"
                    )}
                  >
                    {item.label}
                    {hasMega && <ChevronDown className="h-3 w-3 opacity-60" />}
                    {item.featured && (
                      <Badge variant="accent" className="ml-1 h-5 px-1.5 text-[10px]">
                        Live
                      </Badge>
                    )}
                  </Link>
                  {hasMega && megaOpen === item.label && (
                    <MegaMenu category={item.label === "Briefkastenanlagen" ? "briefkasten" : "paket"} />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Suche">
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/kontakt">Beratung</Link>
            </Button>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
              aria-label={`Warenkorb mit ${cartItems} Artikeln`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[85vw] max-w-sm border-r bg-background transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
            aria-label="Menü schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4 text-base">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 font-medium hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 border-t pt-4">
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium hover:bg-secondary"
            >
              Beratung anfordern
            </Link>
            <Link
              href="/haendler"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium hover:bg-secondary"
            >
              Für Profis
            </Link>
            <a
              href="tel:+4934316064242"
              className="mt-4 flex items-center gap-2 rounded-md bg-secondary px-3 py-3 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              +49 3431 6064-242
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-anthracite-900 text-white">
        <span className="font-display text-lg font-bold leading-none">K</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight">KNOBLOCH</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">seit 1869</span>
      </div>
    </div>
  );
}

function MegaMenu({ category }: { category: "briefkasten" | "paket" }) {
  const cats = category === "briefkasten" ? briefkastenCategories : paketCategories;
  return (
    <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2">
      <div className="rounded-xl border bg-popover p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/briefkastenanlagen/${c.slug}`}
              className="group flex gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-anthracite-100 text-anthracite-700 group-hover:bg-anthracite-900 group-hover:text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{c.shortName}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{c.description}</p>
                <p className="mt-1 text-[11px] font-medium text-accent-foreground/80">
                  ab {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(c.startingPrice)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Alle Anlagen made in Döbeln · DIN EN 13724 zertifiziert</span>
          <Link href="/konfigurator" className="font-medium text-accent-foreground hover:underline">
            Eigene Anlage konfigurieren →
          </Link>
        </div>
      </div>
    </div>
  );
}
