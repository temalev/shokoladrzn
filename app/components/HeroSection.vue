<script setup lang="ts">
import { site, stats } from '~/data/site'

const { photo } = useAsset()
const main = photo('neon-sign')
const second = photo('turbo-collagen')
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <div class="lamps">
        <span v-for="n in 16" :key="n" :style="{ left: `${n * 6.25 - 3}%`, animationDelay: `${n * 180}ms` }" />
      </div>
      <div class="glow glow--gold" />
      <div class="glow glow--uv" />
      <div class="grain" />
    </div>

    <div class="container hero__in">
      <div class="hero__content">
        <p class="eyebrow eyebrow--gold" data-reveal="fade" data-reveal-delay="850">
          Студия загара · Рязань, центр
        </p>

        <h1 class="display d-1 hero__title" data-words style="--wd: 950ms">
          Солярий <em>в центре</em> Рязани
        </h1>

        <p class="lead hero__lead" data-reveal data-reveal-delay="1250">
          Три аппарата в одной студии: вертикальный, мощный турбосолярий с коллагеновыми лампами и горизонтальный.
          <strong>40 ₽ за минуту</strong> — крем, шапочка, стикини, очки и остальное уже включены.
        </p>

        <div class="btn-row hero__cta" data-reveal data-reveal-delay="1400">
          <a v-if="site.booking" :href="site.booking" target="_blank" rel="noopener" class="btn btn--primary">
            <span class="btn__label">
              Записаться онлайн
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a :href="site.phoneHref" class="btn btn--ghost">
            <span class="btn__label">{{ site.phone }}</span>
          </a>
        </div>

        <ul class="hero__meta" data-reveal data-reveal-delay="1550">
          <li><b>Пн–Пт</b> 11:00–20:00</li>
          <li><b>Сб–Вс</b> 12:00–18:00</li>
          <li class="hero__meta-accent">Онлайн-запись или без записи</li>
        </ul>
      </div>

      <div class="hero__media">
        <figure class="hero__shot hero__shot--main" data-parallax="0.07" data-reveal="scale" data-reveal-delay="700">
          <img
            :src="main.src"
            :srcset="main.srcset"
            sizes="(max-width: 900px) 92vw, 40vw"
            width="900"
            height="1180"
            alt="Неоновая вывеска «Солярий» в студии загара ШОКОЛАД62 в Рязани"
            fetchpriority="high"
            decoding="async"
          >
          <span class="hero__shot-edge" aria-hidden="true" />
        </figure>

        <figure class="hero__shot hero__shot--sub" data-parallax="-0.11" data-reveal="blur" data-reveal-delay="1100">
          <img
            :src="second.src"
            :srcset="second.srcset"
            sizes="(max-width: 900px) 42vw, 18vw"
            width="620"
            height="820"
            alt="Турбосолярий с белыми и красными коллагеновыми лампами"
            loading="lazy"
            decoding="async"
          >
        </figure>

        <RotatingBadge class="hero__badge" data-parallax="-0.05" />
      </div>
    </div>

    <div class="container">
      <ul class="stats" data-reveal data-reveal-delay="1700">
        <li v-for="s in stats" :key="s.label" class="stats__item">
          <span class="stats__value display tabular" :data-count="s.value" :data-count-suffix="s.suffix">0{{ s.suffix }}</span>
          <span class="stats__label small muted">{{ s.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-content: center;
  gap: clamp(1.8rem, 3vw, 2.8rem);
  min-height: 100svh;
  padding-top: clamp(5.8rem, 11vw, 8.5rem);
  padding-bottom: clamp(2.5rem, 4vw, 3.5rem);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.glow--gold {
  top: -22%;
  left: 4%;
  width: 46vw;
  height: 46vw;
  background: radial-gradient(circle, rgba(223, 162, 105, 0.4), transparent 68%);
  animation: floatGlow 16s var(--ease-io) infinite;
}

.glow--uv {
  right: -8%;
  bottom: -18%;
  width: 42vw;
  height: 42vw;
  opacity: 0.34;
  background: radial-gradient(circle, rgba(92, 184, 255, 0.42), transparent 66%);
  animation: floatGlow 21s var(--ease-io) -6s infinite reverse;
}

@keyframes floatGlow {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(4%, 6%, 0) scale(1.14);
  }
}

.hero__in {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(2.5rem, 5vw, 3.5rem);
  align-items: center;
}

@media (min-width: 940px) {
  .hero__in {
    grid-template-columns: 1.08fr 0.92fr;
    gap: clamp(2rem, 4vw, 4.5rem);
  }
}

.hero__content {
  display: grid;
  gap: clamp(1.1rem, 2vw, 1.6rem);
  align-content: start;
}

.hero__title {
  max-width: 15ch;
}

.hero__lead {
  max-width: 46ch;
}

.hero__lead strong {
  font-weight: 600;
  color: var(--ink);
}

.hero__cta {
  margin-top: 0.4rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
  font-size: 0.85rem;
  color: var(--ink-2);
}

.hero__meta b {
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.02em;
}

.hero__meta-accent {
  position: relative;
  padding-left: 1.1rem;
  color: var(--gold);
  font-weight: 500;
}

.hero__meta-accent::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 7px;
  height: 7px;
  margin-top: -3.5px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 0 rgba(242, 205, 151, 0.55);
  animation: pulse 2.6s ease-out infinite;
}

@keyframes pulse {
  70%,
  100% {
    box-shadow: 0 0 0 11px rgba(242, 205, 151, 0);
  }
}

/* --- коллаж --- */
.hero__media {
  position: relative;
  display: grid;
  justify-items: end;
}

.hero__shot {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-soft);
  background: var(--bg-2);
}

.hero__shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__shot--main {
  width: min(100%, 460px);
  aspect-ratio: 3 / 4;
  box-shadow: 0 50px 100px -50px rgba(0, 0, 0, 0.95);
}

.hero__shot--main img {
  animation: slowZoom 24s var(--ease-io) infinite alternate;
}

@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
}

.hero__shot-edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(160deg, rgba(242, 205, 151, 0.16), transparent 42%, rgba(6, 4, 4, 0.5));
  mix-blend-mode: soft-light;
}

.hero__shot--sub {
  position: absolute;
  left: 0;
  bottom: -8%;
  width: clamp(112px, 30%, 190px);
  aspect-ratio: 3 / 4;
  box-shadow: 0 34px 70px -34px rgba(0, 0, 0, 0.95);
}

.hero__badge {
  position: absolute;
  top: -4%;
  left: clamp(-4%, 2vw, 8%);
  z-index: 3;
}

@media (max-width: 480px) {
  .hero__cta {
    display: grid;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 939px) {
  .hero__media {
    justify-items: center;
  }

  .hero__shot--main {
    width: min(100%, 420px);
  }

  .hero__shot--sub {
    left: 2%;
    bottom: -6%;
  }

  .hero__badge {
    top: auto;
    bottom: -6%;
    left: auto;
    right: 2%;
  }
}

/* --- цифры --- */
.stats {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

@media (min-width: 760px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stats__item {
  display: grid;
  gap: 0.35rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  background: rgba(10, 7, 6, 0.6);
  backdrop-filter: blur(8px);
  transition: background 0.5s var(--ease);
}

.stats__item:hover {
  background: rgba(31, 20, 14, 0.72);
}

.stats__value {
  font-size: clamp(1.7rem, 1.3rem + 2vw, 2.9rem);
  line-height: 1;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stats__label {
  max-width: 20ch;
}

</style>
