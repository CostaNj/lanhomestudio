import type { ReactNode } from "react";
import type { Picture } from "@/lib/content";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  /** WordPress body classes; applied to the .wp-body wrapper that the theme CSS targets. */
  bodyClass: string;
  featured?: Picture;
  children: ReactNode;
};

export default function SiteShell({ bodyClass, featured, children }: Props) {
  const isFront = bodyClass.split(" ").includes("twentyseventeen-front-page");
  return (
    <div className={`wp-body wp-embed-responsive has-header-image colors-light ${bodyClass}`}>
      <div id="page" className="site">
        <a className="skip-link screen-reader-text" href="#content">
          Перейти к содержимому
        </a>
        <Header isFront={isFront} />
        {featured && (
          <div className="single-featured-image-header">
            <img
              src={featured.src}
              width={featured.width}
              height={featured.height}
              className="attachment-twentyseventeen-featured-image size-twentyseventeen-featured-image wp-post-image"
              alt={featured.alt ?? ""}
              sizes="100vw"
            />
          </div>
        )}
        <div className="site-content-contain">
          <div id="content" className="site-content">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
