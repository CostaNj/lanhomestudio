import type { Metadata } from "next";
import { PageView } from "@/components/views";
import { contactsPage } from "@/lib/content";

export const metadata: Metadata = { title: contactsPage.title };

export default function Page() {
  return <PageView entry={contactsPage} />;
}
