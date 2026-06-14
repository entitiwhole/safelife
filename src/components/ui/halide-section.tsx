import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HalideSectionProps {
  id?: string
  children: ReactNode
  className?: string
  /** Без внутреннего контейнера max-width — для полноэкранных блоков */
  bleed?: boolean
}

export function HalideSection({ id, children, className, bleed }: HalideSectionProps) {
  return (
    <section id={id} className={cn('halide-section', bleed && 'halide-section-bleed', className)}>
      <div className="halide-section-grain" aria-hidden />
      {bleed ? children : <div className="halide-section-inner">{children}</div>}
    </section>
  )
}

interface HalideSectionHeaderProps {
  eyebrow: string
  title: string
  description?: ReactNode
  meta?: [string, string]
  className?: string
}

export function HalideSectionHeader({
  eyebrow,
  title,
  description,
  meta,
  className,
}: HalideSectionHeaderProps) {
  return (
    <header className={cn('halide-section-header', className)}>
      <div className="halide-section-header-top">
        <p className="halide-eyebrow">{eyebrow}</p>
        {meta && (
          <div className="halide-section-meta">
            <span>{meta[0]}</span>
            <span>{meta[1]}</span>
          </div>
        )}
      </div>
      <h2 className="halide-section-title">{title}</h2>
      {description && <div className="halide-section-desc">{description}</div>}
      <div className="halide-section-rule" />
    </header>
  )
}

interface HalidePanelProps {
  children: ReactNode
  className?: string
}

export function HalidePanel({ children, className }: HalidePanelProps) {
  return <div className={cn('halide-panel', className)}>{children}</div>
}

interface HalideStepIndexProps {
  children: ReactNode
  variant?: 'red' | 'yellow' | 'silver'
}

export function HalideStepIndex({ children, variant = 'silver' }: HalideStepIndexProps) {
  return (
    <span className={cn('halide-step-index', `halide-step-index-${variant}`)}>{children}</span>
  )
}

export function HalideLabel({ children, accent }: { children: ReactNode; accent?: 'red' | 'yellow' | 'green' }) {
  return <p className={cn('halide-label', accent && `halide-label-${accent}`)}>{children}</p>
}
