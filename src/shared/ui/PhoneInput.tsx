const formatPhone = (digits: string): string => {
  const d = digits.slice(0, 11)
  let result = ''
  if (d.length > 0) result += `+${d[0]}`
  if (d.length > 1) result += ` ${d.slice(1, 4)}`
  if (d.length > 4) result += ` ${d.slice(4, 7)}`
  if (d.length > 7) result += `-${d.slice(7, 9)}`
  if (d.length > 9) result += `-${d.slice(9, 11)}`
  return result
}

const stripPhone = (value: string): string =>
  value.replace(/\D/g, '').slice(0, 11)

interface PhoneInputProps {
  value: string
  onChange: (digits: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const PhoneInput = ({
  value,
  onChange,
  placeholder = '+7 912 345-67-89',
  disabled,
  className = '',
}: PhoneInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = stripPhone(e.target.value)
    onChange(digits)
  }

  return (
    <input
      type="tel"
      value={value ? formatPhone(value) : ''}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none focus:border-terra disabled:text-muted disabled:bg-muted-light font-sans ${className}`}
    />
  )
}
