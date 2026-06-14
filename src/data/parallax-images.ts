import { assetUrl } from '@/lib/assets'

/** Локальные кадры из public/parallax */
export const PARALLAX_ASSETS = {
  main: assetUrl('parallax/main.jpg'),
  alessandroZanetti: assetUrl('parallax/alessandro-zanetti.jpg'),
  geminiSurveillance: assetUrl('parallax/gemini-surveillance.png'),
  missing: assetUrl('parallax/missing.jpg'),
} as const

/** Main.jpg — главный кадр (index 0), остальные без повторов */
export const PARALLAX_ZOOM_IMAGES = [
  { src: PARALLAX_ASSETS.main, alt: 'Доска расследования — главный кадр' },
  { src: PARALLAX_ASSETS.alessandroZanetti, alt: 'Центр видеонаблюдения' },
  { src: PARALLAX_ASSETS.geminiSurveillance, alt: 'Газета — убийство на улицах' },
  { src: PARALLAX_ASSETS.missing, alt: 'Объявления о пропавших' },
] as const
