import type { Entry } from "@/lib/content";

export function Gallery({ images }: { images: NonNullable<Entry["gallery"]> }) {
  return (
    <figure className="wp-container-2 wp-block-gallery-1 wp-block-gallery has-nested-images columns-default is-cropped">
      {images.map((img) => (
        <figure key={img.src} className="wp-block-image size-large">
          <img src={img.src} width={img.width} height={img.height} sizes={img.sizes} alt="" loading="lazy" />
        </figure>
      ))}
    </figure>
  );
}

export default function EntryContent({ entry, alignLeft = false }: { entry: Entry; alignLeft?: boolean }) {
  return (
    <div className="entry-content">
      {entry.paragraphs.map((p, i) => (
        <p key={i} className={alignLeft ? "has-text-align-left" : undefined}>
          {p}
        </p>
      ))}
      {entry.gallery && <Gallery images={entry.gallery} />}
    </div>
  );
}
