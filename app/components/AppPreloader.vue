<template>
  <div class="pre" aria-hidden="true">
    <div class="pre__inner">
      <span class="pre__mark">ШОКОЛАД62</span>
      <span class="pre__sub">студия загара · рязань</span>
      <span class="pre__line"><i /></span>
    </div>
    <div class="pre__lamps">
      <i v-for="n in 9" :key="n" :style="{ left: `${n * 11 - 5}%`, animationDelay: `${n * 60}ms` }" />
    </div>
  </div>
</template>

<style scoped>
/* Прелоадер целиком на CSS: исчезает даже если JS не загрузился */
.pre {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--black);
  animation: preOut 1s var(--ease) 1.25s forwards;
}

@keyframes preOut {
  to {
    clip-path: inset(0 0 100% 0);
    visibility: hidden;
  }
}

.pre__inner {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 0.85rem;
  text-align: center;
  animation: preIn 0.7s var(--ease) both;
}

@keyframes preIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

.pre__mark {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 1.1rem + 3vw, 3.2rem);
  letter-spacing: 0.04em;
  background: var(--grad-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.pre__sub {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.pre__line {
  display: block;
  width: min(46vw, 260px);
  height: 1px;
  margin-top: 0.4rem;
  background: var(--ink-4);
  overflow: hidden;
}

.pre__line i {
  display: block;
  height: 100%;
  width: 100%;
  background: var(--grad-gold);
  transform-origin: left;
  animation: preFill 1.3s var(--ease-io) both;
}

@keyframes preFill {
  from {
    transform: scaleX(0);
  }
}

.pre__lamps i {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, transparent, var(--tan), transparent);
  opacity: 0;
  animation: preLamp 1.6s var(--ease) both;
}

@keyframes preLamp {
  30% {
    opacity: 0.35;
  }
  100% {
    opacity: 0.05;
  }
}
</style>
