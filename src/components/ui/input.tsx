import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, clearable, onClear, value, onChange, ...props }, ref) => {
    const showClear = clearable && value && String(value).length > 0

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted-foreground [&_svg]:size-5">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          value={value}
          onChange={onChange}
          className={cn(
            'flex h-12 w-full rounded-xl border border-border bg-input px-4 py-2 text-base text-foreground shadow-sm transition-all duration-200',
            'placeholder:text-muted-foreground/70',
            'focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30',
            leftIcon && 'pl-12',
            showClear && 'pr-12',
            type === 'search' &&
              '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none',
            className
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            aria-label="Очистить"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
