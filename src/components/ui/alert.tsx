/**
 * Adapted from 21st.dev MCP — Alert component
 */
import { cn } from '@/lib/utils'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

type AlertType = 'error' | 'warning' | 'info' | 'success'

const typeStyles: Record<AlertType, { box: string; icon: typeof Info }> = {
  error: { box: 'border-red-500/30 bg-red-500/10 text-red-300', icon: XCircle },
  warning: { box: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300', icon: AlertTriangle },
  info: { box: 'border-border bg-muted text-foreground', icon: Info },
  success: { box: 'border-green-500/30 bg-green-500/10 text-green-300', icon: CheckCircle },
}

interface AlertProps {
  type?: AlertType
  label: string
  message: string
  className?: string
}

export function Alert({ type = 'warning', label, message, className }: AlertProps) {
  const style = typeStyles[type]
  const Icon = style.icon

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
        style.box,
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div>
        <span className="font-semibold">{label}: </span>
        <span className="text-muted-foreground">{message}</span>
      </div>
    </div>
  )
}
