<script setup lang="ts">
import { advantages } from '~/data/site'

const { photo } = useAsset()
const shot = photo('mirror-amenities')
</script>

<template>
  <section id="why" class="section adv">
    <div class="container adv__in">
      <div class="adv__left">
        <SectionHead eyebrow="Почему сюда возвращаются">
          <template #title>
            <h2 class="display d-2 adv__h" data-words>Всё продумано, <em>чтобы вы просто пришли</em></h2>
          </template>
        </SectionHead>

        <figure class="adv__shot" data-reveal="scale">
          <img
            :src="shot.src"
            :srcset="shot.srcset"
            sizes="(max-width: 1000px) 92vw, 40vw"
            width="800"
            height="1000"
            alt="Зеркало с подсветкой и принадлежности для загара в студии ШОКОЛАД62"
            loading="lazy"
            decoding="async"
            data-parallax="0.05"
          >
          <figcaption class="adv__cap">
            <span class="micro">Мицеллярная вода, ватные диски, очки</span>
            <span class="small">уже ждут вас в кабине</span>
          </figcaption>
        </figure>
      </div>

      <ul class="adv__list">
        <li
          v-for="(a, i) in advantages"
          :key="a.title"
          class="adv__item"
          data-reveal
          :data-reveal-delay="i * 90"
        >
          <span class="adv__n num">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="adv__t">{{ a.title }}</h3>
            <p class="small adv__x">{{ a.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.adv {
  background: linear-gradient(180deg, transparent, rgba(22, 16, 12, 0.55), transparent);
}

.adv__in {
  display: grid;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
}

@media (min-width: 1000px) {
  .adv__in {
    grid-template-columns: 0.95fr 1.05fr;
  }
}

.adv__left {
  position: sticky;
  top: clamp(84px, 10vw, 116px);
}

@media (max-width: 999px) {
  .adv__left {
    position: static;
  }
}

.adv__shot {
  position: relative;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-soft);
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--bg-2);
}

.adv__shot img {
  width: 100%;
  height: 112%;
  margin-top: -6%;
  object-fit: cover;
}

.adv__cap {
  position: absolute;
  inset: auto 1rem 1rem;
  display: grid;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--line-soft);
  background: rgba(6, 4, 4, 0.62);
  backdrop-filter: blur(12px);
}

.adv__cap .micro {
  color: var(--gold);
}

.adv__list {
  display: grid;
  gap: 1px;
  background: var(--line-soft);
  border-block: 1px solid var(--line-soft);
}

.adv__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(1rem, 2.5vw, 2rem);
  padding: clamp(1.2rem, 2.4vw, 1.9rem) 0.2rem;
  background: var(--bg);
  transition: background 0.6s var(--ease), padding-left 0.6s var(--ease);
}

.adv__item:hover {
  background: linear-gradient(90deg, rgba(31, 20, 14, 0.75), transparent);
  padding-left: 0.9rem;
}

.adv__h {
  font-size: clamp(1.85rem, 1.25rem + 2.4vw, 3.3rem);
}

.adv__x {
  color: var(--ink-2);
}

.adv__n {
  font-size: 0.78rem;
  line-height: 2.4;
  color: var(--bronze);
  transition: color 0.5s;
}

.adv__item:hover .adv__n {
  color: var(--gold);
}

.adv__t {
  margin-bottom: 0.3rem;
  font-size: clamp(1.06rem, 1rem + 0.5vw, 1.28rem);
  font-weight: 500;
  letter-spacing: -0.015em;
}
</style>
