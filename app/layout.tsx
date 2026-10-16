import type { Metadata } from "next";
import SvgSprite from "@/components/SvgSprite";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import "./styles/fonts.css";
import "./styles/twentyseventeen.css";
import "./styles/twentyseventeen-blocks.css";
import "./styles/block-gallery.css";
import "./styles/site.css";

// Site-wide Open Graph/Twitter defaults; canonical URLs are set per page.
const { openGraph, twitter } = pageMetadata({ path: "/" });

export const metadata: Metadata = {
  openGraph: { ...openGraph, url: undefined },
  twitter,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Изделия из дерева",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  title: {
    default: `${site.title} — ${site.description}`,
    template: `%s — ${site.title}`,
  },
  icons: {
    icon: [
      { url: "/images/cropped-cropped-IMG_9236-32x32.jpg", sizes: "32x32" },
      { url: "/images/cropped-cropped-IMG_9236-192x192.jpg", sizes: "192x192" },
    ],
    apple: "/images/cropped-cropped-IMG_9236-180x180.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru-RU" className="js svg">
      <body>
        <SvgSprite />
        {children}
      </body>
    </html>
  );
}
