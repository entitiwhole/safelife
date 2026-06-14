import { cn } from '@/lib/utils'
import { scrollToSection } from '@/lib/scroll'
import { useEffect, useRef, useState } from 'react'
import type { Category } from '@/data/threats'
import { HERO_SLIDES } from '@/data/hero-slides'
import { CautionTapeChaos } from '@/components/CautionTape'

export interface HalideSlide {
  id: string
  layers: [string, string, string]
  archive: string
  subtitle: string
  meta: [string, string]
  /** Тихое фоновое видео — только если задано, без звука */
  video?: string
}

interface HalideTopoHeroProps {
  slides?: HalideSlide[]
  interval?: number
  categories: { id: Category; label: string }[]
  mobileOpen: boolean
  onToggleMobile: () => void
  onCloseMobile: () => void
  onScrollToThreats: () => void
  className?: string
}

export function HalideTopoHero({
  slides = HERO_SLIDES,
  interval = 11000,
  categories,
  mobileOpen,
  onToggleMobile,
  onCloseMobile,
  onScrollToThreats,
  className,
}: HalideTopoHeroProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  const current = slides[active]

  useEffect(() => {
    slides.forEach((slide) => {
      slide.layers.forEach((url) => {
        const img = new Image()
        img.src = url
      })
      if (slide.video) {
        const vid = document.createElement('video')
        vid.preload = 'auto'
        vid.src = slide.video
      }
    })
  }, [slides])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const handleMouseMove = (e: MouseEvent) => {
      target.x = (window.innerWidth / 2 - e.pageX) / 25
      target.y = (window.innerHeight / 2 - e.pageY) / 25
    }

    const animate = () => {
      current.x += (target.x - current.x) * 0.075
      current.y += (target.y - current.y) * 0.075

      canvas.style.transform = `rotateX(${55 + current.y / 2}deg) rotateZ(${-25 + current.x / 2}deg)`

      layersRef.current.forEach((layer, index) => {
        if (!layer) return
        const depth = (index + 1) * 15
        const moveX = current.x * (index + 1) * 0.2
        const moveY = current.y * (index + 1) * 0.2
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`
      })

      frame = requestAnimationFrame(animate)
    }

    canvas.style.opacity = '0'
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)'

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.8s cubic-bezier(0.16, 1, 0.3, 1)'
      canvas.style.opacity = '1'
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)'
    }, 300)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      frame = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, slides.length])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const activeSet = canvas.querySelector('.halide-slide-set-active')
    if (!activeSet) return
    layersRef.current = Array.from(activeSet.querySelectorAll<HTMLDivElement>('.layer'))
  }, [active])

  return (
    <section className={cn('halide-body', className)}>
      <svg className="halide-svg-filters" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="halide-grain" style={{ filter: 'url(#grain)' }} />

      <div className="halide-tape-layer">
        <CautionTapeChaos />
      </div>

      <div className="interface-grid">
        <div className="halide-brand">
          <a href={import.meta.env.BASE_URL} className="halide-brand-link">
            ЗАЩИТА<span className="halide-brand-accent">ЖИЗНИ</span>
          </a>
        </div>

        <div className="halide-meta">
          <div>{current.meta[0]}</div>
          <div>{current.meta[1]}</div>
        </div>

        <nav className="halide-nav hidden md:flex">
          <a href="#how-it-works" onClick={scrollToSection('how-it-works')}>Как пользоваться</a>
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} onClick={scrollToSection(c.id)}>
              {c.label}
            </a>
          ))}
          <a href="#experiences" onClick={scrollToSection('experiences')}>Опыт людей</a>
          <a href="tel:112" className="halide-nav-emergency">
            112
          </a>
        </nav>

        <button
          type="button"
          className={cn('menu-burger halide-menu-btn', mobileOpen && 'menu-burger-open')}
          onClick={onToggleMobile}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {mobileOpen && (
          <div className="halide-mobile-menu md:hidden">
            <a href="#how-it-works" onClick={(e) => { scrollToSection('how-it-works')(e); onCloseMobile?.() }}>
              Как пользоваться
            </a>
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} onClick={(e) => { scrollToSection(c.id)(e); onCloseMobile?.() }}>
                {c.label}
              </a>
            ))}
            <a href="#experiences" onClick={(e) => { scrollToSection('experiences')(e); onCloseMobile?.() }}>
              Опыт людей
            </a>
            <a href="tel:112" className="halide-mobile-emergency">
              Позвонить 112
            </a>
          </div>
        )}

        <h1 className="hero-title">
          МЕТОДИКИ
          <br />
          ЗАЩИТЫ
          <br />
          ЖИЗНИ
        </h1>

        <div className="halide-footer-row">
          <div className="halide-archive">
            <p key={`${current.id}-archive`} className="halide-fade-text">
              {current.archive}
            </p>
            <p key={`${current.id}-subtitle`} className="halide-fade-text halide-subtitle">
              {current.subtitle}
            </p>
          </div>

          <div className="halide-cta-group">
            <button type="button" className="cta-button" onClick={onScrollToThreats}>
              СМОТРЕТЬ УГРОЗЫ
            </button>
            <a href="#experiences" className="cta-button cta-button-ghost" onClick={scrollToSection('experiences')}>
              ОПЫТ ЛЮДЕЙ
            </a>
          </div>
        </div>
      </div>

      <div className="viewport">
        <div className="canvas-3d" ref={canvasRef}>
          {slides.map(
            (slide, slideIdx) =>
              slide.video && (
                <video
                  key={slide.video}
                  className={cn(
                    'halide-video-bg',
                    slideIdx === active ? 'halide-video-bg-visible' : 'halide-video-bg-hidden',
                  )}
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden
                />
              ),
          )}
          {slides.map((slide, slideIdx) => (
            <div
              key={slide.id}
              className={cn(
                'halide-slide-set',
                slideIdx === active ? 'halide-slide-set-active' : 'halide-slide-set-hidden'
              )}
              aria-hidden={slideIdx !== active}
            >
              <div
                className="layer layer-1"
                style={{ backgroundImage: `url('${slide.layers[0]}')` }}
              />
              <div
                className="layer layer-2"
                style={{ backgroundImage: `url('${slide.layers[1]}')` }}
              />
              <div
                className="layer layer-3"
                style={{ backgroundImage: `url('${slide.layers[2]}')` }}
              />
            </div>
          ))}
          <div className="contours" />
        </div>
      </div>

      <div className="scroll-hint" />
    </section>
  )
}

/** @deprecated Use HalideTopoHero */
export const Component = HalideTopoHero
