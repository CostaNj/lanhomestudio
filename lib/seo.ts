import type { Metadata } from "next";
import { excerpt, site, socialLinks, type Entry, type Picture, type Post } from "./content";

export const absoluteUrl = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

const defaultImage: Picture = site.headerImage;

type PageMeta = {
  /** Page title without the site suffix; omit for the front page. */
  title?: string;
  description?: string;
  path: string;
  image?: Picture;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Search results and archives duplicate the posts, keep them out of the index. */
  noindex?: boolean;
  /** Use the title as is: the layout's title template does not apply to the root page. */
  absoluteTitle?: boolean;
};

/** Full metadata for a page: canonical URL, Open Graph and Twitter card. */
export function pageMetadata({
  title,
  description = site.seoDescription,
  path,
  image = defaultImage,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
  absoluteTitle = false,
}: PageMeta): Metadata {
  const ogTitle = title ? `${title} — ${site.title}` : `${site.title} — ${site.description}`;
  const images = [{ url: image.src, width: image.width, height: image.height, alt: image.alt ?? ogTitle }];
  return {
    ...(title ? { title: absoluteTitle ? { absolute: ogTitle } : title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ru_RU",
      siteName: site.name,
      url: path,
      title: ogTitle,
      description,
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for a page or post entry. */
export function entryMetadata(entry: Entry): Metadata {
  const post = entry.type === "post" ? (entry as Post) : undefined;
  return pageMetadata({
    title: entry.title,
    description: excerpt(entry),
    path: entry.url,
    image: entry.featured ?? entry.gallery?.[0],
    type: post ? "article" : "website",
    publishedTime: post?.date,
    modifiedTime: post?.modified,
  });
}

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        alternateName: site.title,
        description: site.seoDescription,
        url: site.url,
        logo: absoluteUrl(site.logo),
        image: absoluteUrl(site.headerImage.src),
        email: site.email,
        areaServed: site.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
        sameAs: [...socialLinks.map((s) => s.href), site.orderTelegram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          url: site.orderTelegram,
          availableLanguage: "Russian",
          areaServed: "RU",
          hoursAvailable: site.openingHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
            opens: h.opens,
            closes: h.closes,
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "ru-RU",
        publisher: { "@id": organizationId },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${site.url}/?s={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Главная", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingJsonLd(post: Post) {
  const images = [post.featured, ...(post.gallery ?? [])].filter(Boolean) as Picture[];
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerpt(post),
    articleBody: post.paragraphs.join("\n\n"),
    url: absoluteUrl(post.url),
    mainEntityOfPage: absoluteUrl(post.url),
    datePublished: post.date,
    dateModified: post.modified,
    inLanguage: "ru-RU",
    articleSection: post.category.name,
    image: images.map((i) => absoluteUrl(i.src)),
    author: { "@type": "Organization", "@id": organizationId, name: site.name, url: site.url },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
  };
}
