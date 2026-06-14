import type { Threat, ThreatLevel } from '@/data/threats'
import { getThreatUrl } from '@/data/threats'
import { cn } from '@/lib/utils'

type RiskLevel = 'high' | 'medium' | 'low'

const levelToRisk = (level: ThreatLevel): RiskLevel => {
  if (level === 'Критический' || level === 'Высокий') return 'high'
  return 'medium'
}

const riskTagClass: Record<RiskLevel, string> = {
  high: 'halide-tag halide-tag-red',
  medium: 'halide-tag halide-tag-yellow',
  low: 'halide-tag border-green-500/35 text-green-300',
}

const getRiskLabel = (level: RiskLevel) => {
  switch (level) {
    case 'high':
      return 'Высокий риск'
    case 'medium':
      return 'Средний риск'
    case 'low':
      return 'Низкий риск'
  }
}

interface ThreatCardProps {
  threat: Threat
  categoryLabel: string
  featured?: boolean
  compact?: boolean
}

export function ThreatCard({ threat, categoryLabel, featured = false, compact = false }: ThreatCardProps) {
  const risk = levelToRisk(threat.level)
  const href = getThreatUrl(threat.id)

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="threat-compact group/card block w-full no-underline text-inherit"
        aria-label={`${threat.title} — открыть в новой вкладке`}
      >
        <div className="threat-compact-inner">
          <div className="threat-compact-head">
            <span>{categoryLabel}</span>
            <span className={cn('shrink-0', riskTagClass[risk])}>{getRiskLabel(risk)}</span>
          </div>
          <h3 className="threat-compact-title">{threat.title}</h3>
          <p className="threat-compact-desc">{threat.short}</p>
          <span className="threat-compact-link">Узнать больше ↗</span>
        </div>
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card block w-full no-underline text-inherit"
      aria-label={`${threat.title} — открыть в новой вкладке`}
    >
      <div
        className={cn(
          'halide-panel threat-card flex h-full flex-col transition-transform duration-300 group-hover/card:-translate-y-1',
          featured && 'threat-card-featured',
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
            {categoryLabel}
          </span>
          <span className={cn('shrink-0', riskTagClass[risk])}>{getRiskLabel(risk)}</span>
        </div>

        <h3 className="halide-step-title mb-3 text-[0.95rem] leading-snug transition-colors group-hover/card:text-red-400 sm:text-base">
          {threat.title}
        </h3>

        <ul className="list-visible list-visible-red mb-5 flex-1">
          <li>{threat.short}</li>
        </ul>

        <div className="border-t border-white/10 pt-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/55 transition-colors group-hover/card:text-yellow-400">
            Узнать больше ↗
          </span>
        </div>
      </div>
    </a>
  )
}

/** Kept for backwards compatibility */
export const THREAT_ICONS: Record<string, never> = {}
