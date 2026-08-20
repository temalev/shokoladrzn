/**
 * Цели Яндекс.Метрики по клику.
 *
 * Сам счётчик подключается инлайном в <head> — см. `app/app.vue`.
 * ID задаётся в `app/data/site.ts` → `metrikaId` (пусто — Метрики нет вообще).
 *
 * Цели нужно создать в Метрике: «Настройка» → «Цели» → «JavaScript-событие»,
 * с идентификаторами:
 *   booking_click — клик по любой кнопке онлайн-записи
 *   phone_click   — клик по номеру телефона
 */
import { site } from '~/data/site'

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export default defineNuxtPlugin(() => {
  const id = Number(site.metrikaId)
  if (!id) return

  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a')
      if (!link) return
      const href = link.getAttribute('href') || ''

      if (href.startsWith('tel:')) window.ym?.(id, 'reachGoal', 'phone_click')
      else if (site.booking && href.startsWith(site.booking)) window.ym?.(id, 'reachGoal', 'booking_click')
    },
    { passive: true, capture: true },
  )
})
