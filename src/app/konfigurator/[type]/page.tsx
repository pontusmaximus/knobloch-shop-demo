import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Configurator } from "@/components/configurator/configurator";
import { mountingTypes } from "@/data/configurator-options";

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const m = mountingTypes.find((x) => x.id === type);
  if (!m) return { title: "Konfigurator" };
  return {
    title: `${m.name}-Briefkastenanlage konfigurieren`,
    description: `${m.description} Konfigurieren Sie Ihre ${m.name}-Anlage mit Live-Preis und Lieferung in 5 Werktagen.`,
    alternates: { canonical: `/konfigurator/${type}` },
  };
}

export function generateStaticParams() {
  return mountingTypes.map((m) => ({ type: m.id }));
}

export default async function KonfiguratorTypePage({ params }: Props) {
  const { type } = await params;
  const m = mountingTypes.find((x) => x.id === type);
  if (!m) notFound();
  return <Configurator initialType={type} />;
}
