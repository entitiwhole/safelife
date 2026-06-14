/** Локальные кадры из public/parallax (исходники: E:/sitecrime/Paralax) */
export const PARALLAX_ASSETS = {
  main: '/parallax/main.jpg',
  alessandroZanetti: '/parallax/alessandro-zanetti.jpg',
  geminiSurveillance: '/parallax/gemini-surveillance.png',
  missing: '/parallax/missing.jpg',
} as const

/** Main.jpg — главный кадр (index 0), остальные без повторов */
export const PARALLAX_ZOOM_IMAGES = [
  { src: PARALLAX_ASSETS.main, alt: 'Доска расследования — главный кадр' },
  { src: PARALLAX_ASSETS.alessandroZanetti, alt: 'Центр видеонаблюдения' },
  { src: PARALLAX_ASSETS.geminiSurveillance, alt: 'Газета — убийство на улицах' },
  { src: PARALLAX_ASSETS.missing, alt: 'Объявления о пропавших' },
] as const
