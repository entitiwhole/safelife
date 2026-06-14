import type { MouseEvent } from 'react'

export function scrollToSection(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
