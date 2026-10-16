import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.description}`,
    short_name: site.name,
    description: site.seoDescription,
    lang: "ru-RU",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#222222",
    icons: [
      { src: "/images/cropped-cropped-IMG_9236-192x192.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/images/cropped-cropped-IMG_9236-180x180.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  };
}
