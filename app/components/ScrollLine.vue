<template>
  <div class="sl" aria-hidden="true"><i /></div>
</template>

<style scoped>
.sl {
  position: fixed;
  inset: 0 0 auto;
  z-index: 101;
  height: 2px;
  pointer-events: none;
}

.sl i {
  display: block;
  height: 100%;
  background: var(--grad-warm);
  transform-origin: left;
  transform: scaleX(var(--scroll-progress, 0));
  box-shadow: 0 0 14px rgba(242, 205, 151, 0.5);
}
</style>
