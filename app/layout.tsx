import type { Metadata } from "next";
import { Libre_Franklin, Underdog } from "next/font/google";
import SvgSprite from "@/components/SvgSprite";
import { site } from "@/lib/content";
import "./styles/twentyseventeen.css";
import "./styles/twentyseventeen-blocks.css";
import "./styles/block-gallery.css";
import "./styles/site.css";

const underdog = Underdog({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-underdog",
});

const libreFranklin = Libre_Franklin({
  weight: ["300", "400", "600", "800"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "fallback",
  variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
  title: {
    default: `${site.title} — ${site.description}`,
    template: `%s — ${site.title}`,
  },
  description: site.description,
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
    <html lang="ru-RU" className={`js svg ${underdog.variable} ${libreFranklin.variable}`}>
      <body>
        <SvgSprite />
        {children}
      </body>
    </html>
  );
}
