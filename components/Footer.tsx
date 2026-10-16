import Link from "next/link";
import { Fragment } from "react";
import { socialLinks } from "@/lib/content";
import CurrentYear from "./CurrentYear";
import Icon from "./Icon";
import SearchForm from "./SearchForm";

export default function Footer() {
  return (
    <footer id="colophon" className="site-footer">
      <div className="wrap">
        <aside className="widget-area" aria-label="Подвал">
          <div className="widget-column footer-widget-1">
            <section id="text-8" className="widget widget_text">
              <h2 className="widget-title">Оформить заказ</h2>
              <div className="textwidget">
                <p>
                  <strong>Телеграм</strong>
                  <br />
                  <a href="https://t.me/Lan_wood_master">
                    <br />
                    <img
                      className="alignnone wp-image-76"
                      style={{ verticalAlign: "middle" }}
                      src="/images/wood-telegram.jpg"
                      alt=""
                      width={20}
                      height={20}
                      loading="lazy"
                    />{" "}
                    https://t.me/Lan_wood_master
                  </a>
                </p>
                <p>
                  <strong>Часы</strong>
                  <br />
                  Понедельник—пятница: 10:00–21:00
                  <br />
                  Суббота и воскресенье: 10:00–18:00
                </p>
              </div>
            </section>
          </div>
          <div className="widget-column footer-widget-2">
            <section id="text-9" className="widget widget_text">
              <h2 className="widget-title">О сайте</h2>
              <div className="textwidget">
                <p>
                  Сайт предназначен для ознакомления с ассортиментом и деятельностью мастерской Lan Home Studio.
                  Все представленные изделия изготавливаются в единственном экземпляре. О наличии необходимо
                  узнавать через телеграм.
                </p>
              </div>
            </section>
            <section id="search-4" className="widget widget_search">
              <h2 className="widget-title">Поиск</h2>
              <SearchForm id="search-form-footer" />
            </section>
          </div>
        </aside>
        <nav className="social-navigation" aria-label="Меню социальных ссылок в подвале">
          <div className="menu-social-container">
            <ul className="social-links-menu">
              {socialLinks.map((s) => (
                <Fragment key={s.id}>
                <li id={`menu-item-${s.id}`} className="menu-item">
                  <a href={s.href}>
                    <span className="screen-reader-text">{s.label}</span>
                    <Icon name={s.icon} />
                  </a>
                </li>
                {"\n"}
                </Fragment>
              ))}
            </ul>
          </div>
        </nav>
        <div className="site-info">
          <Link href="/" className="imprint">
            Copyright © <CurrentYear /> Lan Home Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
