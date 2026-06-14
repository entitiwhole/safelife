import * as React from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { SPRING_SCROLL } from '@/lib/motion'

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>
  rawScrollYProgress: MotionValue<number>
}

const ScrollXCarouselContext = React.createContext<ScrollXCarouselContextValue | null>(null)

function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext)
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel')
  }
  return context
}

export function ScrollXCarousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, SPRING_SCROLL)

  return (
    <ScrollXCarouselContext.Provider
      value={{ scrollYProgress: smoothProgress, rawScrollYProgress: scrollYProgress }}
    >
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  )
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky top-0 left-0 w-full overflow-hidden', className)}
      {...props}
    />
  )
}

export function ScrollXCarouselWrap({
  className,
  style,
  xRagnge = ['-0%', '-80%'],
  progressRange = [0, 1],
  useRawProgress = true,
  ...props
}: HTMLMotionProps<'div'> & {
  xRagnge?: string[]
  /** На каком участке вертикального скролла едет ряд (0–1) */
  progressRange?: [number, number]
  /** Горизонталь без задержки пружины — иначе ряд «догоняет» в конце */
  useRawProgress?: boolean
}) {
  const { scrollYProgress, rawScrollYProgress } = useScrollXCarousel()
  const source = useRawProgress ? rawScrollYProgress : scrollYProgress
  const [start, end] = progressRange
  const x = useTransform(source, [start, end], xRagnge, { clamp: true })

  return (
    <motion.div className={cn('w-fit', className)} style={{ x, ...style }} {...props} />
  )
}

export function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { progressStyle?: string }) {
  const { scrollYProgress } = useScrollXCarousel()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('h-0.5 origin-left bg-red-500/90', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  )
}
