<template>
  <div id="top" class="shell">
    <AppPreloader />
    <ScrollLine />
    <CursorGlow />
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
    <MobileBar />
  </div>
</template>

<style>
.shell {
  position: relative;
  isolation: isolate;
}

main {
  position: relative;
  z-index: 2;
}

section[id] {
  scroll-margin-top: clamp(72px, 9vw, 100px);
}
</style>
