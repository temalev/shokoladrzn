<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: readonly string[]
    duration?: number
    reverse?: boolean
  }>(),
  { duration: 42, reverse: false },
)
</script>

<template>
  <div class="marquee mq" :class="{ 'marquee--rev': props.reverse }" :style="{ '--dur': `${props.duration}s` }" aria-hidden="true">
    <div v-for="copy in 2" :key="copy" class="marquee__track">
      <template v-for="(item, i) in props.items" :key="`${copy}-${i}`">
        <span class="mq__item">{{ item }}</span>
        <span class="mq__dot" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.mq {
  padding-block: clamp(0.9rem, 1.6vw, 1.4rem);
  border-block: 1px solid var(--line-soft);
  background: linear-gradient(90deg, rgba(31, 20, 14, 0.4), rgba(10, 7, 6, 0.1));
}

.mq__item {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 0.9rem + 1.4vw, 2rem);
  letter-spacing: -0.01em;
  color: var(--ink-2);
  white-space: nowrap;
  transition: color 0.5s;
}

.mq__item:nth-child(4n + 1) {
  font-style: italic;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.mq__dot {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--bronze);
}
</style>
