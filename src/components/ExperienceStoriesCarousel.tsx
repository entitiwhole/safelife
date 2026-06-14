import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CommunityExperience } from '@/data/experiences'
import { ExperienceCard } from '@/components/ExperienceCard'
import { cn } from '@/lib/utils'

interface CarouselItem {
  experience: CommunityExperience
  globalIndex: number
}

interface ExperienceStoriesCarouselProps {
  items: CarouselItem[]
  activeId: string
  listKey: string
  onSelect: (id: string) => void
}

export function ExperienceStoriesCarousel({
  items,
  activeId,
  listKey,
  onSelect,
}: ExperienceStoriesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.experience.id === activeId),
  )

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  const scrollToIndex = useCallback(
    (index: number, notify = true) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1))
      const slide = slideRefs.current[clamped]
      if (!slide) return

      slide.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })

      if (notify) {
        onSelect(items[clamped].experience.id)
      }
    },
    [items, onSelect],
  )

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || items.length === 0) return

    const center = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let nearestDist = Infinity

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const dist = Math.abs(center - slideCenter)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = index
      }
    })

    const id = items[nearest]?.experience.id
    if (id && id !== activeId) {
      onSelect(id)
    }
  }, [activeId, items, onSelect])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        syncActiveFromScroll()
        updateScrollState()
      })
    }

    updateScrollState()
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items.length, syncActiveFromScroll, updateScrollState])

  useEffect(() => {
    const index = items.findIndex((item) => item.experience.id === activeId)
    if (index < 0) return

    requestAnimationFrame(() => {
      slideRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    })
  }, [activeId, listKey, items])

  return (
    <div className="experience-carousel-shell">
      <div className="experience-carousel-toolbar">
        <p className="experience-carousel-label">Выберите историю</p>
        <div className="experience-carousel-controls">
          <span className="experience-carousel-counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <div className="experience-carousel-nav">
            <button
              type="button"
              className="experience-carousel-nav-btn"
              aria-label="Предыдущая история"
              disabled={!canScrollLeft && activeIndex === 0}
              onClick={() => scrollToIndex(activeIndex - 1)}
            >
              <ChevronLeft size={16} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              className="experience-carousel-nav-btn"
              aria-label="Следующая история"
              disabled={!canScrollRight && activeIndex === items.length - 1}
              onClick={() => scrollToIndex(activeIndex + 1)}
            >
              <ChevronRight size={16} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>

      <div className="experience-carousel-viewport">
        <div
          ref={trackRef}
          className="experience-carousel-track hide-scrollbar"
          role="listbox"
          aria-label="Истории читателей"
        >
          {items.map(({ experience, globalIndex }, index) => (
              <div
                key={experience.id}
                ref={(el) => {
                  slideRefs.current[index] = el
                }}
                role="option"
                aria-selected={experience.id === activeId}
                className={cn(
                  'experience-carousel-slide',
                  experience.id === activeId && 'experience-carousel-slide-active',
                )}
              >
                <ExperienceCard
                  experience={experience}
                  index={globalIndex}
                  variant="teaser"
                  active={experience.id === activeId}
                  onSelect={() => scrollToIndex(index)}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="experience-carousel-dots" role="tablist" aria-label="Номер истории">
        {items.map(({ experience }, index) => (
          <button
            key={experience.id}
            type="button"
            role="tab"
            aria-selected={experience.id === activeId}
            aria-label={`История ${index + 1}`}
            className={cn(
              'experience-carousel-dot',
              experience.id === activeId && 'experience-carousel-dot-active',
            )}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
