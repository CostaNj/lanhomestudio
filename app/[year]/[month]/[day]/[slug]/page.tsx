import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SingleView } from "@/components/views";
import { findPost } from "@/lib/content";
import { entryMetadata } from "@/lib/seo";

type Props = { params: Promise<{ year: string; month: string; day: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = findPost(year, month, day, slug);
  return post ? entryMetadata(post) : {};
}

export default async function SinglePost({ params }: Props) {
  const { year, month, day, slug } = await params;
  const post = findPost(year, month, day, slug);
  if (!post) notFound();
  return <SingleView post={post} />;
}
