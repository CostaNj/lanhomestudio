import { ArchiveView } from "@/components/views";
import { posts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Блог",
  description:
    "Блог мастерской Lan Home Studio: о природе дерева, изделиях ручной работы и создании уюта в доме.",
  path: "/blog",
});

export default function BlogPage() {
  return <ArchiveView bodyClass="blog" title="Блог" posts={posts} />;
}
