import { MetadataRoute } from "next";

const BASE_URL = "https://code.prathameshcorporations.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/problems`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamically fetch problem slugs for individual problem pages
  let problemRoutes: MetadataRoute.Sitemap = [];
  try {
    const API_BASE = process.env.BACKEND_API_URL || "http://localhost:8080";
    const res = await fetch(`${API_BASE}/api/problems?page=0&size=200`, {
      next: { revalidate: 86400 },
    });
    if (res.ok) {
      const data = await res.json();
      const problems = data.content || [];
      problemRoutes = problems.map((p: { slug: string }) => ({
        url: `${BASE_URL}/problems/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Silently fail — static routes will still be included
  }

  return [...staticRoutes, ...problemRoutes];
}
