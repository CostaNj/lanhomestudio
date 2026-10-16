import type { Metadata } from "next";
import { ArchiveView } from "@/components/views";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Блог" };

export default function BlogPage() {
  return <ArchiveView bodyClass="blog" title="Блог" posts={posts} />;
}
