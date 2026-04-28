import type { MetadataRoute } from "next";
import { getWriteups } from "@/lib/github";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rozariyomartin.github.io";
  const writeups = await getWriteups();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/writeups`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...writeups.map((writeup) => ({
      url: `${siteUrl}/writeups/${writeup.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
