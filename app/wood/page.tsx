import { PageView } from "@/components/views";
import { woodPage } from "@/lib/content";
import { entryMetadata } from "@/lib/seo";

export const metadata = entryMetadata(woodPage);

export default function Page() {
  return <PageView entry={woodPage} />;
}
