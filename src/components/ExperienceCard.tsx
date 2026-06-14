import type { CommunityExperience } from '@/data/experiences'
import type { Category } from '@/data/threats'
import { cn } from '@/lib/utils'

const CATEGORY_CLASS: Record<Category, string> = {
  cyber: 'experience-dossier-cyber',
  social: 'experience-dossier-social',
  household: 'experience-dossier-household',
}

const STEPS = [
  { key: 'situation', label: 'Ситуация', field: 'situation' as const, tone: 'red' },
  { key: 'protection', label: 'Защита', field: 'protection' as const, tone: 'yellow' },
  { key: 'outcome', label: 'Следствие', field: 'outcome' as const, tone: 'green' },
] as const

interface ExperienceCardProps {
  experience: CommunityExperience
  index: number
  variant?: 'teaser' | 'expanded'
  active?: boolean
  onSelect?: () => void
}

export function ExperienceCard({
  experience,
  index,
  variant = 'teaser',
  active = false,
  onSelect,
}: ExperienceCardProps) {
  if (variant === 'teaser') {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'experience-teaser',
          CATEGORY_CLASS[experience.category],
          active && 'experience-teaser-active',
        )}
      >
        <div className="experience-teaser-head">
          <span>АРХИВ · {String(index + 1).padStart(2, '0')}</span>
          <span className="experience-teaser-tag">{experience.categoryLabel}</span>
        </div>
        <p className="experience-teaser-text">{experience.situation}</p>
      </button>
    )
  }

  return (
    <article
      className={cn('experience-detail', CATEGORY_CLASS[experience.category])}
    >
      <header className="experience-detail-head">
        <div>
          <p className="experience-detail-eyebrow">Аноним · читатель</p>
          <h3 className="experience-detail-title">
            АРХИВ · {String(index + 1).padStart(2, '0')}
          </h3>
        </div>
        <span className="experience-detail-tag">{experience.categoryLabel}</span>
      </header>

      <div className="experience-detail-grid">
        {STEPS.map((step, stepIndex) => (
          <section
            key={step.key}
            className={cn('experience-detail-block', `experience-detail-block-${step.tone}`)}
          >
            <div className="experience-detail-block-top">
              <span className="experience-detail-num">
                {String(stepIndex + 1).padStart(2, '0')}
              </span>
              <p className="experience-detail-label">{step.label}</p>
            </div>
            <p className="experience-detail-copy">{experience[step.field]}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
