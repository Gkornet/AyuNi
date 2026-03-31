import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'light'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  external?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-honey text-white hover:bg-honey-dark focus-visible:ring-honey',
  secondary:
    'bg-charcoal text-white hover:bg-warm-800 focus-visible:ring-charcoal',
  ghost:
    'bg-transparent text-charcoal hover:bg-warm-100 focus-visible:ring-warm-300 border border-warm-200',
  outline:
    'bg-transparent text-honey border border-honey hover:bg-honey-50 focus-visible:ring-honey',
  light:
    'bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm focus-visible:ring-white/50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center font-sans font-medium tracking-wide rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled,
  className = '',
  external,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
