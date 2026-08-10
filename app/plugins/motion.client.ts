/**
 * Единый движок анимаций лендинга.
 *
 *  data-reveal[="mask|blur|left|right|scale|fade"]  — появление при скролле
 *  data-reveal-delay="120"                          — задержка, мс
 *  data-words                                       — пословное появление заголовка
 *  data-parallax="0.1"                              — плавный параллакс по скроллу
 *  data-count="40" data-count-suffix=" ₽"           — анимированный счётчик
 *
 * Всё отключается при prefers-reduced-motion.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const parallaxItems: { el: HTMLElement; speed: number; current: number }[] = []
  let io: IntersectionObserver | null = null
  let rafId = 0
  let ticking = false

  /* ---------------- пословное разбиение заголовков ---------------- */
  function splitWords(el: HTMLElement) {
    if (el.dataset.split === '1') return
    el.dataset.split = '1'

    const walk = (node: Node): Node[] => {
      const out: Node[] = []
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent || ''
          if (!text.trim()) {
            out.push(child.cloneNode())
            return
          }
          const frag = document.createDocumentFragment()
          text.split(/(\s+)/).forEach((chunk) => {
            if (!chunk) return
            if (/^\s+$/.test(chunk)) {
              frag.appendChild(document.createTextNode(' '))
              return
            }
            const w = document.createElement('span')
            w.className = 'w'
            const inner = document.createElement('span')
            inner.textContent = chunk
            w.appendChild(inner)
            frag.appendChild(w)
          })
          out.push(frag)
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const src = child as HTMLElement
          const clone = src.cloneNode(false) as HTMLElement
          walk(src).forEach((n) => clone.appendChild(n))
          out.push(clone)
        }
      })
      return out
    }

    const parts = walk(el)
    el.textContent = ''
    parts.forEach((n) => el.appendChild(n))
    el.classList.add('words')
    el.querySelectorAll<HTMLElement>('.w > span').forEach((s, i) => {
      s.style.setProperty('--i', String(i))
    })
  }

  /* ---------------- счётчики ---------------- */
  function runCounter(el: HTMLElement) {
    if (el.dataset.counted === '1') return
    el.dataset.counted = '1'

    const target = Number(el.dataset.count || '0')
    const suffix = el.dataset.countSuffix || ''
    if (reduced() || target === 0) {
      el.textContent = `${target}${suffix}`
      return
    }

    const dur = 1500
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 4)
      el.textContent = `${Math.round(target * eased)}${suffix}`
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  /* ---------------- наблюдатель появления ---------------- */
  function reveal(el: HTMLElement) {
    const delay = el.dataset.revealDelay
    if (delay) el.style.setProperty('--rd', `${delay}ms`)
    el.classList.add('in')
    el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter)
    if (el.hasAttribute('data-count')) runCounter(el)
  }

  function scan() {
    if (!io) return

    document.querySelectorAll<HTMLElement>('[data-words]').forEach(splitWords)

    document
      .querySelectorAll<HTMLElement>('[data-reveal]:not([data-observed]), [data-words]:not([data-observed]), [data-count]:not([data-observed])')
      .forEach((el) => {
        el.dataset.observed = '1'
        if (reduced()) {
          reveal(el)
          return
        }
        io!.observe(el)
      })

    document.querySelectorAll<HTMLElement>('[data-parallax]:not([data-px])').forEach((el) => {
      el.dataset.px = '1'
      if (reduced()) return
      parallaxItems.push({ el, speed: Number(el.dataset.parallax || '0.08'), current: 0 })
    })

    if (parallaxItems.length && !rafId) loop()
  }

  /* ---------------- параллакс ---------------- */
  function loop() {
    const vh = window.innerHeight
    for (const item of parallaxItems) {
      const rect = item.el.getBoundingClientRect()
      if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) continue
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      const target = -progress * item.speed * 100
      item.current += (target - item.current) * 0.09
      item.el.style.transform = `translate3d(0, ${item.current.toFixed(2)}px, 0)`
    }
    rafId = requestAnimationFrame(loop)
  }

  /* ---------------- прогресс скролла + состояние страницы ---------------- */
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      doc.style.setProperty('--scroll-progress', String(p))
      doc.classList.toggle('is-scrolled', window.scrollY > 40)
      doc.classList.toggle('is-past-hero', window.scrollY > window.innerHeight * 0.75)
      ticking = false
    })
  }

  nuxtApp.hook('app:mounted', () => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          reveal(entry.target as HTMLElement)
          io!.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    scan()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  nuxtApp.hook('page:finish', () => {
    nextTick(() => scan())
  })
})
