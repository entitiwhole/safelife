/**
 * Adapted from 21st.dev MCP — Bento Grid
 */
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface BentoItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  meta?: string
  status?: string
  accentClass?: string
  href?: string
  onClick?: () => void
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-3', className)}>
      {items.map((item) => {
        const Comp = item.href ? 'a' : 'button'
        const linkProps = item.href ? { href: item.href } : { type: 'button' as const, onClick: item.onClick }

        return (
          <Comp
            key={item.id}
            {...linkProps}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 text-left',
              'shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40',
              item.accentClass
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl" />
            </div>

            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                {item.status && (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {item.status}
                  </span>
                )}
              </div>

              <div>
                {item.meta && (
                  <span className="text-xs font-bold tracking-widest text-primary">{item.meta}</span>
                )}
                <h3 className="font-head mt-1 text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>

              <span className="text-xs font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Перейти →
              </span>
            </div>
          </Comp>
        )
      })}
    </div>
  )
}
