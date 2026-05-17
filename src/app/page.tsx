import { Hero } from "@/components/home/hero";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { ConfiguratorTeaser } from "@/components/home/configurator-teaser";
import { FeaturedProducts } from "@/components/home/featured-products";
import { USPs } from "@/components/home/usps";
import { Heritage } from "@/components/home/heritage";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/common/faq-section";
import { CtaBanner } from "@/components/home/cta-banner";
import { generalFaqs } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <ConfiguratorTeaser />
      <FeaturedProducts />
      <USPs />
      <Heritage />
      <Testimonials />
      <FaqSection faqs={generalFaqs.slice(0, 6)} />
      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Max Knobloch Nachf. GmbH",
            url: "https://knobloch-demo.vercel.app",
            logo: "https://knobloch-demo.vercel.app/logo.png",
            foundingDate: "1869",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Bahnhofstraße 79",
              postalCode: "04720",
              addressLocality: "Döbeln",
              addressCountry: "DE",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+49-3431-6064242",
              contactType: "customer service",
              areaServed: "DE",
              availableLanguage: ["de", "en"],
            },
            sameAs: [
              "https://facebook.com/knobloch",
              "https://instagram.com/knobloch",
              "https://linkedin.com/company/knobloch",
            ],
          }),
        }}
      />
    </>
  );
}
