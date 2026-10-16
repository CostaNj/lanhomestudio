import type { MetadataRoute } from "next";
import { aboutPage, contactsPage, posts, woodPage } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastPost = posts.map((p) => p.modified).sort().at(-1);
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1, lastModified: lastPost },
    ...[aboutPage, woodPage, contactsPage].map((page) => ({
      url: absoluteUrl(page.url),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: page.featured ? [absoluteUrl(page.featured.src)] : undefined,
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7, lastModified: lastPost },
    ...posts.map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: post.modified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: post.gallery?.map((img) => absoluteUrl(img.src)),
    })),
  ];
}
