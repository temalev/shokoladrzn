<script setup lang="ts">
import { site } from '~/data/site'

const nav = [
  { href: '#solariums', label: 'Солярии' },
  { href: '#price', label: 'Цены' },
  { href: '#studio', label: 'Студия' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contacts', label: 'Контакты' },
]

const open = ref(false)

watch(open, (v) => {
  if (import.meta.client) document.body.classList.toggle('is-locked', v)
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.classList.remove('is-locked')
})
</script>

<template>
  <header class="hd">
    <div class="hd__bar">
      <div class="hd__in container">
        <a href="#top" class="logo" aria-label="ШОКОЛАД62 — студия загара, на главную">
          <span class="logo__mark">ШОКОЛАД<i>62</i></span>
          <span class="logo__sub">студия загара · рязань</span>
        </a>

        <nav class="hd__nav" aria-label="Основная навигация">
          <a v-for="item in nav" :key="item.href" :href="item.href" class="hd__link">
            <span>{{ item.label }}</span>
            <span aria-hidden="true">{{ item.label }}</span>
          </a>
        </nav>

        <div class="hd__actions">
          <a :href="site.phoneHref" class="hd__phone no-mobile">{{ site.phone }}</a>
          <a :href="site.phoneHref" class="btn btn--primary btn--sm hd__cta">
            <span class="btn__label">Позвонить</span>
          </a>
          <button class="burger" :class="{ 'is-open': open }" :aria-expanded="open" aria-label="Меню" @click="open = !open">
            <i /><i /><i />
          </button>
        </div>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="open" class="menu" @click.self="open = false">
        <div class="menu__in container">
          <nav class="menu__nav">
            <a
              v-for="(item, i) in nav"
              :key="item.href"
              :href="item.href"
              class="menu__link display d-2"
              :style="{ '--d': `${i * 60 + 90}ms` }"
              @click="open = false"
            >{{ item.label }}</a>
          </nav>
          <div class="menu__foot" :style="{ '--d': '400ms' }">
            <a :href="site.phoneHref" class="menu__phone">{{ site.phone }}</a>
            <p class="small muted">{{ site.address.full }}</p>
            <p class="small muted">Пн–Пт 11:00–20:00 · Сб–Вс 12:00–18:00</p>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hd {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
}

.hd__bar {
  transition: background 0.6s var(--ease), backdrop-filter 0.6s var(--ease), border-color 0.6s var(--ease);
  border-bottom: 1px solid transparent;
}

html.is-scrolled .hd__bar {
  background: rgba(10, 7, 6, 0.88);
  backdrop-filter: blur(20px) saturate(1.3);
  border-bottom-color: var(--line-soft);
}

.hd__in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  height: clamp(64px, 8vw, 86px);
}

/* Логотип */
.logo {
  display: grid;
  gap: 0.18rem;
  line-height: 1;
}

.logo__mark {
  font-family: var(--font-display);
  font-size: clamp(1.02rem, 0.95rem + 0.6vw, 1.4rem);
  letter-spacing: 0.06em;
}

.logo__mark i {
  font-style: italic;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.logo__sub {
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ink-3);
}

/* Навигация */
.hd__nav {
  display: none;
  gap: clamp(1rem, 2.4vw, 2.3rem);
}

@media (min-width: 1000px) {
  .hd__nav {
    display: flex;
  }
}

.hd__link {
  position: relative;
  display: grid;
  overflow: hidden;
  height: 1.35em;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--ink-2);
  transition: color 0.4s;
}

.hd__link span {
  transition: transform 0.55s var(--ease);
}

.hd__link:hover {
  color: var(--gold);
}

.hd__link:hover span {
  transform: translateY(-100%);
}

.hd__actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.hd__phone {
  font-size: 0.9rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  transition: color 0.35s;
}

.hd__phone:hover {
  color: var(--gold);
}

@media (max-width: 560px) {
  .hd__cta {
    display: none;
  }
}

/* Бургер */
.burger {
  display: grid;
  gap: 5px;
  width: 44px;
  height: 44px;
  place-content: center;
  justify-items: end;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--surface);
}

@media (min-width: 1000px) {
  .burger {
    display: none;
  }
}

.burger i {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.45s var(--ease), opacity 0.3s, width 0.45s var(--ease);
}

.burger i:nth-child(2) {
  width: 12px;
}

.burger.is-open i:nth-child(1) {
  width: 18px;
  transform: translateY(6.5px) rotate(45deg);
}

.burger.is-open i:nth-child(2) {
  opacity: 0;
}

.burger.is-open i:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

/* Мобильное меню */
.menu {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: flex;
  align-items: flex-end;
  padding-top: clamp(64px, 8vw, 86px);
  background: rgba(6, 4, 4, 0.92);
  backdrop-filter: blur(22px);
}

.menu__in {
  display: grid;
  gap: clamp(1.5rem, 5vw, 3rem);
  padding-block: clamp(2rem, 6vw, 4rem);
  width: 100%;
}

.menu__nav {
  display: grid;
  gap: 0.1em;
}

.menu__link {
  color: var(--ink);
  transition: color 0.4s, transform 0.6s var(--ease);
  animation: menuLink 0.75s var(--ease) both;
  animation-delay: var(--d);
}

.menu__link:hover {
  color: var(--gold);
  transform: translateX(10px);
}

@keyframes menuLink {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
}

.menu__foot {
  display: grid;
  gap: 0.35rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line-soft);
  animation: menuLink 0.75s var(--ease) both;
  animation-delay: var(--d);
}

.menu__phone {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 1.1rem + 2vw, 2rem);
  font-variant-numeric: tabular-nums;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.5s var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
