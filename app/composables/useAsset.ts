import { joinURL } from 'ufo'

/**
 * Путь к файлу из /public с учётом baseURL.
 * На GitHub Pages сайт живёт в подпапке /<repo>/ — без этого картинки не найдутся.
 */
export function useAsset() {
  const base = useRuntimeConfig().app.baseURL

  const asset = (path: string) => joinURL(base, path)

  /** Фото из /public/img: возвращает src (1400px) и srcset с мобильным вариантом (800px) */
  const photo = (name: string) => ({
    src: asset(`/img/${name}.webp`),
    srcset: `${asset(`/img/${name}-800.webp`)} 800w, ${asset(`/img/${name}.webp`)} 1400w`,
  })

  return { asset, photo }
}
