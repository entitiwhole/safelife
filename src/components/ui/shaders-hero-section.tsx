import type { ReactNode } from 'react'
import type { Category } from '@/data/threats'

interface ShaderBackgroundProps {
  children: ReactNode
  className?: string
}

/** @deprecated Hero uses Halide layout; kept for compatibility */
export function ShaderBackground({ children, className }: ShaderBackgroundProps) {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#050505] ${className ?? ''}`}>
      {children}
    </div>
  )
}

interface SiteHeaderProps {
  categories: { id: Category; label: string }[]
  mobileOpen: boolean
  onToggleMobile: () => void
  onCloseMobile: () => void
}

export function SiteHeader({ categories, mobileOpen, onToggleMobile, onCloseMobile }: SiteHeaderProps) {
  return (
    <header className="relative z-40 flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 md:py-6">
      <a href={import.meta.env.BASE_URL} className="group flex items-center gap-3 no-underline">
        <span className="h-8 w-0.5 shrink-0 bg-gradient-to-b from-red-500 to-yellow-400 transition-all group-hover:h-10" />
        <span className="font-head text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base">
          Защита<span className="text-yellow-400">Жизни</span>
        </span>
      </a>

      <nav className="hidden items-center gap-1 md:flex">
        <a
          href="#how-it-works"
          className="rounded-full px-3 py-2 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          Как пользоваться
        </a>
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full px-3 py-2 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            {c.label}
          </a>
        ))}
        <a
          href="#experiences"
          className="rounded-full px-3 py-2 text-sm font-medium text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          Опыт людей
        </a>
      </nav>

      <a
        href="tel:112"
        className="hidden rounded-sm bg-yellow-400 px-5 py-2 font-head text-xs font-bold tracking-wider text-black transition-all duration-200 hover:bg-yellow-300 md:flex"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%)' }}
      >
        112
      </a>

      <button
        type="button"
        className={`menu-burger ${mobileOpen ? 'menu-burger-open' : ''}`}
        onClick={onToggleMobile}
        aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={mobileOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {mobileOpen && (
        <div className="absolute left-4 right-4 top-full mt-2 rounded-sm border border-white/10 bg-black/95 p-3 backdrop-blur-xl md:hidden">
          <a
            href="#how-it-works"
            onClick={onCloseMobile}
            className="block border-b border-white/5 px-3 py-3 text-base text-white hover:bg-white/5"
          >
            Как пользоваться
          </a>
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={onCloseMobile}
              className="block border-b border-white/5 px-3 py-3 text-base text-white hover:bg-white/5"
            >
              {c.label}
            </a>
          ))}
          <a
            href="#experiences"
            onClick={onCloseMobile}
            className="block border-b border-white/5 px-3 py-3 text-base text-white hover:bg-white/5"
          >
            Опыт людей
          </a>
          <a
            href="tel:112"
            className="mt-2 block bg-yellow-400 px-3 py-3 text-center font-head text-base font-bold tracking-wide text-black"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)' }}
          >
            Позвонить 112
          </a>
        </div>
      )}
    </header>
  )
}

interface HeroContentProps {
  onScrollToThreats: () => void
}

export function HeroContent({ onScrollToThreats }: HeroContentProps) {
  return (
    <div className="relative z-30 w-full text-left lg:w-[52%] lg:max-w-2xl">
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 sm:text-xs">
        Справочник · 18 угроз · 3 категории
      </p>

      <h1 className="font-head mb-5 text-4xl font-bold leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
        Методики
        <br />
        <span className="text-white/90">защиты</span>
        <br />
        <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          жизни
        </span>
      </h1>

      <ul className="list-visible list-visible-hero mb-8 w-full max-w-xl">
        <li>Большинство опасных ситуаций — из-за незнания, спешки и слепого доверия</li>
        <li>Нажмите карточку — откроется пошаговый алгоритм</li>
        <li>Страница угрозы откроется в новой вкладке</li>
      </ul>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={onScrollToThreats}
          className="w-full cursor-pointer bg-yellow-400 px-8 py-3.5 font-head text-base font-bold tracking-wide text-black transition-all duration-200 hover:bg-yellow-300 sm:w-auto"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 90% 100%, 0 100%)' }}
        >
          Смотреть угрозы
        </button>
        <a
          href="#experiences"
          className="w-full border border-white/25 bg-transparent px-8 py-3.5 text-center font-head text-base font-medium tracking-wide text-white transition-all duration-200 hover:border-white/45 hover:bg-white/5 sm:w-auto"
        >
          Опыт людей
        </a>
      </div>
    </div>
  )
}
