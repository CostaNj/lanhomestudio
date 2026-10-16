import type { Metadata } from "next";
import { PageView } from "@/components/views";
import { woodPage } from "@/lib/content";

export const metadata: Metadata = { title: woodPage.title };

export default function Page() {
  return <PageView entry={woodPage} />;
}
