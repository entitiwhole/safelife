/**
 * Adapted from 21st.dev MCP — Threat Cards Grid with framer-motion
 */
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { ThreatLevel } from '@/data/threats'

export interface GridListItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  level: ThreatLevel
  onClick?: () => void
}

const levelConfig: Record<
  ThreatLevel,
  { variant: 'critical' | 'high' | 'medium'; label: string; glow: string; iconBg: string }
> = {
  Критический: {
    variant: 'critical',
    label: 'Критический',
    glow: 'group-hover:shadow-red-500/15',
    iconBg: 'bg-red-50 text-red-600',
  },
  Высокий: {
    variant: 'high',
    label: 'Высокий',
    glow: 'group-hover:shadow-orange-500/15',
    iconBg: 'bg-orange-50 text-orange-600',
  },
  Средний: {
    variant: 'medium',
    label: 'Средний',
    glow: 'group-hover:shadow-yellow-500/15',
    iconBg: 'bg-yellow-50 text-yellow-700',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
}

interface GridListProps {
  items: GridListItem[]
  className?: string
}

export function GridList({ items, className }: GridListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {items.map((item) => {
        const cfg = levelConfig[item.level]
        return (
          <motion.button
            key={item.id}
            type="button"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            onClick={item.onClick}
            className={cn(
              'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-sm',
              'transition-shadow duration-300 hover:shadow-xl',
              cfg.glow,
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40'
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-red-500/8 to-yellow-400/8 blur-xl" />
            </div>

            <div className="relative flex items-start justify-between gap-3">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                  cfg.iconBg
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <Badge variant={cfg.variant}>{cfg.label}</Badge>
            </div>

            <h3 className="font-head relative mt-4 text-lg font-bold leading-tight tracking-tight">
              {item.title}
            </h3>
            <p className="relative mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="relative mt-4 flex items-center gap-1 border-t border-border/60 pt-4 text-sm font-medium text-primary">
              <span>Подробнее</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </motion.button>
        )
      })}
    </motion.div>
  )
}
