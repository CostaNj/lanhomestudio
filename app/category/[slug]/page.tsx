import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/views";
import { posts, safeDecode } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function postsInCategory(slug: string) {
  return posts.filter((p) => p.category.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = safeDecode((await params).slug);
  const name = postsInCategory(slug)[0]?.category.name;
  return name ? pageMetadata({ title: name, path: `/category/${encodeURIComponent(slug)}`, noindex: true }) : {};
}

export default async function CategoryArchive({ params }: Props) {
  const slug = safeDecode((await params).slug);
  const list = postsInCategory(slug);
  if (!list.length) notFound();
  return (
    <ArchiveView
      bodyClass="archive category page-two-column"
      title={<>Рубрика: <span>{list[0].category.name}</span></>}
      posts={list}
    />
  );
}
