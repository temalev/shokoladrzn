<script setup lang="ts">
import { site } from '~/data/site'

/**
 * Яндекс.Метрика — инлайном в <head>, как в официальном сниппете:
 * счётчик стартует при разборе страницы, не дожидаясь загрузки JS-бандла.
 * Цели по клику навешивает `app/plugins/metrika.client.ts`.
 */
const ym = site.metrikaId
if (ym) {
  const tag = `https://mc.yandex.ru/metrika/tag.js?id=${ym}`
  useHead({
    script: [
      {
        key: 'yandex-metrika',
        tagPosition: 'head',
        innerHTML:
          `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};` +
          `m[i].l=1*new Date();for(var j=0;j!==e.scripts.length;j++){if(e.scripts[j].src===r){return}}` +
          `k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})` +
          `(window,document,"script","${tag}","ym");` +
          `window.dataLayer=window.dataLayer||[];` +
          `ym(${ym},"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",` +
          `referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
      },
    ],
    noscript: [
      {
        tagPosition: 'bodyClose',
        innerHTML: `<div><img src="https://mc.yandex.ru/watch/${ym}" style="position:absolute;left:-9999px" alt="" /></div>`,
      },
    ],
  })
}
</script>

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
