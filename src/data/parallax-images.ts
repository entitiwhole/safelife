import alessandroZanetti from '@/assets/images/parallax/alessandro-zanetti.jpg'
import geminiSurveillance from '@/assets/images/parallax/gemini-surveillance.png'
import main from '@/assets/images/parallax/main.jpg'
import missing from '@/assets/images/parallax/missing.jpg'

export const PARALLAX_ASSETS = {
  main,
  alessandroZanetti,
  geminiSurveillance,
  missing,
} as const

export const PARALLAX_ZOOM_IMAGES = [
  { src: PARALLAX_ASSETS.main, alt: 'Доска расследования — главный кадр' },
  { src: PARALLAX_ASSETS.alessandroZanetti, alt: 'Центр видеонаблюдения' },
  { src: PARALLAX_ASSETS.geminiSurveillance, alt: 'Газета — убийство на улицах' },
  { src: PARALLAX_ASSETS.missing, alt: 'Объявления о пропавших' },
] as const
