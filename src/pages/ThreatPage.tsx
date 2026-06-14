import { Link, useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { findThreatById, CATEGORY_LABELS } from '@/data/threats'
import { HalideLabel } from '@/components/ui/halide-section'

const levelVariant: Record<string, 'critical' | 'high' | 'medium'> = {
  Критический: 'critical',
  Высокий: 'high',
  Средний: 'medium',
}

export default function ThreatPage() {
  const { id } = useParams<{ id: string }>()
  const result = id ? findThreatById(id) : null

  useEffect(() => {
    if (result) {
      document.title = `${result.threat.title} — Методики защиты жизни`
    }
  }, [result])

  if (!result) {
    return <Navigate to="/" replace />
  }

  const { threat, category } = result

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] font-body text-[#e0e0e0]">

      <header className="border-b border-white/10 bg-black/80">
        <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="font-mono text-sm uppercase tracking-wider text-white/60 transition-colors hover:text-white">
            ← На главную
          </Link>
          <span className="font-[Syncopate] text-sm font-bold uppercase tracking-wider">
            Защита<span className="text-yellow-400">Жизни</span>
          </span>
        </nav>
      </header>

      <main className="halide-section !border-t-0">
        <div className="halide-section-inner max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="halide-tag">{CATEGORY_LABELS[category]}</span>
            <Badge variant={levelVariant[threat.level]} className="text-sm">{threat.level} риск</Badge>
          </div>

          <h1 className="halide-section-title mb-6 max-w-none text-2xl sm:text-3xl">
            {threat.title}
          </h1>

          <div className="halide-panel mb-8">
            <HalideLabel>Описание</HalideLabel>
            <ul className="list-visible">
              <li>{threat.description}</li>
            </ul>
          </div>

          <section className="mb-8 w-full">
            <HalideLabel accent="red">Как противостоять</HalideLabel>
            <ol className="mt-3 w-full space-y-3">
              {threat.counter.map((step, i) => (
                <li key={i} className="list-step border-white/10 bg-white/[0.02]">
                  <span className="list-step-num">{i + 1}</span>
                  <span className="pt-1 text-base leading-relaxed text-white/90">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="halide-panel w-full border-yellow-500/20">
            <HalideLabel accent="yellow">Рекомендации</HalideLabel>
            <ul className="list-visible mt-3">
              {threat.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </section>

          <div className="halide-panel mt-10 w-full border-red-500/25">
            <HalideLabel accent="red">Экстренно</HalideLabel>
            <a href="tel:112" className="halide-emergency-num mt-2 inline-block hover:text-red-300">
              112
            </a>
          </div>
        </div>
      </main>

      <footer className="halide-footer">
        <p>© 2026 Методики защиты жизни</p>
      </footer>
    </div>
  )
}
