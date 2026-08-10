<script setup lang="ts">
import { site, steps } from '~/data/site'
</script>

<template>
  <section id="how" class="section steps">
    <div class="container">
      <SectionHead
        eyebrow="Как проходит визит"
        title="Приходите — <em>дальше всё просто</em>"
        text="Не нужно заранее разбираться в аппаратах, кремах и минутах. Достаточно прийти в часы работы."
      />

      <ol class="steps__list">
        <li v-for="(s, i) in steps" :key="s.n" class="steps__item" data-reveal :data-reveal-delay="i * 110">
          <span class="steps__dot" aria-hidden="true" />
          <span class="steps__line" aria-hidden="true" />
          <span class="steps__n num">{{ s.n }}</span>
          <div class="steps__body">
            <h3 class="steps__t">{{ s.title }}</h3>
            <p class="small muted">{{ s.text }}</p>
          </div>
        </li>
      </ol>

      <div class="steps__cta" data-reveal>
        <p class="display d-3">Хотите конкретное время или конкретный солярий?</p>
        <div class="btn-row">
          <a :href="site.phoneHref" class="btn btn--primary">
            <span class="btn__label">{{ site.phone }}</span>
          </a>
          <a :href="site.maps.yandexRoute" target="_blank" rel="noopener" class="btn btn--ghost">
            <span class="btn__label">Построить маршрут</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps__list {
  display: grid;
  counter-reset: s;
}

.steps__item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(1rem, 3vw, 2.4rem);
  padding: 0 0 clamp(1.8rem, 3.5vw, 3rem) clamp(1.6rem, 3vw, 2.6rem);
}

.steps__item:last-child {
  padding-bottom: 0;
}

.steps__dot {
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 11px;
  height: 11px;
  margin-left: -5px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--tan);
  transition: box-shadow 0.8s var(--ease), background 0.8s;
  transition-delay: 0.25s;
}

.steps__item.in .steps__dot {
  background: var(--grad-gold);
  box-shadow: 0 0 0 5px rgba(242, 205, 151, 0.12), 0 0 18px rgba(242, 205, 151, 0.55);
}

.steps__line {
  position: absolute;
  left: 0;
  top: 1.1rem;
  bottom: -0.2rem;
  width: 1px;
  background: linear-gradient(180deg, var(--tan), rgba(142, 92, 51, 0.25));
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.3s var(--ease) 0.15s;
}

.steps__item.in .steps__line {
  transform: scaleY(1);
}

.steps__item:last-child .steps__line {
  display: none;
}

.steps__n {
  font-size: clamp(1.1rem, 0.95rem + 0.9vw, 1.6rem);
  padding-top: 0.15em;
  line-height: 1;
  color: transparent;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.85;
}

.steps__body {
  max-width: 62ch;
}

.steps__t {
  margin-bottom: 0.35rem;
  font-size: clamp(1.1rem, 1rem + 0.7vw, 1.45rem);
  font-weight: 500;
  letter-spacing: -0.02em;
}

.steps__cta {
  display: grid;
  gap: 1.2rem;
  align-items: center;
  margin-top: clamp(2.2rem, 4.5vw, 3.6rem);
  padding: clamp(1.4rem, 3vw, 2.4rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 160% at 0% 0%, rgba(223, 162, 105, 0.14), transparent 60%),
    var(--bg-2);
}

@media (min-width: 900px) {
  .steps__cta {
    grid-template-columns: 1fr auto;
    gap: 2.5rem;
  }
}

.steps__cta p {
  max-width: 28ch;
}
</style>
