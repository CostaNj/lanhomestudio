import type { ReactNode } from "react";
import { comments, formatDate, dateParts, search, type Entry, type Post } from "@/lib/content";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import EntryContent from "./EntryContent";
import JsonLd from "./JsonLd";
import { PostListItem, PostedOn, SearchResultItem } from "./PostSummary";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import SiteShell from "./SiteShell";

/** Static page (page.php / content-page.php). */
export function PageView({ entry }: { entry: Entry }) {
  return (
    <SiteShell bodyClass={`page-template-default page page-id-${entry.id} page-two-column`} featured={entry.featured}>
      <JsonLd data={breadcrumbJsonLd([{ name: entry.title, path: entry.url }])} />
      <div className="wrap">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <article
              id={`post-${entry.id}`}
              className={`post-${entry.id} page type-page status-publish${entry.featured ? " has-post-thumbnail" : ""} hentry`}
            >
              <header className="entry-header">
                <h1 className="entry-title">{entry.title}</h1>
              </header>
              <EntryContent entry={entry} />
            </article>
          </main>
        </div>
      </div>
    </SiteShell>
  );
}

/** Posts index and archives (index.php / archive.php). */
export function ArchiveView({ bodyClass, title, posts }: { bodyClass: string; title: ReactNode; posts: Post[] }) {
  return (
    <SiteShell bodyClass={`${bodyClass} hfeed has-sidebar`}>
      <div className="wrap">
        <header className="page-header">
          <h1 className="page-title">{title}</h1>
        </header>
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </main>
        </div>
        <Sidebar />
      </div>
    </SiteShell>
  );
}

/** Search results (search.php). */
export function SearchView({ query }: { query: string }) {
  const results = search(query);
  const found = results.length > 0;
  return (
    <SiteShell bodyClass={`search ${found ? "search-results" : "search-no-results"} hfeed has-sidebar`}>
      <div className="wrap">
        <header className="page-header">
          {found ? (
            <h1 className="page-title">
              Результаты поиска для: <span>{query}</span>
            </h1>
          ) : (
            <h1 className="page-title">Не найдено</h1>
          )}
        </header>
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            {found ? (
              results.map((entry) => <SearchResultItem key={`${entry.type}-${entry.id}`} entry={entry} />)
            ) : (
              <>
                <p>Извините, по вашему запросу ничего не найдено. Попробуйте другие ключевые слова.</p>
                <SearchForm id="search-form-1" value={query} />
              </>
            )}
          </main>
        </div>
        <Sidebar searchId="search-form-2" value={query} />
      </div>
    </SiteShell>
  );
}

function commentsTitle(title: string, count: number) {
  const n10 = count % 10;
  const n100 = count % 100;
  const word =
    n10 === 1 && n100 !== 11 ? "комментарий" : n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20) ? "комментария" : "комментариев";
  return `${title}: ${count} ${word}`;
}

/** Single post (single.php) with its comments (comments.php). */
export function SingleView({ post }: { post: Post }) {
  const postComments = comments.filter((c) => c.postId === post.id);
  return (
    <SiteShell bodyClass={`post-template-default single single-post postid-${post.id} single-format-standard has-sidebar`}>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Блог", path: "/blog" },
          { name: post.title, path: post.url },
        ])}
      />
      <div className="wrap">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <article id={`post-${post.id}`} className={`post-${post.id} post type-post status-publish format-standard hentry category-1`}>
              <header className="entry-header">
                <div className="entry-meta">
                  <span className="posted-on">
                    <PostedOn post={post} />
                  </span>
                  <span className="byline">
                    {" "}
                    Автор:{" "}
                    <span className="author vcard">
                      <a className="url fn n" href={`/author/${post.author}`}>
                        {post.author}
                      </a>
                    </span>
                  </span>
                </div>
                <h1 className="entry-title">{post.title}</h1>
              </header>
              <EntryContent entry={post} />
            </article>

            <div id="comments" className="comments-area">
              {postComments.length > 0 && (
                <>
                  <h2 className="comments-title">{commentsTitle(post.title, postComments.length)}</h2>
                  <ol className="comment-list">
                    {postComments.map((c, i) => {
                      const { time } = dateParts(c.date);
                      return (
                        <li key={c.id} id={`comment-${c.id}`} className={`comment ${i % 2 ? "odd" : "even"} thread-even depth-1`}>
                          <article id={`div-comment-${c.id}`} className="comment-body">
                            <footer className="comment-meta">
                              <div className="comment-author vcard">
                                <img alt="" src={c.avatar} className="avatar avatar-100 photo" height={100} width={100} loading="lazy" />
                                <b className="fn">
                                  <a href={c.authorUrl} rel="external nofollow ugc" className="url">
                                    {c.author}
                                  </a>
                                </b>
                                <span className="says">:</span>
                              </div>
                              <div className="comment-metadata">
                                <a href={`${post.url}#comment-${c.id}`}>
                                  <time dateTime={c.date}>
                                    {formatDate(c.date)} в {time}
                                  </time>
                                </a>
                              </div>
                            </footer>
                            <div className="comment-content">
                              <p dangerouslySetInnerHTML={{ __html: c.html }} />
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </>
              )}
              <p className="no-comments">Обсуждение закрыто.</p>
            </div>
          </main>
        </div>
        <Sidebar />
      </div>
    </SiteShell>
  );
}

/** 404 page (404.php). */
export function NotFoundView() {
  return (
    <SiteShell bodyClass="error404 hfeed has-sidebar">
      <div className="wrap">
        <div id="primary" className="content-area">
          <main id="main" className="site-main">
            <section className="error-404 not-found">
              <header className="page-header">
                <h1 className="page-title">Ой! Страница не найдена.</h1>
              </header>
              <div className="page-content">
                <p>По данному адресу ничего не найдено. Попробуйте воспользоваться поиском.</p>
                <SearchForm id="search-form-1" />
              </div>
            </section>
          </main>
        </div>
      </div>
    </SiteShell>
  );
}
