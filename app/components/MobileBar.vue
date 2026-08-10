<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <div class="mb">
    <a :href="site.phoneHref" class="btn btn--primary mb__btn">
      <span class="btn__label">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 2.5 5.7 2 2 0 0 1 4.5 3.5Z" />
        </svg>
        Позвонить
      </span>
    </a>
    <a :href="site.maps.yandexRoute" target="_blank" rel="noopener" class="btn btn--ghost mb__btn">
      <span class="btn__label">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
        Маршрут
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
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
  padding: 0.7rem clamp(0.9rem, 4vw, 1.4rem) calc(0.7rem + env(safe-area-inset-bottom));
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
  padding-inline: 0.8rem;
  font-size: 0.88rem;
}

@media (min-width: 1000px) {
  .mb {
    display: none;
  }
}
</style>
