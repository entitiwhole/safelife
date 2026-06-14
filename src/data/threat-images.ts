import type { Category } from '@/data/threats'

const threatModules = import.meta.glob<string>(
  '../assets/images/threats/*.{jpg,png}',
  { eager: true, query: '?url', import: 'default' },
)

/** Порядок 01–18 по имени файла (как в DAnger) */
export const THREAT_DANGER_IMAGES = Object.entries(threatModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)

const CATEGORY_OFFSET: Record<Category, number> = {
  cyber: 0,
  social: 6,
  household: 12,
}

export function getThreatImage(category: Category, index: number): string {
  const globalIndex = CATEGORY_OFFSET[category] + index
  return THREAT_DANGER_IMAGES[globalIndex] ?? THREAT_DANGER_IMAGES[globalIndex % THREAT_DANGER_IMAGES.length]
}
