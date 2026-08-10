<script setup lang="ts">
defineProps<{
  eyebrow: string
  title?: string
  text?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <header class="sh" :class="`sh--${align || 'left'}`">
    <p class="eyebrow" data-reveal="fade">{{ eyebrow }}</p>
    <h2 v-if="title" class="display d-2 sh__title" data-words v-html="title" />
    <slot name="title" />
    <p v-if="text" class="lead sh__text" data-reveal data-reveal-delay="160">{{ text }}</p>
    <slot />
  </header>
</template>

<style scoped>
.sh {
  display: grid;
  gap: clamp(0.8rem, 1.6vw, 1.2rem);
  margin-bottom: clamp(2.2rem, 4.5vw, 4rem);
}

.sh__title {
  max-width: 22ch;
}

.sh--center {
  justify-items: center;
  text-align: center;
}

.sh--center .sh__title,
.sh--center .sh__text {
  max-width: 30ch;
}

.sh--center .sh__text {
  max-width: 56ch;
}

.sh--center .eyebrow::before {
  display: none;
}
</style>
