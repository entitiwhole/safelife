import cautionTape from '@/assets/images/hero/caution-tape.png'

const CAUTION_TAPE_SRC = cautionTape

/** Одно фото лент — выше, на всю верхнюю часть hero */
export function CautionTapeChaos() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[62vh] min-h-[280px] overflow-visible sm:h-[58vh] md:min-h-[360px]"
      aria-hidden
    >
      <div className="tape-photo-hero-wrap absolute left-1/2 top-[-4%] -translate-x-1/2 animate-tape-wave">
        <img
          src={CAUTION_TAPE_SRC}
          alt=""
          draggable={false}
          className="tape-photo-hero"
        />
      </div>
    </div>
  )
}
