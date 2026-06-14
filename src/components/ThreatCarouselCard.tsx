import type { Threat } from '@/data/threats'
import { getThreatUrl } from '@/data/threats'
import { THREAT_DANGER_IMAGES } from '@/data/threat-images'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type RiskLevel = 'high' | 'medium'

function levelToRisk(level: Threat['level']): RiskLevel {
  return level === 'Критический' || level === 'Высокий' ? 'high' : 'medium'
}

function riskLabel(level: RiskLevel) {
  return level === 'high' ? 'Высокий риск' : 'Средний риск'
}

function riskVariant(level: RiskLevel): 'high' | 'medium' {
  return level === 'high' ? 'high' : 'medium'
}

interface ThreatCarouselCardProps {
  threat: Threat
  categoryLabel: string
  imageIndex: number
  className?: string
}

export function ThreatCarouselCard({
  threat,
  categoryLabel,
  imageIndex,
  className,
}: ThreatCarouselCardProps) {
  const risk = levelToRisk(threat.level)
  const href = getThreatUrl(threat.id)
  const image = THREAT_DANGER_IMAGES[imageIndex % THREAT_DANGER_IMAGES.length]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('threat-carousel-card group/card block shrink-0 no-underline text-inherit', className)}
      aria-label={`${threat.title} — открыть в новой вкладке`}
    >
      <article className="threat-carousel-card-inner">
        <div className="threat-carousel-card-media" aria-hidden>
          <img
            src={image}
            alt=""
            className="threat-carousel-card-img"
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className="threat-carousel-card-top">
          <span className="threat-carousel-category">{categoryLabel}</span>
          <Badge variant={riskVariant(risk)} className="threat-carousel-badge">
            {riskLabel(risk)}
          </Badge>
        </div>

        <div className="threat-carousel-content">
          <h3 className="threat-carousel-title">{threat.title}</h3>
          <p className="threat-carousel-desc">{threat.short}</p>
          <span className="threat-carousel-link">Узнать больше ↗</span>
        </div>
      </article>
    </a>
  )
}
