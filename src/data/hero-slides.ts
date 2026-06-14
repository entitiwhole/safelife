import type { HalideSlide } from '@/components/ui/halide-topo-hero'
import caseMap from '@/assets/images/hero/case-map.jpg'
import digitalSurveillance from '@/assets/images/hero/digital-surveillance.jpg'
import evidencePhotos from '@/assets/images/hero/evidence-photos.jpg'
import investigationDesk from '@/assets/images/hero/investigation-desk.jpg'
import secretFilesOpener from '@/assets/images/hero/secret-files-opener.mp4'

/** Ассеты hero — Vite подставляет корректные URL при сборке */
export const HERO_ASSETS = {
  investigationDesk,
  evidencePhotos,
  caseMap,
  digitalSurveillance,
  secretFilesOpener,
} as const

/** По одному главному кадру на слайд — в оригинальных цветах */
export const HERO_SLIDES: HalideSlide[] = [
  {
    id: 'investigation',
    layers: [
      HERO_ASSETS.investigationDesk,
      HERO_ASSETS.investigationDesk,
      HERO_ASSETS.investigationDesk,
    ],
    archive: '[ СЛЕДСТВИЕ · ДЕЛО 01 ]',
    subtitle: 'АНАЛИЗ ФАКТОВ, А НЕ ПАНИКА — ТАК РАБОТАЕТ ЗАЩИТА',
    meta: ['ИСТОЧНИК: ЛОКАЛЬНЫЙ АРХИВ', 'РИСК: ВЫСОКИЙ'],
    video: HERO_ASSETS.secretFilesOpener,
  },
  {
    id: 'cyber',
    layers: [
      HERO_ASSETS.digitalSurveillance,
      HERO_ASSETS.digitalSurveillance,
      HERO_ASSETS.digitalSurveillance,
    ],
    archive: '[ КИБЕР · ДЕЛО 02 ]',
    subtitle: 'ЦИФРОВОЙ СЛЕД ОСТАЁТСЯ — ПРОВЕРЯЙТЕ ПЕРЕД ДЕЙСТВИЕМ',
    meta: ['КАТЕГОРИЯ: КИБЕР', 'РИСК: КРИТИЧЕСКИЙ'],
  },
  {
    id: 'social',
    layers: [
      HERO_ASSETS.evidencePhotos,
      HERO_ASSETS.evidencePhotos,
      HERO_ASSETS.evidencePhotos,
    ],
    archive: '[ СОЦИУМ · ДЕЛО 03 ]',
    subtitle: 'СВЯЗИ МЕЖДУ ФАКТАМИ ВАЖНЕЕ ДОГАДОК И СЛУХОВ',
    meta: ['КАТЕГОРИЯ: СОЦИАЛЬНЫЕ', 'РИСК: ВЫСОКИЙ'],
  },
  {
    id: 'household',
    layers: [
      HERO_ASSETS.caseMap,
      HERO_ASSETS.caseMap,
      HERO_ASSETS.caseMap,
    ],
    archive: '[ БЫТ · ДЕЛО 04 ]',
    subtitle: 'ПОРЯДОК ДОМА И ВНИМАНИЕ К ДЕТАЛЯМ ПРЕДОТВРАЩАЮТ БЕДУ',
    meta: ['КАТЕГОРИЯ: БЫТОВЫЕ', 'РИСК: СРЕДНИЙ'],
  },
]
