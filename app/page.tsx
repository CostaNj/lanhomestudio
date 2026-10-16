import type { Metadata } from "next";
import EntryContent from "@/components/EntryContent";
import SiteShell from "@/components/SiteShell";
import { SearchView } from "@/components/views";
import { frontPage, frontPanels } from "@/lib/content";

type Props = { searchParams: Promise<{ s?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { s } = await searchParams;
  if (typeof s === "string") return { title: `Результаты поиска «${s}»` };
  return {};
}

export default async function Home({ searchParams }: Props) {
  const { s } = await searchParams;
  // WordPress serves search results from the front page URL: /?s=query
  if (typeof s === "string") return <SearchView query={s} />;

  return (
    <SiteShell bodyClass={`home page-template-default page page-id-${frontPage.id} twentyseventeen-front-page page-two-column`}>
      <div id="primary" className="content-area">
        <main id="main" className="site-main">
          <article id={`post-${frontPage.id}`} className={`twentyseventeen-panel post-${frontPage.id} page type-page status-publish hentry`}>
            <div className="panel-content">
              <div className="wrap">
                <header className="entry-header">
                  <h2 className="entry-title">{frontPage.title}</h2>
                </header>
                <EntryContent entry={frontPage} alignLeft />
              </div>
            </div>
          </article>

          {frontPanels.map((panel, i) => (
            <article
              key={panel.id}
              id={`panel${i + 1}`}
              className={`twentyseventeen-panel post-${panel.id} page type-page status-publish has-post-thumbnail hentry`}
            >
              {panel.featured && (
                <div className="panel-image" style={{ backgroundImage: `url(${panel.featured.src})` }}>
                  <div
                    className="panel-image-prop"
                    style={{ paddingTop: `${(panel.featured.height / panel.featured.width) * 100}%` }}
                  />
                </div>
              )}
              <div className="panel-content">
                <div className="wrap">
                  <header className="entry-header">
                    <h2 className="entry-title">{panel.title}</h2>
                  </header>
                  <EntryContent entry={panel} />
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </SiteShell>
  );
}
