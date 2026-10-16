import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/views";
import { postsByDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ year: string; month: string; day: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day } = await params;
  return pageMetadata({ title: `${day}.${month}.${year}`, path: `/${year}/${month}/${day}`, noindex: true });
}

export default async function DayArchive({ params }: Props) {
  const { year, month, day } = await params;
  const valid = /^\d{4}$/.test(year) && /^\d{2}$/.test(month) && /^\d{2}$/.test(day);
  const list = valid ? postsByDate(year, month, day) : [];
  if (!list.length) notFound();
  return (
    <ArchiveView
      bodyClass="archive date page-two-column"
      title={<>День: <span>{day}.{month}.{year}</span></>}
      posts={list}
    />
  );
}
