import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COMMUNITY_EXPERIENCES } from '@/data/experiences'
import type { Category } from '@/data/threats'
import { ExperienceCard } from '@/components/ExperienceCard'
import { ExperienceStoriesCarousel } from '@/components/ExperienceStoriesCarousel'
import { HalideSectionHeader } from '@/components/ui/halide-section'
import { TWEEN_SMOOTH } from '@/lib/motion'
import { cn } from '@/lib/utils'

type FilterKey = 'all' | Category

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: 'all', label: 'Все', count: COMMUNITY_EXPERIENCES.length },
  { key: 'cyber', label: 'Кибер', count: COMMUNITY_EXPERIENCES.filter((e) => e.category === 'cyber').length },
  { key: 'social', label: 'Социум', count: COMMUNITY_EXPERIENCES.filter((e) => e.category === 'social').length },
  { key: 'household', label: 'Быт', count: COMMUNITY_EXPERIENCES.filter((e) => e.category === 'household').length },
]

const FILTER_ACTIVE: Record<FilterKey, string> = {
  all: 'experience-filter-active-red',
  cyber: 'experience-filter-active-red',
  social: 'experience-filter-active-yellow',
  household: 'experience-filter-active-orange',
}

export function CommunityExperiences() {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [activeId, setActiveId] = useState(COMMUNITY_EXPERIENCES[0].id)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? COMMUNITY_EXPERIENCES
        : COMMUNITY_EXPERIENCES.filter((exp) => exp.category === filter),
    [filter],
  )

  const active =
    filtered.find((exp) => exp.id === activeId) ?? filtered[0] ?? COMMUNITY_EXPERIENCES[0]

  const activeGlobalIndex = COMMUNITY_EXPERIENCES.indexOf(active)

  useEffect(() => {
    if (!filtered.some((exp) => exp.id === activeId)) {
      setActiveId(filtered[0]?.id ?? COMMUNITY_EXPERIENCES[0].id)
      setDetailOpen(false)
    }
  }, [filter, filtered, activeId])

  const handleSelect = (id: string) => {
    setActiveId(id)
    setDetailOpen(false)
  }

  return (
    <section id="experiences" className="category-block category-block-experiences">
      <div className="category-block-header">
        <HalideSectionHeader
          eyebrow="[ ОПЫТ ЛЮДЕЙ ]"
          title="Как защитили себя — анонимно"
          meta={['РАЗДЕЛ: 02', 'ИСТОЧНИК: ЧИТАТЕЛИ']}
          description="Выберите историю в ленте и разверните — полное описание без имён и фотографий."
        />

        <p className="experience-principle">
          <span className="experience-principle-label">Принцип раздела</span>
          «Реальные случаи без имён — только ситуация, защита и итог»
        </p>
      </div>

      <div className="experience-block-body">
        <div className="experience-panel">
          <div className="experience-panel-top">
            <div className="experience-stats">
              <span>{COMMUNITY_EXPERIENCES.length} историй</span>
              <span className="experience-stats-dot" aria-hidden />
              <span>листайте и разворачивайте</span>
              <span className="experience-stats-dot" aria-hidden />
              <span>100% анонимно</span>
            </div>

            <div className="experience-filters" role="tablist" aria-label="Фильтр историй">
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === item.key}
                  onClick={() => setFilter(item.key)}
                  className={cn(
                    'experience-filter',
                    filter === item.key && 'experience-filter-active',
                    filter === item.key && FILTER_ACTIVE[item.key],
                  )}
                >
                  {item.label}
                  <span className="experience-filter-count">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <ExperienceStoriesCarousel
            listKey={filter}
            items={filtered.map((exp) => ({
              experience: exp,
              globalIndex: COMMUNITY_EXPERIENCES.indexOf(exp),
            }))}
            activeId={active.id}
            onSelect={handleSelect}
          />

          <div className="experience-picker-actions">
            <div className="experience-picker-copy">
              <p className="experience-picker-kicker">
                {active.categoryLabel} · АРХИВ {String(activeGlobalIndex + 1).padStart(2, '0')}
              </p>
              <p className="experience-picker-preview">{active.situation}</p>
            </div>
            <button
              type="button"
              className="experience-expand-btn"
              onClick={() => setDetailOpen(true)}
            >
              Развернуть историю ↗
            </button>
          </div>

          <AnimatePresence mode="wait">
            {detailOpen && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={TWEEN_SMOOTH}
                className="experience-detail-shell"
              >
                <ExperienceCard
                  experience={active}
                  index={activeGlobalIndex}
                  variant="expanded"
                />
                <button
                  type="button"
                  className="experience-expand-btn experience-expand-btn-ghost experience-detail-close"
                  onClick={() => setDetailOpen(false)}
                >
                  Свернуть
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="experience-footer-note">
          Все истории анонимны · без реальных имён и фотографий
        </p>
      </div>
    </section>
  )
}
