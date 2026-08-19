<script setup lang="ts">
import { site, faq, solariums } from '~/data/site'

const { asset } = useAsset()
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || ''

const title = 'Солярий в Рязани — студия загара ШОКОЛАД62, ул. Ленина, 21'
const description =
  'Студия загара ШОКОЛАД62 в центре Рязани: вертикальный солярий, мощный турбосолярий с коллагеновыми лампами и горизонтальный. 40 ₽ за минуту, крем и все расходники включены. Онлайн-запись или без записи. Ул. Ленина, 21, ТЦ «АТРОН СИТИ», 6 этаж.'

useSeoMeta({
  title,
  description,
  ogTitle: 'ШОКОЛАД62 — студия загара в центре Рязани',
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'ru_RU',
  ogSiteName: 'ШОКОЛАД62',
  ogImage: siteUrl ? `${siteUrl}/og.jpg` : asset('/og.jpg'),
  twitterCard: 'summary_large_image',
  keywords:
    'солярий Рязань, студия загара Рязань, турбосолярий Рязань, горизонтальный солярий Рязань, вертикальный солярий Рязань, солярий в центре Рязани, солярий Ленина 21, солярий АТРОН СИТИ',
})

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: asset('/favicon-32.png') },
    { rel: 'apple-touch-icon', sizes: '180x180', href: asset('/apple-touch-icon.png') },
    ...(siteUrl ? [{ rel: 'canonical' as const, href: `${siteUrl}/` }] : []),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['BeautySalon', 'LocalBusiness'],
            '@id': siteUrl ? `${siteUrl}/#business` : '#business',
            name: 'ШОКОЛАД62 — студия загара',
            description,
            image: siteUrl ? `${siteUrl}/og.jpg` : undefined,
            url: siteUrl || undefined,
            telephone: '+7 953 736-36-38',
            priceRange: '₽',
            currenciesAccepted: 'RUB',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'улица Ленина, 21, ТЦ «АТРОН СИТИ», 6 этаж',
              addressLocality: 'Рязань',
              addressRegion: 'Рязанская область',
              addressCountry: 'RU',
            },
            areaServed: { '@type': 'City', name: 'Рязань' },
            sameAs: site.booking ? [site.booking] : undefined,
            potentialAction: site.booking
              ? {
                  '@type': 'ReserveAction',
                  name: 'Записаться в солярий онлайн',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: site.booking,
                    inLanguage: 'ru-RU',
                    actionPlatform: [
                      'http://schema.org/DesktopWebPlatform',
                      'http://schema.org/MobileWebPlatform',
                    ],
                  },
                  result: { '@type': 'Reservation', name: 'Сеанс в солярии' },
                }
              : undefined,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '11:00',
                closes: '20:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday'],
                opens: '12:00',
                closes: '18:00',
              },
            ],
            makesOffer: solariums.map((s) => ({
              '@type': 'Offer',
              name: `${s.name} солярий`,
              description: s.lead,
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: site.pricePerMinute,
                priceCurrency: 'RUB',
                unitText: 'минута',
              },
            })),
          },
          {
            '@type': 'FAQPage',
            mainEntity: faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ],
      }),
    },
  ],
})

const marquee = [
  'солярий в центре Рязани',
  '40 ₽ за минуту',
  '3 аппарата',
  'онлайн-запись',
  'турбо с коллагеновыми лампами',
  'всё включено',
]

const marquee2 = [
  'ул. Ленина, 21',
  'ТЦ «АТРОН СИТИ», 6 этаж',
  'вертикальный · турбо · горизонтальный',
  'крем, очки, стикини — в цене',
  'поможем новичкам',
  'можно без записи',
]
</script>

<template>
  <div>
    <HeroSection />
    <MarqueeLine :items="marquee" :duration="46" />
    <SolariumsSection />
    <PriceSection />
    <AdvantagesSection />
    <StudioGallery />
    <MarqueeLine :items="marquee2" :duration="54" reverse />
    <StepsSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>
