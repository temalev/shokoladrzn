<script setup lang="ts">
import { site } from '~/data/site'

const { photo } = useAsset()
const shot = photo('neon-reception')
const mapOn = ref(false)

const socials = computed(() =>
  [
    { href: site.telegram, label: 'Telegram' },
    { href: site.whatsapp, label: 'WhatsApp' },
    { href: site.vk, label: 'ВКонтакте' },
    { href: site.instagram, label: 'Instagram' },
  ].filter((s) => s.href),
)
</script>

<template>
  <section id="contacts" class="section ct">
    <div class="lamps" aria-hidden="true">
      <span v-for="n in 12" :key="n" :style="{ left: `${n * 8.4}%`, animationDelay: `${n * 240}ms` }" />
    </div>

    <div class="container ct__in">
      <SectionHead
        eyebrow="Контакты · как добраться"
        title="Ждём вас в центре <em>Рязани</em>"
        text="Ул. Ленина, 21, ТЦ «АТРОН СИТИ», 6 этаж. Вход через стеклянную дверь. Можно без записи — если аппарат свободен, сразу проходите на сеанс."
      />

      <div class="ct__grid">
        <div class="ct__cards">
          <a :href="site.maps.yandex" target="_blank" rel="noopener" class="card card--pad ct__card" data-reveal>
            <p class="micro">Адрес</p>
            <p class="ct__big display">{{ site.address.street }}</p>
            <p class="small muted">{{ site.address.place }} · {{ site.address.floor }}</p>
            <p class="small ct__accent">{{ site.address.note }}</p>
            <span class="ct__go">
              Открыть на карте
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>

          <div class="card card--pad ct__card" data-reveal data-reveal-delay="90">
            <p class="micro">График работы</p>
            <ul class="ct__hours">
              <li v-for="h in site.hours" :key="h.short">
                <span>{{ h.days }}</span>
                <b class="tabular">{{ h.time }}</b>
              </li>
            </ul>
            <p class="small muted">Предварительная запись не обязательна. Хотите конкретное время или конкретный солярий — позвоните заранее.</p>
          </div>

          <div class="card card--pad ct__card ct__card--phone" data-reveal data-reveal-delay="180">
            <p class="micro">Телефон</p>
            <a :href="site.phoneHref" class="ct__phone display tabular">{{ site.phone }}</a>
            <div class="btn-row">
              <a :href="site.phoneHref" class="btn btn--primary btn--sm">
                <span class="btn__label">Позвонить</span>
              </a>
              <a :href="site.maps.yandexRoute" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">
                <span class="btn__label">Маршрут</span>
              </a>
            </div>
            <div v-if="socials.length" class="ct__soc">
              <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="chip">{{ s.label }}</a>
            </div>
          </div>
        </div>

        <div class="ct__map card" data-reveal="scale" data-reveal-delay="120">
          <iframe
            v-if="mapOn"
            :src="site.maps.widget"
            class="ct__frame"
            title="Карта: студия загара ШОКОЛАД62, Рязань, ул. Ленина, 21"
            loading="lazy"
            allowfullscreen
          />
          <template v-else>
            <img
              :src="shot.src"
              :srcset="shot.srcset"
              sizes="(max-width: 1000px) 92vw, 46vw"
              width="800"
              height="1000"
              alt="Ресепшн студии загара ШОКОЛАД62 в Рязани"
              loading="lazy"
              decoding="async"
            >
            <div class="ct__mapover">
              <p class="display d-3">Рязань, ул. Ленина, 21</p>
              <p class="small muted">ТЦ «АТРОН СИТИ», 6 этаж</p>
              <button class="btn btn--primary btn--sm" @click="mapOn = true">
                <span class="btn__label">Показать карту</span>
              </button>
              <p class="micro ct__maphint">карта загрузится по клику</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ct {
  position: relative;
  overflow: hidden;
}

.ct .lamps {
  mask-image: radial-gradient(80% 60% at 50% 0%, #000 5%, transparent 70%);
  -webkit-mask-image: radial-gradient(80% 60% at 50% 0%, #000 5%, transparent 70%);
}

.ct__in {
  position: relative;
  z-index: 2;
}

.ct__grid {
  display: grid;
  gap: clamp(1rem, 2vw, 1.6rem);
  align-items: stretch;
}

@media (min-width: 1000px) {
  .ct__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.ct__cards {
  display: grid;
  gap: clamp(0.8rem, 1.6vw, 1.2rem);
  align-content: start;
}

.ct__card {
  display: grid;
  gap: 0.4rem;
  align-content: start;
  transition: border-color 0.5s, transform 0.6s var(--ease);
}

a.ct__card:hover {
  border-color: var(--line);
  transform: translateY(-3px);
}

.ct__big {
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem);
  line-height: 1.1;
}

.ct__accent {
  color: var(--gold);
}

.ct__go {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  margin-top: 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink-2);
  transition: gap 0.4s var(--ease), color 0.4s;
}

a.ct__card:hover .ct__go {
  gap: 0.9em;
  color: var(--gold);
}

.ct__hours {
  display: grid;
  gap: 0.45rem;
  margin-block: 0.35rem 0.8rem;
}

.ct__hours li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px dashed var(--line-soft);
  font-size: 0.92rem;
  color: var(--ink-2);
}

.ct__hours b {
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
}

.ct__card--phone {
  gap: 0.75rem;
  background:
    radial-gradient(120% 150% at 100% 0%, rgba(223, 162, 105, 0.14), transparent 58%),
    var(--bg-2);
}

.ct__phone {
  font-size: clamp(1.6rem, 1.2rem + 2.2vw, 2.5rem);
  line-height: 1;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
}

.ct__soc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* карта */
.ct__map {
  position: relative;
  min-height: clamp(320px, 52vw, 100%);
  overflow: hidden;
}

.ct__map img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) brightness(0.55);
  transform: scale(1.02);
  transition: transform 1.4s var(--ease);
}

.ct__map:hover img {
  transform: scale(1.07);
}

.ct__mapover {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: start;
  align-content: end;
  gap: 0.5rem;
  height: 100%;
  padding: clamp(1.2rem, 2.5vw, 2rem);
  background: linear-gradient(180deg, rgba(6, 4, 4, 0.15), rgba(6, 4, 4, 0.85));
}

.ct__mapover .btn {
  margin-top: 0.5rem;
}

.ct__maphint {
  color: var(--ink-4);
}

.ct__frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  filter: grayscale(0.2) contrast(1.05);
}
</style>
