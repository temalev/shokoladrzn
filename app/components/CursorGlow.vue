<script setup lang="ts">
const dot = ref<HTMLElement | null>(null)
let raf = 0
const pos = { x: -400, y: -400, tx: -400, ty: -400 }

function onMove(e: PointerEvent) {
  pos.tx = e.clientX
  pos.ty = e.clientY
}

function loop() {
  pos.x += (pos.tx - pos.x) * 0.085
  pos.y += (pos.ty - pos.y) * 0.085
  if (dot.value) dot.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduced) return
  window.addEventListener('pointermove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <ClientOnly>
    <div ref="dot" class="cursor-glow" aria-hidden="true" />
  </ClientOnly>
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 34rem;
  height: 34rem;
  pointer-events: none;
  border-radius: 50%;
  opacity: 0.42;
  mix-blend-mode: screen;
  background: radial-gradient(circle, rgba(223, 162, 105, 0.3) 0%, rgba(184, 116, 69, 0.12) 38%, transparent 68%);
  will-change: transform;
}

@media (hover: none), (pointer: coarse) {
  .cursor-glow {
    display: none;
  }
}
</style>
