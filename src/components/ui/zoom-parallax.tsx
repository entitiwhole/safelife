import { useScroll, useSpring, useTransform, motion, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { SPRING_SCROLL } from '@/lib/motion'

export interface ZoomParallaxImage {
  src: string
  alt?: string
}

export interface ZoomParallaxTitle {
  eyebrow: string
  title: string
  description: string
  meta: [string, string]
}

interface ZoomParallaxProps {
  images: ZoomParallaxImage[]
  title?: ZoomParallaxTitle
  /** Индекс главного кадра — в него «входим», максимальный зум */
  primaryIndex?: number
}

const POSITION_CLASSES = [
  '',
  '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
  '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
  '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
  '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
]

function TitleOverlay({
  title,
  progress,
}: {
  title: ZoomParallaxTitle
  progress: MotionValue<number>
}) {
  const titleOpacity = useTransform(progress, [0.34, 0.56, 0.92, 1], [0, 1, 1, 0])
  const titleY = useTransform(progress, [0.34, 0.56], [18, 0])
  const dimOpacity = useTransform(progress, [0.28, 0.5], [0, 0.48])
  const bottomFade = useTransform(progress, [0.52, 0.78, 0.96], [0, 1, 0.35])

  return (
    <motion.div className="absolute inset-0 z-[15]">
      <motion.div
        style={{ opacity: dimOpacity }}
        className="pointer-events-none absolute inset-0 bg-black"
      />
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute inset-0 z-[20] flex items-center justify-center px-6"
      >
        <div className="halide-section-header max-w-3xl text-center [&_.halide-section-rule]:mx-auto">
          <div className="halide-section-header-top justify-center">
            <p className="halide-eyebrow">{title.eyebrow}</p>
            <div className="halide-section-meta text-left sm:text-right">
              <span>{title.meta[0]}</span>
              <span>{title.meta[1]}</span>
            </div>
          </div>
          <h2 className="halide-section-title mx-auto max-w-none text-center">
            {title.title}
          </h2>
          <p className="halide-section-desc mx-auto text-center">{title.description}</p>
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: bottomFade }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[72%] bg-gradient-to-t from-[#0a0a0a] from-[18%] via-[#0a0a0a]/92 via-55% to-transparent"
      />
    </motion.div>
  )
}

export function ZoomParallax({ images, title, primaryIndex = 0 }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, SPRING_SCROLL)

  const scale4 = useTransform(progress, [0, 1], [1, 4])
  const scale5 = useTransform(progress, [0, 1], [1, 5])
  const scale6 = useTransform(progress, [0, 1], [1, 6])
  const scale8 = useTransform(progress, [0, 1], [1, 8])
  const scale9 = useTransform(progress, [0, 1], [1, 9])
  const scalePrimary = useTransform(progress, [0, 1], [1, 5])
  const secondaryOpacity = useTransform(progress, [0.04, 0.42], [1, 0])

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  return (
    <div ref={container} className="relative h-[340vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#0a0a0a]">
        {images.map(({ src, alt }, index) => {
          const isPrimary = index === primaryIndex
          const scale = isPrimary ? scalePrimary : scales[index % scales.length]

          const frame = (
            <div
              className={
                isPrimary
                  ? 'zoom-parallax-primary relative overflow-hidden'
                  : 'relative h-[25vh] w-[25vw] overflow-hidden'
              }
            >
              <img
                src={src || '/placeholder.svg'}
                alt={alt || `Parallax image ${index + 1}`}
                className="zoom-parallax-img h-full w-full object-cover"
                draggable={false}
                loading={isPrimary ? 'eager' : 'lazy'}
                fetchPriority={isPrimary ? 'high' : 'auto'}
                decoding={isPrimary ? 'sync' : 'async'}
              />
            </div>
          )

          return (
            <motion.div
              key={`${src}-${index}`}
              style={{
                scale,
                opacity: isPrimary ? 1 : secondaryOpacity,
              }}
              className={`absolute top-0 flex h-full w-full items-center justify-center will-change-transform ${POSITION_CLASSES[index] ?? ''}`}
            >
              {frame}
            </motion.div>
          )
        })}

        {title && <TitleOverlay title={title} progress={progress} />}
      </div>
    </div>
  )
}

/** @deprecated */
export const Component = ZoomParallax
