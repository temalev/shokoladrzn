<script setup lang="ts">
import { site, solariums } from '~/data/site'

const { photo } = useAsset()
const tilt = ref(false)

onMounted(() => {
  tilt.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function onMove(e: PointerEvent) {
  if (!tilt.value) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`)
  el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
  el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
}

function onLeave(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <section id="solariums" class="section sol">
    <div class="container">
      <SectionHead
        eyebrow="Три аппарата · выбирайте и чередуйте"
        title="Вертикальный, <em>турбо</em> и горизонтальный"
        text="Разные аппараты дают разный результат и разное настроение сеанса. Можно ходить в один, а можно чередовать — многие гости так и делают."
      />

      <div class="sol__grid">
        <article
          v-for="(s, i) in solariums"
          :key="s.id"
          class="card sol__card"
          :class="[`is-${s.accent}`, { 'is-featured': s.featured }]"
          :data-reveal="'blur'"
          :data-reveal-delay="i * 140"
          @pointermove="onMove"
          @pointerleave="onLeave"
        >
          <div class="sol__media">
            <img
              :src="photo(s.image).src"
              :srcset="photo(s.image).srcset"
              sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 30vw"
              width="800"
              height="1000"
              :alt="`${s.name} солярий в студии загара ШОКОЛАД62, Рязань`"
              loading="lazy"
              decoding="async"
            >
            <span class="sol__index num">{{ s.index }}</span>
            <span class="sol__time">{{ s.time }}</span>
            <span v-if="s.featured" class="sol__hit">Хит</span>
            <span class="sol__veil" aria-hidden="true" />
          </div>

          <div class="sol__body">
            <p class="micro sol__kicker">{{ s.kicker }}</p>
            <h3 class="display d-3">{{ s.name }}</h3>
            <p class="small sol__lead">{{ s.lead }}</p>
            <ul class="sol__tags">
              <li v-for="t in s.tags" :key="t" class="chip">{{ t }}</li>
            </ul>
          </div>

          <span class="sol__spot" aria-hidden="true" />
        </article>
      </div>

      <div class="sol__note" data-reveal>
        <p class="small">
          <b>Время подбираем индивидуально.</b> Учитываем фототип кожи, наличие базового загара, перерыв между визитами и
          то, как кожа реагировала раньше. Если вы впервые или давно не загорали — начинаем аккуратно и постепенно.
        </p>
        <a :href="site.phoneHref" class="btn btn--ghost btn--sm">
          <span class="btn__label">Спросить администратора</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sol__grid {
  display: grid;
  gap: clamp(1rem, 2vw, 1.6rem);
}

@media (min-width: 720px) {
  .sol__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1080px) {
  .sol__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.sol__card {
  --accent: var(--tan);
  display: grid;
  grid-template-rows: auto 1fr;
  transform: perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transform-style: preserve-3d;
  transition: transform 0.7s var(--ease), border-color 0.6s var(--ease), box-shadow 0.7s var(--ease);
}

.sol__card.is-uv {
  --accent: var(--uv);
}

.sol__card.is-magenta {
  --accent: var(--magenta);
}

.sol__card.is-gold {
  --accent: var(--gold);
}

.sol__card:hover {
  border-color: color-mix(in srgb, var(--accent) 42%, transparent);
  box-shadow: 0 40px 90px -50px color-mix(in srgb, var(--accent) 55%, transparent);
}

.sol__card.is-featured {
  border-color: color-mix(in srgb, var(--accent) 26%, transparent);
}

@media (min-width: 1080px) {
  .sol__card.is-featured {
    transform: perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-1.6rem);
  }
}

.sol__spot {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s var(--ease);
  background: radial-gradient(
    28rem circle at var(--mx, 50%) var(--my, 0%),
    color-mix(in srgb, var(--accent) 16%, transparent),
    transparent 62%
  );
}

.sol__card:hover .sol__spot {
  opacity: 1;
}

/* фото */
.sol__media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.sol__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.2s var(--ease), filter 1s var(--ease);
  filter: saturate(1.02);
}

.sol__card:hover .sol__media img {
  transform: scale(1.09);
  filter: saturate(1.12) brightness(1.04);
}

.sol__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 4, 4, 0.42) 0%, transparent 34%, rgba(6, 4, 4, 0.72) 100%);
}

.sol__index,
.sol__time,
.sol__hit {
  position: absolute;
  z-index: 2;
}

.sol__index {
  top: 0.95rem;
  left: 1.05rem;
  font-size: 0.8rem;
  color: var(--ink-2);
}

.sol__time {
  bottom: 0.95rem;
  left: 1.05rem;
  padding: 0.4em 0.9em;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: rgba(6, 4, 4, 0.55);
  backdrop-filter: blur(8px);
  font-size: 0.78rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ink);
}

.sol__hit {
  top: 0.9rem;
  right: 1rem;
  padding: 0.35em 0.8em;
  border-radius: 999px;
  background: var(--grad-warm);
  color: #2a1008;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* текст */
.sol__body {
  display: grid;
  gap: 0.6rem;
  align-content: start;
  padding: clamp(1.15rem, 2.2vw, 1.7rem);
}

.sol__kicker {
  color: color-mix(in srgb, var(--accent) 75%, var(--ink-3));
}

.sol__lead {
  color: var(--ink-2);
}

.sol__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.3rem;
}

/* примечание */
.sol__note {
  display: grid;
  gap: 1rem;
  align-items: center;
  margin-top: clamp(1.6rem, 3vw, 2.6rem);
  padding: clamp(1.2rem, 2.4vw, 1.8rem);
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

@media (min-width: 860px) {
  .sol__note {
    grid-template-columns: 1fr auto;
    gap: 2rem;
  }
}

.sol__note b {
  font-weight: 600;
  color: var(--gold);
}

.sol__note p {
  color: var(--ink-2);
  max-width: 76ch;
}
</style>
