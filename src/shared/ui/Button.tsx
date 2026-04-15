interface ButtonProps {
  label: string
  variant?: 'primary' | 'outline' | 'danger-outline' | 'ghost'
  isLoading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}

export const Button = ({
  label,
  variant = 'primary',
  isLoading,
  disabled,
  fullWidth = true,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const base =
    'rounded-xl text-base font-semibold py-3.5 px-4 transition-opacity active:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants: Record<string, string> = {
    primary: 'bg-terra text-white',
    outline: 'bg-transparent text-terra border-2 border-terra',
    'danger-outline': 'bg-transparent text-danger border-2 border-danger',
    ghost: 'bg-transparent text-terra',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {isLoading ? 'Загрузка...' : label}
    </button>
  )
}
