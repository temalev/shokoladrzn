<script setup lang="ts">
import { site, included, creams } from '~/data/site'

const SLIDER_MIN = 3
const SLIDER_MAX = 20

const devices = [
  { id: 'vertical', name: 'Вертикальный', min: 8, max: 16, def: 10, hint: 'Ориентир 8–16 минут. Для первого визита берут ближе к нижней границе.' },
  { id: 'turbo', name: 'Турбосолярий', min: 5, max: 10, def: 6, hint: 'Ориентир 5–10 минут. Аппарат мощный — многие замечают оттенок уже после 6 минут.' },
  { id: 'horizontal', name: 'Горизонтальный', min: 10, max: 15, def: 12, hint: 'Ориентир 10–15 минут. Загар лёжа, спокойный формат.' },
]

const activeId = ref('turbo')
const active = computed(() => devices.find((d) => d.id === activeId.value) || devices[1]!)
const minutes = ref(active.value.def)

watch(activeId, () => {
  minutes.value = active.value.def
})

const total = computed(() => minutes.value * site.pricePerMinute)

/* плавный счёт суммы */
const shown = ref(total.value)
let raf = 0
watch(total, (to, from) => {
  if (import.meta.server) return (shown.value = to)
  cancelAnimationFrame(raf)
  const t0 = performance.now()
  const dur = 420
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur)
    const eased = 1 - Math.pow(1 - p, 3)
    shown.value = Math.round(from + (to - from) * eased)
    if (p < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const pos = computed(() => (minutes.value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN))
const band = computed(() => ({
  left: `${((active.value.min - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100}%`,
  right: `${100 - ((active.value.max - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100}%`,
}))

const money = (n: number) => n.toLocaleString('ru-RU')
</script>

<template>
  <section id="price" class="section price">
    <div class="glow glow--price" aria-hidden="true" />

    <div class="container">
      <SectionHead
        eyebrow="Стоимость · без скрытых доплат"
        title="40 ₽ за минуту — <em>всё нужное</em> уже включено"
        text="Платите только за минуты в аппарате. Расходники, базовый крем и защита не считаются отдельно — они уже в цене."
      />

      <div class="price__grid">
        <!-- Калькулятор -->
        <div class="card card--pad calc" data-reveal="left">
          <div class="calc__head">
            <p class="micro">Прикиньте стоимость сеанса</p>
            <p class="small muted">Выберите аппарат и время — увидите сумму.</p>
          </div>

          <div class="calc__tabs" role="tablist" aria-label="Выбор солярия">
            <button
              v-for="d in devices"
              :key="d.id"
              role="tab"
              :aria-selected="activeId === d.id"
              class="calc__tab"
              :class="{ 'is-active': activeId === d.id }"
              @click="activeId = d.id"
            >
              {{ d.name }}
            </button>
          </div>

          <div class="calc__slider" :style="{ '--p': pos }">
            <div class="calc__track">
              <span class="calc__band" :style="band" />
              <span class="calc__fill" :style="{ width: `${pos * 100}%` }" />
            </div>
            <input
              v-model.number="minutes"
              type="range"
              :min="SLIDER_MIN"
              :max="SLIDER_MAX"
              step="1"
              aria-label="Длительность сеанса в минутах"
            >
            <output class="calc__bubble tabular">{{ minutes }} мин</output>
          </div>

          <div class="calc__scale small muted">
            <span>{{ SLIDER_MIN }} мин</span>
            <span class="calc__rec">рекомендуемый диапазон: {{ active.min }}–{{ active.max }} мин</span>
            <span>{{ SLIDER_MAX }} мин</span>
          </div>

          <div class="calc__out">
            <div>
              <p class="micro">Итого за сеанс</p>
              <p class="calc__sum display tabular">≈ {{ money(shown) }} ₽</p>
              <p class="small muted">{{ minutes }} мин × {{ site.pricePerMinute }} ₽</p>
            </div>
            <a
              :href="site.booking || site.phoneHref"
              :target="site.booking ? '_blank' : undefined"
              :rel="site.booking ? 'noopener' : undefined"
              class="btn btn--primary"
            >
              <span class="btn__label">Записаться</span>
            </a>
          </div>

          <p class="calc__hint small">{{ active.hint }}</p>
        </div>

        <!-- Что входит -->
        <div class="price__side">
          <div class="card card--pad incl" data-reveal="right">
            <div class="incl__head">
              <p class="micro">Входит в стоимость</p>
              <span class="incl__zero num">0 ₽</span>
            </div>
            <ul class="incl__list">
              <li v-for="(item, i) in included" :key="item" data-reveal="fade" :data-reveal-delay="60 + i * 45">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {{ item }}
              </li>
            </ul>
            <p class="small muted incl__note">
              SPF для лица — если вы не хотите, чтобы лицо загорало. Скажите об этом администратору.
            </p>
          </div>

          <div class="card card--pad cream" data-reveal="right" data-reveal-delay="140">
            <div class="cream__head">
              <div>
                <p class="micro">По желанию</p>
                <h3 class="display d-3">Профессиональный крем в саше</h3>
              </div>
              <span class="cream__price">{{ site.creamPrice }} ₽</span>
            </div>
            <ul class="cream__list">
              <li v-for="c in creams" :key="c.name">
                <b>{{ c.name }}</b>
                <span class="small muted">{{ c.desc }}</span>
              </li>
            </ul>
            <p class="small muted">Не обязательно: базовый крем уже входит в стоимость. Не знаете, что выбрать — подскажет администратор.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price {
  position: relative;
  overflow: hidden;
}

.glow--price {
  top: 12%;
  right: -12%;
  width: 44vw;
  height: 44vw;
  opacity: 0.3;
  background: radial-gradient(circle, rgba(223, 162, 105, 0.4), transparent 66%);
}

.price__grid {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(1rem, 2vw, 1.6rem);
  align-items: start;
}

@media (min-width: 1000px) {
  .price__grid {
    grid-template-columns: 1.02fr 0.98fr;
  }
}

.price__side {
  display: grid;
  gap: clamp(1rem, 2vw, 1.6rem);
}

/* --- калькулятор --- */
.calc {
  display: grid;
  gap: clamp(1.1rem, 2vw, 1.5rem);
  position: sticky;
  top: clamp(84px, 10vw, 110px);
}

@media (max-width: 999px) {
  .calc {
    position: static;
  }
}

.calc__head {
  display: grid;
  gap: 0.3rem;
}

.calc__tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;
  padding: 0.3rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: rgba(6, 4, 4, 0.5);
}

.calc__tab {
  padding: 0.72em 0.4em;
  border-radius: 999px;
  font-size: clamp(0.72rem, 0.66rem + 0.28vw, 0.84rem);
  font-weight: 600;
  color: var(--ink-3);
  transition: color 0.4s, background 0.5s var(--ease);
}

.calc__tab:hover {
  color: var(--ink);
}

.calc__tab.is-active {
  color: #23150a;
  background: var(--grad-gold);
}

.calc__slider {
  position: relative;
  height: 40px;
  display: grid;
  align-items: center;
  margin-top: 1.4rem;
}

.calc__track {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 999px;
  background: rgba(247, 241, 234, 0.1);
  overflow: hidden;
}

.calc__band {
  position: absolute;
  top: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    rgba(92, 184, 255, 0.5) 0 6px,
    rgba(92, 184, 255, 0.16) 6px 12px
  );
  transition: left 0.6s var(--ease), right 0.6s var(--ease);
}

.calc__fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--grad-gold);
  box-shadow: 0 0 18px rgba(242, 205, 151, 0.45);
}

.calc__slider input[type='range'] {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 40px;
  margin: 0;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  cursor: grab;
}

.calc__slider input[type='range']:active {
  cursor: grabbing;
}

.calc__slider input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #2a1a0d;
  background: var(--grad-gold);
  box-shadow: 0 0 0 6px rgba(242, 205, 151, 0.14), 0 6px 18px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.35s, transform 0.35s var(--ease);
}

.calc__slider input[type='range']:hover::-webkit-slider-thumb {
  transform: scale(1.12);
  box-shadow: 0 0 0 9px rgba(242, 205, 151, 0.18), 0 6px 18px rgba(0, 0, 0, 0.6);
}

.calc__slider input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #2a1a0d;
  background: #f2cd97;
  box-shadow: 0 0 0 6px rgba(242, 205, 151, 0.14);
}

.calc__slider input[type='range']::-moz-range-track {
  background: transparent;
}

.calc__bubble {
  position: absolute;
  top: -1.5rem;
  left: calc(var(--p) * (100% - 22px) + 11px);
  transform: translateX(-50%);
  padding: 0.24em 0.7em;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(6, 4, 4, 0.8);
  backdrop-filter: blur(8px);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
  transition: left 0.12s linear;
}

.calc__scale {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 0.74rem;
}

.calc__rec {
  color: var(--uv);
  text-align: center;
}

@media (max-width: 520px) {
  .calc__scale span:first-child,
  .calc__scale span:last-child {
    display: none;
  }

  .calc__rec {
    margin-inline: auto;
  }
}

.calc__out {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding-top: clamp(1rem, 2vw, 1.4rem);
  border-top: 1px solid var(--line-soft);
}

.calc__sum {
  font-size: clamp(2.1rem, 1.5rem + 3vw, 3.4rem);
  line-height: 1.05;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.calc__hint {
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(92, 184, 255, 0.22);
  background: rgba(92, 184, 255, 0.06);
  color: var(--ink-2);
}

/* --- что входит --- */
.incl__head,
.cream__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
}

.incl__zero {
  font-size: 1.25rem;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.incl__list {
  display: grid;
  gap: 0.55rem 1.2rem;
}

@media (min-width: 520px) {
  .incl__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.incl__list li {
  display: flex;
  align-items: center;
  gap: 0.6em;
  font-size: 0.92rem;
  color: var(--ink-2);
}

.incl__list svg {
  flex: none;
  color: var(--tan);
}

.incl__note {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line-soft);
}

/* --- кремы --- */
.cream__price {
  flex: none;
  padding: 0.35em 0.8em;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
}

.cream__list {
  display: grid;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.cream__list li {
  display: grid;
  gap: 0.15rem;
  padding-left: 1rem;
  border-left: 1px solid var(--line);
  transition: border-color 0.5s, transform 0.5s var(--ease);
}

.cream__list li:hover {
  border-color: var(--tan);
  transform: translateX(4px);
}

.cream__list b {
  font-weight: 600;
  font-size: 0.95rem;
}
</style>
