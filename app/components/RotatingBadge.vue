<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
    value?: string
    caption?: string
    duration?: number
  }>(),
  {
    text: '40 ₽ за минуту · всё включено · ',
    value: '40 ₽',
    caption: 'мин',
    duration: 26,
  },
)

const uid = useId()
const pathId = `badge-path-${uid}`
</script>

<template>
  <div class="badge" :style="{ '--dur': `${props.duration}s` }" aria-hidden="true">
    <svg class="badge__ring" viewBox="0 0 120 120">
      <defs>
        <path :id="pathId" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
      </defs>
      <text>
        <textPath :href="`#${pathId}`" startOffset="0">{{ props.text.repeat(2) }}</textPath>
      </text>
    </svg>
    <span class="badge__core">
      <b>{{ props.value }}</b>
      <i>{{ props.caption }}</i>
    </span>
  </div>
</template>

<style scoped>
.badge {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(92px, 12vw, 132px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, rgba(31, 20, 14, 0.96), rgba(6, 4, 4, 0.94));
  border: 1px solid var(--line);
  box-shadow: 0 20px 60px -24px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(223, 162, 105, 0.08);
  backdrop-filter: blur(6px);
}

.badge__ring {
  position: absolute;
  inset: 0;
  animation: spin var(--dur) linear infinite;
}

.badge__ring text {
  font-family: var(--font-sans);
  font-size: 7.6px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  fill: var(--tan);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.badge__core {
  display: grid;
  justify-items: center;
  line-height: 1;
}

.badge__core b {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 0.9rem + 0.9vw, 1.5rem);
  font-weight: 400;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.badge__core i {
  font-style: normal;
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-top: 0.28em;
}
</style>
