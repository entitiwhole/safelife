import { PARALLAX_ZOOM_IMAGES } from '@/data/parallax-images'
import { ZoomParallax } from '@/components/ui/zoom-parallax'

const ZOOM_TITLE = {
  eyebrow: 'Как пользоваться',
  title: 'Три шага к безопасности',
  description: 'Всё устроено просто: выберите тему, откройте угрозу и действуйте по пунктам.',
  meta: ['РАЗДЕЛ: 01', 'СТАТУС: АКТИВНО'] as [string, string],
}

export function HowItWorksZoom() {
  return (
    <section id="how-it-works" className="topic-zoom-flow bg-[#0a0a0a]">
      <ZoomParallax
        images={[...PARALLAX_ZOOM_IMAGES]}
        title={ZOOM_TITLE}
        primaryIndex={0}
      />
    </section>
  )
}
