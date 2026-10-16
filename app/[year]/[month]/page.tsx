import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/views";
import { monthName, postsByDate } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ year: string; month: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  return pageMetadata({ title: `${monthName(month) ?? month} ${year}`, path: `/${year}/${month}`, noindex: true });
}

export default async function MonthArchive({ params }: Props) {
  const { year, month } = await params;
  const list = /^\d{4}$/.test(year) && /^\d{2}$/.test(month) ? postsByDate(year, month) : [];
  if (!list.length) notFound();
  return (
    <ArchiveView
      bodyClass="archive date page-two-column"
      title={<>Месяц: <span>{monthName(month)} {year}</span></>}
      posts={list}
    />
  );
}
