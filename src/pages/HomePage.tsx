import { useState } from 'react'
import { THREATS, type Category } from '@/data/threats'
import { HeroIntro } from '@/components/HeroIntro'
import { HowItWorksZoom } from '@/components/HowItWorksZoom'
import { CommunityExperiences } from '@/components/CommunityExperiences'
import { CategorySection, type CategoryMeta } from '@/components/CategorySection'
import {
  HalideSectionHeader,
  HalidePanel,
  HalideLabel,
} from '@/components/ui/halide-section'

const CATEGORY_META: Record<Category, CategoryMeta> = {
  cyber: {
    title: 'Киберугрозы',
    sub: 'Цифровые атаки, мошенничество в сети, кража данных',
    num: '01',
    warning: 'Почему это происходит',
    quote: '«Каждый день миллионы людей теряют деньги и данные — не потому что хакеры гении, а потому что мы кликаем не глядя»',
    accentColor: 'text-red-400',
  },
  social: {
    title: 'Социальные угрозы',
    sub: 'Манипуляции, насилие, уличное и бытовое мошенничество',
    num: '02',
    warning: 'Корень проблемы',
    quote: '«Злоумышленник не всегда выглядит как враг — чаще он выглядит как помощник, друг или авторитет»',
    accentColor: 'text-yellow-400',
  },
  household: {
    title: 'Бытовые угрозы',
    sub: 'Пожар, газ, кражи, отравления и бытовые несчастные случаи',
    num: '03',
    warning: 'Статистика тревоги',
    quote: '«80% бытовых трагедий можно предотвратить — если знать признаки опасности и действовать без паники»',
    accentColor: 'text-orange-400',
  },
}

const EMERGENCY = [
  { num: '112', label: 'Единый' },
  { num: '102', label: 'Полиция' },
  { num: '103', label: 'Скорая' },
  { num: '104', label: 'Газ' },
]

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-body text-[#e0e0e0]">
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-yellow-400 focus:px-4 focus:py-2 focus:font-bold focus:text-black"
      >
        Перейти к содержимому
      </a>

      <main id="main">
        <HeroIntro
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((v) => !v)}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <HowItWorksZoom />

        {(Object.entries(THREATS) as [Category, typeof THREATS.cyber][]).map(([category, threats], index) => (
          <CategorySection
            key={category}
            category={category}
            meta={CATEGORY_META[category]}
            threats={threats}
            isFirst={index === 0}
          />
        ))}

        <CommunityExperiences />

        <section id="sos" className="category-block category-block-sos">
          <div className="category-block-header">
            <HalideSectionHeader
              eyebrow="[ ЭКСТРЕННО ]"
              title="Нужна помощь?"
              meta={['РАЗДЕЛ: SOS', 'ПРИОРИТЕТ: MAX']}
              description={
                <ul className="list-visible list-visible-red">
                  <li>При угрозе жизни — звоните 112 немедленно</li>
                  <li>Не откладывайте вызов — каждая секунда важна</li>
                </ul>
              }
            />

            <div className="category-block-quote flex flex-wrap items-end gap-3">
              <span className="halide-category-num category-block-num text-red-400">SOS</span>
              <HalidePanel className="max-w-2xl flex-1">
                <HalideLabel accent="red">Звоните немедленно</HalideLabel>
                <p className="font-body text-sm leading-relaxed text-white/80 italic sm:text-[0.9rem]">
                  112 — единый номер при любой угрозе жизни. Нажмите на номер — звонок начнётся с телефона.
                </p>
              </HalidePanel>
            </div>
          </div>

          <div className="sos-block-body">
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {EMERGENCY.map((e) => (
                <a key={e.num} href={`tel:${e.num}`} className="halide-emergency-card">
                  <span className="halide-emergency-num">{e.num}</span>
                  <span className="halide-emergency-label">{e.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="halide-footer">
        <p>© 2026 Методики защиты жизни</p>
        <p className="mt-2">
          При угрозе жизни — звоните <strong>112</strong>
        </p>
      </footer>
    </div>
  )
}
