import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface ScrollingStorySlide {
  title: string
  description: string
  image: string
  href?: string
  badge?: string
}

interface ScrollingFeatureShowcaseProps {
  slides: ScrollingStorySlide[]
  ctaLabel?: string
  className?: string
  accent?: 'red' | 'yellow' | 'orange'
}

const DOT_ACTIVE: Record<NonNullable<ScrollingFeatureShowcaseProps['accent']>, string> = {
  red: 'w-12 bg-red-500',
  yellow: 'w-12 bg-yellow-400',
  orange: 'w-12 bg-orange-400',
}

const LEFT_GLOW: Record<NonNullable<ScrollingFeatureShowcaseProps['accent']>, string> = {
  red: 'scrolling-story-glow-red',
  yellow: 'scrolling-story-glow-yellow',
  orange: 'scrolling-story-glow-orange',
}

const gridPatternStyle = {
  '--grid-color': 'rgba(224, 224, 224, 0.09)',
  backgroundImage: `
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
  `,
  backgroundSize: '3.5rem 3.5rem',
} as CSSProperties

export function ScrollingFeatureShowcase({
  slides,
  ctaLabel = 'Узнать больше',
  className,
  accent = 'red',
}: ScrollingFeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || slides.length === 0) return

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - container.clientHeight
      const stepHeight = scrollableHeight / slides.length
      const newActiveIndex = Math.min(
        slides.length - 1,
        Math.floor(container.scrollTop / stepHeight),
      )
      setActiveIndex(newActiveIndex)
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [slides.length])

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollableHeight = container.scrollHeight - container.clientHeight
    const stepHeight = scrollableHeight / slides.length
    container.scrollTo({ top: stepHeight * index, behavior: 'smooth' })
  }

  if (slides.length === 0) return null

  const active = slides[activeIndex]

  return (
    <div
      ref={scrollContainerRef}
      data-lenis-prevent
      className={cn(
        'scrolling-story-scroll h-svh w-full overflow-y-auto bg-[#0a0a0a] text-[#e0e0e0]',
        className,
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="relative" style={{ height: `${slides.length * 100}svh` }}>
        <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#0a0a0a]">
          <div className="grid h-full min-h-0 w-full grid-cols-1 md:grid-cols-2">
            {/* Левая половина */}
            <div
              className={cn(
                'relative flex min-h-0 flex-col justify-center overflow-hidden border-b border-white/10 px-6 py-6 sm:px-8 md:border-b-0 md:border-r md:px-10 md:py-8 lg:px-12',
                LEFT_GLOW[accent],
              )}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="absolute left-6 top-6 flex gap-2 sm:left-8 md:left-10 lg:left-12">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollToSlide(index)}
                    className={cn(
                      'h-1 rounded-full transition-all duration-500 ease-in-out',
                      index === activeIndex ? DOT_ACTIVE[accent] : 'w-6 bg-white/20',
                    )}
                    aria-label={`Слайд ${index + 1}`}
                  />
                ))}
              </div>

              <div className="relative w-full min-w-0">
                <div className="scrolling-story-text-box relative w-full">
                  {slides.map((slide, index) => (
                    <div
                      key={`${slide.title}-${index}`}
                      className={cn(
                        'absolute inset-0 transition-all duration-700 ease-in-out',
                        index === activeIndex
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0',
                      )}
                    >
                      {slide.badge && (
                        <span className="mb-2 inline-block border border-white/20 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-white/70">
                          {slide.badge}
                        </span>
                      )}
                      <h2 className="scrolling-story-card-title font-head font-bold uppercase tracking-tight">
                        {slide.title}
                      </h2>
                      <p className="scrolling-story-card-desc mt-3 font-body text-white/80 sm:mt-4">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {active.href && (
                <div className="absolute bottom-6 left-6 sm:bottom-7 sm:left-8 md:bottom-8 md:left-10 lg:bottom-10 lg:left-12">
                  <a
                    href={active.href}
                    className="inline-flex rounded-full bg-[#e0e0e0] px-6 py-2.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-yellow-400 sm:px-7 sm:py-3"
                  >
                    {ctaLabel} ↗
                  </a>
                </div>
              )}
            </div>

            {/* Правая половина — сетка на всю колонку, фото крупное */}
            <div
              className="relative hidden min-h-0 md:flex md:items-center md:justify-center md:p-5 lg:p-6"
              style={gridPatternStyle}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/20" />

              <div className="scrolling-story-image-frame relative z-[1] w-full overflow-hidden rounded-xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div
                  className="absolute left-0 top-0 h-full w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={`${slide.image}-${index}`} className="h-full w-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        loading={index <= 1 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Мобильное изображение */}
            <div className="h-44 w-full overflow-hidden border-t border-white/10 sm:h-48 md:hidden">
              <img
                src={active.image}
                alt={active.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
