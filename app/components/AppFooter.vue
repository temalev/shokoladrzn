<script setup lang="ts">
import { site } from '~/data/site'

const year = 2026

const socials = computed(() =>
  [
    { href: site.telegram, label: 'Telegram' },
    { href: site.whatsapp, label: 'WhatsApp' },
    { href: site.vk, label: 'ВКонтакте' },
    { href: site.instagram, label: 'Instagram' },
  ].filter((s) => s.href),
)

const seo = [
  'солярий Рязань',
  'студия загара Рязань',
  'турбосолярий Рязань',
  'горизонтальный солярий Рязань',
  'вертикальный солярий Рязань',
  'солярий в центре Рязани',
  'солярий Ленина 21',
  'солярий АТРОН СИТИ',
]
</script>

<template>
  <footer class="ft">
    <div class="lamps" aria-hidden="true">
      <span v-for="n in 14" :key="n" :style="{ left: `${n * 7.2}%`, animationDelay: `${n * 210}ms` }" />
    </div>

    <div class="container ft__in">
      <div class="ft__top">
        <div class="ft__brand">
          <p class="display d-3">ШОКОЛАД<em>62</em></p>
          <p class="small muted">Студия загара в центре Рязани. Три солярия, 40 ₽/минута, всё для загара уже включено.</p>
          <div class="ft__socials">
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="chip">{{ s.label }}</a>
          </div>
        </div>

        <div class="ft__col">
          <p class="micro">Разделы</p>
          <a href="#solariums" class="ft__link">Солярии</a>
          <a href="#price" class="ft__link">Цены и что входит</a>
          <a href="#studio" class="ft__link">Студия</a>
          <a href="#how" class="ft__link">Как проходит визит</a>
          <a href="#faq" class="ft__link">Частые вопросы</a>
          <a href="#contacts" class="ft__link">Контакты</a>
        </div>

        <div class="ft__col">
          <p class="micro">Контакты</p>
          <a :href="site.phoneHref" class="ft__phone">{{ site.phone }}</a>
          <p class="small muted">{{ site.address.street }}<br>{{ site.address.place }}, {{ site.address.floor }}<br>{{ site.address.note }}</p>
          <p class="small muted">
            <span v-for="h in site.hours" :key="h.short">{{ h.short }} {{ h.time }}<br></span>
          </p>
          <a :href="site.maps.yandexRoute" target="_blank" rel="noopener" class="link-u small">Построить маршрут</a>
        </div>
      </div>

      <div class="ft__seo">
        <span v-for="k in seo" :key="k">{{ k }}</span>
      </div>

      <div class="ft__bottom">
        <p class="small muted">© {{ year }} ШОКОЛАД62. Студия загара, Рязань.</p>
        <p class="small muted ft__legal">
          Информация на сайте носит справочный характер и не является медицинской консультацией. Посещение солярия имеет
          противопоказания — при сомнениях проконсультируйтесь со специалистом. 18+
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  position: relative;
  overflow: hidden;
  padding-top: clamp(3rem, 7vw, 6rem);
  padding-bottom: calc(clamp(1.5rem, 3vw, 2.5rem) + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line-soft);
  background: linear-gradient(180deg, var(--bg), var(--black));
}

.ft .lamps {
  mask-image: radial-gradient(90% 70% at 50% 100%, #000 10%, transparent 72%);
  -webkit-mask-image: radial-gradient(90% 70% at 50% 100%, #000 10%, transparent 72%);
}

.ft__in {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(2rem, 4vw, 3.2rem);
}

.ft__top {
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
}

@media (min-width: 860px) {
  .ft__top {
    grid-template-columns: 1.4fr 0.8fr 1fr;
  }
}

.ft__brand {
  display: grid;
  gap: 0.9rem;
  align-content: start;
  max-width: 38ch;
}

.ft__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ft__col {
  display: grid;
  gap: 0.6rem;
  align-content: start;
}

.ft__col .micro {
  margin-bottom: 0.35rem;
}

.ft__link {
  width: fit-content;
  font-size: 0.94rem;
  color: var(--ink-2);
  transition: color 0.35s, transform 0.45s var(--ease);
}

.ft__link:hover {
  color: var(--gold);
  transform: translateX(5px);
}

.ft__phone {
  font-family: var(--font-display);
  font-size: 1.42rem;
  font-variant-numeric: tabular-nums;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
}

.ft__seo {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.1rem;
  padding-block: clamp(1.2rem, 2.5vw, 1.8rem);
  border-block: 1px solid var(--line-soft);
  font-size: 0.72rem;
  color: var(--ink-4);
}

.ft__bottom {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 860px) {
  .ft__bottom {
    grid-template-columns: auto 1fr;
    gap: 2.5rem;
    align-items: start;
  }
}

.ft__legal {
  font-size: 0.76rem;
  line-height: 1.55;
  color: var(--ink-3);
  max-width: 78ch;
}
</style>
