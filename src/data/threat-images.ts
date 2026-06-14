import type { Category } from '@/data/threats'

/** Локальные кадры из public/danger (исходники: E:/sitecrime/DAnger, порядок по дате изменения) */
export const THREAT_DANGER_IMAGES = [
  '/danger/01.jpg',
  '/danger/02.jpg',
  '/danger/03.jpg',
  '/danger/04.jpg',
  '/danger/05.jpg',
  '/danger/06.jpg',
  '/danger/07.jpg',
  '/danger/08.jpg',
  '/danger/09.jpg',
  '/danger/10.jpg',
  '/danger/11.jpg',
  '/danger/12.png',
  '/danger/13.jpg',
  '/danger/14.jpg',
  '/danger/15.jpg',
  '/danger/16.png',
  '/danger/17.png',
  '/danger/18.png',
] as const

const CATEGORY_OFFSET: Record<Category, number> = {
  cyber: 0,
  social: 6,
  household: 12,
}

export function getThreatImage(category: Category, index: number): string {
  const globalIndex = CATEGORY_OFFSET[category] + index
  return THREAT_DANGER_IMAGES[globalIndex] ?? THREAT_DANGER_IMAGES[globalIndex % THREAT_DANGER_IMAGES.length]
}
