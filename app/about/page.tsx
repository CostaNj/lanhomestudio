import type { Metadata } from "next";
import { PageView } from "@/components/views";
import { aboutPage } from "@/lib/content";

export const metadata: Metadata = { title: aboutPage.title };

export default function Page() {
  return <PageView entry={aboutPage} />;
}
