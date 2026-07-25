import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/problems", "/problems/"],
      disallow: ["/api/", "/editor/", "/settings/", "/solve/", "/auth/"],
    },
    sitemap: "https://code.prathameshcorporations.site/sitemap.xml",
  };
}
