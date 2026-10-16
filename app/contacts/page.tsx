import { PageView } from "@/components/views";
import { contactsPage } from "@/lib/content";
import { entryMetadata } from "@/lib/seo";

export const metadata = entryMetadata(contactsPage);

export default function Page() {
  return <PageView entry={contactsPage} />;
}
