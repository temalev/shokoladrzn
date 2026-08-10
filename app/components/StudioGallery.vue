<script setup lang="ts">
import { gallery } from '~/data/site'

const { photo } = useAsset()
const scroller = ref<HTMLElement | null>(null)
const progress = ref(0)
const dragging = ref(false)

let startX = 0
let startLeft = 0

function onScroll() {
  const el = scroller.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  progress.value = max > 0 ? el.scrollLeft / max : 0
}

function onDown(e: PointerEvent) {
  const el = scroller.value
  if (!el || e.pointerType === 'touch') return
  dragging.value = true
  startX = e.clientX
  startLeft = el.scrollLeft
  el.setPointerCapture(e.pointerId)
}

function onMove(e: PointerEvent) {
  const el = scroller.value
  if (!el || !dragging.value) return
  const dx = e.clientX - startX
  el.scrollLeft = startLeft - dx
}

function onUp(e: PointerEvent) {
  const el = scroller.value
  if (!el) return
  dragging.value = false
  if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
}

function step(dir: 1 | -1) {
  const el = scroller.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.gal__item')
  const w = card ? card.offsetWidth + 18 : el.clientWidth * 0.8
  el.scrollBy({ left: dir * w, behavior: 'smooth' })
}
</script>

<template>
  <section id="studio" class="section gal">
    <div class="container">
      <SectionHead eyebrow="Студия · Ленина, 21 · 6 этаж">
        <template #title>
          <h2 class="display d-2 gal__title" data-words>Комфортная студия, <em>без спешки</em></h2>
        </template>
        <div class="gal__intro">
          <p class="lead" data-reveal data-reveal-delay="140">
            Отдельные кабины с местом для вещей, зеркала с подсветкой, зона ожидания — можно прийти с подругой и подождать
            друг друга. Всё необходимое лежит на месте, ничего не нужно приносить с собой.
          </p>
          <div class="gal__ctrl">
            <button aria-label="Предыдущее фото" class="gal__arrow" @click="step(-1)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button aria-label="Следующее фото" class="gal__arrow" @click="step(1)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </SectionHead>
    </div>

    <div
      ref="scroller"
      class="gal__scroller"
      :class="{ 'is-dragging': dragging }"
      @scroll.passive="onScroll"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    >
      <div class="gal__rail">
        <figure
          v-for="(g, i) in gallery"
          :key="g.image"
          class="gal__item"
          data-reveal="scale"
          :data-reveal-delay="(i % 4) * 90"
        >
          <div class="gal__shot">
            <img
              :src="photo(g.image).src"
              :srcset="photo(g.image).srcset"
              sizes="(max-width: 720px) 74vw, 340px"
              width="700"
              height="930"
              :alt="`${g.caption} — студия загара ШОКОЛАД62, Рязань`"
              loading="lazy"
              decoding="async"
              draggable="false"
            >
            <span class="gal__num num">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <figcaption class="small muted">{{ g.caption }}</figcaption>
        </figure>
      </div>
    </div>

    <div class="container">
      <div class="gal__bar" aria-hidden="true">
        <span :style="{ transform: `scaleX(${Math.max(0.06, progress)})` }" />
      </div>
      <p class="gal__hint micro">Тяните в сторону, чтобы посмотреть студию</p>
    </div>
  </section>
</template>

<style scoped>
.gal__intro {
  display: grid;
  gap: 1.2rem;
  align-items: end;
}

@media (min-width: 900px) {
  .gal__intro {
    grid-template-columns: 1fr auto;
    gap: 2.5rem;
  }
}

.gal__ctrl {
  display: none;
  gap: 0.5rem;
}

@media (min-width: 900px) {
  .gal__ctrl {
    display: flex;
  }
}

.gal__arrow {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink-2);
  background: var(--surface);
  transition: color 0.4s, border-color 0.4s, transform 0.5s var(--ease), background 0.4s;
}

.gal__arrow:hover {
  color: #23150a;
  border-color: transparent;
  background: var(--grad-gold);
  transform: translateY(-2px);
}

.gal__scroller {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
}

.gal__scroller::-webkit-scrollbar {
  display: none;
}

.gal__scroller.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
}

.gal__rail {
  display: flex;
  gap: 18px;
  width: max-content;
  /* левый край первой карточки совпадает с контентом .container */
  padding-inline: max(var(--pad), (100% - var(--container)) / 2 + var(--pad));
  padding-block: 0.4rem;
}

.gal__item {
  flex: none;
  width: clamp(220px, 62vw, 330px);
  scroll-snap-align: center;
  display: grid;
  gap: 0.7rem;
}

.gal__shot {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius);
  border: 1px solid var(--line-soft);
  overflow: hidden;
  background: var(--bg-2);
}

.gal__shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease), filter 0.8s;
  user-select: none;
}

.gal__item:hover .gal__shot img {
  transform: scale(1.06);
  filter: brightness(1.06);
}

.gal__num {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  padding: 0.25em 0.6em;
  border-radius: 999px;
  background: rgba(6, 4, 4, 0.5);
  backdrop-filter: blur(6px);
  font-size: 0.72rem;
  color: var(--gold);
}

.gal__item figcaption {
  padding-inline: 0.15rem;
  max-width: 30ch;
}

.gal__bar {
  height: 2px;
  margin-top: clamp(1.4rem, 3vw, 2.2rem);
  border-radius: 999px;
  background: var(--line-soft);
  overflow: hidden;
}

.gal__bar span {
  display: block;
  height: 100%;
  background: var(--grad-gold);
  transform-origin: left;
  transition: transform 0.25s var(--ease);
}

.gal__hint {
  margin-top: 0.7rem;
  text-align: center;
  color: var(--ink-4);
}
</style>
