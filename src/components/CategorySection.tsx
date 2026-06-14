import { ScrollingFeatureShowcase, type ScrollingStorySlide } from '@/components/ui/interactive-scrolling-story-component'
import { HalideSectionHeader, HalidePanel, HalideLabel } from '@/components/ui/halide-section'
import { CATEGORY_LABELS, getThreatUrl, type Threat, type Category } from '@/data/threats'
import { getThreatImage } from '@/data/threat-images'
import { cn } from '@/lib/utils'

export interface CategoryMeta {
  title: string
  sub: string
  num: string
  warning: string
  quote: string
  accentColor: string
}

interface CategorySectionProps {
  category: Category
  meta: CategoryMeta
  threats: Threat[]
  isFirst?: boolean
}

const SECTION_CLASS: Record<Category, string> = {
  cyber: 'category-section-cyber',
  social: 'category-section-social',
  household: 'category-section-household',
}

const ACCENT_CLASS: Record<Category, string> = {
  cyber: 'text-red-400',
  social: 'text-yellow-400',
  household: 'text-orange-400',
}

const STORY_ACCENT: Record<Category, 'red' | 'yellow' | 'orange'> = {
  cyber: 'red',
  social: 'yellow',
  household: 'orange',
}

export function CategorySection({ category, meta, threats, isFirst = false }: CategorySectionProps) {
  const slides: ScrollingStorySlide[] = threats.map((threat, index) => ({
    title: threat.title,
    description: threat.short,
    image: getThreatImage(category, index),
    href: getThreatUrl(threat.id),
    badge: threat.level,
  }))

  return (
    <section
      id={category}
      className={cn(
        'category-block',
        SECTION_CLASS[category],
        isFirst && 'category-block-first',
      )}
    >
      <div className="category-block-header">
        <HalideSectionHeader
          eyebrow={`[ ДЕЛО ${meta.num} ]`}
          title={meta.title}
          meta={[`УГРОЗ: ${threats.length}`, `КАТЕГОРИЯ: ${category.toUpperCase()}`]}
          description={meta.sub}
        />

        <div className="category-block-quote flex flex-wrap items-end gap-3">
          <span className={cn('halide-category-num category-block-num', ACCENT_CLASS[category])}>
            {meta.num}
          </span>
          <HalidePanel className="max-w-2xl flex-1">
            <HalideLabel accent="yellow">{meta.warning}</HalideLabel>
            <p className="font-body text-sm leading-relaxed text-white/80 italic sm:text-[0.9rem]">
              {meta.quote}
            </p>
          </HalidePanel>
        </div>

        <p className="category-block-hint">
          Прокрутите — {threats.length} угроз · «{CATEGORY_LABELS[category]}»
        </p>
      </div>

      <ScrollingFeatureShowcase
        slides={slides}
        ctaLabel="Узнать больше"
        accent={STORY_ACCENT[category]}
      />
    </section>
  )
}
