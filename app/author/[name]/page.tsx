import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/views";
import { posts, safeDecode } from "@/lib/content";

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  return { title: safeDecode(name) };
}

export default async function AuthorArchive({ params }: Props) {
  const name = safeDecode((await params).name);
  const list = posts.filter((p) => p.author === name);
  if (!list.length) notFound();
  return (
    <ArchiveView bodyClass={`archive author author-${name} page-two-column`} title={<>Автор: <span>{name}</span></>} posts={list} />
  );
}
