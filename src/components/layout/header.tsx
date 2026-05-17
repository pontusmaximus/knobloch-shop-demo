"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
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
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-ink-200 bg-white/85 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="container flex h-16 items-center gap-4 lg:h-20">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-ink-100 lg:hidden"
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2" aria-label="KNOBLOCH Startseite">
            <Logo />
          </Link>

          <nav
            className="ml-8 hidden flex-1 items-center gap-1 lg:flex"
            onMouseLeave={() => setMegaOpen(null)}
          >
            {mainNav.map((item) => {
              const hasMega =
                item.label === "Briefkastenanlagen" || item.label === "Paketboxen";
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(hasMega ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                    )}
                  >
                    {item.label}
                    {hasMega && <ChevronDown className="h-3 w-3 opacity-50" />}
                    {item.featured && (
                      <Badge variant="accent" className="ml-1 h-5 px-1.5 text-[10px]">
                        Live
                      </Badge>
                    )}
                  </Link>
                  {hasMega && megaOpen === item.label && (
                    <MegaMenu
                      category={item.label === "Briefkastenanlagen" ? "briefkasten" : "paket"}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <a
              href="tel:+4934316064242"
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink-600 hover:text-brand-600 xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" />
              +49 3431 6064-242
            </a>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Suche">
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/kontakt">Beratung</Link>
            </Button>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-ink-100"
              aria-label={`Warenkorb mit ${cartItems} Artikeln`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
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
          "fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[85vw] max-w-sm border-r bg-white transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-200 px-4">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-ink-100"
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
              className="rounded-md px-3 py-3 font-medium text-ink-800 hover:bg-ink-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-ink-200 pt-4">
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-100"
            >
              Beratung anfordern
            </Link>
            <Link
              href="/haendler"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-100"
            >
              Für Profis
            </Link>
            <a
              href="tel:+4934316064242"
              className="mt-4 flex items-center gap-2 rounded-md bg-brand-600 px-3 py-3 text-sm font-bold text-white"
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
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ink-900 text-white">
        <span className="font-display text-lg font-bold leading-none">K</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-ink-900">KNOBLOCH</span>
        <span className="text-[10px] uppercase tracking-widest text-ink-500">seit 1869</span>
      </div>
    </div>
  );
}

function MegaMenu({ category }: { category: "briefkasten" | "paket" }) {
  const cats = category === "briefkasten" ? briefkastenCategories : paketCategories;
  return (
    <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2">
      <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/briefkastenanlagen/${c.slug}`}
              className="group flex gap-3 rounded-md p-2 hover:bg-ink-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink-100 text-ink-700 group-hover:bg-brand-600 group-hover:text-white">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-900">{c.shortName}</p>
                <p className="line-clamp-1 text-xs text-ink-500">{c.description}</p>
                <p className="mt-1 text-[11px] font-semibold text-brand-600">
                  ab{" "}
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(c.startingPrice)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-4 text-xs text-ink-500">
          <span>Made in Döbeln · DIN EN 13724 zertifiziert</span>
          <Link href="/konfigurator" className="font-semibold text-brand-600 hover:underline">
            Eigene Anlage konfigurieren →
          </Link>
        </div>
      </div>
    </div>
  );
}
