/** Общие настройки плавности для framer-motion */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const

export const MOTION_EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Пружина для scroll-linked анимаций */
export const SPRING_SCROLL = {
  stiffness: 72,
  damping: 28,
  mass: 0.35,
  restDelta: 0.0006,
} as const

/** Мягкая пружина для UI */
export const SPRING_UI = {
  stiffness: 120,
  damping: 22,
  mass: 0.5,
} as const

export const TWEEN_SMOOTH = {
  duration: 0.65,
  ease: MOTION_EASE,
} as const

export const TWEEN_FAST = {
  duration: 0.45,
  ease: MOTION_EASE,
} as const

export const VIEWPORT_SOFT = {
  once: true,
  margin: '-40px',
  amount: 0.2,
} as const
