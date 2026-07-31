import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/problems`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/docs`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamically fetch problem slugs for individual problem pages
  let problemRoutes: MetadataRoute.Sitemap = [];
  try {
    const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";
    let page = 0;
    const size = 200;
    while (true) {
      const res = await fetch(`${API_BASE}/api/problems?page=${page}&size=${size}`, { next: { revalidate: 86400 } });
      if (!res.ok) break;
      const data = await res.json();
      const problems = data.content || [];
      problemRoutes.push(...problems.map((p: { slug: string; updatedAt?: string }) => ({
        url: `${BASE_URL}/problems/${p.slug}`,
        ...(p.updatedAt ? { lastModified: new Date(p.updatedAt) } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })));
      if (problems.length < size) break;
      page++;
    }
  } catch {
    // Silently fail — static routes will still be included
  }

  return [...staticRoutes, ...problemRoutes];
}
