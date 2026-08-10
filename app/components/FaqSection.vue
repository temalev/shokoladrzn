<script setup lang="ts">
import { faq, faqGroups, site } from '~/data/site'

const group = ref<string>('all')
const open = ref<number | null>(0)

const list = computed(() =>
  faq
    .map((item, i) => ({ ...item, i }))
    .filter((item) => group.value === 'all' || item.g === group.value),
)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

function selectGroup(id: string) {
  group.value = id
  open.value = null
}

/* Плавная анимация раскрытия по реальной высоте контента */
function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0px'
  void e.offsetHeight
  e.style.height = `${e.scrollHeight}px`
}
function onAfterEnter(el: Element) {
  ;(el as HTMLElement).style.height = 'auto'
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = `${e.scrollHeight}px`
  void e.offsetHeight
  e.style.height = '0px'
}
</script>

<template>
  <section id="faq" class="section faq">
    <div class="container">
      <SectionHead
        eyebrow="Частые вопросы"
        title="Отвечаем на всё, <em>что обычно спрашивают</em>"
        text="Если не нашли свой вопрос — просто позвоните, администратор подскажет."
      />

      <div class="faq__tabs" data-reveal="fade">
        <button
          v-for="g in faqGroups"
          :key="g.id"
          class="faq__tab"
          :class="{ 'is-active': group === g.id }"
          @click="selectGroup(g.id)"
        >
          {{ g.label }}
        </button>
      </div>

      <TransitionGroup name="faq-item" tag="div" class="faq__list">
        <article v-for="item in list" :key="item.i" class="faq__row" :class="{ 'is-open': open === item.i }">
          <h3>
            <button
              class="faq__q"
              :aria-expanded="open === item.i"
              :aria-controls="`faq-a-${item.i}`"
              @click="toggle(item.i)"
            >
              <span>{{ item.q }}</span>
              <i class="faq__ic" aria-hidden="true"><b /><b /></i>
            </button>
          </h3>
          <Transition name="acc" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
            <div v-show="open === item.i" :id="`faq-a-${item.i}`" class="faq__a">
              <p>{{ item.a }}</p>
            </div>
          </Transition>
        </article>
      </TransitionGroup>

      <div class="faq__foot" data-reveal>
        <p class="small muted">
          Остались сомнения из-за состояния кожи, приёма лекарств, беременности или косметологических процедур? Лучше
          заранее уточнить у врача или у специалиста, который проводил процедуру.
        </p>
        <a :href="site.phoneHref" class="btn btn--ghost btn--sm">
          <span class="btn__label">Задать вопрос по телефону</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.4rem);
}

.faq__tab {
  padding: 0.55em 1.05em;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink-3);
  background: var(--surface);
  transition: color 0.4s, border-color 0.4s, background 0.5s var(--ease), transform 0.4s var(--ease);
}

.faq__tab:hover {
  color: var(--ink);
  border-color: var(--line);
  transform: translateY(-1px);
}

.faq__tab.is-active {
  color: #23150a;
  border-color: transparent;
  background: var(--grad-gold);
}

.faq__list {
  display: grid;
  border-top: 1px solid var(--line-soft);
}

.faq__row {
  border-bottom: 1px solid var(--line-soft);
  transition: background 0.6s var(--ease);
}

.faq__row.is-open {
  background: linear-gradient(90deg, rgba(31, 20, 14, 0.6), transparent 70%);
}

.faq__q {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
  padding: clamp(1rem, 2vw, 1.35rem) 0.2rem;
  text-align: left;
  font-size: clamp(0.98rem, 0.93rem + 0.4vw, 1.14rem);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
  transition: color 0.4s, padding-left 0.5s var(--ease);
}

.faq__q:hover {
  color: var(--gold);
  padding-left: 0.6rem;
}

.faq__row.is-open .faq__q {
  color: var(--gold);
}

.faq__ic {
  position: relative;
  flex: none;
  width: 26px;
  height: 26px;
  margin-top: 0.1em;
  border: 1px solid var(--line);
  border-radius: 50%;
  transition: border-color 0.5s, transform 0.6s var(--ease), background 0.5s;
}

.faq__ic b {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 1.5px;
  margin: -0.75px 0 0 -5px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.5s var(--ease), opacity 0.4s;
}

.faq__ic b:last-child {
  transform: rotate(90deg);
}

.faq__row.is-open .faq__ic {
  border-color: var(--tan);
  transform: rotate(90deg);
}

.faq__row.is-open .faq__ic b:last-child {
  opacity: 0;
}

.faq__a {
  overflow: hidden;
  will-change: height;
}

.faq__a p {
  padding: 0 clamp(2rem, 6vw, 4rem) clamp(1.1rem, 2vw, 1.5rem) 0.2rem;
  color: var(--ink-2);
  max-width: 82ch;
}

.acc-enter-active,
.acc-leave-active {
  transition: height 0.55s var(--ease), opacity 0.4s var(--ease);
}

.acc-enter-from,
.acc-leave-to {
  opacity: 0;
}

/* смена фильтра */
.faq-item-enter-active,
.faq-item-leave-active {
  transition: opacity 0.45s var(--ease), transform 0.55s var(--ease);
}

.faq-item-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.faq-item-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.faq-item-leave-active {
  position: absolute;
  width: 100%;
}

.faq__list {
  position: relative;
}

.faq__foot {
  display: grid;
  gap: 1rem;
  align-items: center;
  margin-top: clamp(1.6rem, 3vw, 2.4rem);
}

@media (min-width: 860px) {
  .faq__foot {
    grid-template-columns: 1fr auto;
    gap: 2rem;
  }
}

.faq__foot p {
  max-width: 78ch;
}
</style>
