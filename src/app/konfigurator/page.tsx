import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/configurator";
import { FaqSection } from "@/components/common/faq-section";
import { technicalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Konfigurator — Briefkastenanlage individuell konfigurieren",
  description:
    "Konfigurieren Sie Ihre KNOBLOCH-Briefkastenanlage in 7 Schritten — mit Live-Preis, Live-Vorschau und Lieferung in 5 Werktagen. Über 3 Millionen Variationen.",
  alternates: { canonical: "/konfigurator" },
};

export default function KonfiguratorPage() {
  return (
    <>
      <Configurator />
      <FaqSection title="Technische Fragen zur Konfiguration" faqs={technicalFaqs} />
    </>
  );
}
