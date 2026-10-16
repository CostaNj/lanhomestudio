import Link from "next/link";
import { formatDate, type Entry, type Post } from "@/lib/content";
import EntryContent from "./EntryContent";

function articleClass(entry: Entry) {
  const base = `post-${entry.id} ${entry.type} type-${entry.type} status-publish`;
  if (entry.type === "post") return `${base} format-standard hentry category-1`;
  return `${base}${entry.featured ? " has-post-thumbnail" : ""} hentry`;
}

export function PostedOn({ post }: { post: Post }) {
  return (
    <>
      <span className="screen-reader-text">Опубликовано</span>{" "}
      <Link href={post.url} rel="bookmark">
        <time className="entry-date published" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <time className="updated" dateTime={post.modified}>
          {formatDate(post.modified)}
        </time>
      </Link>
    </>
  );
}

/** Post in a list (blog index, archives): full content, as in Twenty Seventeen's content.php. */
export function PostListItem({ post }: { post: Post }) {
  return (
    <article id={`post-${post.id}`} className={articleClass(post)}>
      <header className="entry-header">
        <div className="entry-meta">
          <PostedOn post={post} />
        </div>
        <h2 className="entry-title">
          <Link href={post.url} rel="bookmark">
            {post.title}
          </Link>
        </h2>
      </header>
      <EntryContent entry={post} />
    </article>
  );
}

/** Search result: excerpt only, as in content-excerpt.php. */
export function SearchResultItem({ entry }: { entry: Entry }) {
  return (
    <article id={`post-${entry.id}`} className={articleClass(entry)}>
      <header className="entry-header">
        {entry.type === "post" && (
          <div className="entry-meta">
            <PostedOn post={entry as Post} />
          </div>
        )}
        <h2 className="entry-title">
          <Link href={entry.url} rel="bookmark">
            {entry.title}
          </Link>
        </h2>
      </header>
      <div className="entry-summary">
        <p>{entry.paragraphs.join(" ").replace(/\s+/g, " ")}</p>
      </div>
    </article>
  );
}
