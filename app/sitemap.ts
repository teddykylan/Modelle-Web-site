import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getAppUrl } from "@/lib/app-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getAppUrl();

  const [templates, categories] = await Promise.all([
    prisma.template
      .findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      })
      .catch((error) => {
        console.warn("Sitemap: impossible de charger les templates, fallback à vide.", error?.message);
        return [];
      }),
    prisma.category
      .findMany({
        select: { slug: true, createdAt: true },
      })
      .catch((error) => {
        console.warn("Sitemap: impossible de charger les catégories, fallback à vide.", error?.message);
        return [];
      }),
  ]);

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/templates`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    ...templates.map((t) => ({
      url: `${baseUrl}/templates/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${baseUrl}/categories/${c.slug}`,
      lastModified: c.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
