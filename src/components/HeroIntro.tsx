import { HalideTopoHero } from '@/components/ui/halide-topo-hero'
import type { Category } from '@/data/threats'

const NAV_CATEGORIES: { id: Category; label: string }[] = [
  { id: 'cyber', label: 'Киберугрозы' },
  { id: 'social', label: 'Социальные' },
  { id: 'household', label: 'Бытовые' },
]

interface HeroIntroProps {
  mobileOpen: boolean
  onToggleMobile: () => void
  onCloseMobile: () => void
}

export function HeroIntro({ mobileOpen, onToggleMobile, onCloseMobile }: HeroIntroProps) {
  const scrollToThreats = () => {
    document.getElementById('cyber')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HalideTopoHero
      categories={NAV_CATEGORIES}
      mobileOpen={mobileOpen}
      onToggleMobile={onToggleMobile}
      onCloseMobile={onCloseMobile}
      onScrollToThreats={scrollToThreats}
    />
  )
}
