// Для project-сайта GitHub Pages базовый путь = /<имя-репозитория>/.
// Значение приходит из NUXT_APP_BASE_URL (см. .github/workflows/deploy.yml),
// здесь только гарантируем завершающий слэш.
const rawBase = process.env.NUXT_APP_BASE_URL || '/'
const baseURL = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Статический сайт под GitHub Pages
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: { crawlLinks: true, routes: ['/'] },
  },

  app: {
    baseURL,
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#0a0705' },
        { name: 'format-detection', content: 'telephone=no' },
        // Подтверждение прав в Яндекс.Вебмастере
        { name: 'yandex-verification', content: 'b71b02ab5204100f' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Полный адрес сайта — нужен для canonical и og:image.
      // Задаётся переменной NUXT_PUBLIC_SITE_URL на сборке.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },

  features: {
    // лендингу не нужен глобальный inline-CSS сплит — меньше дублирования стилей
    inlineStyles: false,
  },
})
