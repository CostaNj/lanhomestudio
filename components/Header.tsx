"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { menu, site } from "@/lib/content";
import Icon from "./Icon";

function supportsFixedBackground() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return false;
  const el = document.createElement("div");
  if (!("backgroundAttachment" in el.style)) return false;
  el.style.backgroundAttachment = "fixed";
  return el.style.backgroundAttachment === "fixed";
}

/** Inner height of an element, like jQuery's .height(). */
function contentHeight(el: HTMLElement) {
  const cs = getComputedStyle(el);
  return el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
}

/**
 * Site header of Twenty Seventeen: custom header image, branding, top navigation.
 * Re-implements the theme's global.js / navigation.js behaviour (sticky menu,
 * mobile menu toggle, scroll-down arrow on the front page).
 */
export default function Header({ isFront }: { isFront: boolean }) {
  const pathname = usePathname();
  const customHeaderRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [toggled, setToggled] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [brandingMargin, setBrandingMargin] = useState(0);
  const [headerMargin, setHeaderMargin] = useState(0);

  const update = useCallback(() => {
    const navigation = navigationRef.current;
    const customHeader = customHeaderRef.current;
    const toggle = toggleRef.current;
    if (!navigation || !customHeader || !toggle) return;

    const isDesktop = getComputedStyle(toggle).display === "none";
    const navOuterHeight = navigation.offsetHeight;

    // adjustScrollClass()
    if (isDesktop) {
      const wrap = navigation.querySelector<HTMLElement>(".wrap");
      const item = navigation.querySelector<HTMLElement>(".menu-item");
      const navPadding = wrap ? parseFloat(getComputedStyle(wrap).paddingTop) * 2 : 0;
      const idealNavHeight = navPadding + (item ? item.offsetHeight * 2 : 0);
      if (contentHeight(navigation) <= idealNavHeight) {
        const headerOffset = isFront
          ? customHeader.clientHeight - navOuterHeight
          : customHeader.clientHeight;
        setFixed(window.scrollY >= headerOffset);
      } else {
        setFixed(false);
      }
    }

    // adjustHeaderHeight()
    if (isDesktop) {
      setBrandingMargin(isFront ? navOuterHeight : 0);
      setHeaderMargin(isFront ? 0 : navOuterHeight);
    } else {
      setBrandingMargin(0);
      setHeaderMargin(0);
    }
  }, [isFront]);

  useEffect(() => {
    if (supportsFixedBackground()) document.documentElement.classList.add("background-fixed");
    update();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 300);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  useEffect(() => setToggled(false), [pathname]);

  const scrollDown = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const primary = document.getElementById("primary");
    if (!primary) return;
    const navOuterHeight = navigationRef.current?.offsetHeight ?? 0;
    const top = primary.getBoundingClientRect().top + window.scrollY - navOuterHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const { headerImage } = site;
  const TitleTag = isFront ? "h1" : "p";

  return (
    <header id="masthead" className="site-header">
      <div className="custom-header" ref={customHeaderRef} style={{ marginBottom: headerMargin }}>
        <div className="custom-header-media">
          <div id="wp-custom-header" className="wp-custom-header">
            <img
              src={headerImage.src}
              width={headerImage.width}
              height={headerImage.height}
              alt=""
              srcSet="/images/IMG_9145.jpg 1920w, /images/IMG_9145-1024x683.jpg 1024w, /images/IMG_9145-768x512.jpg 768w, /images/IMG_9145-1536x1024.jpg 1536w"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="site-branding" style={{ marginBottom: brandingMargin }}>
          <div className="wrap">
            <div className="site-branding-text">
              <TitleTag className="site-title">
                <Link href="/" rel="home">
                  {site.title}
                </Link>
              </TitleTag>
              <p className="site-description">{site.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`navigation-top${fixed ? " site-navigation-fixed" : ""}`} ref={navigationRef}>
        <div className="wrap">
          <nav
            id="site-navigation"
            className={`main-navigation${toggled ? " toggled-on" : ""}`}
            aria-label="Верхнее меню"
          >
            <button
              ref={toggleRef}
              className="menu-toggle"
              aria-controls="top-menu"
              aria-expanded={toggled}
              onClick={() => setToggled((t) => !t)}
            >
              <Icon name="bars" />
              <Icon name="close" />
              Меню
            </button>
            <div className="menu-top-container">
              <ul id="top-menu" className="menu">
                {menu.map((item) => {
                  const current = item.href !== "/" && pathname === item.href;
                  return (
                    <Fragment key={item.id}>
                    <li
                      id={`menu-item-${item.id}`}
                      className={`menu-item${current ? " current-menu-item current_page_item" : ""}`}
                    >
                      <Link href={item.href} aria-current={current ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                    {/* inline-block items are separated by whitespace, as in the WP markup */}
                    {"\n"}
                    </Fragment>
                  );
                })}
              </ul>
            </div>
            {isFront && (
              <a href="#content" className="menu-scroll-down" onClick={scrollDown}>
                <Icon name="arrow-right" />
                <span className="screen-reader-text">Перейти к содержимому</span>
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
