import type { Metadata, Viewport } from "next";
import { inter, playfair } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { CookieBanner } from "@/components/common/cookie-banner";
import "./globals.css";

const siteName = "KNOBLOCH — Briefkastenanlagen seit 1869";
const siteDescription =
  "Maßgeschneiderte Briefkastenanlagen, Paketboxen & Abholstationen direkt vom Hersteller. Made in Germany. Konfigurieren Sie Ihre Anlage in 7 Schritten — mit Live-Preis und Lieferung in 5 Werktagen.";

export const metadata: Metadata = {
  metadataBase: new URL("https://knobloch-demo.vercel.app"),
  title: {
    default: siteName,
    template: "%s · KNOBLOCH",
  },
  description: siteDescription,
  keywords: [
    "Briefkasten",
    "Briefkastenanlage",
    "Paketbox",
    "Paketstation",
    "Konfigurator",
    "Made in Germany",
    "Knobloch",
    "Edelstahl Briefkasten",
    "Mehrfamilienhaus Briefkasten",
  ],
  authors: [{ name: "Max Knobloch Nachf. GmbH" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://knobloch-demo.vercel.app",
    siteName: "KNOBLOCH",
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1114" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
