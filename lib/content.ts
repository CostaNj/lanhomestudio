export type Picture = {
  src: string;
  width: number;
  height: number;
  sizes?: string;
};

export type Entry = {
  id: number;
  type: "post" | "page";
  title: string;
  url: string;
  paragraphs: string[];
  gallery?: Picture[];
  featured?: Picture;
};

export type Post = Entry & {
  type: "post";
  slug: string;
  date: string; // ISO, Europe/Moscow
  modified: string;
  author: string;
  category: { name: string; slug: string };
};

export const site = {
  title: "LAN HOME STUDIO",
  description: "Изделия из дерева для домашнего тепла и уюта",
  headerImage: { src: "/images/IMG_9145.jpg", width: 1920, height: 1280 },
};

export const menu = [
  { id: 29, label: "Lan Home Studio", href: "/" },
  { id: 31, label: "Блог", href: "/blog" },
  { id: 32, label: "Контакты", href: "/contacts" },
];

export const socialLinks = [
  { id: 68, label: "VK", icon: "vk", href: "https://vk.com/lanhomestudio" },
  {
    id: 67,
    label: "Telegram",
    icon: "telegram",
    href: "https://t.me/lanhomestudio",
  },
  {
    id: 36,
    label: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/lan.homestudio",
  },
];

const woodText =
  "Деревянный предмет уникален. Дерево, обработанное вручную, или же заготовка, оформленная в определённом стиле, всегда будут неповторимы. Материал всегда имеет свои особенности! Цвет дерева, его рисунок, узор  — все это создает природа. А мы лишь придаем форму красоте, созданной самой природой.";

const aboutGallery: Picture[] = [
  {
    src: "/images/IMG_9177-1-683x1024.jpg",
    width: 683,
    height: 1024,
    sizes: "(max-width: 683px) 100vw, 683px",
  },
  {
    src: "/images/IMG_9278-2-1-682x1024.jpg",
    width: 682,
    height: 1024,
    sizes: "(max-width: 682px) 100vw, 682px",
  },
  {
    src: "/images/IMG_9259-682x1024.jpg",
    width: 682,
    height: 1024,
    sizes: "(max-width: 682px) 100vw, 682px",
  },
];

export const frontPage: Entry = {
  id: 18,
  type: "page",
  title: "Добро пожаловать!",
  url: "/",
  paragraphs: [
    "Рады приветствовать вас в нашей уютной мастерской! Здесь вы сможете найти изделия из дерева на любой вкус, а также погрузиться в процесс изготовления предметов интерьера из материала, который играет особую роль в жизни людей с самого зарождения человеческой цивилизации!",
  ],
};

export const woodPage: Entry = {
  id: 22,
  type: "page",
  title: "Природа дерева",
  url: "/wood",
  paragraphs: [woodText],
  featured: { src: "/images/IMG_9272.jpg", width: 1280, height: 853 },
};

export const aboutPage: Entry = {
  id: 60,
  type: "page",
  title: "О нас",
  url: "/about",
  paragraphs: [
    "Наша мастерская только начинает свой путь, поэтому каждое изделие создается вручную, с азартом в глазах и доводится до совершенства! Мы стремимся к тому, чтобы результат был не только практичен в применении, но и создавал атмосферу уюта и домашнего тепла!",
  ],
  gallery: aboutGallery,
  featured: { src: "/images/about-1700x1200.png", width: 1700, height: 1200 },
};

export const contactsPage: Entry = {
  id: 20,
  type: "page",
  title: "Контакты",
  url: "/contacts",
  paragraphs: [
    "Мы работаем по Москве и Московской области",
    "По вопросам сотрудничества:",
    "lan.studio.moscow@gmail.com",
  ],
};

/** Panels shown below the intro on the front page (Twenty Seventeen "front page sections"). */
export const frontPanels: Entry[] = [woodPage, aboutPage];

export const pages: Entry[] = [frontPage, woodPage, aboutPage, contactsPage];

export const posts: Post[] = (
  [
    {
      id: 1,
      type: "post",
      slug: "привет-мир",
      title: "Природа дерева",
      date: "2022-06-10T15:07:24+03:00",
      modified: "2022-06-10T22:16:40+03:00",
      author: "admin",
      category: { name: "Без рубрики", slug: "без-рубрики" },
      paragraphs: [woodText.replace("созданной самой", "созданной самое")],
      gallery: [
        {
          src: "/images/IMG_9272-1-1024x682.jpg",
          width: 1024,
          height: 682,
          sizes:
            "(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px",
        },
      ],
    },
  ] satisfies Omit<Post, "url">[]
).map((p) => ({ ...p, url: postUrl(p.date, p.slug) }));

export const comments = [
  {
    id: 1,
    postId: 1,
    author: "Автор комментария",
    authorUrl: "https://wordpress.org/",
    avatar: "/images/avatar.png",
    date: "2020-02-12T15:07:24+03:00",
    html: 'Привет! Это комментарий.<br />\nЧтобы начать модерировать, редактировать и удалять комментарии, перейдите на экран «Комментарии» в консоли.<br />\nАватары авторов комментариев загружаются с сервиса <a href="https://ru.gravatar.com">Gravatar</a>.',
  },
];

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

/** Date parts as they are written in the ISO string (site timezone). */
export function dateParts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return { y, m, d, time: iso.slice(11, 16) };
}

/** Permalink in the WordPress "/%year%/%monthnum%/%day%/%postname%/" format. */
export function postUrl(iso: string, slug: string) {
  const { y, m, d } = dateParts(iso);
  return `/${y}/${m}/${d}/${encodeURIComponent(slug)}`;
}

export function formatDate(iso: string) {
  const { y, m, d } = dateParts(iso);
  return `${d}.${m}.${y}`;
}

export function monthName(month: string) {
  return MONTHS[Number(month) - 1];
}

export function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function findPost(
  year: string,
  month: string,
  day: string,
  slug: string,
) {
  const s = safeDecode(slug);
  return posts.find((p) => {
    const { y, m, d } = dateParts(p.date);
    return y === year && m === month && d === day && p.slug === s;
  });
}

export function postsByDate(year: string, month?: string, day?: string) {
  return posts.filter((p) => {
    const { y, m, d } = dateParts(p.date);
    return y === year && (!month || m === month) && (!day || d === day);
  });
}

/** WordPress-like search over posts and pages (front page excluded, as on the live site). */
export function search(query: string): Entry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const pool: Entry[] = [
    ...posts,
    ...pages.filter((p) => p.id !== frontPage.id),
  ];
  return pool.filter((e) => {
    const text = `${e.title} ${e.paragraphs.join(" ")}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });
}
