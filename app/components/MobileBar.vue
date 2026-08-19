<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <div class="mb">
    <a v-if="site.booking" :href="site.booking" target="_blank" rel="noopener" class="btn btn--primary mb__btn">
      <span class="btn__label">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 10h17M8 3.5v3M16 3.5v3M9 14.5l2 2 4-4" />
        </svg>
        Записаться
      </span>
    </a>

    <a :href="site.phoneHref" class="btn mb__btn" :class="site.booking ? 'btn--ghost' : 'btn--primary'">
      <span class="btn__label">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 2.5 5.7 2 2 0 0 1 4.5 3.5Z" />
        </svg>
        Позвонить
      </span>
    </a>

    <a
      :href="site.maps.yandexRoute"
      target="_blank"
      rel="noopener"
      class="btn btn--ghost mb__btn mb__btn--icon"
      aria-label="Построить маршрут до студии"
      title="Построить маршрут"
    >
      <span class="btn__label">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      </span>
    </a>
  </div>
</template>

<style scoped>
.mb {
  position: fixed;
  z-index: 90;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1.15fr 1fr auto;
  gap: 0.5rem;
  padding: 0.7rem clamp(0.8rem, 3.5vw, 1.4rem) calc(0.7rem + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(10, 7, 6, 0), rgba(10, 7, 6, 0.86) 42%, rgba(6, 4, 4, 0.97));
  backdrop-filter: blur(14px);
  transform: translateY(130%);
  transition: transform 0.7s var(--ease);
}

html.is-past-hero .mb {
  transform: none;
}

.mb__btn {
  --btn-h: 3.15rem;
  padding-inline: 0.7rem;
  font-size: 0.85rem;
}

.mb__btn--icon {
  width: 3.15rem;
  padding-inline: 0;
}

@media (max-width: 359px) {
  .mb__btn {
    font-size: 0.8rem;
  }
}

@media (min-width: 1000px) {
  .mb {
    display: none;
  }
}
</style>
