import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/views";
import { postsByDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ year: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return pageMetadata({ title: year, path: `/${year}`, noindex: true });
}

export default async function YearArchive({ params }: Props) {
  const { year } = await params;
  const list = /^\d{4}$/.test(year) ? postsByDate(year) : [];
  if (!list.length) notFound();
  return (
    <ArchiveView bodyClass="archive date page-two-column" title={<>Год: <span>{year}</span></>} posts={list} />
  );
}
