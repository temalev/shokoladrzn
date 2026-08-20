# ШОКОЛАД62 — лендинг студии загара (Рязань)

Одностраничный сайт студии загара: три солярия, цены, галерея студии, FAQ и контакты.
Собирается в статику (Nuxt 4 + `nuxt generate`) и разворачивается на GitHub Pages через GitHub Actions.

## Быстрый старт

```bash
npm install
npm run dev        # http://localhost:3000
```

Сборка статики и локальный просмотр результата:

```bash
npm run generate
npx serve .output/public
```


## Публикация на GitHub Pages

1. Залейте репозиторий на GitHub (ветка `main` или `master`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Пушните в `main`/`master` — workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) соберёт сайт и опубликует его.

Workflow сам подставляет правильные пути:

| Переменная | Что это | Откуда берётся |
| --- | --- | --- |
| `NUXT_APP_BASE_URL` | базовый путь (`/имя-репозитория/`) | `actions/configure-pages` |
| `NUXT_PUBLIC_SITE_URL` | полный адрес сайта — для `canonical` и `og:image` | `actions/configure-pages` |

Ничего вручную прописывать не нужно: сайт одинаково работает и как project-сайт
(`user.github.io/repo/`), и как user-сайт, и на своём домене.

### Свой домен

1. Settings → Pages → Custom domain — укажите домен.
2. Создайте файл `public/CNAME` с одной строкой — доменом (например `shokolad62.ru`).
3. В [`public/robots.txt`](public/robots.txt) раскомментируйте строку `Sitemap:` и подставьте домен.

## Где что менять

| Что | Файл |
| --- | --- |
| **Весь контент**: телефон, адрес, график, цены, описания соляриев, шаги, преимущества, FAQ | [`app/data/site.ts`](app/data/site.ts) |
| Цвета, шрифты, отступы, анимации появления | [`app/assets/css/main.css`](app/assets/css/main.css) |
| Порядок секций на странице | [`app/pages/index.vue`](app/pages/index.vue) |
| SEO: title, description, ключевые слова, микроразметка schema.org | [`app/pages/index.vue`](app/pages/index.vue) |
| Секции | `app/components/*Section.vue`, `StudioGallery.vue` |
| Шапка, футер, мобильная панель действий, прелоадер | `app/components/App*.vue`, `MobileBar.vue` |
| Движок анимаций (появление при скролле, параллакс, счётчики) | [`app/plugins/motion.client.ts`](app/plugins/motion.client.ts) |
| Яндекс.Метрика | [`app/data/site.ts`](app/data/site.ts) → `metrikaId`, логика в [`app/plugins/metrika.client.ts`](app/plugins/metrika.client.ts) |

### Телефон

Указан в двух местах внутри `app/data/site.ts`: `phone` (как показывается) и
`phoneHref` (`tel:+7...`). Меняйте оба.

### Мессенджеры и соцсети

В `app/data/site.ts` поля `whatsapp`, `telegram`, `vk`, `instagram` пустые — кнопки
скрыты. Впишите ссылку — кнопка появится в контактах и футере автоматически.

### Яндекс.Метрика

Счётчик **111803796** подключён. ID лежит в `app/data/site.ts` → `metrikaId`; если
оставить поле пустым, скрипт Метрики на сайт не попадёт вообще.

Параметры init повторяют официальный сниппет: `ssr`, `webvisor`, `clickmap`,
`ecommerce: 'dataLayer'`, `referrer`, `url`, `accurateTrackBounce`, `trackLinks`.
Вебвизор записывает действия посетителей — если он не нужен, уберите `webvisor: true`
в [`app/plugins/metrika.client.ts`](app/plugins/metrika.client.ts).

Плюс сразу отправляются две JS-цели — создайте их в Метрике («Настройка» → «Цели» →
тип «JavaScript-событие») с такими идентификаторами:

| Идентификатор цели | Когда срабатывает |
| --- | --- |
| `booking_click` | клик по любой кнопке онлайн-записи |
| `phone_click` | клик по номеру телефона |

## Фотографии

В сборке используются сжатые WebP из `public/img` (по два размера: `name.webp` — 1400px,
`name-800.webp` — для мобильных). Оригиналы лежат локально в `_source/photos`
(в git не попадают).

Добавить новое фото:

```bash
cwebp -q 76 -resize 0 1400 -m 6 IMG_1234.PNG -o public/img/имя.webp
cwebp -q 68 -resize 0 800  -m 6 IMG_1234.PNG -o public/img/имя-800.webp
```

Затем впишите `имя` в нужное место `app/data/site.ts` (поля `image` у соляриев или
массив `gallery`). Картинка для соцсетей — `public/og.jpg` (1200×630).

## Что внутри

- **Nuxt 4** + Vue 3, полностью статическая генерация (`nitro.preset: 'github-pages'`,
  `.nojekyll` и `404.html` создаются автоматически).
- Шрифты: Playfair Display (заголовки) + Manrope (текст), Google Fonts.
- Анимации: прелоадер, пословное появление заголовков, ревилы по скроллу, параллакс,
  анимированные счётчики, tilt-карточки соляриев, drag-галерея, аккордеон FAQ,
  калькулятор стоимости сеанса. Всё выключается при `prefers-reduced-motion`.
- SEO: заголовки под запросы «солярий Рязань», «турбосолярий Рязань» и т. д.,
  schema.org `BeautySalon` + `FAQPage`, Open Graph, `robots.txt`.
- Карта Яндекса подгружается только по клику — не тянет сторонние скрипты при загрузке.

## Правовая заметка

В футере есть дисклеймер: информация справочная, не медицинская консультация,
у солярия есть противопоказания. Если появятся акции, цены или медицинские
формулировки — их стоит согласовать отдельно.
