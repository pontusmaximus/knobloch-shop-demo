import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { mountingTypes } from "@/data/configurator-options";

const baseUrl = "https://knobloch-demo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/briefkastenanlagen",
    "/paketboxen",
    "/konfigurator",
    "/ueber-uns",
    "/service",
    "/kontakt",
    "/haendler",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
    "/versand",
    "/cookies",
  ];

  const now = new Date();

  const staticEntries = staticPaths.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${baseUrl}/briefkastenanlagen/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productEntries = products.map((p) => ({
    url: `${baseUrl}/briefkastenanlagen/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const configuratorEntries = mountingTypes.map((m) => ({
    url: `${baseUrl}/konfigurator/${m.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...configuratorEntries];
}
