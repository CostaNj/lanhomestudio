import { PageView } from "@/components/views";
import { aboutPage } from "@/lib/content";
import { entryMetadata } from "@/lib/seo";

export const metadata = entryMetadata(aboutPage);

export default function Page() {
  return <PageView entry={aboutPage} />;
}
